# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.receipt import Receipt  # noqa: E501
from swagger_server.models.user import User  # noqa: E501
from swagger_server.test import BaseTestCase


class TestDefaultController(BaseTestCase):
    """DefaultController integration test stubs"""

    def test_add_receipt(self):
        """Test case for add_receipt

        adds an inventory item
        """
        query_string = [('searchString', 'searchString_example'),
                        ('skip', 1),
                        ('limit', 50)]
        response = self.client.open(
            '/ICHack/ICHack20/1.0.0/pics',
            method='POST',
            content_type='image/png',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_info(self):
        """Test case for get_info

        get info on one user
        """
        response = self.client.open(
            '/ICHack/ICHack20/1.0.0/users/{id}'.format(id='id_example'),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_receipts(self):
        """Test case for get_receipts

        return lists of receipts
        """
        response = self.client.open(
            '/ICHack/ICHack20/1.0.0/receipts',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_receipts_by_id(self):
        """Test case for get_receipts_by_id

        return lists of receipts
        """
        response = self.client.open(
            '/ICHack/ICHack20/1.0.0/receipts/{id}'.format(id=56),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_validate_receipt(self):
        """Test case for validate_receipt

        validate a receipt
        """
        response = self.client.open(
            '/ICHack/ICHack20/1.0.0/validateReceipt/{receiptId}'.format(receiptId=56),
            method='PUT')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
