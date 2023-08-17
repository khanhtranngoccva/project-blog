import React from 'react';
import {
    Work_Sans,
    Spline_Sans_Mono,
} from 'next/font/google';
import clsx from 'clsx';

import {BLOG_TITLE} from '@/constants';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './styles.css';
import CustomMotionConfig from "src/components/CustomMotionConfig";
import DarkModeServerProvider from "@/components/DarkModeServerProvider";

const mainFont = Work_Sans({
    subsets: ['latin'],
    display: 'fallback',
    weight: 'variable',
    variable: '--font-family',
});
const monoFont = Spline_Sans_Mono({
    subsets: ['latin'],
    display: 'fallback',
    weight: 'variable',
    variable: '--font-family-mono',
});
export const metadata = {
    title: BLOG_TITLE
}

function RootLayout({children}) {
    return (
        <DarkModeServerProvider
            lang="en"
            className={clsx(mainFont.variable, monoFont.variable)}
        >
            <CustomMotionConfig>
                <body>
                    <Header/>
                    <main>{children}</main>
                    <Footer/>
                </body>
            </CustomMotionConfig>
        </DarkModeServerProvider>
    );
}

export default RootLayout;
