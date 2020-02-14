#!/usr/bin/env python3

import connexion

from swagger_server import encoder
from swagger_server.service.account_management import initialize_customers, initialize_current_accounts, get_customers, get_current_accounts
<<<<<<< HEAD
=======
from firebase_admin import credentials
import firebase_admin
from flask import request
from flask_cors import CORS

cred = credentials.Certificate("swagger_server/firebase_key.json")
firebase_admin.initialize_app(cred)

app = connexion.App(__name__, specification_dir='./swagger/')
app.app.json_encoder = encoder.JSONEncoder
app.add_api('swagger.yaml', arguments={'title': 'Simple Inventory API'})
CORS(app.app)


# @app.app.after_request
# def add_cors_headers(response):
#     response.headers['Access-Control-Allow-Origin'] = '*'
#     if request.method == 'OPTIONS':
#         response.headers['Access-Control-Allow-Methods'] = 'DELETE, GET, POST, PUT'
#         headers = request.headers.get('Access-Control-Request-Headers')
#         if headers:
#             response.headers['Access-Control-Allow-Headers'] = headers
#     return response
>>>>>>> 39727f941be66df4de5b6464b29c53964f271231


def main():
    app = connexion.App(__name__, specification_dir='./swagger/')
    app.app.json_encoder = encoder.JSONEncoder
    app.add_api('swagger.yaml', arguments={'title': 'Simple Inventory API'})
    app.run(port=8080)


if __name__ == '__main__':
<<<<<<< HEAD
    # first check if customers and accounts exist => if not, then create
    customers_array = []
=======

    # first check if customers and accounts exist = > if not, then create
>>>>>>> 39727f941be66df4de5b6464b29c53964f271231
    try:
        customers_array = get_customers(
            ['95191861583545753', '35294866593545759'])
    except:
        initialize_customers()
        customers_array = get_customers(
            ['95191861583545753', '35294866593545759'])
    try:
        get_current_accounts(['john_wick_003', 'company_evil_003'])
    except:
        accounts = initialize_current_accounts(customers_array)
    main()
