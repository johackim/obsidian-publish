import { getContentList } from '../lib/utils.js';

export default async () => {
    const contents = await getContentList();

    return contents.map(({ permalink, datePublished }) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${permalink}`,
        lastModified: new Date(datePublished),
        changeFrequency: 'daily',
        priority: 0.7,
    }));
};
