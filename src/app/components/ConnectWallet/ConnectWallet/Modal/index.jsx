import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useWeb3React } from '@web3-react/core';
import { Trans } from '@lingui/macro';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { networks } from '../../../../config/networks'
import { wallets } from '../../../../config/wallets'
import SelectNetwork from './SelectNetwork'
import SelectWallet from './SelectWallet'
import useAuth from '../../../../hooks/useAuth'
import { classNames } from '../../../../utils/class-names';

const Content = ({ closeModal }) => {
  const { active } = useWeb3React()
  const { login, logout } = useAuth()

  const [networkId, setNetworkId] = useState()
  const [walletId, setWalletId] = useState()

  const onConnect = () => {
    if (!networkId || !walletId) {
      return
    }

    if (active) {
      logout()
    }

    const wallet = wallets.find((x) => x.id === walletId)
    const { connectorName } = wallet

    login(connectorName, networkId)
    closeModal()
  }

  return (
    <div>
      <SelectNetwork
        networks={networks}
        selected={networkId}
        setSelected={setNetworkId}
      />
      <SelectWallet
        networkId={networkId}
        wallets={wallets}
        selected={walletId}
        setSelected={setWalletId}
      />

      <Button
        onClick={onConnect}
        variant="contained"
        fullWidth
      >
        Connect
      </Button>
    </div>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ConnectModal = ({ open, closeModal }) => (
  <Modal open={open} onClose={closeModal}>
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        <Trans>Connect Wallet</Trans>
      </Typography>
      <Content closeModal={closeModal} />
    </Box>
  </Modal>
)

export default ConnectModal
