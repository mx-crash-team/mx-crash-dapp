import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { UnlockBtn } from 'components';
import { useIsAuthenticated } from 'hooks';
import { routeNames } from 'routes';
import { WithClassnameType } from 'types';

import { UserButton } from './UserButton';

export interface HeaderOffcanvasUIType extends WithClassnameType {
  show: boolean;
  handleClose: () => void;
  handleDisconnectClick: () => void;
}

export const HeaderOffcanvas = ({
  show,
  handleClose,
  handleDisconnectClick
}: HeaderOffcanvasUIType) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement='end'
      className='menu-offcanvas'
      backdropClassName='menu-offcanvas-backdrop'
    >
      {/* <Offcanvas.Header closeButton closeVariant='white'></Offcanvas.Header> */}
      <Offcanvas.Body>
        <div className='d-flex flex-column flex-fill justify-content-between'>
          <div className='d-flex flex-column flex-fill'>
            {isAuthenticated ? (
              <>
                <Link
                  to={routeNames.account}
                  className={classNames('menu-item pt-0', {
                    active: location.pathname.includes(routeNames.account)
                  })}
                >
                  Account
                </Link>
                <UserButton />
              </>
            ) : (
              <UnlockBtn className='mx-3 mb-3' />
            )}
          </div>
          {isAuthenticated && (
            <button
              type='button'
              onClick={handleDisconnectClick}
              className='header-menu-disconnect btn-unstyled'
            >
              <FontAwesomeIcon icon={faPowerOff} size='2xl' />
            </button>
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
