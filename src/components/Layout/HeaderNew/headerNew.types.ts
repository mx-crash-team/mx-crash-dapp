import { WithClassnameType } from 'types';

export interface HeaderLinkUIType extends WithClassnameType {
  children?: React.ReactNode;
  title?: string;
  body?: string;
  link?: string;
  isExternal?: boolean;
  isActive?: boolean;
}
