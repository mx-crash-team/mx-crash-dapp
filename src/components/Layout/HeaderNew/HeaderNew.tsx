import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as Logo } from 'assets/images/logo-color.svg';
import { Deposit, UnlockBtn } from 'components';
import { useLogout, useIsAuthenticated } from 'hooks';
import { routeNames } from 'routes';

import { HeaderOffcanvas, UserMenu } from './components';

export const HeaderNew = () => {
  const location = useLocation();
  const logout = useLogout({ shouldAttemptReLogin: false });
  const isAuthenticated = useIsAuthenticated();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDisconnectClick = () => {
    logout(`${window.location.origin}${routeNames.home}`, routeNames.home);
  };

  useEffect(() => {
    setShow(false);
  }, [location]);

  return (
    <>
      <header className='header-new'>
        <div className='header-container container d-flex align-items-center'>
          <div className='header-main'>
            <div className='header-start'>
              <Link to={routeNames.home} className='header-logo'>
                <Logo className='main-logo' />
                <span>TheCrash</span>
              </Link>
              <Navbar
                collapseOnSelect
                className='header-menu-items d-none d-md-flex'
              >
                <UserMenu />
              </Navbar>
            </div>
            <div className='header-end'>
              <div
                className='btn btn-unstyled header-navigation-trigger d-md-none'
                onClick={handleShow}
              >
                <div
                  className={classNames('header-navigation-bars', {
                    active: show
                  })}
                >
                  {Array.from({ length: 3 }).map((_, index) => (
                    <span
                      className='header-navigation-bar'
                      key={`bar-${index}`}
                    />
                  ))}
                </div>
              </div>
              <div className='d-none d-md-inline-block'>
                {isAuthenticated ? <Deposit /> : <UnlockBtn />}
              </div>
            </div>
          </div>
        </div>
      </header>
      <HeaderOffcanvas
        show={show}
        handleClose={handleClose}
        handleDisconnectClick={handleDisconnectClick}
      />
    </>
  );
};
