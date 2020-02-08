import uuid
import base64
import os
from flask import send_from_directory


def add_receipt_storage(file):
    file_name = f'receipt-{uuid.uuid1()}'
    file.save(os.path.join('/tmp/uploads', file_name))
    return file_name


def get_receipt_from_storage(file_name):
    return send_from_directory('/tmp/uploads', file_name)
