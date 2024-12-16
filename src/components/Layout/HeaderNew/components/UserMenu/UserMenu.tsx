import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Trim } from '@multiversx/sdk-dapp/UI/Trim';
import { WithClassnameType } from '@multiversx/sdk-dapp/UI/types';
import classNames from 'classnames';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { CopyButton } from 'components';

import { routeNames } from 'routes';
import { LogoutButton } from '../LogoutButton';

export const UserMenu = ({ className }: WithClassnameType) => {
  const { address } = useGetAccountInfo();

  const isAccountRoute = location.pathname.includes(routeNames.account);

  if (!address) {
    return null;
  }

  return (
    <NavDropdown
      align='end'
      title={
        <div className='user-icon'>
          <FontAwesomeIcon icon={faUser} size='sm' />
        </div>
      }
      id='account'
      className={classNames('user-menu', className, {
        active: isAccountRoute
      })}
    >
      <div className='btn-group user-account'>
        <div className='user-icon'>
          <FontAwesomeIcon icon={faUser} size='sm' />
        </div>
        <div className='user-address-wrapper'>
          <Trim text={address} className='header-user-address-trim' />
        </div>
        <CopyButton
          className={classNames('header-user-address-icon', 'header-copy')}
          text={address}
        />
      </div>
      <hr className='dropdown-divider' />
      <div className='btn-group d-flex flex-column gap-3 p-3'>
        <NavDropdown.Item
          as={Link}
          to={routeNames.account}
          className={classNames('menu-item', {
            active: location.pathname.includes(routeNames.account)
          })}
        >
          Account Details
        </NavDropdown.Item>
        <LogoutButton
          text='Sign Out'
          className='btn btn-unstyled logout-button menu-item'
        />
      </div>
    </NavDropdown>
  );
};
