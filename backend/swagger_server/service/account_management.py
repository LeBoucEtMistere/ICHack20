from swagger_server.vault_client.py_tm_vault_client.tmvault import TMVaultClient
from swagger_server.vault_client.py_tm_vault_client.tmvault.enums import CustomerGender, CustomerTitle
from datetime import date


def initialize_accounts():
    client = TMVaultClient('../vault_client/data/vault-config.json')
    company = client.customers.create_customer(
        customer_id='23503096792526979',
        title=CustomerTitle.CUSTOMER_TITLE_MISS,
        first_name='Alice',
        middle_name='Abigail',
        last_name='Anderson',
        dob=date(1997, 1, 1),
        gender=CustomerGender.CUSTOMER_GENDER_FEMALE,
        nationality='Australian',
        email_address='alice@example.com',
        mobile_phone_number='07979799799'
    )
