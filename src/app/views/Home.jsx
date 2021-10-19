import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  // Button,
} from '@material-ui/core';
import * as actions from '../actions/auth';


import {
  fetchCurrentTradeIdle,
  secondTradeIdleAction,
  cancelTradeIdleAction,
} from '../actions/trade';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const Home = (props) => {
  const { classes } = props;
  console.log('RunesX Home View');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cancelTradeIdleAction());
  }, []);
  useEffect(() => {
    dispatch(fetchCurrentTradeIdle());
  }, []);
  useEffect(() => {
    dispatch(secondTradeIdleAction());
  }, []);


  return (
    <div className="height100 content">
      <Grid
        container
        spacing={0}
      >
        <Grid item xs={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Total Wrapped RUNES issued
              </Typography>
              <Typography variant="h5" component="h2">
                0 RUNES
              </Typography>
            </CardContent>
          </Card>         
          
        </Grid>
        <Grid item xs={6}>
        <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Total RUNES in custody
              </Typography>
              <Typography variant="h5" component="h2">
                0 RUNES
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ errorMessage: state.auth.error })

export default withStyles(styles)(withRouter(connect(mapStateToProps, actions)(Home)));
