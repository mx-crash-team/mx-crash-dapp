import { useSelector } from 'react-redux';
import { websocketEventSelector } from 'redux/selectors';

export const useGetWebsocketEvent = () => {
  return useSelector(websocketEventSelector);
};
