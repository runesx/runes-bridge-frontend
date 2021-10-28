import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withTracker from './hooks/withTracker';

// import requireAuth from './components/hoc/RequireAuth';
// import requireNotAuth from './components/hoc/RequireNotAuth';

import toggleTheme from './helpers/toggleTheme';

import Bridge from './views/Bridge';
import Home from './views/Home';
import Transactions from './views/Transactions';
import Faq from './views/Faq';
import Pool from './views/Pool';

import Operation from './views/Operation';

const RoutesX = (props) => {
  const {
    theme,
  } = props;
  useEffect(() => {
    toggleTheme(theme);
  }, [theme]);

  return (
    <Routes>
      <Route
        // exact
        path="/"
        element={<Home />}
      />
      <Route
        path="/bridge"
        element={<Bridge />}
      />
      <Route
        path="/faq"
        element={<Faq />}
      />
      <Route
        path="/transactions"
        element={<Transactions />}
      />
      <Route
        // exact
        path="/operation/:id"
        element={<Operation />}
      />
      <Route
        path="/farms"
        element={<Pool />}
      />
    </Routes>
  )
}

RoutesX.propTypes = {
  theme: PropTypes.shape({
    theme: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.theme,
})

export default connect(mapStateToProps, null)(RoutesX);
