import { useWeb3React } from '@web3-react/core'
import React from 'react';
import { getWRUNESToken } from '../../config/stats'

export const useNEPToken = () => {
  const { chainId } = useWeb3React()
  const token = getWRUNESToken(chainId)

  return {
    token,
  }
}
