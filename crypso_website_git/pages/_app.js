import '../styles/globals.css'
import '../styles/fonts.css'
import TagManager from 'react-gtm-module'
import { useEffect } from 'react'
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({gtmId: "GTM-NDSZD53"})
  }, [])
  return <>
    <Head>
      
      <meta name="title" content="Learn, Invest &amp; Ride the crypto revolution"/>
      <meta name="description" content="Join crypto communities, Create chat groups, Follow top crypto influencers, their signals and portfolio, Buy & trade coins, all at one place"/>
      
      
      <link rel="canonical" href="https://crypso.club"/>
      <meta name="facebook-domain-verification" content="fx8fov0okgvzz7klgb4e32bacfucka" />
      <meta property="og:type" content="website"/>
      <meta property="og:url" content="https://www.crypso.club/"/>
      <meta property="og:title" content="Crypso | Learn, Invest &amp; Ride the crypto revolution"/>
      <meta property="og:description" content="Join crypto communities, Create chat groups, Follow top crypto influencers, their signals and portfolio, Buy & trade coins, all at one place"/>
      <meta property="og:image" content="/images/crypso_banner_1200x676.jpg"/>

      <meta property="twitter:card" content="summary_large_image"/>
      <meta property="twitter:url" content="https://www.crypso.club"/>
      <meta property="twitter:title" content="Crypso | Learn, Invest &amp; Ride the crypto revolution"/>
      <meta property="twitter:description" content="Join crypto communities, Create chat groups, Follow top crypto influencers, their signals and portfolio, Buy & trade coins, all at one place"/>
      <meta property="twitter:image" content="/crypso_banner_1200x676.jpg"/>
      
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
