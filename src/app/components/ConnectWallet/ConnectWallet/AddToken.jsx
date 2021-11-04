import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'
import {
  Button,
} from '@mui/material';
import { useWRUNESToken } from '../../../hooks/constants/useWRUNESToken';
import QuestionHelper from '../../QuestionHelper';

const AddToken = () => {
  const { chainId, library } = useWeb3React();
  const wRunesToken = useWRUNESToken();

  useEffect(() => {}, [chainId]);

  return (
    <>
      {chainId && library && library.provider.isMetaMask && (
        <>
          <QuestionHelper text="Add wRUNES to your MetaMask wallet">
            <Button
              variant="outlined"
              onClick={() => {
                const params = {
                  type: 'ERC20',
                  options: {
                    address: wRunesToken.token.address,
                    symbol: 'wRUNES',
                    decimals: 18,
                    image: 'https://downloads.runebase.io/logo-512x512.png',
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
                src="https://downloads.runebase.io/logo-512x512.png"
                alt="SUSHI"
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
