import features from './features'
import abis from '../abis'
import { addresses } from '../constants/addresses.bsc-mainnet'
import { convertFromUnits } from '../../utils/bignumbers'

const getTokenSwapLink = (output, input) => {
  const baseUrl = 'https://exchange.pancakeswap.finance/#/swap'
  if (input) {
    return `${baseUrl}?outputCurrency=${output}&inputCurrency=${input}`
  }

  return `${baseUrl}?outputCurrency=${output}`
}

const getId = (str) => `56_${str}`

export default [
  {
    id: getId('0'),
    name: 'Cake Farm',
    type: 'Farm',
    fees: {
      entry: 0,
      other: 0,
      exit: 0,
    },
    nepRewardAllocation: convertFromUnits(500000000000000000000000),
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
      reward: 'WRUNES',
      liquidity: 'CAKE',
    },
  },
]
