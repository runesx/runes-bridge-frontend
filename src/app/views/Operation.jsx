import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import { withRouter } from 'react-router-dom';
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
import QRCode from 'qrcode';
// import * as actions from '../actions/auth';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {
  fetchOperationAction,
  fetchOperationIdle,
} from '../actions/operations';
import {
  postAssignTxAction,
} from '../actions/assign';
import { abi } from '../abi/abi'
import web3 from '../helpers/web3';

const contractAddress = '0xD1C2F16f8d0B08780d4792624E1342Aa505a8674';
const contract = new web3.eth.Contract(abi, contractAddress);

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
    classes,
    match: {
      params: {
        id,
      },
    },
  } = props;
  console.log('RunesX Home View');
  const dispatch = useDispatch();
  const [copySuccessful, setCopySuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [burnProgress, setBurnProgress] = useState('Waiting for Action...');

  const postAssignTx = (uuid, tx) => {
    console.log(uuid);
    console.log(tx);
    console.log('Submit Tx ID')
  }

  const clickBurn = async () => {
    try {
      setIsLoading(true);
      console.log('Openning Metamask');
      console.log(web3.eth.getCoinbase());

      // const totalcall = await contract.methods.totalSupply().call();

      // console.log(coinbaseget);

      contract.methods.customBurn(
        web3.utils.toWei(fetchOperation.data.amount),
        fetchOperation.data.depositAddress, // fetchOperation.data.depositAddress, // same address
      ).send({
        from: await web3.eth.getCoinbase(),
      }, async (err, result) => {
        setBurnProgress('Verifying Transaction');
        console.log('ffffffffffffffffffff');
        if (result) {
          console.log(result);

          console.log('Submitting Tx');
          const assignTX = await postAssignTxAction(fetchOperation.data.uuid, result);
          console.log('assignTX');
          if (assignTX) { // check if status is 200 response.status == 200
            setBurnProgress('Swap Complete');
            console.log(assignTX);
          } else {
            console.log('Something went wrong.');
          }
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

  useEffect(() => {
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
    console.log('id');
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
                  <div>Bridge Open</div>
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
                                {fetchOperation.data.type}
                                Mint wRUNES
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
                            <TableRow
                          // key={row.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                Amount:
                              </TableCell>
                              <TableCell align="right">
                                {fetchOperation.data.amount}
                              </TableCell>
                            </TableRow>
                            <TableRow
                          // key={row.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                Fee:
                              </TableCell>
                              <TableCell align="right">
                                100 RUNES
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
                  <div>
                    <p>Bridge closing in</p>
                    <p>xxxx</p>
                  </div>
                  {
                    fetchOperation.data.type === 0
                    && (
                    <div>
                      Warning!!
                      Minimum Deposit is 30 000 RUNES, Sending less through the bridge will result in loss of funds
                    </div>
                    )
                  }

                  {
                    fetchOperation.data.type === 1
                    && (
                      <div>
                        <p>
                          {burnProgress}
                        </p>
                        {
                          !isLoading && (
                            <Button
                              onClick={() => clickBurn()}
                              fullWidth
                            >
                              Burn
                              {' '}
                              {fetchOperation.data.amount}
                              {' '}
                              wRUNES
                            </Button>
                          )
                        }
                        {
                          isLoading && (
                            <Box sx={{ display: 'flex' }}>
                              <CircularProgress />
                            </Box>
                          )
                        }

                      </div>
                    )
                  }

                  {
                    fetchOperation.data.type === 0
                    && (
                      <div>
                        Transactions
                      </div>
                    )
                  }

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
})

export default withStyles(styles)(withRouter(connect(mapStateToProps, null)(Operation)));
