import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
  Navbar,
  Nav,
  // NavDropdown,
} from 'react-bootstrap';

import { withTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
import {
  Badge,
  Button,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MobileNav from '../assets/images/mobileNav.svg';
import Notifications from './Notifications';
import {
  getPendingWithdrawalCount,
} from '../actions/adminCounts';

// import 'bootstrap/dist/css/bootstrap.css';

const Header = (props) => {
  // const { t } = props;
  const {
    t,
    i18n,
    authenticated,
    user,
    adminPendingWithdrawalsCount,
  } = props;
  const heightRef = useRef(null);
  const [ref, setRef] = useState(null);
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [height, setHeight] = useState(0);

  const handleClick = (event) => {
    // this.setState({ anchorEl: event.currentTarget, open: Boolean(event.currentTarget) });

  }

  const handleClose = (event) => {
    // this.setState({ anchorEl: event.currentTarget, open: false });
  }

  const handleWindowResize = useCallback((event) => {
    console.log('resize window');
    if (height !== heightRef.current.clientHeight) {
      // this.setState({ height: this.div.clientHeight });
      setHeight(heightRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  useEffect(() => {
    if (user && user.role === 4) {
      dispatch(getPendingWithdrawalCount());
      const interval = setInterval(() => {
        dispatch(getPendingWithdrawalCount());
      }, 1 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => { }, [adminPendingWithdrawalsCount]);

  useEffect(() => {
    setHeight(heightRef.current.clientHeight);
  }, [menu]);

  const toggleMenu = () => {
    setMenu(!menu);
  }

  const show = (menu) ? 'show' : '';

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const getCurrentLng = () => i18n.language || window.localStorage.i18nextLng || '';
  const countryCode = (country) => {
    if (country === 'pt') {
      return 'br';
    }
    if (country === 'en') {
      return 'us';
    }
    if (country === 'nl') {
      return 'nl';
    }
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickAdminMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAdminMenu = () => {
    setAnchorEl(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleClickUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorElLang, setAnchorElLang] = React.useState(null);

  const handleClickLangMenu = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  // console.log(this.props.user);
  return (
    <header className="rootRow header" style={{ height }}>
      <Navbar
        ref={heightRef}
        fixed="top"
        className="navbar navbar-default"
        expand="lg"
      >
        <Link to={authenticated ? '/' : '/'} className="nav-link">RunesX</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
        >
          <MobileNav />
        </button>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={`collapse navbar-collapse ${show}`}
        >
          <Nav className="mr-auto rNavbar">
            <Link
              className="nav-link"
              to="/swap"
            >
              Swap
            </Link>
            <Link
              className="nav-link"
              to="/transactions"
            >
              Transactions
            </Link>
            <Link
              className="nav-link"
              to="/faq"
            >
              FAQ
            </Link>
          </Nav>
          <ul>
            {
              authenticated
                && (
                  <>
                    <li>
                      <Notifications />
                    </li>
                  </>

                )

            }
          </ul>

          <Button
                          // aria-controls="simple-menu"
                          // aria-haspopup="true"
            onClick={handleClickLangMenu}
            className="langPadding toggleLangWrapper"
            id="user-nav-dropdown"
            style={{ color: '#bdbdbd' }}
          >
            <Badge
              color="secondary"
            >
              <span>
                <ReactCountryFlag countryCode={countryCode(`${getCurrentLng()}`)} svg />
                {' '}
                {t(`${getCurrentLng()}`)}
              </span>
            </Badge>

            {' '}
            <ArrowDropDownIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorElLang}
            keepMounted
            open={Boolean(anchorElLang)}
            onClose={handleCloseLangMenu}
            className="langPadding toggleLangWrapper"
          >
            <MenuItem
              onClick={(event) => {
                handleCloseLangMenu();
                changeLanguage('en');
              }}
            >
              <div>
                <ReactCountryFlag countryCode="us" svg />
                {' '}
                {t('en')}
              </div>
            </MenuItem>
            <MenuItem
              onClick={(event) => {
                handleCloseLangMenu();
                changeLanguage('pt')
              }}
            >
              <div>
                <ReactCountryFlag countryCode="br" svg />
                {' '}
                {t('pt')}
              </div>
            </MenuItem>
            <MenuItem
              onClick={(event) => {
                handleCloseLangMenu();
                changeLanguage('nl')
              }}
            >
              <div>
                <ReactCountryFlag countryCode="nl" svg />
                {' '}
                {t('nl')}
              </div>
            </MenuItem>
          </Menu>

        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps)(withTranslation()(Header));
