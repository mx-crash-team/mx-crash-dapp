import { useCallback, useEffect, useRef } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { retryMultipleTimes } from '@multiversx/sdk-dapp/utils';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import { websocketUrl } from 'config';
import {
  setWebsocketEvent,
  setWebsocketStatus,
  setWebsocketNewBets
} from 'redux/slices';

import {
  websocketConnection,
  WebsocketConnectionStatusEnum
} from './websocketConnection';

const TIMEOUT = 3000;
const RECONNECTION_ATTEMPTS = 3;
const RETRY_INTERVAL = 500;
const MESSAGE_DELAY = 600;

const CONNECT = 'connect';
const DISCONNECT = 'disconnect';

export function useInitializeWebsocketConnection() {
  const messageTimeout = useRef<NodeJS.Timeout | null>(null);
  const address =
    'erd1deaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaqtv0gag';
  //const { address } = useGetAccountInfo();
  const dispatch = useDispatch();

  const handleMessageReceived = (message: any, data: any) => {
    console.log('--got message', message, data);
    if (messageTimeout.current) {
      clearTimeout(messageTimeout.current);
    }

    messageTimeout.current = setTimeout(() => {
      switch (message) {
        case 'onGameStatus':
          dispatch(setWebsocketStatus({ message, data }));
          return;
        case 'onNewBets':
          dispatch(setWebsocketNewBets({ message, data }));
          return;
        default:
          dispatch(setWebsocketEvent({ message, data }));
      }
    }, MESSAGE_DELAY);
  };

  const unsubscribeWS = () => {
    websocketConnection.current?.close();
    websocketConnection.current = null;
    websocketConnection.status = WebsocketConnectionStatusEnum.NOT_INITIALIZED;

    if (messageTimeout.current) {
      clearTimeout(messageTimeout.current);
    }
  };

  const initializeWebsocketConnection = useCallback(
    retryMultipleTimes(
      async () => {
        if (!address) {
          return;
        }

        // If there are many components that use this hook, the initialize method is triggered many times.
        // To avoid multiple connections to the same endpoint, we have to guard the initialization before the logic started
        websocketConnection.status = WebsocketConnectionStatusEnum.PENDING;

        if (websocketUrl == null) {
          console.warn('Can not get websocket url');
          return;
        }

        websocketConnection.current = io(websocketUrl, {
          forceNew: true,
          reconnectionAttempts: RECONNECTION_ATTEMPTS,
          timeout: TIMEOUT,
          query: {
            address:
              'erd1deaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaqtv0gag'
          }
        });

        websocketConnection.status = WebsocketConnectionStatusEnum.COMPLETED;

        websocketConnection.current.onAny(handleMessageReceived);

        websocketConnection.current.on(CONNECT, () => {
          console.log('Websocket connected !');
        });

        websocketConnection.current.on(DISCONNECT, () => {
          if (address) {
            // Make sure we are still logged in before retrying to connect to the websocket
            console.warn('Websocket disconnected. Trying to reconnect..!');

            setTimeout(() => {
              if (address) {
                // Make sure we are still logged in when the timeout is finished
                console.log('Websocket reconnecting..!');
                websocketConnection.current?.connect();
              }
            }, RETRY_INTERVAL);
          }
        });
      },
      {
        retries: 2,
        delay: RETRY_INTERVAL
      }
    ),
    [address]
  );

  useEffect(() => {
    if (
      address &&
      websocketConnection.status ===
        WebsocketConnectionStatusEnum.NOT_INITIALIZED &&
      !websocketConnection.current?.active
    ) {
      initializeWebsocketConnection();
      return;
    }

    if (!address) {
      // Close the websocket connection when we are not logged in
      unsubscribeWS();
    }
  }, [address, initializeWebsocketConnection]);

  useEffect(() => {
    return () => {
      unsubscribeWS();
    };
  }, []);
}
