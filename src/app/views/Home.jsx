import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
  // Button,
} from '@mui/material';
import {
  useMetamask,
  // getAccounts,
  // getChain,
  // metaState,
} from 'use-metamask';
import { withRouter } from '../hooks/withRouter';
// import Web3 from 'web3';
import { addMetaMaskNetwork } from '../helpers/metamask';
import { abi } from '../abi/abi'
import web3 from '../helpers/web3';

// import { default as metaConnect } from 'use-metamask/connect';
// import * as actions from '../actions/auth';
import Logo from '../assets/images/logo.svg';

const RunebaseExplorerUrl = 'https://explorer.runebase.io/address/RvSmpc8dmVoFB68S8a5CT4EthzDSNVUF49/';
const contractAddress = '0xD1C2F16f8d0B08780d4792624E1342Aa505a8674';
// var abi = JSON.parse( '[{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_info","type":"string"}],"name":"setInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]' );

// contract instance
console.log(abi);
const contract = new web3.eth.Contract(abi, contractAddress);

// Smart contract functions
const getTokenAmountwRunes = async () => {
  const totalcall = await contract.methods.totalSupply().call();
  return totalcall;
}

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

const Home = (props) => {
  const { classes } = props;
  const {
    connect: metaConnect,
    metaState,
    getChain,
  } = useMetamask();
  const navigate = useNavigate();
  const [tokenAmount, setTokenAmount] = React.useState(0);
  console.log('RunesX Home View');
  const dispatch = useDispatch();
  useEffect(async () => {
    const chainInfo = await getChain();
    console.log('getCHain');
    console.log(chainInfo);
    addMetaMaskNetwork(97);
    const tokenAmountw = await getTokenAmountwRunes();
    setTokenAmount(tokenAmountw);
    if (!metaState.isConnected) {
      (async () => {
        try {
          await metaConnect(web3);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  const [runebaseBalance, setRunebaseBalance] = useState(0);
  const fetchProofOfReserveRunebase = async () => {
    const response = await fetch(RunebaseExplorerUrl);
    const jsonData = await response.json();
    setRunebaseBalance(jsonData.balance);
  };

  useEffect(() => {
    fetchProofOfReserveRunebase();
  }, []);

  const routeChangeSwap = () => {
    const path = 'swap';
    navigate(path);
  }

  return (
    <div className="height100 content">
      <Grid
        container
        spacing={0}
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={2}
          xl={1}
          className="zindexOne"
        >
          <Logo />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          className="zindexOne"
        >
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Total Wrapped RUNES issued
              </Typography>
              <Typography variant="h5" component="h2">
                {tokenAmount / 1e18}
                {' '}
                wRUNES
              </Typography>
            </CardContent>
          </Card>

        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          className="zindexOne"
        >
          <Card className="cardBorder">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Total RUNES in custody
              </Typography>
              <Typography variant="h5" component="h2">
                {runebaseBalance / 1e8}
                {' '}
                RUNES
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Divider variant="middle" />

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={() => routeChangeSwap()}
          >
            Swap

          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ })

export default withStyles(styles)(withRouter(connect(mapStateToProps, null)(Home)));
