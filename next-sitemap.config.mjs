import { getOptions } from './lib/utils.js';

const { noindex } = await getOptions();

export default {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                ...(noindex ? { disallow: '/' } : { allow: '/' }),
            },
        ],
    },
};
