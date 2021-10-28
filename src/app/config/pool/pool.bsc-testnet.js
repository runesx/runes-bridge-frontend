import features from './features'
import abis from '../abis'
import { addresses } from '../constants/addresses.bsc-testnet'

const getTokenSwapLink = (output, input) => {
  if (input) {
    return `https://test-exchange-pancake.pages.dev/#/swap?outputCurrency=${output}&inputCurrency=${input}`
  }

  return `https://test-exchange-pancake.pages.dev/#/swap?outputCurrency=${output}`
}

const getId = (str) => `97_${str}`

export default [
  {
    id: getId('1'),
    name: 'Cake Farm',
    type: 'Farm',
    fees: {
      entry: 0,
      other: 0,
      exit: 0,
    },
    token: {
      decimals: 18,
      address: addresses.tokens.CAKE,
      abi: abis.ierc20,
    },
    discovery: {
      address: addresses.contracts.v1.DISCOVERY,
      abi: abis.discovery,
    },
    farm: {
      address: addresses.contracts.v1.FARM,
      abi: abis.farm,
    },
    features: [features.NO_FEE, features.PANCAKESWAP],
    hot: true,
    defaultPriority: 0,
    live: true,
    isLPToken: false,
    lockingPeriod: '24 hours',
    tokenSwapLink: getTokenSwapLink(addresses.tokens.CAKE),
    assets: {
      logo: '/pools/cake.png',
      background: '/patterns/pyramid.svg',
    },
    symbol: {
      reward: 'NEP',
      liquidity: 'CAKE',
    },
  },
  {
    id: getId('2'),
    name: 'WBNB Farm',
    type: 'Pool',
    fees: {
      entry: 0.025,
      other: 0,
      exit: 0,
    },
    token: {
      decimals: 18,
      address: addresses.tokens.WBNB,
      abi: abis.ierc20,
    },
    discovery: {
      address: addresses.contracts.v1.DISCOVERY,
      abi: abis.discovery,
    },
    farm: {
      address: addresses.contracts.v1.POOL,
      abi: abis.pool,
    },
    features: [features.NEPTUNE_MUTUAL],
    hot: false,
    live: true,
    isLPToken: false,
    lockingPeriod: '24 hours',
    tokenSwapLink: getTokenSwapLink(addresses.tokens.WBNB),
    assets: {
      logo: '/pools/wbnb.png',
      background: '/patterns/scatter_polygons.svg',
    },
    symbol: {
      reward: 'NEP',
      liquidity: 'WBNB',
    },
  },
]
