import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import ListPools from '../components/Farm'
// import FarmHero from '../components/Farm/Hero'
// import Disclaimer from '../components/shared/Footer/Disclaimer'
import { FarmFilterProvider } from '../context/farm-filter'
import { PoolProvider } from '../context/pool'
import { StatsProvider } from '../context/stats';
import { withRouter } from '../hooks/withRouter';

const Pool = (props) => (

  <StatsProvider>
    <PoolProvider>
      <FarmFilterProvider>
        <div style={{ position: 'relative' }}>
          <ListPools />
        </div>
      </FarmFilterProvider>
    </PoolProvider>
  </StatsProvider>

)

const mapStateToProps = (state) => ({
  // errorMessage: state.auth.error,
  activateWallet: state.activateWallet,
})

export default withRouter(connect(mapStateToProps, null)(Pool));
