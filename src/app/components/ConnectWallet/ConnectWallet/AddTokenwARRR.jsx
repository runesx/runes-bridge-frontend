import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'
import {
  Button,
} from '@mui/material';
import QuestionHelper from '../../QuestionHelper';

const AddToken = () => {
  const { chainId, library } = useWeb3React();

  useEffect(() => {}, [chainId]);

  return (
    <>
      {chainId && library && library.provider.isMetaMask && (
        <>
          <QuestionHelper text="Add wARRR to your MetaMask wallet">
            <Button
              variant="outlined"
              onClick={() => {
                const params = {
                  type: 'ERC20',
                  options: {
                    address: '0xcdaf240c90f989847c56ac9dee754f76f41c5833',
                    symbol: 'wARRR',
                    decimals: 18,
                    image: 'https://pirate.black/wp-content/uploads/2019/04/Pirate_Logo_Coin_Gold.png',
                  },
                }
                if (library && library.provider.isMetaMask && library.provider.request) {
                  library.provider
                    .request({
                      method: 'wallet_watchAsset',
                      params,
                    })
                    .then((success) => {
                      if (success) {
                        console.log('Successfully added wRUNES to MetaMask')
                      } else {
                        throw new Error('Something went wrong.')
                      }
                    })
                    .catch(console.error)
                }
              }}
            >
              <img
                src="https://pirate.black/wp-content/uploads/2019/04/Pirate_Logo_Coin_Gold.png"
                alt="wARRR"
                width="38px"
                height="38px"
                objectFit="contain"
                className="rounded-md"
              />
            </Button>
          </QuestionHelper>
        </>
      )}
    </>
  )
}

export default AddToken;
