import '../styles/globals.css'
import Head from 'next/head';
import Layout from '../components/nav/Layout'
import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
function MyApp({ Component, pageProps, router }) {
  return (<>
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className=''>
        <AnimatePresence exitBeforeEnter>
          <Component  {...pageProps} key={router.route} />
        </AnimatePresence>
      </div>
    </Layout>
  </>
  )
}

export default MyApp
