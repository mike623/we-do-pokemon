import "../styles/globals.css";
import "windi.css";
import type { AppProps } from "next/app";
import { GqlProvider } from "../services/gql";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GqlProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Component {...pageProps} />
    </GqlProvider>
  );
}

export default MyApp;
