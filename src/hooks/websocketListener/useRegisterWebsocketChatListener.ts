import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { websocketChatSelector } from 'redux/selectors';
import { useInitializeWebsocketConnection } from './useInitializeWebsocketConnection';

export function useRegisterWebsocketChatListener(
  onMessage: (message: any) => void
) {
  useInitializeWebsocketConnection();
  const websocketChat = useSelector(websocketChatSelector);

  useEffect(() => {
    const message = websocketChat?.data;

    if (message) {
      onMessage(message);
    }
  }, [onMessage, websocketChat]);
}
