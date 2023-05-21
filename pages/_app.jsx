import "@/styles/globals.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import Header from "@/components/Header";

export default function App({ Component, pageProps }) {
    return (
        <MantineProvider>
            <Notifications position="top-right" />
            <Head>
                <title>Converse Shop</title>
            </Head>
            <Header />
            <Component {...pageProps} />
        </MantineProvider>
    );
}
