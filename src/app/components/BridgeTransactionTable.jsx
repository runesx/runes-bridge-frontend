import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import dateFormat, { masks } from 'dateformat';

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
            <a href={`https://explorer.runebase.io/tx/${row.runebase_tx}`}>
              <img
                src={Runebase}
                alt="Runebase Logo"
              />
            </a>
          </Grid>
          <Grid
            item
            xs={8}
          >
            <div className="wrapperArrow">
              <div
                className="confirmationsCell"
              >
                {row.confirmations}
                /
                6
              </div>
              <div
                className="amountCell"
              >
                {row.amount}
                {' '}
                RUNES
              </div>
              <div
                className="dateCell"
              >
                {dateFormat(row.createdAt)}
              </div>
              <div className="innerWrapperArrow">
                <div className={`arrow ${row.instance.type === 1 ? 'flippedArrow' : ''}`}>
                  <div id="left">
                    <div className="line" />
                  </div>
                  <div id="right">
                    <div className="point" />
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={2}
            alignItems="center"
          >
            <a href="/#">
              <div
                className="svgContainer"
              >
                <Bsc
                  className="svgVertical"
                />
              </div>
            </a>
          </Grid>
        </Grid>

      ))}
    </>
  );
}
