import connexion
import six

from swagger_server.models.receipt import Receipt  # noqa: E501
from swagger_server.models.user import User  # noqa: E501
from swagger_server import util

from swagger_server.service.account_management import get_user_info
from swagger_server.service.transaction_management import reimburse
from swagger_server.service.receipt_management import add_receipt_storage, get_receipt_from_storage
from flask import jsonify, request


def add_receipt():  # noqa: E501
    """adds an inventory item

    Adds an receipt to the system # noqa: E501


    :rtype: None
    """
    file = request.files['file']
    add_receipt_storage(file)
    return 'do some magic!'


def get_info(id):  # noqa: E501
    """get info on one user

    get info on one user # noqa: E501

    :param id: the user&#39;s id
    :type id: str

    :rtype: User
    """
    user_info = get_user_info(id)
    return jsonify(user_info)


def get_receipts():  # noqa: E501
    """return lists of receipts

    By passing in the appropriate options, you can search for available inventory in the system  # noqa: E501


    :rtype: List[Receipt]
    """
    return 'do some magic!'


def get_receipts_by_id(id):  # noqa: E501
    """return lists of receipts

    By passing in the appropriate options, you can search for available inventory in the system  # noqa: E501

    :param id: get a particular receit
    :type id: int

    :rtype: Receipt
    """
    return 'do some magic!'


def validate_receipt(receiptId):  # noqa: E501
    """validate a receipt

     # noqa: E501

    :param receiptId: receipt Id
    :type receiptId: int

    :rtype: None
    """
    return 'do some magic!'


def get_pictures_of_receipts_by_id(id):
    return 'hello world'
