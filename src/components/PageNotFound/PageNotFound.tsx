import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

import { PageState } from 'components';

export const PageNotFound = () => {
  const { pathname } = useLocation();

  return (
    <PageState
      icon={faTimes}
      title='Page not found'
      className='not-found card'
      description={
        <div className='px-spacer'>
          <span className='text-break-all'>{pathname}</span>
        </div>
      }
    />
  );
};
