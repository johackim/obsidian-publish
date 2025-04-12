import { getContentList, getOptions } from './lib/utils.js';

const options = await getOptions();
const contents = await getContentList();

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
    devIndicators: false,
    env: {
        CONTENTS: JSON.stringify(contents),
        OPTIONS: JSON.stringify(options),
    },
    async redirects() {
        return redirects;
    },
};
