import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { websocketNewBetsSelector } from 'redux/selectors';
import { useInitializeWebsocketConnection } from './useInitializeWebsocketConnection';

export function useRegisterWebsocketNewBetsListener(
  onMessage: (message: any) => void
) {
  useInitializeWebsocketConnection();
  const websocketNewBets = useSelector(websocketNewBetsSelector);

  useEffect(() => {
    const message = websocketNewBets?.data;

    if (message) {
      onMessage(message);
    }
  }, [onMessage, websocketNewBets]);
}
