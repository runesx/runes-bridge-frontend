import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  // TabPanel,
  // Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import * as actions from '../actions/auth';

import {
  fetchCurrentTradeIdle,
  secondTradeIdleAction,
  cancelTradeIdleAction,
} from '../actions/trade';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Home = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    console.log(textFieldValue);
    console.log('click handeled');
    // Handle Regex frontend check valid address

    //
    // dispatch(startSwapAction(textFieldValue));
  };
  const handleChangeTextField = (e) => {
    console.log(e);
    setTextFieldValue(e);
  };
  console.log('RunesX Swap View');

  useEffect(() => {
    dispatch(fetchCurrentTradeIdle());
  }, []);

  return (
    <div className="height100 content">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            style={{ width: '100%' }}
            variant="fullWidth"
          >
            <Tab
              variant="fullWidth"
              label="RUNES > wRUNES"
              {...a11yProps(0)}
            />
            <Tab
              variant="fullWidth"
              label="wRUNES > RUNES"
              {...a11yProps(1)}
            />

          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Swap RUNES to BEP20 wRUNES
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Destination Address to receive wRUNES on Binance Smart Chain
              </Typography>
              <TextField
                label="Destination Address"
                id="filled-size-normal"
                variant="filled"
                fullWidth
                onChange={(e) => handleChangeTextField(e.target.value)}
              />
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Minimum Deposit is 30 000 RUNES, Sending less through the bridge will result in loss of funds
              </Typography>
            </CardContent>
            <CardActions>
              <Grid container justify="flex-end">
                <Button
                  style={{ float: 'right' }}
                  size="large"
                  variant="contained"
                  onClick={handleClick()}
                >
                  Continue
                </Button>
              </Grid>

            </CardActions>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
    </div>
  )
}

const mapStateToProps = (state) => ({ errorMessage: state.auth.error })

export default withRouter(connect(mapStateToProps, actions)(Home));
