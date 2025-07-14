import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useRegisterWebsocketStatusListener, useRegisterWebsocketHistoryListener } from 'hooks/websocketListener';
import { setWebsocketHistory } from 'redux/slices';
import { WSBidType } from 'types';
import { FormatAmount } from 'components';
import { Trim } from '@multiversx/sdk-dapp/UI';
import { DECIMALS } from '@multiversx/sdk-dapp/constants';
import { formatBigNumber } from 'helpers';

export const History = () => {
  const dispatch = useDispatch();
  const [history, setHistory] = useState<WSBidType[]>([]);

  const onMessage = useCallback((message: { data: any[] }) => {
    setHistory(prevHistory => {
      // normalize incoming winner events to match WSBidType shape
      const newEntries: WSBidType[] = message.data.map((evt: any): WSBidType => ({
        address: evt.winner.bech32,
        bet: evt.prize,
        cash_out: evt.cash_out
      }));
      // filter out duplicates by address
      const filtered = newEntries.filter(
        (entry: WSBidType) => !prevHistory.some((prev: WSBidType) => prev.address === entry.address)
      );
      return [...filtered, ...prevHistory];
    });
  }, []);

  const onStatusMessage = useCallback((message: any) => {
    const status = message?.data?.status;
    if (status === 'Awarding' || status === 'Ended') {
      // clear global redux history but retain the displayed history table
      dispatch(setWebsocketHistory(null));
    }
  }, [dispatch]);

useRegisterWebsocketHistoryListener(onMessage);
useRegisterWebsocketStatusListener(onStatusMessage);

  return (
    <section className='history border shadow-sm rounded'>
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
            {history.map(({ address, bet, cash_out }, index) => {
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
