import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter, useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
  // Button,
} from '@material-ui/core';
import * as actions from '../actions/auth';
import Logo from '../assets/images/logo.svg';

const styles = {
  card: {
    minWidth: 275,
    margin: '50px',
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
  const history = useHistory();
  console.log('RunesX Home View');
  const dispatch = useDispatch();

  const routeChangeSwap = () => {
    const path = 'swap';
    history.push(path);
  }

  return (
    <div className="height100 content">
      <Grid
        container
        spacing={0}
        justify="center"
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={2}
          xl={1}
        >
          <Logo />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
        >
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
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
        >
          <Card className="cardBorder">
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
        <Divider variant="middle" />

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={() => routeChangeSwap()}
          >
            Swap

          </Button>
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
