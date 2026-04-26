import '../styles/globals.css';
import Head from 'next/head';
import Layout from '../components/nav/Layout';
function MyApp({ Component, pageProps, router }) {
  return (<>
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className=''>
        <Component  {...pageProps} key={router.route} />
      </div>
    </Layout>
  </>
  )
}

export default MyApp
