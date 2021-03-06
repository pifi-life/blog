import React from 'react';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import { withRouter } from 'next/router'

import { classNames, withPrefix } from '../utils';
import Header from './Header';
import Subscribe from './Subscribe';
import Footer from './Footer';

export class Body extends React.Component {
    constructor(props) {
        super(props);
        this.handleVideoEmbeds = this.handleVideoEmbeds.bind(this);
    }

    componentDidMount() {
        this.handleVideoEmbeds();
    }

    componentDidUpdate() {
        this.handleVideoEmbeds();
    }

    handleVideoEmbeds() {
        const videoEmbeds = ['iframe[src*="youtube.com"]', 'iframe[src*="vimeo.com"]'];
        noframe(videoEmbeds.join(','), '.inner-md');
    }

    render() {
        const page = _.get(this.props, 'page');
        const pageTitle = _.get(page, 'title');
        const config = _.get(this.props, 'config');
        const configTitle = _.get(config, 'title');
        const palette = _.get(config, 'palette', 'green');
        const layoutStyle = _.get(config, 'layout_style', 'grid');
        const favicon = _.get(config, 'favicon');
        const domain = _.trim(_.get(config, 'domain', ''), '/');
        const seo = _.get(page, 'seo');
        const seoTitle = _.get(seo, 'title');
        const title = seoTitle ? seoTitle : [pageTitle, configTitle].join(' | ');
        const seoDescription = _.get(seo, 'description', '');
        const seoRobots = _.get(seo, 'robots', []).join(',');
        const seoExtra = _.get(seo, 'extra', []).map((meta, index) => {
            const keyName = _.get(meta, 'keyName', 'name');
            const name = _.get(meta, 'name');
            if (!name) {
                return null;
            }
            const nameAttr = { [keyName]: name };
            const relativeUrl = _.get(meta, 'relativeUrl');
            let value = _.get(meta, 'value');
            if (!value) {
                return null;
            }
            if (relativeUrl) {
                if (!domain) {
                    return null;
                }
                value = domain + withPrefix(value);
            }
            return <meta key={index} {...nameAttr} content={value} />;
        });
        const thumbImage= _.get(page, 'thumb_img_path');
        const footer = _.get(config, 'footer');
        const hasSubscribe = _.get(footer, 'has_subscribe');

        return (
            <React.Fragment>
                <Helmet>
                    <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="google" content="notranslate" />
                    <meta name="title" content={seoTitle} />
                    <meta name="description" content={seoDescription} />
                    <meta property="fb:app_id" content="350554330206080" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={domain + this.props.router.asPath} />
                    <meta property="og:title" content={seoTitle} />
                    <meta property="og:description" content={seoDescription} />
                    <meta property="og:image" content={domain + thumbImage} />
                    {!_.isEmpty(seoRobots) && <meta name="robots" content={seoRobots} />}
                    {seoExtra}
                    <link href="https://fonts.googleapis.com/css?family=PT+Serif:400,700%7CRoboto:400,400i,700,700i&display=swap" rel="stylesheet" />
                    {favicon && <link rel="icon" href={withPrefix(favicon)} />}
                    <body className={classNames(`palette-${palette}`, `layout-${layoutStyle}`)} />
                </Helmet>
                <div id="page" className="site">
                    <Header page={page} config={config} />
                    <div id="content" className="site-content outer">
                        <main id="main" className="site-main inner">
                            {this.props.children}
                        </main>
                    </div>
                    {hasSubscribe && <Subscribe config={config} />}
                    <Footer config={config} />
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Body)
