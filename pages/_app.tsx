import '@/styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import type {AppProps} from 'next/app';

import Head from "next/head";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>Library Management App</title>
            </Head>

            <main className="app-content">
                <Component {...pageProps} />
            </main>

        </>

    );
}