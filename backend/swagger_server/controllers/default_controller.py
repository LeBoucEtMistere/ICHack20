import connexion
import six

from swagger_server.models.receipt import Receipt  # noqa: E501
from swagger_server.models.user import User  # noqa: E501
from swagger_server import util

from swagger_server.service import account_management as am
from swagger_server.service import transaction_management as tm
from swagger_server.service import receipt_management as rm
from flask import jsonify, request


def add_receipt():  # noqa: E501
    """adds an inventory item

    Adds an receipt to the system # noqa: E501


    :rtype: None
    """
    doc_dict = rm.add_receipt_storage(request)
    return jsonify(doc_dict)


def get_info(id):  # noqa: E501
    """get info on one user

    get info on one user # noqa: E501

    :param id: the user&#39;s id
    :type id: str

    :rtype: User
    """
    user_info = am.get_user_info(id)
    return jsonify(user_info)


def get_receipts():  # noqa: E501
    """return lists of receipts

    By passing in the appropriate options, you can search for available inventory in the system  # noqa: E501


    :rtype: List[Receipt]
    """
    doc_dict = rm.get_all_receipts()
    return jsonify(doc_dict)


def get_receipts_by_id(id):  # noqa: E501
    """return lists of receipts

    By passing in the appropriate options, you can search for available inventory in the system  # noqa: E501

    :param id: get a particular receit
    :type id: int

    :rtype: Receipt
    """
    doc_dict = rm.get_receipt(id)
    return jsonify(doc_dict)


def validate_receipt(receiptId):  # noqa: E501
    """validate a receipt

     # noqa: E501

    :param receiptId: receipt Id
    :type receiptId: int

    :rtype: None
    """
    return rm.validate_receipt(receiptId)


def get_pictures_of_receipts_by_id(id):
    return rm.get_receipt_from_storage(id)
