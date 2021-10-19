import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withTracker from './hooks/withTracker';

import AdminUser from './views/admin/AdminUser';
import AdminTradeView from './views/admin/AdminTradeView';

import requireAuth from './components/hoc/RequireAuth';
import requireNotAuth from './components/hoc/RequireNotAuth';

import toggleTheme from './helpers/toggleTheme';

import Swap from './views/Swap';
import Home from './views/Home';
import Transactions from './views/Transactions';
import Faq from './views/Faq';
import TradeInit from './views/TradeInit';
import Trade from './views/Trade';
import TradeDispute from './views/TradeDispute';
import TradeDisputeComplete from './views/TradeDisputeComplete';
import TradeRequested from './views/TradeRequested';
import TradeComplete from './views/TradeComplete';
import TradeCanceled from './views/TradeCanceled';

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
        path="/trade/init/:id"
        component={requireAuth(withTracker(TradeInit))}
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
      <Route
        exact
        path="/trade/dispute/:id"
        component={requireAuth(withTracker(TradeDispute))}
      />
      <Route
        path="/admin/trade/:id"
        exact
        component={requireAuth(withTracker(AdminTradeView))}
      />

      <Route
        path="/admin/user/:id"
        exact
        component={requireAuth(withTracker(AdminUser))}
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
