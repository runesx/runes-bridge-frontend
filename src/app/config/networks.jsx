import React, { useCallback } from 'react'
import { FALLBACK_CHAIN_ID } from './constants/chains';
import BinanceEnabled from '../assets/images/binance.svg';
import BinanceDisabled from '../assets/images/binance-disabled.svg';

export const networks = [
  {
    id: 56,
    name: 'Binance Smart Chain Network',
    displayName: 'Binance',
    shortName: 'BSC Mainnet',
    enabledIcon: <BinanceEnabled />,
    disabledIcon: <BinanceDisabled />,
    disabled: true,
  },
  {
    id: 97,
    name: 'Binance Smart Chain Test Network',
    displayName: 'Binance Testnet',
    shortName: 'BSC Testnet',
    enabledIcon: <BinanceEnabled />,
    disabledIcon: <BinanceDisabled />,
    disabled: false,
  },
]

export const getNetwork = (networkId = FALLBACK_CHAIN_ID) => networks.find((x) => x.id === networkId)
