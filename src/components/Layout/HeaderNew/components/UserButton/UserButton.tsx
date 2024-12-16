import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Trim } from '@multiversx/sdk-dapp/UI/Trim';
import { WithClassnameType } from '@multiversx/sdk-dapp/UI/types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { routeNames } from 'routes';
import { LogoutButton } from '../LogoutButton';

export const UserButton = (props: WithClassnameType) => {
  const { address } = useGetAccountInfo();

  const { className } = props;

  if (!address) {
    return null;
  }

  return (
    <div className={classNames('user-button', 'btn-group', className)}>
      <Link
        to={routeNames.account}
        className={classNames('btn', 'btn-dark', 'btn-account')}
      >
        <FontAwesomeIcon icon={faUserCircle} />
      </Link>
      <Trim text={address} className='btn btn-dark user-button-trim' />
      <LogoutButton className='btn btn-dark user-button-logout align-items-center justify-content-center' />
    </div>
  );
};
