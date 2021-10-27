import React from 'react';
import { Trans } from '@lingui/macro';
import {
  Button,
} from '@mui/material';
import styles from './index.module.css'

const ConnectWalletButton = ({ openModal }) => (
  <div className="flex gap-4 flex-wrap justify-end">
    <Button
      className={styles.disconnected}
      onClick={openModal}
      variant="contained"
    >
      <Trans>Connect Wallet</Trans>
    </Button>
  </div>
)

export default ConnectWalletButton
