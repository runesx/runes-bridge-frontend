import React from 'react';
import {
  Grid,
} from '@mui/material';
import Option from './Option';

const SelectWallet = ({ wallets, selected, setSelected }) => (
  <Grid container>
    <Grid item xs={12}>
      <h4 className="mt-4 text-gray-400 font-semibold">Select Wallet</h4>
    </Grid>
    <Grid container item xs={12}>
      {wallets.map((wallet) => {
        const {
          id, name, disabled, disabledIcon, enabledIcon,
        } = wallet

        const isDisabled = disabled
        const isActive = id === selected
        const icon = isDisabled ? disabledIcon : enabledIcon

        const onClick = () => {
          if (isDisabled) {
            return
          }
          setSelected(id)
        }

        const props = {
          onClick, name, icon, isActive, isDisabled,
        }

        return (<Grid container item xs={6} key={id}><Option key={id} {...props} /></Grid>)
      })}
    </Grid>
  </Grid>
)

export default SelectWallet
