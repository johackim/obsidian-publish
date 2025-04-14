import RSS from 'rss';
import { getContentList } from '../../lib/utils';

export const GET = async () => {
    const contents = (await getContentList()).sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));

    const feed = new RSS({
        title: process.env.NEXT_PUBLIC_SITE_AUTHOR,
        description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
        site_url: process.env.NEXT_PUBLIC_SITE_URL,
        generator: 'Next.js',
        custom_namespaces: {
            media: 'http://search.yahoo.com/mrss/',
            webfeeds: 'http://webfeeds.org/rss/1.0',
        },
        custom_elements: [
            { 'atom:link': { _attr: { href: `${process.env.NEXT_PUBLIC_SITE_URL}/rss.xml`, rel: 'self', type: 'application/rss+xml' } } },
        ],
    });

    for await (const { fileName, permalink, title, description, datePublished } of contents) {
        feed.item({
            title: title || fileName,
            guid: `${process.env.NEXT_PUBLIC_SITE_URL}/${permalink}`,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${permalink}?utm_source=rss&utm_medium=rss`,
            author: process.env.NEXT_PUBLIC_SITE_AUTHOR,
            description: description || '',
            ...(datePublished && { date: new Date(datePublished) }),
        });
    }

    return new Response(feed.xml({ indent: true }), {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
};
