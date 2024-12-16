import { useRegisterWebsocketListener } from './useRegisterWebsocketListener';

export const useWebsocketLog = () => {
  const onMessage = (message: string) => {
    console.log('----', message);
  };

  useRegisterWebsocketListener(onMessage);
};
