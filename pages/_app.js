import App from 'next/app';
import Head from 'next/head';
import React from 'react';
// wraps your component / application, so polaris available to whole app
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
// manadatory to use translations
import translations from '@shopify/polaris/locales/en.json';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Sample App</title>
          <meta charSet="utf-8" />
        </Head>
        <AppProvider i18n={translations}>
          <Component {...pageProps} />
        </AppProvider>
      </React.Fragment>
    );
  }
}

export default MyApp;
