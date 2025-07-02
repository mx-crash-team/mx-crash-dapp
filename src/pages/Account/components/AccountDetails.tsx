import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Trim } from '@multiversx/sdk-dapp/UI';

import { CopyButton } from 'components';

import { AccountImage } from './AccountImage';
import { WalletOverview } from './WalletOverview';

export const AccountDetails = () => {
  const { address } = useGetAccountInfo();

  return (
    <div className='card h-100'>
      <div className='card-header p-3 p-md-spacer pb-md-0'>
        <h4 className='mb-0'>Account</h4>
      </div>
      <div className='card-body p-3 p-md-spacer'>
        <div className='d-flex flex-row gap-3'>
          <AccountImage className='d-none d-lg-flex justify-content-center' />
          <div className='d-flex flex-column gap-1 address-wrapper'>
            <div className='trim-wrapper align-items-center gap-2 mb-2 mb-lg-0'>
              <AccountImage className='d-lg-none' />
              <Trim text={address} className='account-address' />
              <CopyButton text={address} />
            </div>
          </div>
        </div>
        <WalletOverview />
      </div>
    </div>
  );
};
