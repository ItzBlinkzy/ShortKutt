import React, {ReactNode} from 'react';
import Head from 'next/head';
import Footer from './Footer';
import Hero from './Hero';
import Header from './Header';

type Props = {
    children?: ReactNode;
    title?: string;
};

const Layout = ({children, title = 'ShortKutt - URL Shortener'}: Props) => (
    <div className="font-sans">
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="icon" type="image/png" href="/static/logo.png"></link>
        </Head>
        <div className="">
            {<Hero />}
            {children}
            {<Footer />}
        </div>
    </div>
);

export default Layout;
