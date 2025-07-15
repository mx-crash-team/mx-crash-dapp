import { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { useRegisterWebsocketStatusListener, useRegisterWebsocketHistoryListener } from 'hooks/websocketListener';
import { setWebsocketHistory } from 'redux/slices';
import { WSBidType } from 'types';
import { websocketStatusSelector } from 'redux/selectors';
import { FormatAmount } from 'components';
import { Trim } from '@multiversx/sdk-dapp/UI';
import { DECIMALS } from '@multiversx/sdk-dapp/constants';
import { formatBigNumber } from 'helpers';

export const History = () => {
  const dispatch = useDispatch();
  const [history, setHistory] = useState<WSBidType[]>([]);
  const wsStatus = useSelector(websocketStatusSelector);

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
  useEffect(() => {
    loadHistory();
    return () => {
      isMounted.current = false;
    };
  }, [loadHistory]);

  const onMessage = useCallback((message: { data: any[] }) => {
    setHistory(prevHistory => {
      const newEntries: WSBidType[] = message.data.map((evt: any): WSBidType => ({
        address: evt.winner.bech32,
        bet: evt.prize,
        cash_out: evt.cash_out,
        timestamp: evt.timestamp
      }));
      const filtered = newEntries.filter(
        (entry: WSBidType) => !prevHistory.some((prev: WSBidType) => prev.address === entry.address)
      );
      return [...filtered, ...prevHistory]
        .sort((a, b) => b.timestamp - a.timestamp);
    });
  }, []);

  const onStatusMessage = useCallback((message: any) => {
    let payload = message;
    if (Array.isArray(payload)) {
      payload = payload[0];
    }
    const status = payload?.status;
    if (!status) {
      return;
    }
    if (status === 'Awarding' || status === 'Ended') {
      dispatch(setWebsocketHistory(null));
    }
    if (status === 'Starting' || status === 'Started') {
      setHistory([]);
      loadHistory();
    }
  }, [dispatch, loadHistory]);

useRegisterWebsocketHistoryListener(onMessage);
useRegisterWebsocketStatusListener(onStatusMessage);

  useEffect(() => {
    if (!wsStatus?.data) {
      return;
    }
    // unwrap status payload
    let payload = wsStatus.data.data;
    if (Array.isArray(payload)) {
      payload = payload[0];
    }
    const status = payload?.status;
    if (status === 'Ended') {
      setHistory([]);
      loadHistory();
    }
  }, [wsStatus, loadHistory]);

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
          <tbody className='text-center'>
            {history
              .filter(entry => entry.address && entry.bet != null && entry.cash_out != null)
              .map(({ address, cash_out, bet }, index) => {
              return (
                <tr key={`${address}-${index}`}>
                <td className='header-user-address-trim'>
                  {address.length > 9
                    ? `${address.slice(0, 6)}...${address.slice(-3)}`
                    : address}
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
