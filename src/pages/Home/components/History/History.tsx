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

  const onMessage = useCallback((message: any) => {
    setHistory(prevHistory => {
      const winnerAddress = message?.data?.[0]?.winner?.bech32;

      if (winnerAddress && prevHistory.length > 0) {
        const eventExists = prevHistory.some(
          ({ address }) => address === winnerAddress
        );
        if (eventExists) {
          return prevHistory;
        }
      }
      return [...message.data, ...prevHistory];
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
