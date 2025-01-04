import '@/styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import store, { persistor } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>My App</title>
            </Head>

            <Provider store={store}>
                {/* Wrap the app with PersistGate */}
                <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                    <div className="app-wrapper">
                        <main className="app-content">
                            <Component {...pageProps} />
                        </main>
                    </div>
                </PersistGate>
            </Provider>
        </>
    );
}