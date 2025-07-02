import {
  EsdtEnumType,
  NftEnumType
} from '@multiversx/sdk-dapp/types/tokens.types';

export interface AssetsType {
  website?: string;
  description?: string;
  status?: string;
  pngUrl?: string;
  svgUrl?: string;
  social?: any;
}

export interface PartialTokenType {
  identifier: string;
  name: string;
  balance: string | null;
  ticker: string;
  assets?: AssetsType;
}

// includes MetaEsdts and egld exception
export interface PartialEsdtType extends PartialTokenType {
  decimals: number;
  type: EsdtEnumType | NftEnumType | 'native' | string;
  price?: string | number;
  nonce?: number;
}

export interface PartialNftType extends PartialTokenType {
  type: NftEnumType | string;
  nonce?: number;
}

export interface ProcessedFormTokenType {
  tokenAmount: string;
  tokenIdentifier: string;
  tokenDecimals: number;
  tokenType: EsdtEnumType | NftEnumType | 'native' | string;
  tokenNonce: number;
}
