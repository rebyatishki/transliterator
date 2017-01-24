#!flask/bin/python
import os
from app import app
app.config.from_object(os.environ['APP_SETTINGS'])
app.run()
