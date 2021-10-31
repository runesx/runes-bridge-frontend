import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'

import { RUN_EVERY } from '../config/constants'
import { getPool } from '../config/pool'
import { useFarmContractInfo } from '../hooks/constants/useFarmContractInfo'
import { useWRUNESToken } from '../hooks/constants/useWRUNESToken'
// import { usePoolContractInfo } from '../hooks/constants/usePoolContractInfo'
import { useDiscovery } from '../hooks/contracts/useDiscovery'
import { useERC20 } from '../hooks/contracts/useERC20'
import useStatsContext from '../hooks/useStatsContext'
import {
  convertFromUnits,
  hasValue,
  maxIn,
  sumOf,
} from '../utils/bignumbers'
import { getTokenAllowance } from '../utils/blockchain/allowance'
import { isLatest } from '../utils/context'
import { getPoolData } from '../utils/data/pool'

// has data of all pools
export const BridgeContext = React.createContext()

export const BridgeProvider = ({ children }) => {
  const {
    active,
    library,
    account,
    chainId,
  } = useWeb3React();
  useEffect(() => { }, [
    active,
    library,
    account,
    chainId,
  ]);

  const [summaries, setSummaries] = useState({});
  const [allowances, setAllowances] = useState({});

  const { token: neptoken } = useWRUNESToken();
  const { address: farmContractAddress } = useFarmContractInfo();
  const discoveryInstance = useDiscovery();
  const pools = getPool(chainId);
  const { balanceOf } = useERC20({ contract: neptoken });

  const getAllowanceById = (id) => allowances[id] || '0';

  useEffect(() => {
    setSummaries({})
    setAllowances({})
  }, [chainId])

  const resetAllowance = (id) => {
    if (allowances[id] && hasValue(allowances[id])) {
      setAllowances((prev) => ({ ...prev, [id]: '0' }))
    }
  }

  const updateAllowance = async (id, token, farm) => {
    if (!active || !account) {
      resetAllowance(id)
      return
    }

    const allowance = await getTokenAllowance({
      library,
      token,
      spender: farm.address,
      owner: account,
    });

    console.log('allowance');
    console.log(allowance);

    setAllowances((prev) => ({ ...prev, [id]: allowance }))
  }

  return (
    <BridgeContext.Provider
      value={{
        pools,
        summaries,
        getAllowanceById,
      }}
    >
      {children}
    </BridgeContext.Provider>
  )
}
