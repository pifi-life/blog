import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Helmet } from 'react-helmet';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        // see https://github.com/nfl/react-helmet#server-usage for more information
        // 'head' was occupied by 'renderPage().head', we cannot use it
        return { ...initialProps, helmet: Helmet.renderStatic() };
    }

    // should render on <html>
    get helmetHtmlAttrComponents() {
        return this.props.helmet.htmlAttributes.toComponent();
    }

    // should render on <body>
    get helmetBodyAttrComponents() {
        return this.props.helmet.bodyAttributes.toComponent();
    }

    // should render on <head>
    get helmetHeadComponents() {
        return Object.keys(this.props.helmet)
            .filter((el) => el !== 'htmlAttributes' && el !== 'bodyAttributes')
            .map((el) => this.props.helmet[el].toComponent());
    }

    render() {
        // if you don't like Helmet but you still want to set properties on body use this
        // const pageProps = _.get(this.props, '__NEXT_DATA__.props.pageProps');
        return (
            <Html {...this.helmetHtmlAttrComponents}>
                <Head>
                    {this.helmetHeadComponents}
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-GLKVEMVVTN"></script>
                    <script async src="/js/ga.js" />
                    <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v7.0&appId=350554330206080&autoLogAppEvents=1" nonce="EQtFXoG7"></script>
                </Head>
                <body {...this.helmetBodyAttrComponents}>
                    <Main />
                    <script src="/js/plugins.js" />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
