import React from 'react';
import { Grid } from '@mui/material';
import CakeIcon from '../../shared/icons/CakeIcon'

const DetailsPane = ({ bottomBgSrc, children, isPancakeLinked }) => (
  <Grid container>
    {children}
  </Grid>
)

export default DetailsPane
