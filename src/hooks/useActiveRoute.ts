import { matchPath, useLocation } from 'react-router-dom';

export const useActiveRoute = () => {
  const { pathname } = useLocation();

  const innerMatchPath = (path: string) =>
    matchPath(
      {
        path,
        caseSensitive: true,
        end: true
      },
      pathname
    );

  return (path: string) => innerMatchPath(path) !== null;
};
