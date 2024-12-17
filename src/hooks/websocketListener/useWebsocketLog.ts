import { useRegisterWebsocketListener } from './useRegisterWebsocketListener';

export const useWebsocketLog = () => {
  const onMessage = (message: any) => {
    console.log('----', message);
  };

  useRegisterWebsocketListener(onMessage);
};
