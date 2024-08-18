import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Order Book</title>
        <link
          rel="icon"
          href="/brand.png"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
