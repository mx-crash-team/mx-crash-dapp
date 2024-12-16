import { Navigate } from 'react-router-dom';

import { Loader } from 'components';
import { useIsAuthenticated } from 'hooks';
import { routeNames } from 'routes';
import { AccountDetails } from './components/AccountDetails';

export const Account = () => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to={routeNames.home} replace />;
  }

  return (
    <div className='account flex-fill w-100'>
      <div className='container d-flex flex-column flex-grow-1 gap-3'>
        <div className='row'>
          <div className='col-12'>
            <AccountDetails />
          </div>
        </div>
      </div>
    </div>
  );
};
