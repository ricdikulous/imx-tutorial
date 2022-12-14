import { getEnv } from '../libs/utils';

export default {
  alchemyApiKey: getEnv('ALCHEMY_API_KEY'),
  ethNetwork: getEnv('ETH_NETWORK'),
  client: {
    publicApiUrl: getEnv('PUBLIC_API_URL'),
    starkContractAddress: getEnv('STARK_CONTRACT_ADDRESS'),
    registrationContractAddress: getEnv('REGISTRATION_ADDRESS'),
    gasLimit: getEnv('GAS_LIMIT'),
    gasPrice: getEnv('GAS_PRICE'),
  },
  // Bulk minting
  tokenId: getEnv('TOKEN_ID'),
  // Onboarding
  ownerAccountPrivateKey: getEnv('OWNER_ACCOUNT_PRIVATE_KEY'),
  collectionContractAddress: getEnv('CONTRACT_ADDRESS'),
  collectionProjectId: getEnv('PROJECT_ID'),
};
