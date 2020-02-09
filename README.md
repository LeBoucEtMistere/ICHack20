<p align="center">
  <img src="./Logo.png" width="250" alt="Reimbursr Logo" />
</p>

## Description
Reimbursr provides lightning fast <b>automated</b> validations for your scanned receipts & immediately reimburses you by performing a transaction from the company entity account to your personal account. Companies can use Reimbursr to reduce the pain points with calculating expenses for their employees, as well as the burden on administration and management (<b>VAT</b> is considered and recorded in the database as well). This project was written from scratch and put together at IC Hack 2020.

## Business Logic
1. Open Reimbursr
2. Open Camera
3. Align your receipt & take a picture of it
4. The image is sent to the backend & then passed to Google Cloud Vision
5. Extract relevant information from the receipt
6. Record the receipt in Firestore DB
7. Reimburse the user:
    -  <b>IF</b> the total of the receipt is <= 15.0 GBP -> Perform the transaction from the Company to User immediately using <b>Vault</b>
    -  <b>ELSE IF</b> the total of the receipt > 15.0 GBP -> Wait for HR/Backoffice approval of the transaction from the Reimbursr Web App Client
8. Send response to the user on the Reimbursr Mobile App 

## Technologies Used
- Swagger
- Python3 with Flask
- Ngrok
- TypeScript
- React-Native
- VueJS
- FireStore (Firebase DB)
- Google Cloud Vision
- Vault the Core Banking Engine by Thought Machine

## License

  Reimbursr is [MIT licensed](LICENSE).