import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { websocketStatusSelector } from 'redux/selectors';
import { useInitializeWebsocketConnection } from './useInitializeWebsocketConnection';

export function useRegisterWebsocketStatusListener(
  onMessage: (message: any) => void
) {
  useInitializeWebsocketConnection();
  const websocketStatus = useSelector(websocketStatusSelector);

  useEffect(() => {
    const message = websocketStatus?.data;

    if (message) {
      onMessage(message);
    }
  }, [onMessage, websocketStatus]);
}
