/* eslint-disable */
const blockchain = {
  testnet: {
    bsc: {
      networkName: 'Binance Smart Chain Testnet',
      name: 'bsc',
      networkId: '97',
      rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      currencySymbol: 'BNB',
      blockExplorer: 'https://testnet.bscscan.com',
      wRunesContract: '0xFeD75cFb632C6Fd2125EC26Eec3b6f53a86Fc522',
    },
    matic: {
      networkName: '',
      name: 'matic',
      networkId: '',
      rpcUrl: '',
      currencySymbol: '',
      blockExplorer: '',
      wRunesContract: '',
    },
  },
  mainnet: {
    bsc: {
      networkName: 'Binance Smart Chain ',
      name: 'bsc',
      networkId: '56',
      rpcUrl: 'https://bsc-dataseed.binance.org/',
      currencySymbol: 'BNB',
      blockExplorer: 'https://bscscan.com',
      wRunesContract: '',
    },
    matic: {
      networkName: '',
      name: 'matic',
      networkId: '',
      rpcUrl: '',
      currencySymbol: '',
      blockExplorer: '',
      wRunesContract: '',
    },
  },
};

export const config = process.env.NODE_ENV === 'production' ? blockchain.mainnet : blockchain.testnet;