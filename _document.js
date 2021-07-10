import Document, { Html, Head, Main, NextScript } from 'next/document'

class myDocument extends Document {
    render() {
        <Html lang="fr">
            <Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Head>
        </Html>
    }
}
export default myDocument;