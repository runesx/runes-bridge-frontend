/* eslint-disable import/prefer-default-export */
import React, { useEffect } from 'react';
import Tippy from '@tippyjs/react'
import { useWeb3React } from '@web3-react/core'
import { Button } from '@mui/material';
import { classNames } from '../../../utils/class-names'
import { hasValue } from '../../../utils/bignumbers'
import { useTransactionToast } from '../../../hooks/useTransactionToast'
import { useERC20 } from '../../../hooks/contracts/useERC20';

export const ApproveToSpend = ({ data }) => {
  const { transactionPlaced, transactionError } = useTransactionToast()
  const { active } = useWeb3React();
  const erc20 = useERC20({ contract: data.token });
  console.log('ApproveToSpend');
  console.log('ApproveToSpend');
  console.log('ApproveToSpend');
  console.log('ApproveToSpend');
  console.log('ApproveToSpend');
  console.log('ApproveToSpend');
  console.log('ApproveToSpend');
  console.log('ApproveToSpend');
  console.log('ApproveToSpend');
  console.log('ApproveToSpend');
  console.log('ApproveToSpend');
  console.log(data.token);
  console.log(data.farm);
  console.log(erc20);
  console.log(active);
  console.log(data.isLive);

  useEffect(() => {

  }, [active]);

  const enabled = active && data.isLive
  const msg = active ? 'Coming soon' : 'Please connect your wallet'

  if (hasValue(data.allowance)) {
    return null
  }

  const onApprove = async () => {
    if (!enabled) {
      return
    }

    try {
      console.log('await approve spending');
      console.log('await approve spending');
      console.log('await approve spending');
      console.log('await approve spending');
      console.log('await approve spending');
      console.log('await approve spending');
      console.log('await approve spending');
      console.log('await approve spending');
      console.log('await approve spending');
      console.log('await approve spending');
      console.log('await approve spending');
      console.log('await approve spending');
      console.log('await approve spending');
      console.log('await approve spending');
      console.log('await approve spending');
      console.log(data);
      const tx = await erc20.approve({
        spender: data.farm,
      })
      console.log('1233');

      await transactionPlaced(tx, {
        title: data.name,
        feature: 'Pool Approve',
        textPending: `Approving to spend ${data.liquidity}`,
        textSuccess: `Approved to spend ${data.liquidity}`,
      })
    } catch (error) {
      transactionError(error)
    }
  }

  return (
    <Tippy
      content={<span>{msg}</span>}
      interactive
      disabled={enabled}
      animation="perspective"
    >
      <span tabIndex="0">
        <Button
          variant="contained"
          onClick={onApprove}
          disabled={!enabled}
        >
          Approve
        </Button>
      </span>
    </Tippy>
  )
}
