import React from 'react';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import classNames from 'classnames';

import { useLogout } from 'hooks';
import { routeNames } from 'routes';
import { WithClassnameType } from 'types';

export interface LogoutButtonUIType extends WithClassnameType {
  text?: React.ReactNode;
}

export const LogoutButton = ({ className, text }: LogoutButtonUIType) => {
  const { address } = useGetAccountInfo();
  const logout = useLogout({ shouldAttemptReLogin: false });

  const onDisconnectClick = () => {
    logout(`${window.location.origin}${routeNames.home}`, routeNames.home);
  };

  if (!address) {
    return null;
  }

  if (text) {
    return (
      <button type='button' onClick={onDisconnectClick} className={className}>
        {text ?? 'Disconnect'}
      </button>
    );
  }

  return (
    <button
      type='button'
      onClick={onDisconnectClick}
      className={className ?? classNames('p-0', 'd-flex', 'btn-unstyled')}
    >
      <FontAwesomeIcon icon={faPowerOff} />
    </button>
  );
};
