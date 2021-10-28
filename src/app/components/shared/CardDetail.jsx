import React from 'react';
import { Grid } from '@mui/material';
import { classNames } from '../../utils/class-names'
import { InfoTooltip } from './InfoTooltip'

const CardDetail = ({
  title, value, right, tooltip,
}) => (
  <Grid item xs={6}>
    <div
      className={classNames(
        'font-bold text-xs tracking-wider text-gray-400 uppercase',
        right ? 'text-right' : '',
      )}
    >
      {title}
    </div>
    <div
      className={classNames(
        'w-full flex gap-1 justify-start items-center',
        right ? 'text-right justify-end' : '',
      )}
    >
      <div className="text-lg font-normal tracking-wider font-numbers whitespace-nowrap">
        {value}
      </div>
      {!!tooltip && (
      <InfoTooltip>
        <span>{tooltip}</span>
      </InfoTooltip>
      )}
    </div>
  </Grid>
)

export default CardDetail
