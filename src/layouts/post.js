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
<div id="disqus_thread"></div>
<script>
    /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
    /*
    var disqus_config = function () {
    this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    */
    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://pifi-life.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
            </Layout>
        );
    }
}
