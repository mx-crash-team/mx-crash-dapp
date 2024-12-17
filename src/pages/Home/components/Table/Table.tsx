import { useState } from 'react';
import { DECIMALS } from '@multiversx/sdk-dapp/constants';
import { Trim } from '@multiversx/sdk-dapp/UI';
import { useDispatch } from 'react-redux';

import { FormatAmount } from 'components';
import { formatBigNumber } from 'helpers';
import {
  useRegisterWebsocketNewBetsListener,
  useRegisterWebsocketStatusListener
} from 'hooks/websocketListener';
import { setWebsocketNewBets } from 'redux/slices';
import { WSBidType } from 'types';

export const Table = () => {
  const dispatch = useDispatch();
  const [bids, setBids] = useState<WSBidType[]>([]);

  const onMessage = (message: any) => {
    const currentAddress = message?.data?.[0]?.address;
    if (currentAddress && bids.length > 0) {
      const eventExists = bids.some(
        ({ address }) => address === currentAddress
      );
      if (eventExists) {
        return;
      }
    }

    const updatedBids = [...message.data, ...bids];
    setBids(updatedBids);
  };

  const onStatusMessage = (message: any) => {
    if (
      bids.length > 0 &&
      (message?.data?.status === 'Awarding' ||
        message?.data?.status === 'Ended')
    ) {
      dispatch(setWebsocketNewBets(null));
      setBids([]);
      return;
    }
  };

  useRegisterWebsocketNewBetsListener(onMessage);
  useRegisterWebsocketStatusListener(onStatusMessage);

  return (
    <section className='border shadow-sm rounded'>
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
            {bids.map(({ address, bet, cash_out }, index) => {
              return (
                <tr key={`${address}-${index}`}>
                  <td>
                    <Trim text={address} className='header-user-address-trim' />
                  </td>
                  <td>
                    <FormatAmount
                      value={bet}
                      decimals={DECIMALS}
                      digits={2}
                      showSymbol={false}
                    />
                  </td>
                  <td>{formatBigNumber({ value: cash_out / 100 })}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
