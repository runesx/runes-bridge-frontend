import React, { useState } from 'react';
import { formatUnits } from '@ethersproject/units';
import { useEthers, useEtherBalance, useTokenBalance } from '@usedapp/core';
// import { formatEther } from '@ethersproject/units';
import {
  Button,
  // Modal,
  // Backdrop,
  // Fade,
  // TextField,
  Box,
  // Fab,
  Tooltip,
} from '@mui/material';
import { config } from '../config'

export default function ConnectButton() {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const network = 'bsc';
  const etherBalance = useEtherBalance(account);
  const tokenBalance = useTokenBalance(config[network].wRunesContract, account);
  console.log('account');
  console.log(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <>
      {account && <Button onClick={deactivate}>Disconnect</Button>}
      <div className="walletInfoWrapper">
        <div>
          {etherBalance && parseFloat(etherBalance / 1e18).toFixed(3)}
          {' '}
          BNB
        </div>
        <div>
          {tokenBalance && parseFloat(tokenBalance / 1e18).toFixed(3)}
          {' '}
          wRUNES
          {
            /*
            {account
            && `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length,
            )}`}
            */
          }

        </div>
      </div>
    </>
  ) : (
    <Button
      onClick={handleConnectWallet}
    >
      Connect to a wallet
    </Button>
  );
}
