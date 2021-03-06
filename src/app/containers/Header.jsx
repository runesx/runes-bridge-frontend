import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  // NavDropdown,
} from 'react-bootstrap';

import { withTranslation } from 'react-i18next';
import MobileNav from '../assets/images/mobileNav.svg';
// import Notifications from '../components/Notifications';
// import ConnectButton from '../components/ConnectButton';
import ConnectWallet from '../components/ConnectWallet';

// import 'bootstrap/dist/css/bootstrap.css';

const Header = (props) => {
  // const { t } = props;
  const {
    t,
    i18n,
    // authenticated,
    user,
  } = props;
  const heightRef = useRef(null);
  const [ref, setRef] = useState(null);
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [height, setHeight] = useState(0);

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
    setHeight(heightRef.current.clientHeight);
  }, [menu]);

  const toggleMenu = () => {
    setMenu(!menu);
  }

  const show = (menu) ? 'show' : '';

  // console.log(this.props.user);
  return (
    <header className="rootRow header" style={{ height }}>
      <Navbar
        ref={heightRef}
        fixed="top"
        className="navbar navbar-default"
        expand="lg"
      >
        <Link to="/" className="nav-link">wRUNES</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
        >
          <MobileNav
            className="mobileNav"
          />
        </button>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={`collapse navbar-collapse ${show}`}
        >
          <Nav className="mr-auto rNavbar">
            <Link
              className="nav-link"
              to="/bridge"
            >
              Bridge
            </Link>
            <Link
              className="nav-link"
              to="/transactions"
            >
              Transactions
            </Link>
            <Link
              className="nav-link"
              to="/farms"
            >
              Farm
            </Link>
            <Link
              className="nav-link"
              to="/faq"
            >
              FAQ
            </Link>
          </Nav>
          <ul>
            {/*
              authenticated
                && (
                  <>
                    <li>
                      <Notifications />
                    </li>
                  </>

                )

                */}
          </ul>
          <ConnectWallet />
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

function mapStateToProps(state) {
  return {
    // authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps)(withTranslation()(Header));
