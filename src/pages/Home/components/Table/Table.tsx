import { useState } from 'react';
import { DECIMALS } from '@multiversx/sdk-dapp/constants';
import { Trim } from '@multiversx/sdk-dapp/UI';

import { FormatAmount } from 'components';
import { formatBigNumber } from 'helpers';
import { useRegisterWebsocketListener } from 'hooks/websocketListener';
import { WSBidType } from 'types';

export const Table = () => {
  const [bids, setBids] = useState<WSBidType[]>([]);
  const onMessage = (message: any) => {
    if (
      message?.data?.status === 'Awarding' ||
      message?.data?.status === 'Ended'
    ) {
      setBids([]);
      return;
    }

    if (message?.message === 'onNewBets') {
      setBids([message.data, ...bids]);
    }
  };

  useRegisterWebsocketListener(onMessage);

  return (
    <section className='border shadow-sm rounded overflow-hidden '>
      <div className='table-responsive'>
        <table className='table table-striped table-component'>
          <thead className='thead-light'>
            <tr>
              <th>Player</th>
              <th>Amount</th>
              <th>Crash Point</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {bids.map(({ address, bet, cash_out }, index) => {
                return (
                  <tr key={`${address}-${index}`}>
                    <td>
                      <Trim
                        text={address}
                        className='header-user-address-trim'
                      />
                    </td>
                    <td>
                      <FormatAmount
                        value={bet}
                        decimals={DECIMALS}
                        digits={2}
                      />
                    </td>
                    <td>{formatBigNumber({ value: cash_out / 100 })}</td>
                  </tr>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
