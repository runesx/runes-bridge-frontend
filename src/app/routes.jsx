import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withTracker from './hooks/withTracker';

import requireAuth from './components/hoc/RequireAuth';
import requireNotAuth from './components/hoc/RequireNotAuth';

import toggleTheme from './helpers/toggleTheme';

import Swap from './views/Swap';
import Home from './views/Home';
import Transactions from './views/Transactions';
import Faq from './views/Faq';
import TradeInit from './views/TradeInit';
import Trade from './views/Trade';
import TradeDisputeComplete from './views/TradeDisputeComplete';
import TradeRequested from './views/TradeRequested';
import TradeComplete from './views/TradeComplete';
import TradeCanceled from './views/TradeCanceled';

import Operation from './views/Operation';

const Routes = (props) => {
  const {
    theme,
  } = props;
  useEffect(() => {
    toggleTheme(theme);
  }, [theme]);

  return (
    <>
      <Route
        exact
        path="/"
        component={withTracker(Home)}
      />
      <Route
        path="/swap"
        component={withTracker(Swap)}
      />
      <Route
        path="/transactions"
        component={withTracker(Transactions)}
      />
      <Route
        path="/faq"
        component={withTracker(Faq)}
      />
      <Route
        exact
        path="/operation/:id"
        component={withTracker(Operation)}
      />
      <Route
        exact
        path="/trade/requested/:id"
        component={requireAuth(withTracker(TradeRequested))}
      />
      <Route
        exact
        path="/trade/:id"
        component={requireAuth(withTracker(Trade))}
      />
      <Route
        exact
        path="/trade/complete/:id"
        component={requireAuth(withTracker(TradeComplete))}
      />
      <Route
        exact
        path="/trade/dispute/complete/:id"
        component={requireAuth(withTracker(TradeDisputeComplete))}
      />
      <Route
        exact
        path="/trade/canceled/:id"
        component={requireAuth(withTracker(TradeCanceled))}
      />
    </>
  )
}

Routes.propTypes = {
  theme: PropTypes.shape({
    theme: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.theme,
})

export default connect(mapStateToProps, null)(Routes);
