import React, { useState } from 'react';

import { useWeb3React } from '@web3-react/core'
import {
  Grid,
} from '@mui/material';
import DetailsPane from './DetailsPane'
import PrimaryPane from './PrimaryPane'
import { ComingSoonCardFront } from '../../shared/ComingSoonCardFront'
import { convertFromUnits, hasValue } from '../../../utils/bignumbers'
// import { percentFormatter } from '../../../utils/formatter'
// import { Ribbon } from '../../shared/CardRibbon'
import allFeatures from '../../../config/pool/features'
import Harvest from './Harvest'
import Modal from './Modal'
import { ApproveToSpend } from './ApproveToSpend'
import StakeUnstakeButtons from './StakeUnstakeButtons'
import { CardDetails } from '../../shared/CardDetails'
import { getPoolDetails } from '../../../utils/data/pool';

const modalTypes = {
  STAKE: 'STAKE',
  UNSTAKE: 'UNSTAKE',
}

const FarmCard = ({ data }) => {
  const { active } = useWeb3React()
  const [open, setOpen] = useState(false)
  const [type, setType] = useState(modalTypes.STAKE)

  const details = getPoolDetails(data)
  // const isComingSoon = !hasValue(data.maxToStake) || !data.isLive
  const isComingSoon = false;
  const canHarvest = active && hasValue(data.rewards)
  const isPancakeLinked = data.features.some(
    (feature) => feature.invariant === allFeatures.PANCAKESWAP.invariant,
  )

  const closeModal = () => {
    setOpen(false)
  }

  const openModal = (modalType) => {
    setType(modalType)
    setOpen(true)
  }

  const modalProps = {
    open, type, closeModal, openModal, data,
  }

  console.log(data);
  console.log('data');

  return (
    <>
      {isComingSoon && (
      <ComingSoonCardFront name={data.name} logo={data.logo} />
      )}
      {!isComingSoon && (
      <Grid container>
        <Grid
          item
          xs={12}
          className="poolCard"
        >
          <Grid container>
            <Grid item xs={6}>
              <PrimaryPane data={data}>
                <ApproveToSpend data={data} />
                <StakeUnstakeButtons
                  data={data}
                  openModal={openModal}
                  modalTypes={modalTypes}
                />
              </PrimaryPane>
            </Grid>
            <Grid container item xs={6}>
              <DetailsPane
                bottomBgSrc={data.background}
                isPancakeLinked={isPancakeLinked}
              >
                <CardDetails details={details} />
                {canHarvest && <Harvest data={data} />}
              </DetailsPane>
            </Grid>
          </Grid>

          {/*
<Ribbon priority={data.priority}>
            {percentFormatter(convertFromUnits(data.apy), 0)}
            {' '}
            APY
          </Ribbon>
          */}

        </Grid>
      </Grid>
      )}

      <Modal {...modalProps} />
    </>
  )
}

export default FarmCard
