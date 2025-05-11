import { getContentList, getOptions } from './lib/utils.js';

const options = await getOptions();
const contents = await getContentList();
const navigation = contents.map(({ fileName, permalink }) => ({ fileName, permalink })).sort((a, b) => a.fileName.localeCompare(b.fileName));

const redirects = contents
    .filter(({ fileName, permalink }) => fileName.toLowerCase() !== permalink.toLowerCase())
    .map(({ fileName, permalink }) => ({
        source: `/${encodeURIComponent(fileName)}`,
        destination: `/${permalink}`,
        permanent: true,
    }));

const { indexFile } = options;

if (indexFile) {
    const permalink = contents.find(({ fileName }) => fileName === indexFile)?.permalink || indexFile;
    redirects.push({ source: '/', destination: `/${permalink}`, permanent: true });
}

export default {
    output: 'standalone',
    devIndicators: false,
    env: { options: JSON.stringify(options), navigation: JSON.stringify(navigation) },
    async redirects() {
        return redirects;
    },
};
