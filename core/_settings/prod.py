from .base import *  # noqa

DEBUG = False

SECRET_KEY = 'secret_key'

ALLOWED_HOSTS = ['*']

try:
    from .local import *  # noqa
except ImportError:
    pass
