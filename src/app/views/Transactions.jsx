import React, {
  useEffect,
} from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  // Button,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { withRouter } from '../hooks/withRouter';
import {
  fetchTransactionsData,
} from '../actions/transactions';
import BridgeTransactionTable from '../components/BridgeTransactionTable';

const Transactions = (props) => {
  const {
    transactions,
  } = props;
  console.log('RunesX Transactions View');
  const dispatch = useDispatch();

  useEffect(() => {}, []);
  useEffect(() => dispatch(fetchTransactionsData()), [dispatch]);

  return (
    <div className="height100 content">
      <Grid container>
        <Grid item xs={12}>
          {
            transactions.data
            && transactions.data.length > 0
            && transactions.isLoading
              ? (<CircularProgress />)
              : (
                <BridgeTransactionTable
                  transactions={transactions.data ? transactions.data : []}
                />
              )
                }

        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  transactions: state.transactions,
})

export default withRouter(connect(mapStateToProps, null)(Transactions));
