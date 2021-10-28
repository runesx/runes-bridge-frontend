import React from 'react';
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { Grid } from '@mui/material';
import KeyPoint from './KeyPoint'
import styles from './index.module.css'
import { convertFromUnits, hasValue } from '../../../utils/bignumbers'
import { formatWeiToNumber } from '../../../utils/formatter';

const PrimaryPane = ({ children, data }) => {
  const { active } = useWeb3React()

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        // justifyContent="center"
        align="center"
      >
        <img src={data.logo} width="72" />
      </Grid>
      <Grid
        item
        xs={12}
        align="center"
      >
        <h3 className="text-lg font-medium tracking-wider">{data.name}</h3>
      </Grid>
      <Grid
        item
        xs={12}
        align="center"
      >
        {active && hasValue(data.staked) && (
          <p
            className="text-xs font-bold text-gray-400"
            title={
              `${convertFromUnits(data.staked)
                .decimalPlaces(2, BigNumber.ROUND_DOWN)
                .toNumber()
              } ${
                data.liquidity}`
            }
          >
            {formatWeiToNumber(data.staked)}
            {' '}
            {data.liquidity}
          </p>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        align="center"
      >
        {children}
      </Grid>
      <Grid
        item
        xs={12}
        align="center"
      >
        {data.features.map((x) => (
          <KeyPoint key={x.invariant} text={x.invariant} className={x.style} />
        ))}
      </Grid>
    </Grid>
  )
}

export default PrimaryPane;
