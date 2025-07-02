import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApiRequests, useIsAuthenticated } from 'hooks';
import { accountIdentitySelector } from 'redux/selectors';
import { setAccountIdentity } from 'redux/slices';

export const useFetchUserInfo = () => {
  const dispatch = useDispatch();
  const { getUserInfo } = useApiRequests();
  const isAuthenticated = useIsAuthenticated();
  const { isFetched } = useSelector(accountIdentitySelector);

  const fetchUserInfo = () => {
    getUserInfo().then((response) => {
      if (response?.success && response.data) {
        dispatch(setAccountIdentity(response.data));
      }
    });
  };

  useEffect(() => {
    if (!isAuthenticated || isFetched) return;

    fetchUserInfo();
  }, [isAuthenticated, isFetched]);
};
