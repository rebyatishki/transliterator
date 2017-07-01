class Config(object):
    DEBUG = False
    CSRF_ENABLED = True


class ProductionConfig(Config):
    DEBUG = False
    TRANSLATOR_SUBSCRIPTION_KEY = 'azuresubscriptionkey'


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    TRANSLATOR_SUBSCRIPTION_KEY = 'azuresubscriptionkey'
