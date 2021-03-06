import React from 'react';
import { FALLBACK_CHAIN_ID } from './constants/chains';
import BinanceEnabled from '../assets/images/binance.svg';
import BinanceDisabled from '../assets/images/binance-disabled.svg';
import Polygon from '../assets/images/polygon.svg';

export const networks = [
  {
    id: 56,
    name: 'Binance Smart Chain Network',
    displayName: 'Binance',
    shortName: 'BSC Mainnet',
    enabledIcon: <BinanceEnabled />,
    disabledIcon: <BinanceDisabled />,
    disabled: false,
  },
  {
    id: 97,
    name: 'Binance Smart Chain Test Network',
    displayName: 'Binance Testnet',
    shortName: 'BSC Testnet',
    enabledIcon: <BinanceEnabled />,
    disabledIcon: <BinanceDisabled />,
    disabled: process.env.NODE_ENV !== 'development',
  },
  {
    id: 137,
    name: 'Polygon Network',
    displayName: 'Polygon(MATIC)',
    shortName: 'MATIC',
    enabledIcon: <Polygon />,
    disabledIcon: <Polygon />,
    disabled: false,
  },
  {
    id: 80001,
    name: 'Polygon Test Network',
    displayName: 'Polygon(MATIC) Testnet',
    shortName: 'MATIC Testnet',
    enabledIcon: <Polygon />,
    disabledIcon: <Polygon />,
    disabled: process.env.NODE_ENV !== 'development',
  },
]

export const getNetwork = (networkId = FALLBACK_CHAIN_ID) => networks.find((x) => x.id === networkId);
