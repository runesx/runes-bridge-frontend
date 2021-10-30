import React from 'react';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
// import { classNames } from '../../utils/class-names'
import { InfoTooltip } from './InfoTooltip';

const CardDetail = ({
  title,
  value,
  right,
  tooltip,
}) => (
  <Grid item xs={6}>
    <Typography
      variant="subtitle2"
      gutterBottom
      component="div"
      className="underlineText"
    >
      {title}
    </Typography>
    <Typography variant="body1" gutterBottom>
      {value}
    </Typography>

    {!!tooltip && (
      <InfoTooltip>
        <span>{tooltip}</span>
      </InfoTooltip>
    )}
  </Grid>
)

export default CardDetail
