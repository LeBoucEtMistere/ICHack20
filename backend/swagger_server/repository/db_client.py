import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("swagger_server/firebase_key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def add_receipt():
    # example
    doc_ref = db.collection(u'users').document(u'alovelace')
    doc_ref.set({
        u'first': u'Ada',
        u'last': u'Lovelace',
        u'born': 1815
    })
    return
