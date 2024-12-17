import { useSendClaimTransaction } from 'hooks/useSendClaimTransaction';

export const Claim = () => {
  const { sendClaimTransactionFromAbi } = useSendClaimTransaction();

  const onSubmit = async () => {
    await sendClaimTransactionFromAbi({});
  };

  return (
    <button type='button' className='btn btn-dark' onClick={onSubmit}>
      Claim
    </button>
  );
};
