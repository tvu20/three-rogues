import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";

import Loader from "../components/shared/layout/Loader";

import { store } from "../app/store";

import { usePageLoading } from "../utils/usePageLoading";

import Snackbar from "../components/shared/layout/Snackbar";
import "../styles/global.css";
import "../styles/loader.css";
import "../styles/variables.css";

function ScrollToTop() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  const { isPageLoading } = usePageLoading();
  return (
    <>
      {isPageLoading ? (
        <Loader />
      ) : (
        <SessionProvider session={pageProps.session}>
          <Provider store={store}>
            <ScrollToTop />
            <Component {...pageProps} />
            <Snackbar />
          </Provider>
        </SessionProvider>
      )}
    </>
  );
}
