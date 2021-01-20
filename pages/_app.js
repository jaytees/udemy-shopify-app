import App from 'next/app';
import Head from 'next/head';
import React from 'react';
// wraps your component / application, so polaris available to whole app
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
// manadatory to use translations
import translations from '@shopify/polaris/locales/en.json';
import { Provider } from '@shopify/app-bridge-react';
import Cookies from 'js-cookies';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    console.log(Cookies);
    const config = { apiKey: API_KEY, shopOrigin: Cookies.getItem('shopOrigin'), forceRedirect: true };
    return (
      <React.Fragment>
        <Head>
          <title>Sample App</title>
          <meta charSet="utf-8" />
        </Head>
        <Provider config={config}>
          <AppProvider i18n={translations}>
            <Component {...pageProps} />
          </AppProvider>
        </Provider>
      </React.Fragment>
    );
  }
}

export default MyApp;
