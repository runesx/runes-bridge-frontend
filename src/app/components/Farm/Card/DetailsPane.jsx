import React from 'react';
import { Grid } from '@mui/material';

const DetailsPane = ({ bottomBgSrc, children, isPancakeLinked }) => (
  <Grid container>
    {children}
  </Grid>
)

export default DetailsPane;
