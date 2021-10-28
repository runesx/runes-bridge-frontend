import React from 'react';
import { ListPools } from '../components/Farm'
import FarmFilter from '../components/Farm/Filter'
// import FarmHero from '../components/Farm/Hero'
// import Disclaimer from '../components/shared/Footer/Disclaimer'
import LPDisclaimer from '../components/shared/LPDisclaimer'
import { FarmFilterProvider } from '../context/farm-filter'
import { PoolProvider } from '../context/pool'

export default function Pool() {
  return (
    <>
      <PoolProvider>
        <FarmFilterProvider>
          <div style={{ position: 'relative' }}>
            <ListPools />
          </div>
        </FarmFilterProvider>
      </PoolProvider>
    </>
  )
}
