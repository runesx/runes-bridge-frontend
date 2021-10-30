import * as React from 'react';
import Grid from '@mui/material/Grid';
import dateFormat from 'dateformat';

import Bsc from '../assets/images/bsc.svg';
import Runebase from '../assets/images/Runebase.png';

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
                {row.amount / 1e8}
                {' '}
                RUNES
              </div>
              <div
                className="dateCell"
              >
                {dateFormat(row.createdAt)}
              </div>
              <div className="innerWrapperArrow">
                <div className={`arrow ${row.bridge.type === 1 ? 'flippedArrow' : ''}`}>
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
