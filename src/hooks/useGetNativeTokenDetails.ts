import { DECIMALS } from '@multiversx/sdk-dapp/constants';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { TokenType } from '@multiversx/sdk-dapp/types/tokens.types';
import { useSelector } from 'react-redux';
import { usdValueSelector } from 'redux/selectors';
import { useGetEgldLabel } from './get';

export const useGetNativeTokenDetails = () => {
  const {
    network: { decimals }
  } = useGetNetworkConfig();
  const egldLabel = useGetEgldLabel();
  const usdValue = useSelector(usdValueSelector);
  const description = `The MultiversX eGold (${egldLabel}) Token is native to the MultiversX Network and will be used for everything from staking, governance, transactions, smart contracts and validator rewards.`;

  const assets = {
    name: egldLabel,
    description,
    website: 'https://multiversx.com/',
    svgUrl: '/assets/images/egld-token-icon.svg',
    social: {
      blog: 'https://multiversx.com/blog',
      x: 'https://x.com/MultiversX',
      telegram: 'https://t.me/MultiversX',
      discord: 'https://discord.com/invite/multiversxbuilders',
      facebook: 'https://www.facebook.com/MultiversX/',
      linkedin: 'https://www.linkedin.com/company/multiversx'
    }
  };

  return {
    identifier: egldLabel,
    ticker: egldLabel,
    name: egldLabel,
    decimals: Number(decimals ?? DECIMALS),
    price: usdValue,
    assets
  } as unknown as TokenType;
};
