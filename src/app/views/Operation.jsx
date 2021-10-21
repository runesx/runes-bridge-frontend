import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import FileCopyIcon from '@material-ui/icons/FileCopy';
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
} from '@material-ui/core';
import QRCode from 'qrcode';
import * as actions from '../actions/auth';
import {
  fetchOperationAction,
  fetchOperationIdle,
} from '../actions/operations';

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
        justify="center"
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
                    Bridge closing in: xxxx minutes
                  </div>
                  <div>
                    Warning!!
                    Minimum Deposit is 30 000 RUNES, Sending less through the bridge will result in loss of funds
                  </div>
                  <div>
                    Deposit Address:
                    {
                  depositFunc(
                    fetchOperation.data.depositAddress,
                    setCopySuccessful,
                    copySuccessful,
                  )
                }
                  </div>

                  <div>
                    Transactions
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
  )
}
Operation.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  fetchOperation: state.fetchOperation,
})

export default withStyles(styles)(withRouter(connect(mapStateToProps, actions)(Operation)));
