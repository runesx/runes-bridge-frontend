import React, { useState } from 'react';

import {
  Grid,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { classNames } from '../../../utils/class-names'
import { useTransactionToast } from '../../../hooks/useTransactionToast'
import { convertFromUnits } from '../../../utils/bignumbers'
import { CounterAnimation } from '../../shared/CounterAnimation'
import { useFarmOrPool } from '../../../hooks/contracts/useFarmOrPool'
import { OutlineButton } from '../../Buttons/Outline';

const Harvest = ({ data }) => {
  const [pending, setIsPending] = useState(false)

  const { transactionPlaced, transactionError } = useTransactionToast()
  const farmOrPool = useFarmOrPool()

  const rewardAmount = convertFromUnits(data.rewards)
    .decimalPlaces(6)
    .toNumber()

  const onHarvest = async () => {
    try {
      setIsPending(true)
      const tx = await farmOrPool.withdrawRewards({
        type: data.type,
        token: data.token,
      })

      await transactionPlaced(tx, {
        title: data.name,
        feature: 'Harvest',
        textPending: `Harvesting ${rewardAmount} ${data.rewardSymbol}`,
        textSuccess: `Harvested ${rewardAmount} ${data.rewardSymbol}`,
      })
      setIsPending(false)
    } catch (error) {
      transactionError(error)
      setIsPending(false)
    }
  }

  return (
    <>
      <Grid container item xs={6}>
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            className="underlineText"
            gutterBottom
            component="div"
          >
            Claimable Reward
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            gutterBottom
          >
            <CounterAnimation value={rewardAmount} />
            {' '}
            {data.rewardSymbol}
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <OutlineButton isProcessing={pending} onClick={onHarvest} large>
          Harvest
        </OutlineButton>

      </Grid>
    </>

  )
}

export default Harvest
