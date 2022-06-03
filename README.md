# Coinbase fetch

![Continuous testing](https://github.com/Bullrich/coinbase-fetch/workflows/Continuous%20testing/badge.svg?event=push)

## How to use

You need Coinbase credentials. You can find out how to create them [here](https://help.coinbase.com/en/exchange/managing-my-account/how-to-create-an-api-key).

Create a `.env` file or set up the following environment variables:
```
COINBASE_KEY=your_key
COINBASE_SECRET=your_secret
```

After that you just need to run the following commands:
```shell
npm install
npm run build
npm start
```

This process will automatically build the client and set it up as the dependency for the server.

## How to develop

To develop open two terminal, you must have one running in the root and the other one running in the `client` directory. 
In both of them run `npm run dev`. This will set up the development environment.
