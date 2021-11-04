import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core'
// import { Menu } from '@headlessui/react'
import {
  LogoutIcon,
  RefreshIcon,
  // SwitchVerticalIcon,
} from '@heroicons/react/outline'
import {
  Button,
  Menu,
  MenuItem,
  // Grid,
} from '@mui/material';
import { networks } from '../../../config/networks'
// import MenuDropdown from '../../shared/Menu'
import styles from './index.module.css'
import { truncateAddress } from '../../../utils/address';
import { convertFromUnits } from '../../../utils/bignumbers';
import useAuth from '../../../hooks/useAuth';
import { useERC20 } from '../../../hooks/contracts/useERC20';
import { useWRUNESToken } from '../../../hooks/constants/useWRUNESToken';
import QuestionHelper from '../../QuestionHelper';
import RunebaseImage from '../../../assets/images/Runebase.png';
import AddToken from './AddToken';
// import Button from '@mui/material/Button';

function Balance() {
  const { account, library, chainId } = useWeb3React()

  const [balance, setBalance] = React.useState()
  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false

      library
        .getBalance(account)
        .then((balance) => {
          if (!stale) {
            setBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null)
          }
        })

      return () => {
        stale = true
        setBalance(undefined)
      }
    }
  }, [account,
    library,
    chainId,
  ]) // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      {balance === null ? 'Error' : balance ? `${convertFromUnits(balance).toFixed(3)}` : ''}
    </>
  )
}

const AccountMenu = ({ openConnectModal, openTransactionModal }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { logout } = useAuth();
  const { account, chainId, library } = useWeb3React();

  const network = networks.find((x) => x.id === chainId) || {}
  const wRunesToken = useWRUNESToken();
  const erc20 = useERC20({ contract: wRunesToken.token });
  const [RUNESBalance, setRUNESBalance] = useState('0');
  // const [balance, setBalance] = useState('0');

  useEffect(() => {
    const updateBondBalance = async () => {
      const result = await erc20.balanceOf(account);
      setRUNESBalance(convertFromUnits(result).toString());
    }
    updateBondBalance();
    console.log('wRunesToken var');
    console.log(wRunesToken);
  }, [chainId]);

  return (
    <div>
      <div
        style={{
          float: 'left',
          marginRight: '10px',
        }}
      >
        <AddToken />
      </div>
      <div style={{ float: 'left', paddingRight: '10px' }}>
        <div style={{ width: '100%' }}>
          <div className={styles.networkName}>{network.shortName}</div>
        </div>
        <div style={{ width: '100%' }}>
          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            style={{ padding: 0 }}
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
            {
              /*
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
              */
            }
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
        </div>
      </div>
      <div style={{ float: 'left' }}>
        <div style={{ width: '100%' }}>
          <Balance />
          {' '}
          { network.id === 56 && 'BNB' }
          { network.id === 97 && 'BNB' }
          { network.id === 137 && 'MATIC' }
          { network.id === 80001 && 'MATIC' }
        </div>

        <div style={{ width: '100%' }}>
          {Number(RUNESBalance).toFixed(3)}
          {' '}
          wRUNES
        </div>

      </div>
    </div>
  )
}

export default AccountMenu
