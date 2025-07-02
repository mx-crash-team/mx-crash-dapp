import { ReactNode } from 'react';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import { PageState } from 'components';
import { WithClassnameType } from 'types';

export interface LoaderUIType extends WithClassnameType {
  noText?: boolean;
  title?: ReactNode;
}

export const Loader = ({
  noText = false,
  title = 'Loading...',
  className,
  'data-testid': dataTestId = 'loader'
}: LoaderUIType) => {
  return (
    <PageState
      title={noText ? '' : title}
      iconClass='text-primary fa-spin'
      data-testId={dataTestId}
      icon={faCircleNotch}
      className={className}
    />
  );
};
