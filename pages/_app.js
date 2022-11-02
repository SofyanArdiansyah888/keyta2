/* eslint-disable @next/next/no-page-custom-font */
import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (<>
    {/* <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>  
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&family=Poppins&family=Roboto&display=swap"
          rel="stylesheet"
        />
        
      </Head> */}
  <Component {...pageProps} /></>)
}

export default MyApp
