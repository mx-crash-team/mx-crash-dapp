import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { websocketHistorySelector } from 'redux/selectors';
import { useInitializeWebsocketConnection } from './useInitializeWebsocketConnection';

export function useRegisterWebsocketHistoryListener(
  onMessage: (message: any) => void
) {
  useInitializeWebsocketConnection();
  const websocketHistory = useSelector(websocketHistorySelector);

  useEffect(() => {
    const message = websocketHistory?.data;

    if (message) {
      onMessage(message);
    }
  }, [onMessage, websocketHistory]);
}
