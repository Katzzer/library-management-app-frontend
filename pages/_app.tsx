import '@/styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import store, { persistor } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Future Library</title>
            </Head>

            <Provider store={store}>
                <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                    <div className="app-wrapper">
                        <Header />

                        <main className="app-content">
                            <Component {...pageProps} />
                        </main>

                        <Footer />
                    </div>
                </PersistGate>
            </Provider>
        </>
    );
}