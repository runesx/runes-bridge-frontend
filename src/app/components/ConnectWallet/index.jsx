import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core'

import ConnectWalletButton from './ConnectWallet/ConnectButtonW';
import AccountMenu from './ConnectWallet/AccountMenuW';
import ConnectModal from './ConnectWallet/Modal';
import { TransactionModal } from './ConnectWallet/ViewTransactionsW';

const connectWallet = () => {
  const { active } = useWeb3React()
  const [isConnectOpen, setIsConnectOpen] = useState(false)
  const [isTransactionOpen, setIsTransactionOpen] = useState(false)

  const closeConnectModal = () => setIsConnectOpen(false)
  const openConnectModal = () => setIsConnectOpen(true)
  const connectModalProps = {
    open: isConnectOpen,
    closeModal: closeConnectModal,
  }

  const closeTransactionModal = () => setIsTransactionOpen(false)
  const openTransactionModal = () => setIsTransactionOpen(true)
  const transactionModalProps = {
    open: isTransactionOpen,
    closeModal: closeTransactionModal,
  }

  return (
    <div className="w-full p-5 flex justify-between items-center">

      {active && (
        <AccountMenu
          openConnectModal={openConnectModal}
          openTransactionModal={openTransactionModal}
        />
      )}
      {!active && <ConnectWalletButton openModal={openConnectModal} />}

      <ConnectModal {...connectModalProps} />
      <TransactionModal {...transactionModalProps} />
    </div>
  )
}

export default connectWallet;
