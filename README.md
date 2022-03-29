# uFincs API Proxy Prototype

The following is a prototype for what I'm calling the "uFincs API Proxy". Basically, because of how the encryption works in uFincs, you can't just make calls directly to the Backend API. You instead need a 'proxy' to handle doing the encryption/decryption, ala how the Frontend works.

## Quickstart

First, clone the repo and create a `.env` file at the root. You can use the existing `.env.example` as a base:

```
API_KEY=54b80806-6c7b-4af1-9042-9871e6ef128e
PORT=5001
UFINCS_EMAIL=me@example.com
UFINCS_PASSWORD=password123
```

- Change out the `API_KEY` for a different UUID ([convenient UUID generator](https://www.uuidgenerator.net/)). This will be used to authenticate with the API proxy itself, not with uFincs.
- Leave the `PORT` as-is unless you have some specific need.
- Substitute in your uFincs email and password accordingly.

The way the proxy works is that it basically goes through the same authentication/decryption process that the Frontend web app does. As such, you _need_ to pass in your actual uFincs credentials. [More details below](https://github.com/uFincs/api-proxy-prototype#how-the-proxy-works) on why this is.

Once your env vars are set up, just do the usual NPM stuff:

```
npm ci
npm start
```

The proxy should now be running. You should see the following log:

```json
{"message":"Listening to port 5001","severity":"info","timestamp":"2022-03-27T21:35:40.588Z"}
```

This indicates that the proxy has successfully started and authenticated to uFincs.

If you see the following message:

```json
{"className":"not-authenticated","code":401,"errors":{},"message":"Invalid login","name":"NotAuthenticated"}
```

Well, then you aren't authenticated to the uFincs Backend. Your credentials are probably wrong.

## How to Use the Proxy

To emphasize the 'prototype' aspect of the proxy, it only implements a subset of the uFincs resources. It just so happens that the ones it does are the most useful (accounts and transactions).

The following are the implemented routes (obviously, substitute your API key as appropriate).

### Transactions

#### Get all Transactions

Example: 

```
curl -H "X-API-KEY: ${API_KEY}" localhost:5001/v1/transactions
```

Sample Response:

```json
[
    {
        "id": "36e7da7b-394a-4158-a356-d03b0bd5ef69",
        "amount": 100000,
        "date": "2019-02-20T00:00:00.000Z",
        "description": "Threw some money in savings",
        "notes": "",
        "type": "transfer",
        "createdAt": "2020-12-26T02:42:57.932Z",
        "updatedAt": "2020-12-26T02:42:57.932Z",
        "creditAccountId": "89b52183-9064-46ea-adc5-7708512d0431",
        "debitAccountId": "9056bacc-b0e5-4810-90e7-52dc15dfab5c",
        "recurringTransactionId": null
    }
]
```

#### Get a Single Transaction

Example: 

```
curl -H "X-API-KEY: ${API_KEY}" localhost:5001/v1/transactions/:id
```

Sample Response:

```json
{
    "id": "36e7da7b-394a-4158-a356-d03b0bd5ef69",
    "amount": 100000,
    "date": "2019-02-20T00:00:00.000Z",
    "description": "Threw some money in savings",
    "notes": "",
    "type": "transfer",
    "createdAt": "2020-12-26T02:42:57.932Z",
    "updatedAt": "2020-12-26T02:42:57.932Z",
    "creditAccountId": "89b52183-9064-46ea-adc5-7708512d0431",
    "debitAccountId": "9056bacc-b0e5-4810-90e7-52dc15dfab5c",
    "recurringTransactionId": null
}
```

#### Create a Transaction

Example: 

```
curl -X POST -H "X-API-KEY: ${API_KEY}" -H "Content-Type: application/json" --data @body.json localhost:5001/v1/transactions
```

Sample Request Body (`body.json`):

```json
{
    "id": "16e7da7b-394a-4158-a356-d03b0bd5ef69",
    "amount": 100000,
    "date": "2019-02-20T00:00:00.000Z",
    "description": "Threw some money in savings",
    "notes": "",
    "type": "transfer",
    "createdAt": "2020-12-26T02:42:57.932Z",
    "updatedAt": "2020-12-26T02:42:57.932Z",
    "creditAccountId": "89b52183-9064-46ea-adc5-7708512d0431",
    "debitAccountId": "9056bacc-b0e5-4810-90e7-52dc15dfab5c",
    "recurringTransactionId": null
}
```

Sample Response:

```json
{
    "id": "16e7da7b-394a-4158-a356-d03b0bd5ef69",
    "amount": "lTX5ojL9Zcq7dckT:yYRs3wgb41xgyCpl7AUVXAOY4QXMdg==",
    "date": "UrmaKlFH/nyXabpV:+KGt4fI2nPgvfUJscuu9MRjtjzmc6DWOwrLApjbDTE1wuJFAz8PIAQ==",
    "description": "UHyj9xlWFou/bgkx:BRyXmoEtvWPEExTbOxeniGx1pZCM8fDzGNIM8WH44UuMiuVxmJvQ60PlNw==",
    "notes": "uwCbv9q+sUF7RhFb:BN1FLxokmEE1qnS5MjdYmA==",
    "type": "LQ3YZCx9lMCAGmM3:xOc/ul8J+JtJoVZwcbpFliOq0ziGI7be",
    "createdAt": "L0jfek0nrOPCzVZT:D2ArfrjHXM2k4yhsSQhI+DwkKfnBKWsuiDE7fNVOMr2ZlHmriw3Mdw==",
    "updatedAt": "R4HQq3s6jDlqBQ9M:D3PSW2pBnaaJ/WwMBv3LrIAgqyuvRSjRcufTX2WnZjg5ORFehKiZOA==",
    "creditAccountId": "89b52183-9064-46ea-adc5-7708512d0431",
    "debitAccountId": "9056bacc-b0e5-4810-90e7-52dc15dfab5c",
    "recurringTransactionId": null
}
```

Yes, you get back the encrypted object.

#### Bulk Create Multiple Transactions

Example: 

```
curl -X POST -H "X-API-KEY: ${API_KEY}" -H "Content-Type: application/json" --data @body.json localhost:5001/v1/transactions/bulk
```

Sample Request Body (`body.json`):

```json
[
    {
        "id": "16e7da7b-394a-4158-a356-d03b0bd5ef69",
        "amount": 100000,
        "date": "2019-02-20T00:00:00.000Z",
        "description": "Threw some money in savings",
        "notes": "",
        "type": "transfer",
        "createdAt": "2020-12-26T02:42:57.932Z",
        "updatedAt": "2020-12-26T02:42:57.932Z",
        "creditAccountId": "89b52183-9064-46ea-adc5-7708512d0431",
        "debitAccountId": "9056bacc-b0e5-4810-90e7-52dc15dfab5c",
        "recurringTransactionId": null
    }
]
```

Sample Response:

```json
[
    {
        "id": "16e7da7b-394a-4158-a356-d03b0bd5ef69",
        "amount": "lTX5ojL9Zcq7dckT:yYRs3wgb41xgyCpl7AUVXAOY4QXMdg==",
        "date": "UrmaKlFH/nyXabpV:+KGt4fI2nPgvfUJscuu9MRjtjzmc6DWOwrLApjbDTE1wuJFAz8PIAQ==",
        "description": "UHyj9xlWFou/bgkx:BRyXmoEtvWPEExTbOxeniGx1pZCM8fDzGNIM8WH44UuMiuVxmJvQ60PlNw==",
        "notes": "uwCbv9q+sUF7RhFb:BN1FLxokmEE1qnS5MjdYmA==",
        "type": "LQ3YZCx9lMCAGmM3:xOc/ul8J+JtJoVZwcbpFliOq0ziGI7be",
        "createdAt": "L0jfek0nrOPCzVZT:D2ArfrjHXM2k4yhsSQhI+DwkKfnBKWsuiDE7fNVOMr2ZlHmriw3Mdw==",
        "updatedAt": "R4HQq3s6jDlqBQ9M:D3PSW2pBnaaJ/WwMBv3LrIAgqyuvRSjRcufTX2WnZjg5ORFehKiZOA==",
        "creditAccountId": "89b52183-9064-46ea-adc5-7708512d0431",
        "debitAccountId": "9056bacc-b0e5-4810-90e7-52dc15dfab5c",
        "recurringTransactionId": null
    }
]
```

#### Update a Single Transaction

Example: 

```
curl -X PUT -H "X-API-KEY: ${API_KEY}" -H "Content-Type: application/json" --data @body.json localhost:5001/v1/transactions/:id
```

Sample Request Body (`body.json`):

```json
{
    "id": "36e7da7b-394a-4158-a356-d03b0bd5ef69",
    "amount": 100,
    "date": "2019-02-20T00:00:00.000Z",
    "description": "Threw some money in savings",
    "notes": "",
    "type": "transfer",
    "createdAt": "2020-12-26T02:42:57.932Z",
    "updatedAt": "2020-12-26T02:42:57.932Z",
    "creditAccountId": "89b52183-9064-46ea-adc5-7708512d0431",
    "debitAccountId": "9056bacc-b0e5-4810-90e7-52dc15dfab5c",
    "recurringTransactionId": null
}
```

Sample Response:

```json
{
    "id": "36e7da7b-394a-4158-a356-d03b0bd5ef69",
    "amount": "jebqVt5lnADZJOos:a8YJGSKLJzJHVWID/0P5R7e8gA==",
    "date": "FcmnB8DtPCsd5LRy:YTDqk1+XrMUGxjNUx7tIr6qww4VSAqNx1WB0NP54nZfyxDCW+yrV7w==",
    "description": "PNS7qsdQs2NDcZQ5:svI+dDCVitD7fGI8PT2o/f0ltEHh3e88s6x7gJNFCPmzsP9TmpU4c0+v8A==",
    "notes": "NB4dP/26XiUjTIwc:mMfvgatqOEXBPcnXTgPuPQ==",
    "type": "a7ojMH5sm1TQCImn:+3wll1v14GZFr+RBuLuTCXLhXexD0AsG",
    "createdAt": "JfKDYcHHVIf9hGTP:zAwtJLcRjsTm345qC5zQRULwnMlTti6+BU2xwx2974teGs1AgIg7OA==",
    "updatedAt": "mbbCMBVRtzkA1bEW:54WYvHzA8jYscNq+Wgw8X511GyM/N7aIi+sZp7NyA7miChTWD8Ijxg==",
    "creditAccountId": "89b52183-9064-46ea-adc5-7708512d0431",
    "debitAccountId": "9056bacc-b0e5-4810-90e7-52dc15dfab5c",
    "recurringTransactionId": null
}
```

#### Delete a Single Transaction

Example: 

```
curl -X DELETE -H "X-API-KEY: ${API_KEY}" localhost:5001/v1/transactions/:id
```

### Accounts

#### Get all Accounts

Example: 

```
curl -H "X-API-KEY: ${API_KEY}" localhost:5001/v1/accounts
```

Sample Response:

```json
[
    {
        "id": "89b52183-9064-46ea-adc5-7708512d0431",
        "name": "Chequing",
        "type": "asset",
        "openingBalance": 125000,
        "interest": 0,
        "createdAt": "2020-12-26T02:42:57.932Z",
        "updatedAt": "2020-12-26T02:42:57.932Z",
        "transactions": [
            {
                "id": "fcd83d18-6bcc-4b27-80bc-512c54526f8d",
                "amount": "5500",
                "date": "2019-03-03T00:00:00.000Z",
                "description": "Went out to the pub with friends",
                "notes": "",
                "type": "expense",
                "createdAt": "2020-12-26T02:42:57.932Z",
                "updatedAt": "2020-12-26T02:42:57.932Z",
                "creditAccountId": "89b52183-9064-46ea-adc5-7708512d0431",
                "debitAccountId": "a0dd23c6-7b02-4b0b-8356-4d1a7395701f",
                "recurringTransactionId": null
            }
        ]
    }
]
```

#### Get a Single Account

Example: 

```
curl -H "X-API-KEY: ${API_KEY}" localhost:5001/v1/accounts/:id
```

Sample Response:

```json
{
    "id": "89b52183-9064-46ea-adc5-7708512d0431",
    "name": "Chequing",
    "type": "asset",
    "openingBalance": 125000,
    "interest": 0,
    "createdAt": "2020-12-26T02:42:57.932Z",
    "updatedAt": "2020-12-26T02:42:57.932Z",
    "transactions": [
        {
            "id": "fcd83d18-6bcc-4b27-80bc-512c54526f8d",
            "amount": "5500",
            "date": "2019-03-03T00:00:00.000Z",
            "description": "Went out to the pub with friends",
            "notes": "",
            "type": "expense",
            "createdAt": "2020-12-26T02:42:57.932Z",
            "updatedAt": "2020-12-26T02:42:57.932Z",
            "creditAccountId": "89b52183-9064-46ea-adc5-7708512d0431",
            "debitAccountId": "a0dd23c6-7b02-4b0b-8356-4d1a7395701f",
            "recurringTransactionId": null
        }
    ]
}
```

#### Create an Account

Example: 

```
curl -X POST -H "X-API-KEY: ${API_KEY}" -H "Content-Type: application/json" --data @body.json localhost:5001/v1/accounts
```

Sample Request Body (`body.json`):

```json
{
    "id": "19b52183-9064-46ea-adc5-7708512d0431",
    "name": "Chequing",
    "type": "asset",
    "openingBalance": 125000,
    "interest": 0,
    "createdAt": "2020-12-26T02:42:57.932Z",
    "updatedAt": "2020-12-26T02:42:57.932Z"
}
```

Sample Response:

```json
{
    "id": "19b52183-9064-46ea-adc5-7708512d0431",
    "name": "U7Y9i7sfm8C6Q4dl:27nA1l79GO3F5SgErv1kIXf1qRVCv4Oy",
    "type": "922UzJG4BVdP5etU:RQd39YBgOi7CGMf0Z6uuvcAeORam",
    "openingBalance": "rTx55hMQvhAJ31fD:7uXA03gWK9yvVZJbP13oFegB9BPZnw==",
    "interest": "hSoWZZ1LPh0f/xTV:0ZCQhr8UgWzBXl7HE1ylIks=",
    "createdAt": "ncN+gzE84GZ+yLaO:t6Rh7OerPGiDz0u9NAQk5QKVwd5Mv6lcB7Ae4td602WYTMrpsOV+mQ==",
    "updatedAt": "YkG+x11BsHkfVRrx:7JBwBoMPj0y3Sjs4AJxPEOPwVu1N3zBu3E9DwQUNf6bJmMBKvW6Lcg==",
    "userId": "1e46fac6-7786-40f3-86bb-f175ff3d721e"
}
```

Yes, you get back the encrypted object.

#### Update a Single Account

Example: 

```
curl -X PUT -H "X-API-KEY: ${API_KEY}" -H "Content-Type: application/json" --data @body.json localhost:5001/v1/accounts/:id
```

Sample Request Body (`body.json`):

```json
{
    "id": "89b52183-9064-46ea-adc5-7708512d0431",
    "name": "Chequing",
    "type": "asset",
    "openingBalance": 125000,
    "interest": 0,
    "createdAt": "2020-12-26T02:42:57.932Z",
    "updatedAt": "2020-12-26T02:42:57.932Z"
}
```

Sample Response:

```json
{
    "id": "89b52183-9064-46ea-adc5-7708512d0431",
    "name": "U7Y9i7sfm8C6Q4dl:27nA1l79GO3F5SgErv1kIXf1qRVCv4Oy",
    "type": "922UzJG4BVdP5etU:RQd39YBgOi7CGMf0Z6uuvcAeORam",
    "openingBalance": "rTx55hMQvhAJ31fD:7uXA03gWK9yvVZJbP13oFegB9BPZnw==",
    "interest": "hSoWZZ1LPh0f/xTV:0ZCQhr8UgWzBXl7HE1ylIks=",
    "createdAt": "ncN+gzE84GZ+yLaO:t6Rh7OerPGiDz0u9NAQk5QKVwd5Mv6lcB7Ae4td602WYTMrpsOV+mQ==",
    "updatedAt": "YkG+x11BsHkfVRrx:7JBwBoMPj0y3Sjs4AJxPEOPwVu1N3zBu3E9DwQUNf6bJmMBKvW6Lcg==",
    "userId": "1e46fac6-7786-40f3-86bb-f175ff3d721e"
}
```

#### Delete a Single Account

Example: 

```
curl -X DELETE -H "X-API-KEY: ${API_KEY}" localhost:5001/v1/accounts/:id
```

## How the Proxy Works

The proxy acts very similarly to the uFincs Frontend.

First, upon server start, it authenticates to the uFincs Backend using the provided `UFINCS_EMAIL` and `UFINCS_PASSWORD` credentials (`src/index.ts`). From here, it gets the rest of the necessary cryptographic components (`edek`, `kekSalt`) to re-create the DEK and KEK. Once the keys are re-generated, the proxy can now encrypt/decrypt data to/from the uFincs Backend.

At this point, you (the user) can now interact with the proxy through the REST API routes described above. Whenever a request needs to pull data from the uFincs Backend, it performs decryption on the response data (`src/middlewares/decryptResponse`). Conversely, whenever a request needs to submit data to the uFincs Backend, it performs encryption on the request data. (`src/middlewares/encryptResponse`).

All requests to the uFincs Backend are made through the same Feathers API client that is used by the uFincs Frontend.

Other than that, there's really nothing fancy about the proxy; just a bog-standard Express app.

## Next Steps

As far as next steps for _me_, I don't really intend to 'productionalize' this prototype. 

The next steps are really on _you_: if this type of functionality is something you need, then take this proxy prototype as a base and extend it to fit your needs. With the cryptographic elements laid out, adding the rest of the uFincs resources shouldn't be difficult, nor should be customizing the existing functionality.

Have fun!

## Contributing

Of course, if you'd like to contribute back to the proxy prototype (maybe to add the missing resources), then by all means! See the uFincs [Contributor Guidelines](TODO) for the overall rules.

## Authors

- Devin Sit

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE.md) file for details.
