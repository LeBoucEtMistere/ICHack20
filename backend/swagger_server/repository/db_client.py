import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime

cred = credentials.Certificate("swagger_server/firebase_key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def add_receipt(file_name):
    # example
    doc_ref = db.collection(u'receipts').document()
    doc_dict = {
        u'VAT': 30,
        u'currency': u'EUR',
        u'date': datetime.now(),
        u'details': [
            {
                "item": "fries",
                "value": 40
            },
            {
                "item": "redbull",
                "value": 60
            }
        ],
        u'emitter': u'Waitrose',
        u'image_filename': file_name,
        u'receipt_holder': u'35294866593545759',
        u'receiver': u'95191861583545753',
        u'total': 30
    }
    doc_ref.set(doc_dict)
    return doc_dict


def get_receipt(id):
    doc_ref = db.collection(u'receipts').document(f'{id}')
    return doc_ref.get().to_dict()


def get_all_receipts():
    doc_ref = db.collection(u'receipts').get().to_dict()
    return doc_ref
