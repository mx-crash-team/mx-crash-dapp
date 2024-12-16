import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { dappOriginSelector } from 'redux/selectors';
import { routeNames } from 'routes';

export const ModalContainer = ({
  title,
  footer,
  centered = true,
  className = '',
  children
}: {
  title?: string | React.ReactNode;
  footer?: string | React.ReactNode;
  centered?: boolean;
  className?: string;
  children: React.ReactNode;
}) => {
  const dappOrigin = useSelector(dappOriginSelector);
  const [close, setClose] = useState(false);

  const handleClose = () => {
    setClose(true);
  };

  useEffect(() => {
    return () => {
      setClose(false);
    };
  }, []);

  const closeRoute =
    !dappOrigin.pathname || dappOrigin.pathname === routeNames.unlock
      ? routeNames.home
      : dappOrigin.pathname;

  return close ? (
    <Navigate
      to={{
        pathname: closeRoute,
        search: dappOrigin.search
      }}
    />
  ) : (
    <Modal
      show={true}
      keyboard={false}
      backdrop='static'
      onHide={handleClose}
      className={className}
      animation={false}
      centered={centered}
    >
      <Modal.Header closeButton closeVariant='white'>
        {title}
      </Modal.Header>

      <Modal.Body className='p-3 p-sm-spacer shadow'>{children}</Modal.Body>
      {footer && (
        <Modal.Footer className='pt-0 px-3 pb-3 px-sm-spacer pb-sm-spacer border-0'>
          {footer}
        </Modal.Footer>
      )}
    </Modal>
  );
};
