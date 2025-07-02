import React, { useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { useMatchPath } from 'hooks';
import { dappOriginSelector } from 'redux/selectors';

const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  const matchPath = useMatchPath();
  const { state, pathname } = useLocation();
  const dappOrigin = useSelector(dappOriginSelector);
  const from = state && 'from' in (state as any) ? (state as any).from : '';

  const blacklist: string[] = [dappOrigin.pathname];

  const scrollTop = () => {
    const preventScroll = blacklist.some(
      (page) => matchPath(page) || from === page
    );
    if (!preventScroll) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      });
    }
  };

  useEffect(scrollTop, [pathname]);

  return <>{children}</>;
};

export const withPageTitle =
  (title: string, Component: React.ComponentType) => () => {
    const Memoized = memo(() => (
      <ScrollToTop>
        <Component />
      </ScrollToTop>
    ));

    useEffect(() => {
      document.title = title;
    }, []);
    return <Memoized />;
  };
