#! /bin/bash

source .env/bin/activate
python3 ./swagger_server/vault-client/py_tm_vault_client/vault-stonks --connect ./swagger_server/vault-client/data/ichack_key
python3 -m swagger_server