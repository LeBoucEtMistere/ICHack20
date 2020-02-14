import uuid
import base64
import os
from flask import send_from_directory
from swagger_server.repository.db_client import get_receipt
from swagger_server.repository import db_client
from swagger_server.service import transaction_management as tm

from google.cloud import storage
storage_client = storage.Client()


def upload_blob(bucket_name, source_file_str, destination_blob_name):
    """Uploads a file to the bucket."""
    # bucket_name = "your-bucket-name"
    # source_file_name = "local/path/to/file"
    # destination_blob_name = "storage-object-name"

    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    blob.make_public()

    blob.upload_from_string(source_file_str)

    print(
        "File uploaded to {} publicly accessible at {}.".format(
            destination_blob_name, blob.public_url
        )
    )


def add_receipt_storage(request):
    file = request.files['file']
    #image_string = base64.b64encode(file.read())
    file_name = f'receipt-{uuid.uuid1()}.jpg'
    #upload_blob("receipts-uaqdd", image_string, file_name)

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
    total = validated_receipt_dict["total"]
    holder = validated_receipt_dict["receipt_holder"]
    receiver = validated_receipt_dict["receiver"]
    if total != 0:
        tm.reimburse(total, holder, receiver, "Approved By HR")
    return validated_receipt_dict
