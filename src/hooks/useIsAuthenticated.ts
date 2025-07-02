import { useGetLoginInfo, useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';

export const useIsAuthenticated = () => {
  const { isLoggedIn } = useGetLoginInfo();
  const { address } = useGetAccountInfo();

  return isLoggedIn && Boolean(address);
};
