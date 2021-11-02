import * as React from 'react';
import Grid from '@mui/material/Grid';
import dateFormat from 'dateformat';

import Bsc from '../assets/images/bsc.svg';
import Runebase from '../assets/images/Runebase.png';
import Matic from '../assets/images/polygon.svg';
import chains from '../config/constants/chains';

export default function BasicTable(props) {
  const {
    transactions,
  } = props;
  return (
    <>
      {transactions.map((row) => {
        const explorerUrl = chains.filter((item) => item.networkId == row.bridge.chainId).map(({ blockExplorerUrls }) => (blockExplorerUrls));
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);
        console.log(explorerUrl);

        return (
          <Grid
            container
          >
            <Grid
              item
              xs={2}
              justify="center"
            >
              <a
                className="runesExplorerLinkImage"
                href={`https://explorer.runebase.io/tx/${row.runebase_tx}`}
              >
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
              <a href={`${explorerUrl[0]}/tx/${row.bsc_tx}`}>
                <div
                  className="svgContainer"
                >
                  {row.bridge.chainId === 56 && (
                  <Bsc
                    className="svgVertical"
                  />
                  )}
                  {row.bridge.chainId === 97 && (
                  <Bsc
                    className="svgVertical"
                  />
                  )}
                  {row.bridge.chainId === 80001 && (
                  <Matic
                    className="svgVertical"
                  />
                  )}
                  {row.bridge.chainId === 137 && (

                  <Matic
                    className="svgVertical"
                  />
                  )}
                </div>
              </a>
            </Grid>
          </Grid>

        )
      })}
    </>
  );
}
