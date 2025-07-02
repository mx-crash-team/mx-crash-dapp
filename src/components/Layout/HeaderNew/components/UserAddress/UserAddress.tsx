import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Trim } from '@multiversx/sdk-dapp/UI/Trim';
import { WithClassnameType } from '@multiversx/sdk-dapp/UI/types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { CopyButton, Overlay } from 'components';

import { routeNames } from 'routes';
import { LogoutButton } from '../LogoutButton';

export const UserAddress = (props: WithClassnameType) => {
  const { address } = useGetAccountInfo();

  const { className } = props;

  if (!address) {
    return null;
  }

  return (
    <div className={classNames('header-user-address', className)}>
      <div className={classNames('header-user-account', 'header-account')}>
        <Link to={routeNames.account}>
          <FontAwesomeIcon icon={faUserCircle} />
        </Link>
      </div>

      <Trim text={address} className='header-user-address-trim' />

      <CopyButton
        className='header-user-address-icon header-copy'
        text={address}
      />

      <Overlay
        title='Disconnect'
        placement='bottom'
        className='header-user-address-icon header-logout'
      >
        <LogoutButton />
      </Overlay>
    </div>
  );
};
