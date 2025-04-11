import { getContentList, getOptions } from './lib/utils.js';

const contents = await getContentList();

const redirects = contents
    .filter(({ fileName, permalink }) => fileName.toLowerCase() !== permalink.toLowerCase())
    .map(({ fileName, permalink }) => ({
        source: `/${encodeURIComponent(fileName)}`,
        destination: `/${permalink}`,
        permanent: true,
    }));

const { indexFile } = await getOptions();

if (indexFile) {
    const permalink = contents.find(({ fileName }) => fileName === indexFile)?.permalink || indexFile;
    redirects.push({ source: '/', destination: `/${permalink}`, permanent: true });
}

export default {
    devIndicators: false,
    async redirects() {
        return redirects;
    },
};
