from swagger_server.vault_client.py_tm_vault_client.tmvault import TMVaultClient
from swagger_server.vault_client.py_tm_vault_client.tmvault.enums import CustomerGender, CustomerTitle
from datetime import date

client = TMVaultClient('swagger_server/vault_client/data/vault-config.json')


def initialize_customers():
    company = client.customers.create_customer(
        customer_id='95191861583545753',
        title=CustomerTitle.CUSTOMER_TITLE_MR,
        first_name='Company',
        middle_name='Not',
        last_name='Evil',
        gender=CustomerGender.CUSTOMER_GENDER_UNKNOWN,
        nationality='British',
        email_address='company@notevil.com',
        mobile_phone_number='07979799799'
    )
    employee = client.customers.create_customer(
        customer_id='35294866593545759',
        title=CustomerTitle.CUSTOMER_TITLE_MR,
        first_name='John',
        middle_name='Matrix',
        last_name='Wick',
        gender=CustomerGender.CUSTOMER_GENDER_MALE,
        nationality='Canadian',
        email_address='j.wick@headshot.com',
        mobile_phone_number='07878788788'
    )
    return [company, employee]


def initialize_current_accounts(array_of_customers):
    current_accounts = []
    for customer in array_of_customers:
        current_accounts.append(client.accounts.create_account(
            account_id=f'{customer.first_name.lower()}_{customer.last_name.lower()}_001',
            product_id='current_account_001',
            stakeholder_customer_ids=[customer.id_]))
    return current_accounts


def get_customers(array_of_ids):
    return client.customers.get_customers(array_of_ids)


def get_current_accounts(array_of_ids):
    current_accounts = []
    for id in array_of_ids:
        current_accounts.append(client.accounts.get_account(id))
    return current_accounts
