import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import { connect, useDispatch } from 'react-redux';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  // Button,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import QRCode from 'qrcode';
// import * as actions from '../actions/auth';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { formatUnits } from '@ethersproject/units';
import Countdown from 'react-countdown';
import { useWeb3React } from '@web3-react/core'
import BridgeTransactionTable from '../components/BridgeTransactionTable';
import { withRouter } from '../hooks/withRouter';
import {
  fetchOperationAction,
  fetchOperationIdle,
} from '../actions/operations';
import {
  postAssignTxAction,
} from '../actions/assign';
import { abi } from '../abi/abi';
import { config } from '../config';
import web3 from '../helpers/web3';
import { useERC20 } from '../hooks/contracts/useERC20';
import { useWRUNESToken } from '../hooks/constants/useWRUNESToken';

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

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

function depositFunc(
  address,
  setCopySuccessful,
  copySuccessful,
) {
  let imagePath = '';
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${address}`);
    setCopySuccessful(true);
  };
  QRCode.toDataURL(address, (err, imageUrl) => {
    if (err) {
      console.log('Could not generate QR code', err);
      return;
    }
    imagePath = imageUrl;
  });
  return (
    <div>
      <Grid container>
        <Grid
          item
          xs={12}
          className="text-center"
          style={{ display: 'block' }}
        >
          <img src={imagePath} alt="Deposit QR Code" />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <div>
            <p className="text-center">Runebase Address</p>
            <div className="borderAddress">
              <p className="text-center">
                {address}
              </p>
              {
            copySuccessful
              ? (
                <p className="text-center" style={{ color: 'green' }}>
                  Copied!
                </p>
              ) : null
          }
              <Tooltip title="Copy Runebase Address" aria-label="show">
                <Button
                      // className="borderAddress copyAddressButton"
                  variant="contained"
                  color="primary"
                  fullWidth
                      // style={{ padding: 0, float: 'right' }}
                  onClick={copyToClipboard}
                >

                  <FileCopyIcon />
                  Copy
                </Button>
              </Tooltip>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

// Renderer callback with condition
const renderer = ({
  hours, minutes, seconds, completed,
}) => {
  if (completed) {
    // Render a completed state
    console.log('done');
    return <p>done</p>;
  }
  // Render a countdown
  return (
    <span>
      {hours}
      :
      {minutes}
      :
      {seconds}
    </span>
  );
};

const Operation = (props) => {
  const {
    fetchOperation,
    assignTx,
    transactions,
    location,
    classes,
    // match: {
    //  params: {
    //    id,
    //  },
    // },
  } = props;
  const { active } = useWeb3React()
  const wRunesToken = useWRUNESToken();
  const erc20 = useERC20({ contract: wRunesToken.token });

  const network = 'bsc';
  // const contract = new web3.eth.Contract(abi, config[network].wRunesContract);
  const expectedBlockTime = 1000;
  console.log('RunesX Operation View');
  const id = location.pathname.split('/')[2];
  console.log(id);
  const dispatch = useDispatch();
  const [copySuccessful, setCopySuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [burnProgress, setBurnProgress] = useState('Waiting for Action');

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.enable(); // get permission to access accounts
      console.log('window.ethereum');
      console.log(window.ethereum);
      console.log(window.ethereum.networkVersion);

      // detect Metamask account change
      window.ethereum.on('accountsChanged', (accounts) => {
        console.log('accountsChanges', accounts);
      });

      // detect Network account change
      window.ethereum.on('networkChanged', (networkId) => {
        console.log('networkChanged', networkId);
      });
    }
  }, [window.ethereum]);

  const clickBurn = async () => {
    try {
      setIsLoading(true);
      console.log('Openning Metamask');
      console.log(web3.eth.getCoinbase());

      // const totalcall = await contract.methods.totalSupply().call();
      const burnAmount = formatUnits(fetchOperation.data.amount.toString(), 8);
      console.log(burnAmount)
      // console.log(coinbaseget);
      setBurnProgress('Waiting for metamask action');
      // console.log(parseUnits(amount.toString(), 8).toString());
      const result = await erc20.customBurn(web3.utils.toWei(burnAmount), fetchOperation.data.depositAddress);
      console.log(result);
      console.log(result);
      console.log(result);
      console.log(result);
      console.log(result);
      console.log(result);
      console.log(result);
      console.log(result);
      console.log(result);
      console.log(result);
      console.log(result);
      console.log(result);
      console.log(result);
      console.log(result);
      console.log(result);
      console.log(result);

      if (result) {
        setBurnProgress('Waiting for transaction to mine');
        let receipt = null
        while (receipt == null) { // Waiting expectedBlockTime until the transaction is mined
          receipt = await web3.eth.getTransactionReceipt(result);
          await sleep(expectedBlockTime)
        }
        console.log(receipt);
        if (receipt) {
          setBurnProgress('Submitting Transaction');
          console.log('Submitting Tx');
          console.log(fetchOperation.data.uuid);
          console.log(result);
          const assignTX = await dispatch(postAssignTxAction(fetchOperation.data.uuid, result));
          // dispatch(postAssignTxAction(fetchOperation.data.uuid, result));
        } else {
          console.log('2');
          setBurnProgress('Something went wrong');
          console.log('Something went wrong.');
        }
        console.log(result);
      } else {
        console.log('3');
        setBurnProgress('Something went wrong..');
        setIsLoading(false);
        console.log(err);
      }
    } catch (err) {
      console.log('erro');
      console.error(err);
    }
  }
  useEffect(() => {
    dispatch(fetchOperationIdle());
  }, []);

  useEffect(() => {
    if (assignTx.data) {
      setBurnProgress('Swap Complete');
    }
    if (assignTx.error) {
      setBurnProgress('Something went wrong..');
    }
  }, [assignTx.data]);

  useEffect(() => {
    if (fetchOperation.data) {
      if (fetchOperation.data.amount) {
        console.log('555555555555');
        console.log('555555555555');
        console.log('555555555555');
        console.log('555555555555');
        console.log('555555555555');
        console.log('555555555555');
        console.log('555555555555');
        console.log('555555555555');
        console.log('555555555555');
        console.log('555555555555');

        console.log(Number(formatUnits(fetchOperation.data.amount.toString(), 8)));
      }
    }
  }, [fetchOperation.data]);

  useEffect(() => {
    console.log('id');
    console.log(id);
    dispatch(fetchOperationAction(id));
  }, []);

  return (
    <div className="height100 content">
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
      >
        {
        !fetchOperation.isLoading
          ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={6}
            >
              <Card className="cardBorder">
                <Card className="cardGray">
                  <Card className="cardBorderTwo">
                    <CardContent>
                      <TableContainer>
                        <Table aria-label="simple table">
                          <TableBody>
                            <TableRow
                          // key={row.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                UUID:
                              </TableCell>
                              <TableCell align="right">
                                {fetchOperation.data.uuid}
                              </TableCell>
                            </TableRow>
                            <TableRow
                          // key={row.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                Type:
                              </TableCell>
                              <TableCell align="right">
                                {
                                fetchOperation.data.type === 0
                                && (
                                <>Mint wRUNES</>
                                )
                                }
                                {
                                fetchOperation.data.type === 1
                                && (
                                <>Burn wRUNES</>
                                )
                                }

                              </TableCell>
                            </TableRow>
                            <TableRow
                          // key={row.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                To:
                              </TableCell>
                              <TableCell align="right">
                                {fetchOperation.data.address}
                              </TableCell>
                            </TableRow>
                            {
                             fetchOperation.data.type === 1
                            && (
                            <TableRow
                          // key={row.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                Amount:
                              </TableCell>
                              <TableCell align="right">
                                {Number(formatUnits(fetchOperation.data.amount.toString(), 8))}
                              </TableCell>
                            </TableRow>
                            )
}

                            <TableRow
                          // key={row.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                RUNES Fee:
                              </TableCell>
                              <TableCell align="right">
                                {
                                    fetchOperation.data.type === 0
                                    && (
                                    <>
                                      100 RUNES
                                    </>
                                    )
                                  }
                                {
                                    fetchOperation.data.type === 1
                                    && (
                                    <>
                                      FREE
                                    </>
                                    )
                                  }
                              </TableCell>
                            </TableRow>
                            <TableRow
                          // key={row.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                Time:
                              </TableCell>
                              <TableCell align="right">
                                {fetchOperation.data.time}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                  {
                    fetchOperation.data.mined === null
                    && (
                      <Grid
                        item
                        xs={12}
                        align="center"
                      >
                        <p>Bridge closing in</p>
                        <Countdown
                          date={new Date(fetchOperation.data.time).getTime() + 259200000}
                          renderer={renderer}
                        />
                      </Grid>
                    )
                  }

                  {
                    fetchOperation.data.type === 0
                    && (
                    <div>
                      <Grid
                        item
                        xs={12}
                        align="center"
                      >
                        <WarningAmberIcon
                          className="warningAmber"
                        />
                      </Grid>

                      <Typography
                        variant="subtitle1"
                        align="center"
                        className="warningColor"
                      >
                        Minimum Deposit is
                        {' '}
                        <span className="fatText">30000 RUNES</span>
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        align="center"
                        className="warningColor"
                      >
                        Sending less through the bridge will result in loss of funds
                      </Typography>
                    </div>
                    )
                  }
                  {
                    fetchOperation.data.type === 0
                    && depositFunc(
                      fetchOperation.data.depositAddress,
                      setCopySuccessful,
                      copySuccessful,
                    )
                  }

                  {
                    fetchOperation.data.type === 1
                    && fetchOperation.data.mined === null
                    && (
                      <div>
                        <Grid
                          container
                        >
                          <Grid
                            item
                            xs={12}
                          >
                            <Typography
                              variant="h6"
                              align="center"
                            >
                              {burnProgress}
                            </Typography>
                          </Grid>
                        </Grid>
                        {
                          !isLoading
                          && fetchOperation.data.mined === null
                          && !assignTx.data
                          && (
                            <Button
                              onClick={() => clickBurn()}
                              fullWidth
                              size="large"
                              variant="contained"
                              disabled={!active}
                            >
                              {
                                active
                                  ? (
                                    <>
                                      Burn
                                      {' '}
                                      {Number(formatUnits(fetchOperation.data.amount.toString(), 8))}
                                      {' '}
                                      wRUNES

                                    </>
                                  )
                                  : (
                                    <>Please Connect Wallet</>
                                  )
                              }

                            </Button>
                          )
                        }
                        {
                          isLoading
                          && fetchOperation.data.mined === null
                          /* || assignTx.data */
                          && (
                            <Grid
                              container
                            >
                              <Grid
                                item
                                xs={12}
                                align="center"
                              >

                                <CircularProgress
                                  size="100px"
                                  style={{ padding: '30px' }}
                                />

                              </Grid>
                            </Grid>
                          )
                        }

                      </div>
                    )
                  }

                  {
                    fetchOperation.data.type === 1
                    && fetchOperation.data.mined === 1
                    && (
                      <Grid
                        container
                      >
                        <Grid
                          item
                          xs={12}
                          align="center"
                        >
                          <DoneIcon
                            className="done"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                        >
                          <Typography
                            variant="h5"
                            align="center"
                          >
                            Swap Complete
                          </Typography>
                        </Grid>
                      </Grid>
                    )
                  }

                  {
                    fetchOperation.data.type === 0
                    && fetchOperation.data.mined === 1
                    && (
                      <div>
                        <p>Complete</p>
                      </div>
                    )
                  }
                  <div>
                    <BridgeTransactionTable
                      transactions={transactions.data ? transactions.data : []}
                    />
                  </div>

                </Card>

              </Card>
            </Grid>
          )
          : (
            <p>Loading</p>
          )
        }

      </Grid>
    </div>
  );
}
Operation.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // errorMessage: state.auth.error,
  fetchOperation: state.fetchOperation,
  transactions: state.transactions,
  assignTx: state.assignTx,
})

export default withStyles(styles)(withRouter(connect(mapStateToProps, null)(Operation)));
