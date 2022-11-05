/* eslint-disable @next/next/no-page-custom-font */
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
