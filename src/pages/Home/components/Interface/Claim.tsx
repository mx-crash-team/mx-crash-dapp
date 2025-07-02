import { useDispatch } from 'react-redux';

import { Confetti } from 'components';
import { useGetClaimableAmount } from 'hooks';
import { useSendClaimTransaction } from 'hooks/useSendClaimTransaction';
import { useRegisterWebsocketEventListener } from 'hooks/websocketListener';
import { setWebsocketEvent } from 'redux/slices';

export const Claim = () => {
  const dispatch = useDispatch();
  const { claimableAmount, getClaimableAmount } = useGetClaimableAmount();
  const { sendClaimTransactionFromAbi } = useSendClaimTransaction();

  const onMessage = async (message: any) => {
    if (message?.message === 'onStartNewGame') {
      await getClaimableAmount();
      dispatch(setWebsocketEvent(null));
      return;
    }
  };

  useRegisterWebsocketEventListener(onMessage);

  const onSubmit = async () => {
    await sendClaimTransactionFromAbi({});
  };

  if (claimableAmount !== '0') {
    return (
      <>
        <Confetti />
        <button type='button' className='btn btn-dark' onClick={onSubmit}>
          Claim
        </button>
      </>
    );
  }

  return null;
};
