import React, {
  useEffect,
  useState,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Tooltip,
  Select,
  FormControl,
} from '@material-ui/core';
import { withTranslation } from 'react-i18next';
// import actions from 'redux-form/lib/actions';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ExposureIcon from '@material-ui/icons/Exposure';
import { fetchOnlineDataCount } from '../actions/online';
import { fetchUserData } from '../actions/user';

import { getPrice } from '../actions';
import { updateSelectedCurrency } from '../actions/selectCurrency';
import ThemeToggle from '../components/ThemeToggle';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Footer = (props) => {
  const {
    t,
    error,
    loading,
    price,
    user,
    online,
    location,
    selectedCurrency,
  } = props;

  const dispatch = useDispatch();
  const [onlineCount, setOnlineCount] = useState('');
  const classes = useStyles();
  const [currencyState, setCurrencyState] = useState('USD');
  // const [currencyData, setCurrencyData] = useState([{ id: 1, currency: 'USD', price: 0 }]);
  const handleChange = (event) => {
    // console.log(event.currentTarget.value)
    const { value } = event.currentTarget;
    setCurrencyState(value);
    dispatch(updateSelectedCurrency(price && price.filter((object) => object.currency === value)));
  };

  useEffect(() => dispatch(fetchUserData()), [dispatch]);
  useEffect(() => dispatch(getPrice()), [dispatch]);
  useEffect(() => dispatch(fetchOnlineDataCount()), [dispatch]);

  useEffect(() => {
    console.log('update price and currencyState useffect')
    if (price) {
      console.log(currencyState);
      console.log(selectedCurrency);
    }
    if (price) {
      dispatch(updateSelectedCurrency(price.filter((object) => object.currency === currencyState)));
    }
  }, [price, currencyState]);

  useEffect(() => {
    console.log('location');
    console.log(location);
    if (location && location.currency) {
      console.log()
      setCurrencyState(location.currency.iso);
      dispatch(updateSelectedCurrency(price.filter((object) => object.currency === location.currency.iso)));
    }
  }, [location]);

  useEffect(() => {
    console.log('selectedCurrency');
    console.log(selectedCurrency);
  }, [price, user, currencyState, selectedCurrency, online]);

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
  price: state.price.data,
  online: state.online.people,
  location: state.location.data,
  selectedCurrency: state.selectedCurrency.data,
  // wallet: state.user.data.user,
  user: state.user.data,
  errorMessage: state.auth.error,
})

export default connect(mapStateToProps)(withTranslation()(Footer));
