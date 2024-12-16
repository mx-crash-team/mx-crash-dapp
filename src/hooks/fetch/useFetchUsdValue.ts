import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useApiRequests, useIsAuthenticated } from 'hooks';
import { setUsdValue } from 'redux/slices/appSlice';

export const useFetchUsdValue = () => {
  const dispatch = useDispatch();
  const { getUsdPrice } = useApiRequests();
  const isAuthenticated = useIsAuthenticated();

  const fetchUsdValue = () => {
    getUsdPrice().then(({ success, data }) => {
      if (success && data?.price) {
        dispatch(setUsdValue(data.price));
      }
    });
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchUsdValue();
  }, [isAuthenticated]);
};
