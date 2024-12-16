import * as React from 'react';
import { Account } from 'pages/Account';
import { Home } from 'pages/Home';
import { Unlock } from 'pages/Unlock';

import { withPageTitle } from './components/PageTitle';

interface RouteType {
  path: string;
  title: string;
  component: any;
  authenticatedRoute?: boolean;
}

export type BackgroundRoutesType = 'home' | 'account';
export type ModalRoutesType = 'unlock';

export const projectsRoutes: any = {};

export const backgroundRoutes: Record<BackgroundRoutesType, RouteType> = {
  home: {
    path: '/',
    title: '',
    component: Home
  },
  account: {
    path: '/account',
    title: 'Account',
    component: Account
  }
};

export const modalRoutes: Record<ModalRoutesType, RouteType> = {
  unlock: {
    path: '/unlock',
    title: 'Unlock',
    component: Unlock
  }
};

export const backgroundRouteNames = Object.keys(backgroundRoutes).reduce(
  (acc, cur) => ({
    ...acc,
    [cur]: backgroundRoutes[cur as BackgroundRoutesType].path
  }),
  {} as Record<BackgroundRoutesType, string>
);

export const modalRouteNames = Object.keys(modalRoutes).reduce(
  (acc, cur) => ({
    ...acc,
    [cur]: modalRoutes[cur as ModalRoutesType].path
  }),
  {} as Record<ModalRoutesType, string>
);

export const foregoundRouteNames = {
  doesNotExist: '/fixesBug'
};

export const routeNames = {
  ...backgroundRouteNames,
  ...modalRouteNames,
  ...foregoundRouteNames
};

const routes: RouteType[] = [
  ...Object.keys(modalRoutes).map((route) => {
    const { path, title, authenticatedRoute, component } =
      modalRoutes[route as ModalRoutesType];
    return { path, title, authenticatedRoute, component };
  }),

  ...Object.keys(backgroundRoutes).map((route) => {
    const { path, title, authenticatedRoute } =
      backgroundRoutes[route as BackgroundRoutesType];
    return {
      path,
      title,
      authenticatedRoute,
      component: () => null
    };
  })
];

const wrappedRoutes = () => {
  return routes.map((route) => {
    const title = route.title ? `${route.title} • TheCrash` : 'TheCrash';
    return {
      path: route.path,
      authenticatedRoute: route.authenticatedRoute,
      component: withPageTitle(
        title,
        route.component
      ) as any as React.ComponentClass<any, any>
    };
  });
};

export default wrappedRoutes();
