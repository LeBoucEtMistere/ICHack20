from firebase_admin import firestore
from datetime import datetime
from swagger_server.service.ocr import process_image
import os


db = firestore.client()


def add_receipt(file_name):
    # example
    tally1, tally2 = process_image(os.path.join('/tmp/uploads', file_name))
    doc_ref = db.collection(u'receipts').document()
    doc_dict = {
        u'VAT': 20,
        u'currency': tally2["currency"],
        u'date': datetime.now(),
        u'details': [
            {
                "item": key,
                "value": value
            } for key, value in tally1.items()
        ],
        u'emitter': tally2["store"],
        u'image_filename': file_name,
        u'receipt_holder': u'35294866593545759',
        u'receiver': u'95191861583545753',
        u'total': tally2["total"],
        u'validated': False
    }
    doc_ref.set(doc_dict)
    return doc_ref.id, doc_dict


def get_receipt(id):
    doc_ref = db.collection(u'receipts').document(f'{id}')
    return doc_ref.get().to_dict()


def get_all_receipts():
    doc_ref = db.collection(u'receipts')
    return list(map(lambda x: (x.id, x.get().to_dict()),
                    list(doc_ref.list_documents())))


def validate_receipt(receipt_id):
    doc_ref = db.collection(u'receipts').document(f'{receipt_id}')
    doc_ref.update({"validated": True})
