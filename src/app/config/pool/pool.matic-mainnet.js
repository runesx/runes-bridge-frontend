import features from './features'
import abis from '../abis'
import { addresses } from '../constants/addresses.bsc-testnet'
import { convertFromUnits } from '../../utils/bignumbers';
import Quick from '../../assets/images/quick.png';
// import Bake from '../../assets/images/bake.png';

const getTokenSwapLink = (output, input) => {
  if (input) {
    return `https://test-exchange-pancake.pages.dev/#/swap?outputCurrency=${output}&inputCurrency=${input}`
  }

  return `https://test-exchange-pancake.pages.dev/#/swap?outputCurrency=${output}`
}

const getId = (str) => `137_${str}`

export default [
  {
    id: getId('0'),
    name: 'Stake QUICK Earn wRUNES',
    type: 'Farm',
    fees: {
      entry: 0,
      other: 0,
      exit: 0,
    },
    nepRewardAllocation: convertFromUnits(500000000000000000000000),
    token: {
      decimals: 18,
      address: addresses.tokens.QUICK,
      abi: abis.ierc20,
    },
    discovery: {
      address: addresses.contracts.v1.QUICKDISCOVERY,
      abi: abis.quickDiscovery,
    },
    farm: {
      address: addresses.contracts.v1.QUICKFARM,
      abi: abis.quickFarm,
    },
    features: [features.NO_FEE, features.PANCAKESWAP],
    hot: true,
    defaultPriority: 0,
    live: true,
    isLPToken: false,
    lockingPeriod: '24 hours',
    tokenSwapLink: getTokenSwapLink(addresses.tokens.QUICK),
    assets: {
      logo: Quick,
      background: '/patterns/pyramid.svg',
    },
    symbol: {
      reward: 'wRUNES',
      liquidity: 'QUICK',
    },
  },
]
