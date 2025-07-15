import { useDispatch } from 'react-redux';

import { Confetti } from 'components';
import { useGetClaimableAmount } from 'hooks';
import { useSendClaimTransaction } from 'hooks/useSendClaimTransaction';
import { useRegisterWebsocketEventListener } from 'hooks/websocketListener';
import { setWebsocketEvent } from 'redux/slices';

interface ClaimProps {
  className?: string;
}
export const Claim = ({ className = '' }: ClaimProps) => {
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

  // Always show the Claim button; enable only when there's a non-zero amount
  return (
    <>
      {/* show confetti when claimable */}
      {claimableAmount !== '0' && <Confetti />}
      <button
        type='button'
        className={`btn btn-dark ${className}`}
        onClick={onSubmit}
        disabled={claimableAmount === '0'}
      >
        Claim
      </button>
    </>
  );
};
