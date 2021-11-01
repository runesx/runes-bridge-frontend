/* eslint-disable import/prefer-default-export */
import testnet from './pool.bsc-testnet';
import testnetMatic from './pool.matic-testnet';

import mainnet from './pool.bsc-mainnet';
import mainnetMatic from './pool.matic-mainnet';

import { FALLBACK_CHAIN_ID } from '../constants/chains'

export const getPool = (networkId = FALLBACK_CHAIN_ID) => {
  console.log('current Network ID');
  console.log(networkId);
  if (networkId === 97) {
    return testnet
  }
  if (networkId === 56) {
    return mainnet
  }
  if (networkId === 137) {
    return mainnetMatic
  }
  if (networkId === 80001) {
    return testnetMatic
  }

  return mainnet
}

// console.log(getPool(97))
