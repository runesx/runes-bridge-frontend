import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Bsc from '../assets/images/bsc.svg';
import Runebase from '../assets/images/Runebase.png';

function createData(name, calories, fat, carbs, protein) {
  return {
    name, calories, fat, carbs, protein,
  };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable(props) {
  const {
    transactions,
  } = props;
  return (
    <>
      {transactions.map((row) => (
        <Grid
          container

        >
          <Grid
            item
            xs={2}
            justify="center"
          >
            <img src={Runebase} />
          </Grid>
          <Grid
            item
            xs={8}
          >
            <div className="arrow flippedArrow">
              <div id="left">
                <div className="line" />
              </div>
              <div id="right">
                <div className="point" />
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={2}
            justify="center"
          >
            <Bsc />
          </Grid>
        </Grid>

      ))}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">txid</TableCell>
              <TableCell align="right">From</TableCell>
              <TableCell align="right">Amount (RUNES)</TableCell>
              <TableCell align="right">Confirmations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow
                key={row.runebase_tx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.runebase_tx}</TableCell>
                <TableCell align="right">{row.from}</TableCell>
                <TableCell align="right">{row.amount / 1e8}</TableCell>
                <TableCell align="right">
                  {row.confirmations}
                  {' '}
                  / 6
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
