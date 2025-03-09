import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

import Loader from "../components/Loader";

import { store } from "../app/store";

import { usePageLoading } from "../utils/usePageLoading";

import Snackbar from "../components/Snackbar";
import "../styles/global.css";
import "../styles/loader.css";
import "../styles/variables.css";
export default function App({ Component, pageProps }: AppProps) {
  const { isPageLoading } = usePageLoading();
  return (
    <>
      {isPageLoading ? (
        <Loader />
      ) : (
        <SessionProvider session={pageProps.session}>
          <Provider store={store}>
            <Component {...pageProps} />
            <Snackbar />
          </Provider>
        </SessionProvider>
      )}
    </>
  );
}
