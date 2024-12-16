import { useLocation, matchPath } from 'react-router-dom';

import { useMatchPath } from 'hooks';
import { backgroundRouteNames } from 'routes';

export const useFindBgPageHash = () => {
  const { pathname } = useLocation();
  const findMatch = useMatchPath();
  return () => {
    const route = Object.values(backgroundRouteNames).find((path) =>
      findMatch(path)
    );

    const match = matchPath(
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        path: route!
      },
      pathname
    );

    const { hash }: any =
      match && 'hash' in match.params ? match.params : { hash: '' };

    return hash;
  };
};
