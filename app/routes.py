# -*- coding: utf-8 -*-
from app import app
from flask import request, abort, jsonify, make_response
import bleach
import re
from microsofttranslator import Translator
from transliterate import translit


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/<path:path>')
def static_proxy(path):
    # send_static_file will guess the correct MIME type
    return app.send_static_file(path)


@app.route('/translate', methods=['POST'])
def translate():
    if not request.json:
        abort(make_response(jsonify(message="Bad zapros"), 400))
    # sanitize html
    data = bleach.clean(request.json['text'])
    if len(data) > 400:
        abort(make_response(jsonify(message="Slishkom long stroka"), 400))
    splitted_original = re.split('(\W+)', data, flags=re.UNICODE)
    # transliterate flag. if true - the world will be transliterated
    transliterate_flag = True
    word_regex = re.compile('\w+', re.U)
    # array indexes of the words that will be really translated
    # used to put the translated words back in their places
    to_translate_indexes = []
    # array of the words that will be translated
    to_translate = []
    for i in range(0, len(splitted_original)):
        # if is's a word, not a comma, or space or whatever
        if re.match(word_regex, splitted_original[i]):
            # transliterate it or push in array for translation
            if transliterate_flag:
                splitted_original[i] = translit(splitted_original[i], 'ru', reversed=True)
            else:
                to_translate_indexes.append(i)
                to_translate.append(splitted_original[i])
            transliterate_flag = not transliterate_flag
    translated = [{}]
    try:
        # translate the words
        translator = Translator(app.config['TRANSLATOR_ID'], app.config['TRANSLATOR_SECRET'])
        translated = translator.translate_array(to_translate, 'en', 'ru')
    except Exception as e:
        abort(make_response(jsonify(message="Try again popozhe"), 500))
    # put the translated words back using the to_translate_indexes array
    for z in range(0, len(to_translate_indexes)):
        t = translated[z]['TranslatedText']
        splitted_original[to_translate_indexes[z]] = t
    res = ''.join(splitted_original)
    return jsonify(translation=res, status=200)
