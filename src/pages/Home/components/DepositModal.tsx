import { useState } from 'react';
import { WithClassnameType } from '@multiversx/sdk-dapp/UI/types';
import classNames from 'classnames';
import { Modal } from 'react-bootstrap';

import { Deposit } from './Deposit';

export const DepositModal = ({ className }: WithClassnameType) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        type='button'
        className={classNames('btn btn-sm btn-white', className)}
        onClick={() => setShowModal(true)}
      >
        Deposit
      </button>
      {showModal && (
        <Modal
          show={showModal}
          backdrop={true}
          onHide={() => setShowModal(false)}
          className='deposit-modal'
          animation={false}
          centered={true}
        >
          <Modal.Header
            closeButton
            closeVariant='white'
            className='align-items-start'
          >
            <h3>Deposit EGLD</h3>
            <h6 className='text-neutral-400'>
              Deposit EGLD to your MultiversX Wallet to start trading.
            </h6>
          </Modal.Header>
          <Modal.Body className='p-1 p-md-3 shadow deposit-modal'>
            <Deposit />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
