import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';

export const useGetEgldLabel = () => {
  const {
    network: { egldLabel }
  } = useGetNetworkConfig();

  return egldLabel ?? 'EGLD';
};
