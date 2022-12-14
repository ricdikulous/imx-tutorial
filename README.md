# Overview

This document will get you up and running with a ERC-721 asset contract on IMX. It's broken down into 3 key steps.
1. Deploy your smart contract to Ethereum
2. Configure your smart contract on IMX
3. Mint your tokens on IMX

# Deploy your smart contract

## 1. Install the dependancies 
You will need npm and nodejs installed in order to complete this tutorial. If you haven't already you can learn about installing npm [here.](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

```sh
npm install
``` 

## 2. Copy env file
Make a copy of the `.env.example` file and rename the file to `.env`.
```sh
cp .env.example .env
```
## 3. Setup your Ethereum account
In order to complete this tutororial you will need a valid Ethereum account that consists of an `address` and `private key`. If you are not comfortable with using one of your existing accounts you can easily create one with the command below.

```sh
npm run generate-new-eth-account
```
Add them to the `.env`
- `CONTRACT_OWNER_ADDRESS`
- `OWNER_ACCOUNT_PRIVATE_KEY`

## 4. Setup provider API keys

### Etherscan
You need an Etherscan API key so that you can verify your contract after it has been deployed. Verifying a contract means making its source code public, along with the compiler settings you used, which allows anyone to compile it and compare the generated bytecode with the one that is deployed on-chain.

To get an API key from Etherscan you need to, [go to their site](https://etherscan.io/myapikey), sign in (or create an account if you don't have one) and open the "API Keys" tab. Then click the "Add" button and give a name to the API key you are creating. After that you'll see the newly created key in the list. Then add it to the `.env` file.
- `ETHERSCAN_API_KEY`

### Alchemy
You will need an Alchemy API key in order to deploy your contract to the Ethereum Goerli testnet. We use Alchemy to communicate with the Ethereum chain without having to run our own nodes. 
- `ALCHEMY_API_KEY`
    - which you will need to make an account with [Alchemy.](https://dashboard.alchemy.com/)


## 5. Update contract details
[Optional] Update the name and the symbol of the contract in the `.env` file before you deploy. 

- `CONTRACT_NAME`
- `CONTRACT_SYMBOL`


## 6. Get some Goerli Eth
To deploy your smart contract to the Goerli testnet you will need to add some Goerli Eth to your account. You can do this using a faucet that has been setup by Alchemy: 

[https://goerlifaucet.com/](https://goerlifaucet.com/). 

Note: In order to receive Goerli Eth from this faucet you will need to login to the Alchemy account that you created in the previous step.

## 7. Deploy the contract
Under the hood the comand below will use Hardhat to deploy an ImmutableX compatible ERC-721 contract to the Goerli testnet.
```sh
npm run deploy-contract
```

# Setup your Smart contract in IMX

## 1. Update env with contract address
Copy the `Deployed Contract Address` contract address from the console from the previous step you completed and add it to the `.env`
- `CONTRACT_ADDRESS`

## 2. Register as a user with Immutable X

ImmutableX provide an authentication service to protect your administrative level assets from being accessed or updated by someone else. This is done using a simliar technique as described [here](https://link.medium.com/CVTcj7YfQkb).

In order to use services like creating a project or collection, you will first need to register as an ImmutableX user. This is done by setting up an account using the private key from the wallet account you would like to specify as the owner of the project.

Run the following script:

```sh
npm run user-registration
```

## 3. Create project

Update the values in the `.env` file with the values of the project you want to create.

- `PROJECT_NAME`
- `PROJECT_COMPANY_NAME`
- `PROJECT_EMAIL`

Once updated, run the following script to create your project:

```sh
npm run create-project
```

On completion, the script will log the PROJECT_ID of the created project. Save this PROJECT_ID for use in the next step.

## 4. Add a collection

A collection refers to the smart contract that you have deployed. Minted assets belong to a collection. In order to mint assets on L2
you must first register your collection (smart contract) with ImmutableX.

Make sure you set `PROJECT_ID` to the project ID you created with `create-project` step

Then update the values in the `.env` file with the values of the collection you want to create.

- `COLLECTION_NAME`
- `COLLECTION_DESCRIPTION`
- `COLLECTION_ICON_URL`
- `COLLECTION_IMAGE_URL`


```sh
npm run create-collection
```
If you see a `replacement transaction underpriced` error message when trying to run `create-collection` please try again in 5 minutes.

# Minting assets

Set the `TOKEN_ID` in the `.env` to the latest incremented index.

This will mint a token on ImmutableX to the wallet address that you specify in the command. To view the NFT you will need to navigate to the [ImmutableX sandbox marketplace](https://market.sandbox.immutable.com/) and login with the wallet that you sent the NFT to. From there you will need to click my assets.

It is worth noting that you can only send ImmutableX NFTs to wallets that are registered with ImmutableX. The wallet you used to do this tutorial was registered above.

To mint:

```sh
npm run mint -- -w <TO_WALLET_ADDRESS>
```

**-w** - _the wallet you wish to mint your NFTs to_

---


# Common Errors
```sh
Error: insufficient funds for intrinsic transaction cost [ See: https://links.ethers.org/v5-errors-INSUFFICIENT_FUNDS ] (error={"name":"ProviderError","code":-32000,"_isProviderError":true}, 
...
 {
  reason: 'insufficient funds for intrinsic transaction cost',
  code: 'INSUFFICIENT_FUNDS',
  error: ProviderError: insufficient funds for gas * price + value
    ...
  method: 'sendTransaction',
  transaction: undefined
}
```


# Immutable X Contracts

## Installation: 

```
npm install @imtbl/imx-contracts
``` 

or 

```
yarn add @imtbl/imx-contracts
```

## Immutable Contract Addresses

| Environment/Network       | Core (StarkEx Bridge) Contract                                                                                                | User Registration Contract                                                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Sandbox (Goerli)**      | [0x7917edb51ecd6cdb3f9854c3cc593f33de10c623](https://goerli.etherscan.io/address/0x7917eDb51ecD6CdB3F9854c3cc593F33de10c623)  | [0x1c97ada273c9a52253f463042f29117090cd7d83](https://goerli.etherscan.io/address/0x1C97Ada273C9A52253f463042f29117090Cd7D83)  |
| **Production (Mainnet)**  | [0x5fdcca53617f4d2b9134b29090c87d01058e27e9](https://etherscan.io/address/0x5FDCCA53617f4d2b9134B29090C87D01058e27e9)         | [0x72a06bf2a1CE5e39cBA06c0CAb824960B587d64c](https://etherscan.io/address/0x72a06bf2a1CE5e39cBA06c0CAb824960B587d64c)         |

## Setup

You will need an Ethereum wallet private key to deploy contracts. This can be your own private key or you can use the `scripts/generateRandomKey.ts` script to generate a new random Ethereum private key and address for use with this repo with the following command:

```sh
yarn generate-random-key
```

Also required are API keys for [Alchemy](https://www.alchemy.com/) and [Etherscan](https://etherscan.io/) to deploy contracts from this repo.

1. Make a copy of the `.env.example` file and rename the file to `.env`.
2. Add private keys and API keys to the `.env` file.

**Note:** All the environment variables in `.env` need a value or hardhat will throw an error.

# L2 Minting

Immutable X is the only NFT scaling protocol that supports minting assets on L2, and having those assets be trustlessly withdrawable to Ethereum L1. To enable this, before you can mint on L2, you need to deploy an IMX-compatible ERC721 contract as the potential L1 home for these assets. Luckily, making an ERC721 contract IMX-compatible is easy!

### No Code Usage (Test Environment Only)

In the test environment, deploying an ERC721 contract which is compatible with Immutable X is extremely easy. First, update the `.env` file, setting:

- `OWNER_ACCOUNT_ADDRESS`
- `CONTRACT_NAME`
- `CONTRACT_SYMBOL`
- `ETHERSCAN_API_KEY`
  - which can be obtained from [your Etherscan account.](https://etherscan.io/myapikey)

Then, just run `yarn hardhat run deploy/asset.ts --network sandbox`.

### Basic Usage

If you're starting from scratch, simply deploy a new instance of `Asset.sol` and you'll have an L2-mintable ERC721 contract. Set the `_imx` parameter in the contract constructor to either the `Sandbox` or `Production` addresses as above.

If you already have an ERC721 contract written, simply add `Mintable.sol` as an ancestor, implement the `_mintFor` function with your internal mint function, and set up the constructor as above:

```
import "@imtbl/imx-contracts/contracts/Mintable.sol";

contract YourContract is Mintable {

    constructor(address _imx) Mintable(_imx) {}

    function _mintFor(
        address to,
        uint256 id,
        bytes calldata blueprint
    ) internal override {
        // TODO: mint the token using your existing implementation
    }

}
```

### Advanced Usage

To enable L2 minting, your contract must implement the `IMintable.sol` interface with a function which mints the corresponding L1 NFT. This function is `mintFor(address to, uint256 quantity, bytes mintingBlob)`. Note that this is a different function signature to `_mintFor` in the previous example. The "blueprint" is the immutable metadata set by the minting application at the time of asset creation. This blueprint can store the IPFS hash of the asset, or some of the asset's properties, or anything a minting application deems valuable. You can use a custom implementation of the `mintFor` function to do whatever you like with the blueprint.

Your contract also needs to have an `owner()` function which returns an `address`. You must be able to sign a message with this address, which is used to link this contract your off-chain application (so you can authorise L2 mints). A simple way to do this is using the OpenZeppelin `Ownable` contract (`npm install @openzeppelin/contracts`).

```
import "@imtbl/imx-contracts/contracts/Mintable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract YourContract is IMintable, Ownable {

    function mintFor(
        address to,
        uint256 quantity,
        bytes calldata mintingBlob
    ) external override {
        // TODO: make sure only Immutable X can call this function
        // TODO: mint the token!
    }

}
```

`Registration.sol` & `IMX.sol` is for reference purposes if you choose to offer these functions in your own smart contracts and is not required if you only want to deploy an ERC721.


### Manually verifying registration contract

First, deploy to sandbox as described in the [L2 Minting](#l2-minting) section. Change to mainnet if required.

Verification with Etherscan should happen automatically within a few minutes of contract deployment, but if it fails you can run it manually, e.g.

```
yarn hardhat verify --network <network> <address> <args used in deployment>
```

### Generating Typescript Types

Run `yarn compile`. The output can be found in the `artifacts/typechain` folder.
