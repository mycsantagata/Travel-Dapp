# Travel Dapp

Travel Dapp is a decentralised application (DApp) that offers users the ability to book travel using Ethereum blockchain technology.
The main objective of Travel Dapp is to provide a secure, transparent and decentralised travel booking experience, eliminating the need for traditional intermediaries such as travel agencies or centralised booking platforms.

***Attention: the platform supports the Sepolia testnet! In order to test dapp, you can receive a sum of test tokens from [here](https://www.alchemy.com/faucets/ethereum-sepolia). You also need a wallet to be able to connect to dapp and make transactions***

## Technologies

This project is built using :
+ React
+ Vite
+ TypeScript
+ React Bootstrap
+ Wagmi

## Installation and Configuration

To initialize the project, you need to have NodeJS installed on your computer. After downloading the project, 
navigate to the project directory in your terminal and run the following command:
```
npm install
```
This will download all the dependencies.


Before starting the project locally, environment variables must be configured:

+ Create the **".env.local"** file in the root directory.
  
+ Add the following environment variables.

```
VITE_WC_PROJECT_ID=
VITE_WC_ADDRESS_TO=
```
+ If you are not already registered, sign up for WalletConnect at this [link](https://cloud.walletconnect.com/sign-in), create a project in the 'Projects' section, now that you have your **Project ID** paste it into the first environment variable.
  
+ In the second variable paste the address of the Wallet to which the payment of all transactions made on the platform should be sent.

## Structure
+ **Login**: Users can access the platform using MetaMask or WalletConnect.
  
+ **Viewing wallet balance**: Once logged in, users can view their Ethereum wallet balance directly from the app.
  
+ **Exploring available travel**: Users can explore a wide range of available travel options.
  
+ **Booking trips**: Users can book their favourite trips directly from the app, paying in Ethereum.


## Web Reference
Direct Link: [link](https://travel-dapp-neon.vercel.app/)
