import { useState, useEffect } from 'react';
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
import axios from 'axios';
import { WSBidType } from 'types';

export const Table = () => {
  const dispatch = useDispatch();
  const [bids, setBids] = useState<WSBidType[]>([]);

  // Load initial list of current bets from the server
  useEffect(() => {
    const loadCurrentBets = async () => {
      try {
        const resp = await axios.get<WSBidType | WSBidType[]>('/bets/current');
        const fetched = resp.data;
        const initial = Array.isArray(fetched) ? fetched : [fetched];
        setBids(initial.filter(b => b && b.address));
      } catch (err) {
        console.error('Failed to fetch current bets:', err);
      }
    };

    loadCurrentBets();
  }, []);

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
      <div className='p-3'>
        <h3
          className='m-0 fs-5'
          style={{
            backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #da4453 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}
        >
          Current Bets
        </h3>
      </div>
      <div className='table-responsive'>
        <table className='table table-striped table-component'>
          <thead className='thead-light'>
            <tr>
              <th>Player</th>
              <th>Amount</th>
              <th>Crash Point</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {bids
              .filter(entry => entry.address && entry.bet != null && entry.cash_out != null)
              .map(({ address, cash_out, bet }, index) => {
              return (
                <tr key={`${address}-${index}`}>
                  <td>
                  {address?.length > 9
                    ? `${address.slice(0, 6)}...${address.slice(-3)}`
                    : address}
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
