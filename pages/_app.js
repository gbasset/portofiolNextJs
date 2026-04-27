import '../styles/globals.css';
import Head from 'next/head';
import Layout from '../components/nav/Layout';

function MyApp({ Component, pageProps, router }) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bayon&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div>
        <Component {...pageProps} key={router.route} />
      </div>
    </Layout>
  );
}

export default MyApp;
