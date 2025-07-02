import { LoginMethodsEnum } from '@multiversx/sdk-dapp/types/enums.types';
import { logout } from '@multiversx/sdk-dapp/utils';
import { getIsProviderEqualTo } from '@multiversx/sdk-dapp/utils/account/getIsProviderEqualTo';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { resetState } from 'redux/slices';
import { routeNames } from 'routes';
import { storage } from 'storage';

interface UseLogoutPropsType {
  shouldAttemptReLogin: boolean;
}

export const useLogout = (props?: UseLogoutPropsType) => {
  const shouldAttemptReLogin = props?.shouldAttemptReLogin !== false;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isExternalProvider = getIsProviderEqualTo(LoginMethodsEnum.extra);
  const willReLoginWithXPortal = shouldAttemptReLogin && isExternalProvider;

  return async (callbackUrl?: string, pathname?: string) => {
    try {
      if (!willReLoginWithXPortal) {
        dispatch(resetState);
        const walletconnectV2Keys = storage.local.getKeys('wc@2');
        storage.local.clear(['accessToken', ...walletconnectV2Keys]);
      }

      await logout(
        callbackUrl,
        () => {
          navigate(pathname ? pathname : routeNames.home);
        },
        willReLoginWithXPortal
      );
    } catch (err) {
      console.error('Unable to logout from dapp', err);
    }
  };
};
