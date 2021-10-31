import React from 'react';
import {
  Grid,
} from '@mui/material';
import Option from './Option';

const SelectNetwork = ({ networks, selected, setSelected }) => (
  <Grid container>
    <Grid item xs={12}>
      <h4 className="mt-4 text-gray-400 font-semibold">Select Network</h4>
    </Grid>

    <Grid container item xs={12}>
      {networks.map((network) => {
        const {
          id,
          displayName,
          disabled,
          disabledIcon,
          enabledIcon,
        } = network

        const isDisabled = disabled
        const isActive = id === selected
        const icon = disabled ? disabledIcon : enabledIcon

        const onClick = () => {
          if (isDisabled) {
            return
          }
          setSelected(id)
        }

        const props = {
          onClick,
          name: displayName,
          icon,
          isActive,
          isDisabled,
        }

        return (<Grid container item xs={6} key={id}><Option key={id} {...props} /></Grid>)
      })}
    </Grid>
  </Grid>
)

export default SelectNetwork
