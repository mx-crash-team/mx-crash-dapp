import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { websocketEventSelector } from 'redux/selectors';
import { useInitializeWebsocketConnection } from './useInitializeWebsocketConnection';

export function useRegisterWebsocketEventListener(
  onMessage: (message: any) => void
) {
  useInitializeWebsocketConnection();
  const websocketEvent = useSelector(websocketEventSelector);

  useEffect(() => {
    const message = websocketEvent?.message;

    if (message) {
      onMessage(message);
    }
  }, [onMessage, websocketEvent]);
}
