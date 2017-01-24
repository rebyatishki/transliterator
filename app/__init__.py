from flask import Flask
import os

app = Flask(__name__, static_url_path='/static')
app.config.from_object(os.environ['APP_SETTINGS'])

from app import routes
