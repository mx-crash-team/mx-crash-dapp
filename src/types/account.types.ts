export interface AccountStateType {
  identity: {
    isFetched: boolean | undefined;
    identity: AccountIdentityType | undefined;
  };
}

export interface SetAccountIdentityType {
  identity: AccountIdentityType;
  isFetched: boolean;
}

// Account Identity

export interface SocialLinkType {
  type: string;
  url: string;
}

export interface IdentityImageType {
  url: string;
  lastModifiedDate?: string;
  fileId?: string;
  isNftOwned?: boolean;
}

export enum PrivacyEnum {
  public = 'public',
  private = 'private'
}

export interface AccountIdentityType {
  address: string;
  cover: IdentityImageType;
  description: string;
  herotag: string;
  privacy: PrivacyEnum;
  profile: IdentityImageType;
  socialLinks: [SocialLinkType];
}
