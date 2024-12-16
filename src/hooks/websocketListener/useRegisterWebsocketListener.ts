import { useEffect } from 'react';

import { useGetWebsocketEvent } from './useGetWebsocketEvent';
import { useInitializeWebsocketConnection } from './useInitializeWebsocketConnection';

export function useRegisterWebsocketListener(
  onMessage: (message: string) => void
) {
  useInitializeWebsocketConnection();
  const websocketEvent = useGetWebsocketEvent();

  useEffect(() => {
    const message = websocketEvent?.message;

    if (message) {
      onMessage(message);
    }
  }, [onMessage, websocketEvent]);
}
