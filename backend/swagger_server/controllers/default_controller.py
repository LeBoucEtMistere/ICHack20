import connexion
import six

from swagger_server.models.receipt import Receipt  # noqa: E501
from swagger_server.models.user import User  # noqa: E501
from swagger_server import util


def add_receipt(searchString=None, skip=None, limit=None):  # noqa: E501
    """adds an inventory item

    Adds an receipt to the system # noqa: E501

    :param searchString: pass an optional search string for looking up inventory
    :type searchString: str
    :param skip: number of records to skip for pagination
    :type skip: int
    :param limit: maximum number of records to return
    :type limit: int

    :rtype: List[Receipt]
    """
    return 'do some magic!'


def get_info(id):  # noqa: E501
    """get info on one user

    get info on one user # noqa: E501

    :param id: the user&#39;s id
    :type id: str

    :rtype: List[User]
    """
    return 'do some magic!'


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
