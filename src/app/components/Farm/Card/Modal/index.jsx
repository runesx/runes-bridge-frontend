import React from 'react'
import Typography from '@mui/material/Typography';
import Modal from '../../../shared/Modal'
import { StakeContent, StakeFooter } from './StakeForm'
import { UnstakeContent, UnstakeFooter } from './UnstakeForm'
import { CardModalTitle } from './Title';

const CardModal = ({
  open,
  type,
  openModal,
  closeModal,
  data,
}) => {
  let title = <div>Unexpected Error </div>
  let Content = () => <div />
  let Footer = () => <div />

  if (type === 'STAKE') {
    title = (
      <>
        Stake
        {' '}
        {data.liquidity.toUpperCase()}
      </>
    )
    Content = StakeContent
    Footer = StakeFooter
  } else if (type === 'UNSTAKE') {
    title = (
      <>
        Withdraw
        {' '}
        {data.liquidity.toUpperCase()}
      </>
    )
    Content = UnstakeContent
    Footer = UnstakeFooter
  }

  const contentProps = {
    closeModal,
    token: data.token,
    type: data.type,
    name: data.name,
    liquidity: data.liquidity,
    totalTokensLocked: data.totalTokensLocked,
    maxToStake: data.maxToStake,
    rewards: data.rewards,
    rewardSymbol: data.rewardSymbol,
    staked: data.staked,
  }

  return (
    <div>
      <Modal open={open} closeModal={closeModal}>
        {({ cancelButtonRef, isPending, setIsPending }) => (
          <div>
            <Typography id="modal-modal-title" variant="h3">
              <CardModalTitle
                logo={data.logo}
                title={data.name}
                closeModal={closeModal}
                isPending={isPending}
              >
                {title}
              </CardModalTitle>
            </Typography>
            <Content
              cancelButtonRef={cancelButtonRef}
              setIsPending={setIsPending}
              {...contentProps}
            />
            <Footer
              cancelButtonRef={cancelButtonRef}
              closeModal={closeModal}
              link={data.tokenSwapLink}
              symbol={data.liquidity}
            />
          </div>
        )}
      </Modal>
    </div>
  )
}

export default CardModal
