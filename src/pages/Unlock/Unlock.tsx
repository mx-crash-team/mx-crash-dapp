import React, { useState } from 'react';
import { faArrowRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';
import { ExtensionLoginButton } from '@multiversx/sdk-dapp/UI/extension/ExtensionLoginButton';
import { LedgerLoginButton } from '@multiversx/sdk-dapp/UI/ledger/LedgerLoginButton';
import { WalletConnectLoginContainer } from '@multiversx/sdk-dapp/UI/walletConnect/WalletConnectLoginContainer';
import { CrossWindowLoginButton } from '@multiversx/sdk-dapp/UI/webWallet/CrossWindowLoginButton';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { ReactComponent as DeFiWallet } from 'assets/images/extension-defi-wallet.svg';
import { ReactComponent as LedgerWallet } from 'assets/images/ledger-wallet.svg';
import { ReactComponent as WebWallet } from 'assets/images/web-wallet.svg';
import { ModalContainer } from 'components';
import { network, environment } from 'config';
import { useIsAuthenticated } from 'hooks';
import { dappOriginSelector } from 'redux/selectors';
import { routeNames } from 'routes';

enum LoginContainersTypesEnum {
  walletConnect = 'walletConnect',
  ledger = 'ledger',
  none = 'none'
}

export const UnlockTitle = (
  <div className='unlock-title d-flex align-items-center mb-2'>
    Connect to a wallet
    <OverlayTrigger
      placement='top'
      delay={{ show: 250, hide: 400 }}
      overlay={(props) => (
        <Tooltip id='connect-to-wallet-tooltip' {...props}>
          Connect securely using one of the provided options
        </Tooltip>
      )}
    >
      <FontAwesomeIcon
        icon={faInfoCircle}
        className='i-icon text-neutral-400 ms-2 mt-1'
      />
    </OverlayTrigger>
  </div>
);

export const Unlock = ({
  plainForm,
  tutorialInfo,
  fullForm
}: {
  plainForm?: boolean;
  tutorialInfo?: boolean;
  fullForm?: boolean;
}) => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const { isLoggedIn } = useGetLoginInfo();

  const dappOrigin = useSelector(dappOriginSelector);
  const [openedLoginContainerType, setOpenedContainerType] = useState(
    LoginContainersTypesEnum.none
  );

  const isMainnet =
    String(environment) === 'mainnet' &&
    !import.meta.env.VITE_APP_SHARE_PREFIX &&
    import.meta.env.PROD;

  const showFullForm = fullForm || !isMainnet;

  const loginParams = {
    callbackRoute: dappOrigin.pathname,
    logoutRoute: routeNames.home,
    redirectAfterLogin: false,
    wrapContentInsideModal: false,
    hideButtonWhenModalOpens: true,
    shouldRenderDefaultCss: false,
    className: 'login-btn',
    onLoginRedirect: (route: any) => {
      navigate(route);
    }
  };

  function handleOpenLedgerLogin() {
    setOpenedContainerType(LoginContainersTypesEnum.ledger);
  }

  function getLoginTitle() {
    switch (openedLoginContainerType) {
      case LoginContainersTypesEnum.walletConnect:
        return 'xPortal Login';
      case LoginContainersTypesEnum.ledger:
        return 'Login with Ledger';
      default:
        return UnlockTitle;
    }
  }

  function renderLoginButton(
    content: React.ReactNode,
    containerType = LoginContainersTypesEnum.none
  ) {
    const shouldRender =
      openedLoginContainerType == LoginContainersTypesEnum.none ||
      containerType === openedLoginContainerType;

    return shouldRender ? content : null;
  }

  if (isLoggedIn || isAuthenticated) {
    return (
      <Navigate
        to={
          dappOrigin.pathname && dappOrigin.pathname !== routeNames.unlock
            ? dappOrigin.pathname
            : routeNames.home
        }
        replace
      />
    );
  }

  const getLoginForm = () => {
    return (
      <div className='unlock-page'>
        {!fullForm && (
          <WalletConnectLoginContainer
            {...loginParams}
            loginButtonText='xPortal'
          />
        )}

        {showFullForm &&
          renderLoginButton(
            <ExtensionLoginButton {...loginParams}>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex flex-row method'>
                  <div className='title d-flex align-items-center'>
                    <DeFiWallet
                      className='app-icon me-2'
                      height='20'
                      style={{ width: '1.8rem' }}
                    />
                    MultiversX DeFi Wallet
                  </div>
                </div>

                <FontAwesomeIcon icon={faArrowRight} className='arrow' />
              </div>
            </ExtensionLoginButton>
          )}

        {showFullForm &&
          renderLoginButton(
            <LedgerLoginButton
              loginButtonText={''}
              onContentShow={handleOpenLedgerLogin}
              innerLedgerComponentsClasses={{
                ledgerProgressBarClassNames: {
                  ledgerProgressBarThumbClassName: 'ledger-progressbar-thumb',
                  ledgerProgressBarTrackClassName: 'ledger-progressbar-track'
                },
                addressTableClassNames: {
                  ledgerModalTableItemClassName: 'ledger-address-row',
                  ledgerModalTableSelectedItemClassName:
                    'ledger-address-row-selected',
                  ledgerModalTableHeadClassName: 'ledger-address-header',
                  ledgerModalTableNavigationButtonClassName:
                    'ledger-address-navigation-button'
                },
                ledgerConnectClassNames: {
                  ledgerModalButtonClassName: 'ledger-connect-button',
                  ledgerModalIconClassName: 'ledger-connect-icon'
                },
                confirmAddressClassNames: {
                  ledgerModalConfirmDescriptionClassName:
                    'ledger-confirm-address-description',
                  ledgerModalConfirmFooterClassName:
                    'ledger-confirm-address-footer',
                  ledgerModalConfirmDataClassName: 'ledger-confirm-address-data'
                }
              }}
              {...loginParams}
            >
              <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex flex-row method'>
                  <div className='title d-flex align-items-center'>
                    <LedgerWallet
                      className='ledger-icon  me-2'
                      height='20'
                      style={{ width: '1.8rem' }}
                    />
                    Ledger
                  </div>
                </div>

                <FontAwesomeIcon icon={faArrowRight} className='arrow' />
              </div>
            </LedgerLoginButton>,
            LoginContainersTypesEnum.ledger
          )}

        {showFullForm &&
          renderLoginButton(
            <>
              <CrossWindowLoginButton {...loginParams}>
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='d-flex flex-row method'>
                    <div className='title d-flex align-items-center'>
                      <WebWallet
                        className='wallet-icon me-2'
                        height='20'
                        style={{ width: '1.8rem' }}
                      />
                      MultiversX Web Wallet
                    </div>
                  </div>
                  <FontAwesomeIcon icon={faArrowRight} className='arrow' />
                </div>
              </CrossWindowLoginButton>
            </>
          )}
        {!tutorialInfo && (
          <>
            <div className='mt-spacer text-center'>
              <span className='text-secondary'>New to MultiversX?</span>
            </div>
            <div className='mt-1 text-center'>
              <a
                className='link-style'
                href={`${network.walletAddress}/create`}
                {...{ target: '_blank' }}
              >
                Learn How to setup a wallet
              </a>
            </div>
          </>
        )}
      </div>
    );
  };
  if (plainForm) {
    return <>{getLoginForm()}</>;
  }
  return (
    <ModalContainer title={getLoginTitle()} className='unlock-modal'>
      {getLoginForm()}
    </ModalContainer>
  );
};
