#!/usr/bin/env python3

import connexion

from swagger_server import encoder
from swagger_server.service.account_management import initialize_customers, initialize_current_accounts, get_customers, get_current_accounts


def main():
    app = connexion.App(__name__, specification_dir='./swagger/')
    app.app.json_encoder = encoder.JSONEncoder
    app.add_api('swagger.yaml', arguments={'title': 'Simple Inventory API'})
    app.run(port=8080)


if __name__ == '__main__':
    # first check if customers and accounts exist => if not, then create
    customers_array = []
    try:
        customers_array = get_customers(
            ['95191861583545753', '35294866593545759'])
    except:
        customers = initialize_customers()
        print(customers)
        for customer in customers:
            customers_array.append(customer)
    try:
        get_current_accounts(['john_wick_001', 'company_evil_001'])
    except:
        print(customers_array)
        accounts = initialize_current_accounts(customers_array)
        print(accounts)
    main()
