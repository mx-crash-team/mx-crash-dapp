export interface WithClassnameType {
  className?: string;
  'data-testid'?: string;
}

export interface RawTransactionType {
  value: string;
  receiver: string;
  gasPrice: number;
  gasLimit: number;
  data: string;
  chainID: string;
  version: number;
}

export interface AppStateType {
  dappOrigin: {
    pathname: string;
    search: string;
  };
  refetch: number;
  txSubmittedModal: {
    sessionId: string;
    submittedMessage: string;
  };

  usdValue?: number;
}
