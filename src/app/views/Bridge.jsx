import React, {
  useEffect,
  useState,
} from 'react';
import { connect, useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
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
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { withRouter } from '../hooks/withRouter';
// import * as actions from '../actions/auth';
import web3 from '../helpers/web3';

import {
  startSwapAction,
  idleStartSwapAction,
} from '../actions/swap';

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

const Bridge = (props) => {
  console.log('RunesX Swap View');
  const { startSwap } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [amountValue, setAmountValue] = useState(0);
  const { active } = useWeb3React();

  useEffect(() => {
  }, [active]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (typeSwap) => {
    const acc = web3.currentProvider.selectedAddress;
    dispatch(startSwapAction(textFieldValue, acc, amountValue, typeSwap));
  };

  const handleChangeTextField = (e) => {
    console.log(e);
    setTextFieldValue(e);
  };
  const handleChangeAmount = (e) => {
    console.log(e);
    setAmountValue(e);
  };

  useEffect(() => {
    console.log('idle');
    dispatch(idleStartSwapAction());
  }, []);

  useEffect(() => {
  }, [startSwap]);

  useEffect(() => {
    if (startSwap.data && startSwap.data.uuid) {
      console.log('useeffect l');
      console.log(startSwap.data);
      navigate(`/operation/${startSwap.data.uuid}`);
    }
  }, [startSwap.data]);

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
              <Grid container justifyContent="flex-end">
                {startSwap.isLoading ? (
                  <div>Loading</div>
                ) : (
                  <Button
                    style={{ float: 'right' }}
                    size="large"
                    variant="contained"
                    onClick={() => handleClick(0)}
                  >
                    Continue
                  </Button>
                )}

              </Grid>

            </CardActions>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Card sx={{ minWidth: 275 }}>
            {active && (
              <>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Swap BEP20 wRUNES to native RUNES
                  </Typography>
                  <TextField
                    id="outlined-number"
                    label="Amount"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    fullWidth
                    style={{
                      marginBottom: '15px',
                    }}
                    onChange={(e) => handleChangeAmount(e.target.value)}
                  />
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Destination Address to receive RUNES on Runebase
                  </Typography>
                  <TextField
                    label="Destination Address"
                    id="filled-size-normal"
                    variant="filled"
                    fullWidth
                    onChange={(e) => handleChangeTextField(e.target.value)}
                  />

                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Minimum burn is 100 wRUNES, Sending less through the bridge will result in loss of funds
                  </Typography>
                </CardContent>
                <CardActions>
                  <Grid container justifyContent="flex-end">
                    {startSwap.isLoading ? (
                      <div>Loading</div>
                    ) : (
                      <Button
                        style={{ float: 'right' }}
                        size="large"
                        variant="contained"
                        onClick={() => handleClick(1)}
                      >
                        Continue
                      </Button>
                    )}

                  </Grid>

                </CardActions>
              </>
            )}
            {!active && (
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Please Connect to wallet

                </Typography>
              </CardContent>
            )}

          </Card>
        </TabPanel>
      </Box>

    </div>
  );
}

const mapStateToProps = (state) => ({
  startSwap: state.startSwap,
});

export default withRouter(connect(mapStateToProps, null)(Bridge));
