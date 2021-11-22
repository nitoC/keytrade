import '../styles/globals.css'
import '../styles/Home.scss'
import '../styles/signin.scss'
import '../styles/signup.scss'
import '../styles/dashboard.scss'
import '../styles/services.scss'

import App from 'next/app'
import {Provider} from 'react-redux'
import React from 'react'
import withRedux, { createWrapper } from 'next-redux-wrapper';
import persist from './redux/Store';
import { PersistGate } from 'redux-persist/integration/react'

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const appProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        //console.log(appProps);

        return {
            appProps: appProps
        };
    }
    render() {
        const { Component, appProps } = this.props;
        return (
            <Provider store={persist.Store}>
                <PersistGate loading={null} persistor={persist.persistor}>
                <Component {...appProps} />
                </PersistGate>
            </Provider>
        );
    }
  }
    const makeStore = () => persist.Store;
const wrapper=createWrapper(makeStore)
export default wrapper.withRedux(MyApp);