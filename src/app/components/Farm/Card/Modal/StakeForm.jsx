import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { Grid } from '@mui/material';
import WalletIcon from '../../../shared/icons/WalletIcon'
import { LegendToggle } from '../../../shared/icons/LegendToggle'
import NumberInputWithMax from '../../../shared/Forms/NumberInputWithMax'
import { OutlineButton } from '../../../Buttons/Outline'
import { RegularButton } from '../../../Buttons/Regular'
import { useTransactionToast } from '../../../../hooks/useTransactionToast'
import { useERC20 } from '../../../../hooks/contracts/useERC20'
import {
  convertFromUnits,
  convertToUnits,
  differenceOf,
  isGreater,
} from '../../../../utils/bignumbers'
import { useFarmOrPool } from '../../../../hooks/contracts/useFarmOrPool'
import { formatWeiToNumber } from '../../../../utils/formatter';

export const StakeContent = ({
  closeModal,
  cancelButtonRef,
  setIsPending,
  token,
  type,
  name,
  liquidity,
  totalTokensLocked,
  maxToStake,
}) => {
  const { transactionPlaced, transactionError } = useTransactionToast()
  const { account } = useWeb3React()
  const farmOrPoolInstance = useFarmOrPool()

  const erc20 = useERC20({ contract: token })

  const [amount, setAmount] = useState()
  const [confirming, setConfirming] = useState(false)
  const [balance, setBalance] = useState('0')

  useEffect(() => {
    const updateTokenBalance = async () => {
      const result = await erc20.balanceOf(account)
      setBalance(result)
    }

    updateTokenBalance()
  }, [])

  const onMax = async () => {
    setAmount(
      convertFromUnits(balance)
        .decimalPlaces(2, BigNumber.ROUND_DOWN)
        .toNumber(),
    )
  }

  const onConfirm = async () => {
    try {
      setIsPending(true)
      const tx = await farmOrPoolInstance.deposit({
        type,
        token,
        amount,
      })

      setConfirming(true)
      await transactionPlaced(tx, {
        title: name,
        feature: 'Pool Deposit',
        textPending: `Adding ${amount} ${liquidity}`,
        textSuccess: `Added ${amount} ${liquidity}`,
      })
    } catch (error) {
      transactionError(error)
    } finally {
      setConfirming(false)
      setIsPending(false)
    }

    closeModal()
  }

  const numberInputProps = {
    title: 'Amount You Wish To DEPOSIT',
    value: amount,
    onChange: (e) => setAmount(e.target.value),
    typeOfAmount: liquidity,
    onMax,
    error: isGreater(convertToUnits(amount || '0'), balance)
      ? 'Amount exceeds balance'
      : null,
  }
  return (
    <>
      <Grid container spacing={2}>
        <NumberInputWithMax {...numberInputProps} />
      </Grid>
      <Grid container spacing={2}>
        <Grid container item xs={6}>
          <Grid item xs={12}>
            <WalletIcon />
            {' '}
            Balance
          </Grid>
          <Grid item xs={12}>
            {convertFromUnits(balance)
              .decimalPlaces(2, BigNumber.ROUND_DOWN)
              .toNumber()}
            {' '}
            {liquidity}

          </Grid>

        </Grid>
        <Grid container item xs={6}>
          <Grid item xs={12}>
            Remaining in pool:
          </Grid>
          <Grid item xs={12}>
            {formatWeiToNumber(differenceOf(maxToStake, totalTokensLocked))}
            {' '}
            {liquidity}
          </Grid>
        </Grid>

        <Grid item xs={6}>
          {!confirming && (
            <OutlineButton onClick={closeModal}>Cancel</OutlineButton>
          )}
        </Grid>
        <Grid item xs={6}>
          <RegularButton
            type="submit"
            onClick={onConfirm}
            isProcessing={confirming}
          >
            {confirming ? 'Pending...' : 'Confirm'}
          </RegularButton>
        </Grid>
      </Grid>
    </>
  )
}

export const StakeFooter = ({ symbol, link }) => (
  <div className="flex justify-center font-medium mt-8">
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:text-blue-600"
    >
      Get
      {' '}
      {symbol}
      {' '}
      from PancakeSwap
    </a>
  </div>
)
