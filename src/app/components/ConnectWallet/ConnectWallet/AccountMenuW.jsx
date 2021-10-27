import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core'
// import { Menu } from '@headlessui/react'
import {
  LogoutIcon,
  RefreshIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/outline'
import {
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { networks } from '../../../config/networks'
// import MenuDropdown from '../../shared/Menu'
import styles from './index.module.css'
import { truncateAddress } from '../../../utils/address'
import useAuth from '../../../hooks/useAuth';
import { useERC20 } from '../../../hooks/contracts/useERC20';
import { useWRUNESToken } from '../../../hooks/constants/useWRUNESToken';

const AccountMenu = ({ openConnectModal, openTransactionModal }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { logout } = useAuth()
  const { account, chainId } = useWeb3React()

  const network = networks.find((x) => x.id === chainId) || {}
  const wRunesToken = useWRUNESToken();
  console.log(wRunesToken);
  console.log('wRunesToken');
  console.log(wRunesToken);
  console.log('wRunesToken');
  console.log(wRunesToken);
  console.log('wRunesToken');
  console.log(wRunesToken);
  console.log('wRunesToken');
  console.log(wRunesToken);
  console.log('wRunesToken');
  console.log(wRunesToken);
  console.log('wRunesToken');
  console.log(wRunesToken);
  console.log('wRunesToken');
  console.log(wRunesToken);
  console.log('wRunesToken');
  console.log(wRunesToken);
  console.log('wRunesToken');
  console.log(wRunesToken);
  console.log('wRunesToken');
  console.log(account);

  const erc20 = useERC20({ contract: wRunesToken.token });
  const [NEPBalance, setNEPBalance] = useState('0');
  useEffect(() => {
    const updateBondBalance = async () => {
      const result = await erc20.balanceOf(account);
      console.log(result);
      setNEPBalance(result)
    }
    console.log('NEPBalance');
    console.log(NEPBalance);
    updateBondBalance();
  }, [chainId]);

  return (
    <div className="flex gap-4 flex-wrap justify-end">
      <div className={styles.networkName}>{network.shortName}</div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {truncateAddress(account)}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <Button
            onClick={() => {
              openConnectModal();
              setAnchorEl(null);
            }}
          >
            <span>Change Network</span>
            <RefreshIcon className="w-4 h-4" />
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            onClick={() => {
              openTransactionModal();
              setAnchorEl(null);
            }}
          >
            <span>View Transactions</span>
            <SwitchVerticalIcon className="w-4 h-4" />
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            onClick={() => {
              logout();
              setAnchorEl(null);
            }}
          >
            <span>Disconnect</span>
            <LogoutIcon className="w-4 h-4" />
          </Button>
        </MenuItem>
      </Menu>
      <div>
        {NEPBalance}
      </div>
    </div>
  )
}

export default AccountMenu
