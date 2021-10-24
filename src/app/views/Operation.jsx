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

const Operation = (props) => {
  const {
    fetchOperation,
    transactions,
    location,
    classes,
    // match: {
    //  params: {
    //    id,
    //  },
    // },
  } = props;
  const network = 'bsc';
  const contract = new web3.eth.Contract(abi, config[network].wRunesContract);
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

      // console.log(coinbaseget);
      setBurnProgress('Waiting for metamask action');

      contract.methods.customBurn(
        web3.utils.toWei(fetchOperation.data.amount),
        fetchOperation.data.depositAddress, // fetchOperation.data.depositAddress, // same address
      ).send({
        from: await web3.eth.getCoinbase(),
      }, async (err, result) => {
        setBurnProgress('Verifying Transaction');
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
            const assignTX = await dispatch(postAssignTxAction(fetchOperation.data.uuid, result));
            console.log('assignTX');
            if (assignTX) { // check if status is 200 response.status == 200
              setBurnProgress('Swap Complete');
              console.log(assignTX);
            } else {
              setBurnProgress('Something went wrong');
              console.log('Something went wrong.');
            }
          } else {
            setBurnProgress('Something went wrong');
            console.log('Something went wrong.');
          }
          console.log(result);
        } else {
          setBurnProgress('Something went wrong..');
          setIsLoading(false);
          console.log(err);
        }
      });
    } catch (err) {
      console.log('erro');
      console.error(err);
    }
  }
  useEffect(() => {
    dispatch(fetchOperationIdle());
  }, []);
  useEffect(() => { }, [fetchOperation.data]);

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
                                {(fetchOperation.data.amount * 1)}
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
                    <div>
                      <p>Bridge closing in</p>
                      <p>xxxx</p>
                    </div>
                    )
}

                  {
                    fetchOperation.data.type === 0
                    && (
                    <div>
                      <Grid
                        item
                        xs={12}
                        alignItems="center"
                        justify="center"
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
                          !isLoading && (
                            <Button
                              onClick={() => clickBurn()}
                              fullWidth
                              size="large"
                              variant="contained"
                            >
                              Burn
                              {' '}
                              {(fetchOperation.data.amount * 1)}
                              {' '}
                              wRUNES
                            </Button>
                          )
                        }
                        {
                          isLoading && (
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
})

export default withStyles(styles)(withRouter(connect(mapStateToProps, null)(Operation)));
