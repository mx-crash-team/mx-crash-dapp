import {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal
} from '@multiversx/sdk-dapp/UI';
import { DappProvider } from '@multiversx/sdk-dapp/wrappers';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { Layout, PageNotFound } from 'components';
import { environment, network, walletConnectV2ProjectId } from 'config';
import { persistor, store } from 'redux/store';
import routes from 'routes';

import 'assets/scss/theme.scss';

export const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <DappProvider
            environment={environment}
            customNetworkConfig={{
              apiAddress: network.apiAddress,
              walletConnectV2ProjectId
            }}
            dappConfig={{ shouldUseWebViewProvider: true }}
          >
            <Layout>
              <TransactionsToastList />
              <NotificationModal />
              <SignTransactionsModals className='sign-tx-modal' />
              <Routes>
                {routes.map((route, i) => {
                  return (
                    <Route
                      path={route.path}
                      key={route.path + i}
                      element={<route.component />}
                    />
                  );
                })}
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </Layout>
          </DappProvider>
        </PersistGate>
      </Provider>
    </Router>
  );
};
