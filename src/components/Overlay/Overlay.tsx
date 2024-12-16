import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { OverlayTriggerType } from 'react-bootstrap/esm/OverlayTrigger';
import { Placement } from 'react-bootstrap/esm/types';

interface OperlayPropsType {
  children: React.ReactNode;
  className?: string;
  placement?: Placement;
  title: React.ReactNode | string;
  tooltipClassName?: string;
  trigger?: OverlayTriggerType[];
}

export const Overlay = ({
  children,
  title,
  className,
  tooltipClassName,
  placement = 'top',
  trigger = ['hover', 'focus']
}: OperlayPropsType) => (
  <OverlayTrigger
    placement={placement}
    trigger={trigger}
    overlay={(props: any) => (
      <Tooltip
        {...(tooltipClassName ? { className: tooltipClassName } : {})}
        {...props}
        show={props.show.toString()}
      >
        {title}
      </Tooltip>
    )}
  >
    <div className={className ?? 'text-truncate'}>{children}</div>
  </OverlayTrigger>
);
