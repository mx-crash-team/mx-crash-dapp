import { Loader } from 'components';
import { useFetchUserTokens } from 'hooks';

import { TokenRow } from './components';

export const WalletOverview = () => {
  const { usdAccountValue, accountTokens, isDataReady } = useFetchUserTokens();

  if (!isDataReady) {
    return <Loader />;
  }

  return (
    <div className='d-flex flex-column'>
      <h5 className='text-underline mt-spacer mb-0'>Wallet</h5>
      <h1 className='my-3'>{usdAccountValue}</h1>

      <div className='d-flex flex-column gap-2 wallet-overview-token-list'>
        {accountTokens.map((token, index) => (
          <TokenRow token={token} key={`${token?.identifier}-${index}`} />
        ))}
      </div>
    </div>
  );
};
