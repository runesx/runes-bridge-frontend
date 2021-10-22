import Web3 from 'web3';

// const web3 = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'));
const web3 = new Web3(window.ethereum);
window.ethereum.enable();

export default web3;
