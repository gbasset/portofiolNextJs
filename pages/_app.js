import '../styles/globals.css'
import Head from 'next/head';
import Layout from '../components/nav/Layout'
function MyApp({ Component, pageProps }) {
  return (<>
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className='container'>
        <Component {...pageProps} />
      </div>
    </Layout>
  </>
  )
}

export default MyApp
