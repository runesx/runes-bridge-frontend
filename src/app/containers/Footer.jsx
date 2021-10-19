import React from 'react';
import {
  connect,
} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
} from '@material-ui/core';
import { withTranslation } from 'react-i18next';
// import actions from 'redux-form/lib/actions';
import ThemeToggle from '../components/ThemeToggle';

const Footer = (props) => {
  const {
    t,
    error,
    loading,
  } = props;

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="infoBar footer">
      <Grid
        container
        // className="height100 d-flex justify-content-around justify-content-md-center Grid itemst-unstyled categories ng-scope"
        // ng-controller="myController"
        direction="row"
        justify="center"
        alignItems="baseline"
      >
        <Grid
          item
          xs={6}
          sm={4}
          md={2}
          align="center"
          // alignItems="center"
          // direction="row"
        >
          <ThemeToggle />
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
})

export default connect(mapStateToProps)(withTranslation()(Footer));
