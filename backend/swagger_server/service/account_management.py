from swagger_server.vault_client.py_tm_vault_client.tmvault import TMVaultClient
from swagger_server.vault_client.py_tm_vault_client.tmvault.enums import CustomerGender, CustomerTitle
from datetime import date

client = TMVaultClient('swagger_server/vault_client/data/vault-config.json')


def initialize_customers():
    # company entity
    client.customers.create_customer(
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
    # client entity
    client.customers.create_customer(
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


def initialize_current_accounts(array_of_customers):
    current_accounts = []
    for customer in array_of_customers.values():
        account_id = f'{customer.first_name.lower()}_{customer.last_name.lower()}_003'
        current_accounts.append(client.accounts.create_account(
            account_id=account_id,
            product_id='current_account',
            stakeholder_customer_ids=[customer.id_]))
        if customer.id_ == '95191861583545753':
            client.accounts.create_account(
                product_id='a_small_loan',
                stakeholder_customer_ids=[
                    customer.id_],
                instance_param_vals={
                    "deposit_account": account_id}
            )

    return current_accounts


def get_customers(array_of_ids):
    return client.customers.get_customers(array_of_ids)


def get_current_accounts(array_of_ids):
    current_accounts = []
    for id in array_of_ids:
        current_accounts.append(client.accounts.get_account(id))
    return current_accounts


def get_user_info(id):
    customer = client.customers.get_customer(id)
    accounts = client.accounts.list_accounts_for_customer(id)
    stonks = []
    for account in accounts:
        stonks.extend(account.stonks_balances.values())
    balances = [stonk.amount for stonk in stonks]
    info_dict = {
        "firstName": customer.first_name,
        "lastName": customer.last_name,
        "phoneNumber": customer.mobile_phone_number,
        "totalBalance": sum(balances)
    }
    return info_dict
