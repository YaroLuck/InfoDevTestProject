from .base import *

DEBUG = True

SECRET_KEY = 'atdgwuyt01-^h3xs892z058fpd5v-zci)3g!&5)w#2vy2soiwb'

ALLOWED_HOSTS = ['*']

BASE_URL = os.getenv('BASE_URL', 'http://localhost:8000')

try:
    from .local import *  # noqa
except ImportError:
    pass
