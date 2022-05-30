import React from 'react';
import { RootStoreType } from '../interface';
import { RootProvider } from '../store/rootContext';
import { RootStore } from '../store/rootStore';
import { AppProps } from 'next/app';
import Meta from '../layout/meta';
import Layout from '../components/Layout';
import '../style.css';

const store: RootStoreType = new RootStore();

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <RootProvider value={store}>
        <Layout>
          <Meta />
          <Component {...pageProps} />
        </Layout>
      </RootProvider>
    </>
  );
};

export default MyApp;
