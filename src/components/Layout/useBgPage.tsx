import { useEffect, useState, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { useMatchPath } from 'hooks';
import { dappOriginSelector } from 'redux/selectors';
import { setDappOrigin } from 'redux/slices';
import {
  backgroundRouteNames,
  backgroundRoutes,
  BackgroundRoutesType,
  foregoundRouteNames,
  modalRouteNames,
  routeNames
} from 'routes';

export const useBgPage = () => {
  const matchPath = useMatchPath();
  const dispatch = useDispatch();

  const dappOrigin = useSelector(dappOriginSelector);
  const { pathname, search } = useLocation();
  const [lastOrigin, setLastOrigin] = useState('');
  const [BgPage, setBgPage] = useState<ReactNode>(() => null);

  const isForegroundRoute = () =>
    Object.values(foregoundRouteNames).some((path) => matchPath(path));

  const [hideBgPage, setHideBgPage] = useState<ReactNode>(isForegroundRoute());

  const setOrigin = (path: string) => {
    dispatch(
      setDappOrigin({
        pathname: path === routeNames.unlock ? routeNames.home : path,
        search: /^\?[A-Za-z0-9=&]+$/.test(search) ? search : ''
      })
    );
    setLastOrigin(path);
  };

  const setCrashOrigin = () => {
    const foundBgPath = Object.values(backgroundRouteNames).find((path) =>
      matchPath(path)
    );

    const isModalPath = Object.values(modalRouteNames).some((path) =>
      matchPath(path)
    );

    if (foundBgPath && foundBgPath !== dappOrigin.pathname) {
      setOrigin(pathname);
    }

    setHideBgPage(isForegroundRoute() || (!foundBgPath && !isModalPath));

    return () => {
      if ((foundBgPath || lastOrigin) && !isModalPath) {
        let newPathname = pathname || lastOrigin;
        newPathname = pathname === routeNames.unlock ? lastOrigin : newPathname;
        const originPathname =
          newPathname === routeNames.unlock ? routeNames.home : newPathname;

        dispatch(
          setDappOrigin({
            pathname: originPathname,
            search: /^\?[A-Za-z0-9=]+$/.test(search) ? search : ''
          })
        );
      }
    };
  };

  useEffect(setCrashOrigin, [pathname, search, lastOrigin]);

  const setDappBackground = () => {
    const found = Object.entries(backgroundRouteNames).find(
      ([, path]) => dappOrigin.pathname === path || matchPath(path)
    );

    if (found) {
      const [routeName] = found;
      const ComponentRoute =
        backgroundRoutes[routeName as BackgroundRoutesType];
      const Component = ComponentRoute.component;
      setBgPage(() => <Component />);
    }
  };

  useEffect(setDappBackground, [dappOrigin.pathname]);

  return { BgPage, hideBgPage };
};
