import React, { useEffect } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { AuthenticatedRoutesWrapper } from '@multiversx/sdk-dapp/wrappers';
import { useLocation } from 'react-router-dom';

import {
  useLogout,
  useFetchUsdValue,
  useSetUserAgent,
  useIsAuthenticated
} from 'hooks';
import { useWebsocketLog } from 'hooks/websocketListener';
import routes, { routeNames } from 'routes';

import { Footer } from './Footer';
import { HeaderNew } from './HeaderNew';
import { useBgPage } from './useBgPage';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  useSetUserAgent();
  const location = useLocation();

  const { BgPage, hideBgPage } = useBgPage();
  const { address } = useGetAccountInfo();
  const logout = useLogout({ shouldAttemptReLogin: false });

  const { search } = location;

  // Authenticated
  // useFetchUserInfo();

  useFetchUsdValue();

  useEffect(() => {
    const receiveMessage = (ev: StorageEvent) => {
      if (ev.key !== 'logoutEvent' || !ev.newValue) return;
      try {
        const { data } = JSON.parse(ev.newValue);
        if (data === address) {
          logout();
        }
      } catch (err) {
        return;
      }
    };

    if (address) {
      window.addEventListener('storage', receiveMessage);
    }

    return () => {
      window.removeEventListener('storage', receiveMessage);
    };
  }, [address]);

  return (
    <div className='layout flex-fill'>
      <HeaderNew />
      <main className='main-content d-flex flex-column flex-fill'>
        <>
          <AuthenticatedRoutesWrapper
            routes={routes}
            unlockRoute={`${routeNames.unlock}${search}`}
          >
            {!hideBgPage && <>{BgPage}</>}
            {children}
          </AuthenticatedRoutesWrapper>
        </>
      </main>
      <Footer />
    </div>
  );
};
