from swagger_server.vault_client.py_tm_vault_client.tmvault import TMVaultClient

client = TMVaultClient('swagger_server/vault_client/data/vault-config.json')


<<<<<<< HEAD
def reimburse():
    return
=======
def reimburse(total, receipt_holder_id, receiver_id, message):
  # customers
    if total == 0:
        return
    employee = client.customers.get_customer(receipt_holder_id)
    company = client.customers.get_customer(receiver_id)
    # accounts
    employee_account = client.accounts.get_account(
        f'{employee.first_name.lower()}_{employee.last_name.lower()}_003')

    company_account = client.accounts.get_account(
        f'{company.first_name.lower()}_{company.last_name.lower()}_003')

    client.payments.create_payment(
        amount=str(total),
        currency='GBP',
        debtor_account_id=company_account.id_,
        debtor_sort_code=company_account.uk_sort_code,
        debtor_account_number=company_account.uk_account_number,
        creditor_account_id=employee_account.id_,
        creditor_sort_code=employee_account.uk_sort_code,
        creditor_account_number=employee_account.uk_account_number,
        reference=message,
        metadata={'key': 'value'}
    )
    transaction = {
        "from": company.id_,
        "to": employee.id_,
        "amount": total,
        "reference": message
    }
    return transaction
>>>>>>> 39727f941be66df4de5b6464b29c53964f271231
