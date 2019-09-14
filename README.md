# transliterator
en -> ru+en transliterator app
config.py contains the `TRANSLATOR_SUBSCRIPTION_KEY` variable
of the microsoft translator api keys

Go to https://portal.azure.com and register the microsoft account.

Add Translator subscription to your Azure account
1. Select the **+ New** -> **Intelligence + analytics** -> **Cognitive Services APIs**.
2. Select the **API Type** option.
3. Select either **Text Translation** or **Speech Translation**. Select the pricing tier that fits your needs.
4. Fill out the rest of the form, and press the **Create** button. You are now subscribed to Microsoft Translator.
5. Now retrieve your subscription key for authentication. You can find it in **All Resources** -> **Keys** option.


## Development

```bash
git clone https://github.com/rebyatishki/transliterator
cd transliterator
pip install -r requirements.txt
cp contrib/config-example.py config.py
# edit config.py
export APP_SETTINGS="config.DevelopmentConfig"
python run.py
```

## Installation in production

```bash
sudo su -
mkdir -p /var/www/transliterator
git clone https://github.com/rebyatishki/transliterator /var/www/transliterator
cd /var/www/transliterator
pip install -r requirements.txt
apt-get install -y nginx uwsgi uwsgi-plugin-python
cp contrib/config-example.py config.py
# edit config.py
cp contrib/uwsgi.ini /etc/uwsgi/apps-available/transliterator.ini
ln -s /etc/uwsgi/apps-available/transliterator.ini /etc/uwsgi/apps-enabled/transliterator.ini
service uwsgi restart
cp contrib/nginx.conf /etc/nginx/sites-enabled/transliterator.conf
# edit /etc/nginx/sites-enabled/transliterator.conf
service nginx restart
```
