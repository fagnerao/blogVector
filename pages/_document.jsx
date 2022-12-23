import NextDocument, { Html, Head, Main, NextScript} from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
    
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&family=Raleway:wght@300;400;500&display=swap" rel="stylesheet"/>
      <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      <meta property="og:title" content="Blog Vector Zero" />
      <meta property="og:url" content="https://www.arianeleal.com" />
      <meta property="og:site_name" content="Blog Vector Zero" />
      <meta property="og:image" content="/whatsapp.jpg" />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="600" />
      <meta property="og:description" content="" />
      <meta property="og:type" content="website" />

    </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
