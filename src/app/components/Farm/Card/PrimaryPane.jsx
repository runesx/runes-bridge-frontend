import React from 'react';
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
// import KeyPoint from './KeyPoint'
// import styles from './index.module.css'
import { convertFromUnits, hasValue } from '../../../utils/bignumbers'
import { formatWeiToNumber } from '../../../utils/formatter';

const PrimaryPane = ({ children, data }) => {
  const { active } = useWeb3React();
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  console.log('data');

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        // justifyContent="center"
        align="center"
      >
        <img src={data.logo} width="72" alt={data.name} />
      </Grid>
      <Grid
        item
        xs={12}
        align="center"
      >
        <Typography variant="h6">
          {data.name}
        </Typography>
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
                .decimalPlaces(8, BigNumber.ROUND_DOWN)
                .toNumber()
              } ${
                data.liquidity}`
            }
          >
            {convertFromUnits(data.staked)
              .decimalPlaces(8, BigNumber.ROUND_DOWN)
              .toNumber()}
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
      {
        /*
        <Grid
        item
        xs={12}
        align="center"
      >
        {data.features.map((x) => (
          <KeyPoint key={x.invariant} text={x.invariant} className={x.style} />
        ))}
      </Grid>
        */
      }

    </Grid>
  )
}

export default PrimaryPane;
