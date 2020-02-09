from twilio.rest import Client;

account_sid = 'ACf3d6bacbbc2e229874fa6ca507f74c30'
auth_token = '158b84d6df05c4637ca0aecf2d94393b'

client = Client(account_sid, auth_token)

price = 1.50
location = "tesco"
bank = "Monzo"

message = client.messages \
                .create(
                     body="Your £{} {} expense has been reimbursed to your {} bank account.".format(price, location, bank),
                     from_='+18183064965',
                     to='+447508559853'
                 )

print(message.sid)
