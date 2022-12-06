/* eslint-disable @next/next/no-page-custom-font */
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { createContext } from "react";
import { useState } from "react";
import Head from "next/head";

export const NavbarContext = createContext();
export const SidebarContext = createContext();
export const InputChangeContext = createContext();
export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expand, setExpand] = useState(true);
  const [inputChange, setInputChange] = useState(false);
  return (
    <>
      <Provider store={store}>
        <InputChangeContext.Provider value={{ inputChange, setInputChange }}>
          <SidebarContext.Provider value={{ expand, setExpand }}>
            {getLayout(
              <NavbarContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
                <Head>
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
                  />
                </Head>

                <Component {...pageProps} />
              </NavbarContext.Provider>
            )}
          </SidebarContext.Provider>
        </InputChangeContext.Provider>
      </Provider>
    </>
  );
  return getLayout(
    <NavbarContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      <Provider store={store}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </NavbarContext.Provider>
  );
}
