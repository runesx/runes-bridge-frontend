/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react'
// import { useWeb3React } from '@web3-react/core';
import { connect } from 'react-redux';
import useFarmFilterContext from '../../hooks/useFarmFilterContext'
import { usePoolContext } from '../../hooks/usePoolContext'
import { sort } from '../../utils/bignumbers'
import FarmCard from './Card';

const sortByKeys = {
  Default: null,
  'Total Value Locked': 'tvl',
  APY: 'apy',
}

const ListPools = (props) => {
  const { pools, getDataById } = usePoolContext()
  const { sortBy, searchText } = useFarmFilterContext()
  const [toShow, setToShow] = useState([])

  // const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React();

  useEffect(() => {}, []);
  const { activateWallet } = props;
  useEffect(() => {
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
    console.log('activateWallet triggered');
  }, [activateWallet]);

  useEffect(() => {
    const filtered = pools.filter((pool) => {
      try {
        return pool.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      } catch (error) {}
      return true
    })

    let sorted = filtered
    if (sortByKeys[sortBy]) {
      sorted = sort(
        filtered,
        (pool) => {
          const sortDataKey = sortByKeys[sortBy]
          const data = getDataById(pool.id)
          return data[sortDataKey]
        },
        true,
      )
    }

    setToShow(sorted)
  }, [sortBy, searchText])

  return (
    <>
      {toShow.map((pool) => {
        const data = getDataById(pool.id)

        return <FarmCard key={pool.name} id={pool.id} data={data} />
      })}
      {toShow.length === 0 && (
        <div className="text-center col-span-full text-gray-500">
          No data found
        </div>
      )}
    </>
  )
}
const mapStateToProps = (state) => ({
  // errorMessage: state.auth.error,
  activateWallet: state.activateWallet,
})

export default connect(mapStateToProps, null)(ListPools);
