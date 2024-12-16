import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { routeNames } from 'routes';

export const UnlockBtn = ({
  'data-testid': dataTestId,
  className,
  text,
  large
}: {
  'data-testid'?: string;
  className?: string;
  text?: string;
  large?: boolean;
}) => {
  const unlockRoute = `${routeNames.unlock}?callbackUrl=${window.location.href}`;

  return (
    <Link
      className={`unlock-btn btn btn-primary ${
        className ? className : 'my-2 btn-sm'
      } ${large ? 'btn-lg' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
      to={unlockRoute}
      data-testid={dataTestId}
    >
      <div className='d-flex align-items-center justify-content-center gap-3'>
        <FontAwesomeIcon icon={faWallet} />
        {text ? text : 'Login'}
      </div>
    </Link>
  );
};
