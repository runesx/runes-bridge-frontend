import features from './features'
import abis from '../abis'
import { addresses } from '../constants/addresses.bsc-testnet'
import { convertFromUnits } from '../../utils/bignumbers';
import Cake from '../../assets/images/cake.png';
import Bake from '../../assets/images/bake.png';

const getTokenSwapLink = (output, input) => {
  if (input) {
    return `https://test-exchange-pancake.pages.dev/#/swap?outputCurrency=${output}&inputCurrency=${input}`
  }

  return `https://test-exchange-pancake.pages.dev/#/swap?outputCurrency=${output}`
}

const getId = (str) => `80001_${str}`

export default [

]
