class Config(object):
    DEBUG = False
    CSRF_ENABLED = True


class ProductionConfig(Config):
    DEBUG = False
    TRANSLATOR_ID = 'id_prod'
    TRANSLATOR_SECRET = 'secret_prod'


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    TRANSLATOR_ID = 'id_dev'
    TRANSLATOR_SECRET = 'secret_dev'
