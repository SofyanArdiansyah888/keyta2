/* eslint-disable @next/next/no-page-custom-font */
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { createContext } from "react";
import { useState } from "react";
import Head from "next/head";

export const NavbarContext = createContext();
export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return getLayout(
    <NavbarContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      <Provider store={store}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
          {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&family=Poppins&family=Roboto&display=swap"
            rel="stylesheet"
          /> */}
           </Head>
          <Component {...pageProps} />
       
      </Provider>
    </NavbarContext.Provider>
  );
}
