import '../styles/globals.css'
import Layout from "../layouts";

function MyApp({ Component, pageProps }) {
  return (
      <Layout className="container mx-auto">
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp
