import rpcUrls from './rpcUrls'

const configured = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10)

export const FALLBACK_CHAIN_ID = configured || 56

const chains = [
  {
    networkId: 56,
    chainId: `0x${(56).toString(16)}`,
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: rpcUrls[`${56}`],
    blockExplorerUrls: ['https://bscscan.com/'],
  },
  {
    networkId: 97,
    chainId: `0x${(97).toString(16)}`,
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: rpcUrls[`${97}`],
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
  },
  {
    networkId: 137,
    chainId: `0x${(137).toString(16)}`,
    chainName: 'Polygon Matic',
    nativeCurrency: {
      name: 'Polygon',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: rpcUrls[`${137}`],
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
  {
    networkId: 80001,
    chainId: `0x${(80001).toString(16)}`,
    chainName: 'Polygon Testnet',
    nativeCurrency: {
      name: 'Polygon',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: rpcUrls[`${80001}`],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  },
]

export default chains
