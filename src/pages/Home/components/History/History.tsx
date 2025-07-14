import { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

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

  // reusable history loader
  const isMounted = useRef(true);
  const loadHistory = useCallback(async () => {
    try {
      const resp = await axios.get('/winners/history');
      const data = resp.data as any[];
      // map and sort initial history by timestamp desc
      const initial: WSBidType[] = data
        .map(evt => ({
          address: evt.winner?.bech32 ?? evt.address,
          bet: evt.prize ?? evt.bet,
          cash_out: evt.cash_out,
          timestamp: evt.timestamp
        }))
        .sort((a, b) => b.timestamp - a.timestamp);
      if (isMounted.current) {
        setHistory(initial);
      }
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  }, []);
  // load initial history on mount
  useEffect(() => {
    loadHistory();
    return () => {
      isMounted.current = false;
    };
  }, [loadHistory]);

  const onMessage = useCallback((message: { data: any[] }) => {
    setHistory(prevHistory => {
      // normalize incoming winner events to match WSBidType shape
      // normalize and include timestamp
      const newEntries: WSBidType[] = message.data.map((evt: any): WSBidType => ({
        address: evt.winner.bech32,
        bet: evt.prize,
        cash_out: evt.cash_out,
        timestamp: evt.timestamp
      }));
      // filter out duplicates by address
      const filtered = newEntries.filter(
        (entry: WSBidType) => !prevHistory.some((prev: WSBidType) => prev.address === entry.address)
      );
      // merge and sort by timestamp desc
      return [...filtered, ...prevHistory]
        .sort((a, b) => b.timestamp - a.timestamp);
    });
  }, []);

  const onStatusMessage = useCallback((message: any) => {
    const status = message?.data?.status;
    if (status === 'Awarding' || status === 'Ended') {
      // clear global redux history but retain the displayed history table
      dispatch(setWebsocketHistory(null));
    }
    // on new round start, reload history
    if (status === 'Starting' || status === 'Started') {
      setHistory([]);
      loadHistory();
    }
  }, [dispatch, loadHistory]);

useRegisterWebsocketHistoryListener(onMessage);
useRegisterWebsocketStatusListener(onStatusMessage);

  return (
    <section className='history border shadow-sm rounded'>
      <div className='table-responsive'>
        <table className='table table-striped table-component'>
          <thead className='thead-light'>
            <tr>
              <th>Player</th>
              <th>Crash Point</th>
              <th>Prize</th>
            </tr>
          </thead>
          <tbody>
            {history.map(({ address, cash_out, bet }, index) => {
              return (
                <tr key={`${address}-${index}`}>
                  <td>
                    <Trim text={address} className='header-user-address-trim' />
                  </td>
                  <td>{formatBigNumber({ value: cash_out / 100 })}</td>
                  <td>
                    <FormatAmount
                      value={bet}
                      decimals={DECIMALS}
                      digits={2}
                      showSymbol={false}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );

  };
