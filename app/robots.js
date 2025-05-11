import { getOptions } from '../lib/utils.js';

export const revalidate = 30;

export default async () => {
    const { noindex } = await getOptions();

    return {
        rules: {
            userAgent: '*',
            ...(noindex ? { disallow: '/' } : { allow: '/' }),
        },
        host: process.env.NEXT_PUBLIC_SITE_URL,
        sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
    };
};
