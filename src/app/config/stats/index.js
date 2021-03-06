import * as testnet from '../constants/addresses.bsc-testnet';
import * as testnetMatic from '../constants/addresses.matic-testnet'

import * as mainnet from '../constants/addresses.bsc-mainnet';
import * as mainnetMatic from '../constants/addresses.matic-mainnet'

import abis from '../abis'
import { FALLBACK_CHAIN_ID } from '../constants/chains'

export const getDiscoveryContractInfo = (networkId = FALLBACK_CHAIN_ID) => {
  if (networkId === 97) {
    return {
      address: testnet.addresses.contracts.v1.DISCOVERY,
      abi: abis.discovery,
    }
  }
  if (networkId === 56) {
    return {
      address: mainnet.addresses.contracts.v1.DISCOVERY,
      abi: abis.discovery,
    }
  }
  if (networkId === 137) {
    return {
      address: mainnetMatic.addresses.contracts.v1.QUICKDISCOVERY,
      abi: abis.quickDiscovery,
    }
  }
  if (networkId === 80001) {
    return {
      address: testnetMatic.addresses.contracts.v1.DISCOVERY,
      abi: abis.discovery,
    }
  }

  return {
    address: mainnet.addresses.contracts.v1.DISCOVERY,
    abi: abis.discovery,
  }
}

// export const getBondContractInfo = (networkId = FALLBACK_CHAIN_ID) => {
//  if (networkId === 97) {
//    return { address: testnet.addresses.contracts.v1.BOND, abi: abis.bond }
//  }
//
//  return { address: mainnet.addresses.contracts.v1.BOND, abi: abis.bond }
// }

export const getPoolContractInfo = (networkId = FALLBACK_CHAIN_ID) => {
  if (networkId === 97) {
    return { address: testnet.addresses.contracts.v1.POOL, abi: abis.pool }
  }

  if (networkId === 56) {
    return { address: mainnet.addresses.contracts.v1.POOL, abi: abis.pool }
  }

  if (networkId === 137) {
    return { address: mainnetMatic.addresses.contracts.v1.POOL, abi: abis.pool }
  }

  if (networkId === 80001) {
    return { address: testnetMatic.addresses.contracts.v1.POOL, abi: abis.pool }
  }

  return { address: mainnet.addresses.contracts.v1.POOL, abi: abis.pool }
}

export const getFarmContractInfo = (networkId = FALLBACK_CHAIN_ID) => {
  if (networkId === 97) {
    return {
      address: testnet.addresses.contracts.v1.FARM,
      abi: abis.farm,
    }
  }

  if (networkId === 56) {
    return {
      address: mainnet.addresses.contracts.v1.FARM,
      abi: abis.farm,
    }
  }

  if (networkId === 137) {
    return {
      address: mainnetMatic.addresses.contracts.v1.QUICKFARM,
      abi: abis.quickFarm,
    }
  }

  if (networkId === 80001) {
    return {
      address: testnetMatic.addresses.contracts.v1.FARM,
      abi: abis.farm,
    }
  }

  return {
    address: mainnet.addresses.contracts.v1.FARM,
    abi: abis.farm,
  }
}

export const getWRUNESToken = (networkId = FALLBACK_CHAIN_ID) => {
  if (networkId === 97) {
    return {
      address: testnet.addresses.tokens.WRUNES,
      explorer: `https://testnet.bscscan.com/token/${testnet.addresses.tokens.WRUNES}`,
      abi: abis.wrunes,
    }
  }
  if (networkId === 56) {
    return {
      address: mainnet.addresses.tokens.WRUNES,
      explorer: `https://bscscan.com/token/${mainnet.addresses.tokens.WRUNES}`,
      abi: abis.wrunes,
    }
  }

  if (networkId === 137) {
    return {
      address: mainnetMatic.addresses.tokens.WRUNES,
      explorer: `https://polygonscan.com/token/${mainnetMatic.addresses.tokens.WRUNES}`,
      abi: abis.wrunes,
    }
  }

  if (networkId === 80001) {
    return {
      address: testnetMatic.addresses.tokens.WRUNES,
      explorer: `https://mumbai.polygonscan.com/token/${testnet.addresses.tokens.WRUNES}`,
      abi: abis.wrunes,
    }
  }

  return {
    address: mainnet.addresses.tokens.WRUNES,
    explorer: `https://mumbai.polygonscan.com/token/${mainnet.addresses.tokens.WRUNES}`,
    abi: abis.wrunes,
  }
}

export const getExplorer = (networkId = FALLBACK_CHAIN_ID) => {
  if (networkId === 97) {
    return {
      name: 'BscScan',
      tx: 'https://testnet.bscscan.com/tx/%s',
      address: 'https://testnet.bscscan.com/address/%s',
      token: 'https://testnet.bscscan.com/token/%s',
    }
  }

  if (networkId === 56) {
    return {
      name: 'BscScan',
      tx: 'https://bscscan.com/tx/%s',
      address: 'https://bscscan.com/address/%s',
      token: 'https://bscscan.com/token/%s',
    }
  }

  if (networkId === 137) {
    return {
      name: 'PolygonScan',
      tx: 'https://polygonscan.com/tx/%s',
      address: 'https://polygonscan.com/address/%s',
      token: 'https://polygonscan.com/token/%s',
    }
  }

  if (networkId === 80001) {
    return {
      name: 'BscScan',
      tx: 'https://mumbai.polygonscan.com/tx/%s',
      address: 'https://mumbai.polygonscan.com/address/%s',
      token: 'https://mumbai.polygonscan.com/token/%s',
    }
  }

  return {
    name: 'polygonScan',
    tx: 'https://mumbai.polygonscan.com/tx/%s',
    address: 'https://mumbai.polygonscan.com/address/%s',
    token: 'https://mumbai.polygonscan.com/token/%s',
  }
}

export const getLinks = (networkId = FALLBACK_CHAIN_ID) => {
  if (networkId === 97) {
    return {
      tokenOnPancakeExchange:
        'https://test-exchange-pancake.pages.dev/#/swap?outputCurrency=%s',
    }
  }

  if (networkId === 56) {
    return {
      tokenOnPancakeExchange:
        'https://test-exchange-pancake.pages.dev/#/swap?outputCurrency=%s',
    }
  }

  if (networkId === 137) {
    return {
      tokenOnPancakeExchange:
        'https://test-exchange-pancake.pages.dev/#/swap?outputCurrency=%s',
    }
  }

  if (networkId === 80001) {
    return {
      tokenOnPancakeExchange:
        'https://test-exchange-pancake.pages.dev/#/swap?outputCurrency=%s',
    }
  }

  return {
    tokenOnPancakeExchange:
      'https://exchange.pancakeswap.finance/#/swap?outputCurrency=%s',
  }
}
