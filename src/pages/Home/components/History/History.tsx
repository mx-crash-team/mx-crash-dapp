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
    // message is the data payload from server; may be array or object
    let payload = message;
    if (Array.isArray(payload)) {
      payload = payload[0];
    }
    const status = payload?.status;
    if (!status) {
      return;
    }
    // clear redux history on awarding or end of round
    if (status === 'Awarding' || status === 'Ended') {
      dispatch(setWebsocketHistory(null));
    }
    // on new round start, clear and reload history
    if (status === 'Starting' || status === 'Started') {
      setHistory([]);
      loadHistory();
    }
  }, [dispatch, loadHistory]);

useRegisterWebsocketHistoryListener(onMessage);
useRegisterWebsocketStatusListener(onStatusMessage);

  // reload history when a new round starts (via websocket status)
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
          <tbody>
            {history
              .filter(entry => entry.address && entry.bet != null && entry.cash_out != null)
              .map(({ address, cash_out, bet }, index) => {
              return (
                <tr key={`${address}-${index}`}>
                <td className='header-user-address-trim'>
                  {/* show first 6 and last 3 chars of address */}
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
