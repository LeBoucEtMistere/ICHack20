import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("swagger_server/firebase_key.json")
firebase_admin.initialize_app(cred)
