import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GqlProvider } from "../services/gql";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GqlProvider>
      <Component {...pageProps} />
    </GqlProvider>
  );
}

export default MyApp;
