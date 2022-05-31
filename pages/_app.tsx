import React from 'react';
import { AppProps } from 'next/app';
import Meta from '../layout/meta';
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import '../style.css';

// const store: RootStoreType = new RootStore();

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Meta />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
};

export default MyApp;
