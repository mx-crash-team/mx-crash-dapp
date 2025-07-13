import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useRegisterWebsocketChatListener, useRegisterWebsocketStatusListener } from 'hooks/websocketListener';
import { setWebsocketChat, setWebsocketHistory } from 'redux/slices';
import { WSBidType } from 'types';
import { userRegisterWebsocketHistoryListener } from 'hooks/websocketListener/useRegisterWebsocketHistoryListener';
import { FormatAmount } from 'components';
import { Trim } from '@multiversx/sdk-dapp/UI';
import { DECIMALS } from '@multiversx/sdk-dapp/constants';
import { formatBigNumber } from 'helpers';

export const History = () => {
  const dispatch = useDispatch();
  const [history, setHistory] = useState<WSBidType[]>([]);

  const onMessage = async (message: any) => {
    const address = message?.data[0]?.winner?.bech32;

    if (address && history.length > 0) {
      const eventExists = history.some(
        ({ address }) => address === address
      );
      if (eventExists) {
        return;
      }
    }
      const updateHistory = [...message.data, ...history];
      setHistory(updateHistory);
    }

  const onStatusMessage = (message: any) => {
    if (
      history.length > 0 &&
      (message?.data?.status === 'Awarding' ||
        message?.data?.status === 'Ended')
    ) {
      dispatch(setWebsocketHistory(null));
      setHistory([]);
      return;
    }
  };

    userRegisterWebsocketHistoryListener(onMessage);
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