import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { WithClassnameType } from 'types';

export const AccountImage = ({ className }: WithClassnameType) => {
  return (
    <div className={classNames('account-image', className)}>
      <FontAwesomeIcon icon={faUser} />
    </div>
  );
};
