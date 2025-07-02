import { ReactNode } from 'react';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { WithClassnameType } from 'types';

export interface PageStateUIType extends WithClassnameType {
  icon?: IconProp;
  iconClass?: string;
  iconBgClass?: string;
  iconSize?: SizeProp;
  title?: ReactNode;
  titleClassName?: string;
  description?: ReactNode;
  descriptionClassName?: string;
  action?: ReactNode;
}

export const PageState = ({
  icon,
  iconClass,
  iconBgClass = '',
  iconSize = '5x',
  className = 'p-spacer',
  title,
  titleClassName = 'h4 mt-spacer mb-3',
  description,
  descriptionClassName = 'mb-spacer',
  action,
  'data-testid': dataTestId
}: PageStateUIType) => (
  <div
    className={classNames('page-state m-auto text-center', className)}
    data-testid={dataTestId}
  >
    {icon && (
      <span className={classNames('icon-state mx-auto', iconBgClass)}>
        <FontAwesomeIcon
          icon={icon}
          className={iconClass ? iconClass : ''}
          size={iconSize}
        />
      </span>
    )}
    {title && <p className={titleClassName}>{title}</p>}
    {description && <div className={descriptionClassName}>{description}</div>}
    {action && <>{action}</>}
  </div>
);
