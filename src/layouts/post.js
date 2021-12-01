import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { Layout } from '../components/index';
import { htmlToReact, withPrefix, markdownify } from '../utils';

export default class Post extends React.Component {
    render() {
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const page = _.get(this.props, 'page');
        const title = _.get(page, 'title');
        const subtitle = _.get(page, 'subtitle');
        const image = _.get(page, 'content_img_path');
        const imageAlt = _.get(page, 'content_img_alt', '');
        const date = _.get(page, 'date');
        const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
        const formattedDate = moment(date).strftime('%A, %B %e, %Y');
        const markdownContent = _.get(page, 'markdown_content');

        return (
            <Layout page={page} config={config}>
                <div id="fb-root"></div>
                <script async defer crossorigin="anonymous" src="https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v12.0&appId=350554330206080&autoLogAppEvents=1" nonce="AS7Y7TdV"></script>
                <article className="post post-full">
                    <header className="post-header inner-md">
                        <div className="post-meta">
                            <time className="published" dateTime={dateTimeAttr}>{formattedDate}</time>
                        </div>
                        <h1 className="post-title">{title}</h1>
                        {subtitle && <div className="post-subtitle">{htmlToReact(subtitle)}</div>}
                    </header>
                    {image && (
                        <div className="post-thumbnail">
                            <img src={withPrefix(image)} alt={imageAlt} className="thumbnail" />
                        </div>
                    )}
                    {markdownContent && <div className="post-content inner-md">{markdownify(markdownContent)}</div>}
                </article>
                <div class="fb-comments" data-href="https://pifi.life/posts/finish/" data-width="750" data-numposts="5"></div>
            </Layout>
        );
    }
}
