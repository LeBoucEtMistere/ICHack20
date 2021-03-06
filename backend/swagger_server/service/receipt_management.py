import uuid
import base64
import os
from flask import send_from_directory
from swagger_server.repository.db_client import get_receipt
from swagger_server.repository import db_client


def add_receipt_storage(request):
    file = request.files['file']
    file_name = f'receipt-{uuid.uuid1()}.png'
    file.save(os.path.join('/tmp/uploads', file_name))
    doc_id, doc_dict = db_client.add_receipt(file_name)
    return doc_id, doc_dict


def get_receipt_from_storage(id):
    receipt = get_receipt(id)
    return send_from_directory('/tmp/uploads', receipt["image_filename"])


def get_all_receipts():
    return db_client.get_all_receipts()


def validate_receipt(receiptId):
    validated_receipt_dict = db_client.validate_receipt(receiptId)
    # total = validated_receipt_dict["total"]
    # holder = validated_receipt_dict["receipt_holder"]
    # receiver = validated_receipt_dict["receiver"]
    # if total != 0:
    #     tm.reimburse(total, holder, receiver, "Approved By HR")
    return validated_receipt_dict
