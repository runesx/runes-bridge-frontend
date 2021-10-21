export async function addNqsetwork(id) {
  console.log('123');
}
export async function addMetaMaskNetwork(id) {
  let networkData;

  switch (id) {
    // bsctestnet

    case 97:

      networkData = [

        {

          chainId: '0x61',

          chainName: 'BSCTESTNET',

          rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],

          nativeCurrency: {

            name: 'BINANCE COIN',

            symbol: 'BNB',

            decimals: 18,

          },

          blockExplorerUrls: ['https://testnet.bscscan.com/'],

        },

      ];

      break;

      // bscmainet

    case 56:

      networkData = [

        {

          chainId: '0x38',

          chainName: 'BSCMAINET',

          rpcUrls: ['https://bsc-dataseed1.binance.org'],

          nativeCurrency: {

            name: 'BINANCE COIN',

            symbol: 'BNB',

            decimals: 18,

          },

          blockExplorerUrls: ['https://testnet.bscscan.com/'],

        },

      ];

      break;

    default:

      break;
  }

  // agregar red o cambiar red

  return window.ethereum.request({

    method: 'wallet_addEthereumChain',

    params: networkData,

  });
}
