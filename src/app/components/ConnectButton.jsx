import React, { useState } from 'react';
import { useEthers, useEtherBalance } from '@usedapp/core';
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
} from '@material-ui/core';

export default function ConnectButton() {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <div className="walletInfoWrapper">
      <div>
        {etherBalance && parseFloat(etherBalance / 1e18).toFixed(3)}
        {' '}
        BNB
      </div>
      <div>
        {account
            && `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length,
            )}`}
      </div>
    </div>
  ) : (
    <Button
      onClick={handleConnectWallet}
    >
      Connect to a wallet
    </Button>
  );
}
