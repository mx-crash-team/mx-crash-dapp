import { ReactNode, useState } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WithClassnameType } from '@multiversx/sdk-dapp/UI/types';
import classNames from 'classnames';

import { copyTextToClipboard } from './helpers/copyToClipboard';

interface CopyButtonType extends WithClassnameType {
  text: string;
  children?: ReactNode;
  copyIcon?: IconDefinition;
  successIcon?: IconDefinition;
}

export const CopyButton = ({
  text,
  copyIcon = faCopy,
  successIcon = faCheck,
  children,
  className = ''
}: CopyButtonType) => {
  const [copyResult, setCopyResut] = useState({
    default: true,
    success: false
  });

  const handleCopyToClipboard = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const noSpaces = text ? text.trim() : text;
    setCopyResut({
      default: false,
      success: await copyTextToClipboard(noSpaces)
    });

    setTimeout(() => {
      setCopyResut({
        default: true,
        success: false
      });
    }, 1000);
  };

  return (
    <button
      type='button'
      onClick={handleCopyToClipboard}
      className={classNames(className, {
        'btn-unstyled d-flex align-items-center text-neutral-400': !children
      })}
    >
      {children}
      {copyResult.default || !copyResult.success ? (
        <FontAwesomeIcon icon={copyIcon} />
      ) : (
        <FontAwesomeIcon icon={successIcon} className='text-primary' />
      )}
    </button>
  );
};
