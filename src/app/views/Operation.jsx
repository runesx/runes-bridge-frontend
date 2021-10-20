import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
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
  // Button,
} from '@material-ui/core';
import * as actions from '../actions/auth';
import {
  fetchOperation,
  fetchOperationIdle,
} from '../actions/operation';

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

const Operation = (props) => {
  const {
    classes,
    match: {
      params: {
        id,
      },
    },
  } = props;
  console.log('RunesX Home View');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOperationIdle());
  }, []);
  useEffect(() => {
    dispatch(fetchOperation(id));
  }, []);

  return (
    <div className="height100 content">
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
      >
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
                            123
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
                            123
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
                            123
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
                            123
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
                            123
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
                QR code
                Deposit ADDRESS
              </div>

              <div>
                Transactions
              </div>

            </Card>

          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
Operation.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ errorMessage: state.auth.error })

export default withStyles(styles)(withRouter(connect(mapStateToProps, actions)(Operation)));
