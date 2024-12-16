import React from 'react';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { useSelector } from 'react-redux';

import { refetchOriginSelector } from 'redux/selectors';
import { useIsAuthenticated } from './useIsAuthenticated';

export const useRefreshAccountInfo = () => {
  const refetch = useSelector(refetchOriginSelector);
  const loggedIn = useIsAuthenticated();

  React.useEffect(() => {
    if (loggedIn) {
      refreshAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, loggedIn]);
};
