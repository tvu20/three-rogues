import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

import Loader from "../components/Loader";

import { usePageLoading } from "../utils/usePageLoading";

import "../styles/global.css";
import "../styles/variables.css";
import "../styles/loader.css";
export default function App({ Component, pageProps }: AppProps) {
  const { isPageLoading } = usePageLoading();
  return (
    <>
      {isPageLoading ? (
        <Loader />
      ) : (
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      )}
    </>
  );
}
