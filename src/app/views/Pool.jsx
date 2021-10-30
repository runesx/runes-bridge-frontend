import React from 'react';
import { ListPools } from '../components/Farm'
// import FarmHero from '../components/Farm/Hero'
// import Disclaimer from '../components/shared/Footer/Disclaimer'
import { FarmFilterProvider } from '../context/farm-filter'

export default function Pool() {
  return (
    <>
      <FarmFilterProvider>
        <div style={{ position: 'relative' }}>
          <ListPools />
        </div>
      </FarmFilterProvider>

    </>
  )
}
