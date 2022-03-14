from django.conf import settings
from requests.auth import HTTPBasicAuth
import json
import os


ACTINIA_SETTINGS = settings.ACTINIA

def print_as_json(data):
    return json.dumps(data)

def auth():
    print(ACTINIA_SETTINGS)
    auth = HTTPBasicAuth(ACTINIA_SETTINGS['ACTINIA_USER'], ACTINIA_SETTINGS['ACTINIA_PASSWORD'])
    return auth

def baseUrl():
    ACTINIA_URL = os.path.join('http://',ACTINIA_SETTINGS['ACTINIA_BASEURL'], 'api', ACTINIA_SETTINGS['ACTINIA_VERSION'])
    print(ACTINIA_URL)
    return ACTINIA_URL

def location():
    return ACTINIA_SETTINGS['ACTINIA_LOCATION']
