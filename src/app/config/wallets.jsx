/* eslint-disable import/prefer-default-export */
import React from 'react'
import {
  // getBscConnector,
  getInjectedConnector,
  // getWalletConnect,
} from '../utils/blockchain/connectors';
import { ConnectorNames } from './connectors'
import MetaMaskLogoEnabled from '../assets/images/metamask.svg';
import MetaMaskLogoDisabled from '../assets/images/metamask-disabled.svg';

export const wallets = [
  {
    id: '1',
    name: 'MetaMask',
    enabledIcon: <MetaMaskLogoEnabled />,
    disabledIcon: <MetaMaskLogoDisabled />,
    connector: getInjectedConnector,
    connectorName: ConnectorNames.Injected,
  },
  /*
  {
    id: '2',
    name: 'Binance Chain',
    enabledIcon: '/networks/injected-binance.svg',
    disabledIcon: '/networks/injected-binance-disabled.svg',
    connector: getBscConnector,
    connectorName: ConnectorNames.BSC,
  },
  {
    id: '3',
    name: 'WalletConnect',
    enabledIcon: '/networks/wallet-connect.svg',
    disabledIcon: '/networks/wallet-connect-disabled.svg',
    connector: getWalletConnect,
    connectorName: ConnectorNames.WalletConnect,
  },
  */
]
