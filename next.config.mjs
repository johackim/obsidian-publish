import { getContentList, getOptions } from './lib/utils.js';

const options = await getOptions();
const contents = await getContentList();
const navigation = contents.map(({ fileName, permalink }) => ({ fileName, permalink })).sort((a, b) => a.fileName.localeCompare(b.fileName));

export default {
    output: 'export',
    devIndicators: false,
    env: { options: JSON.stringify(options), navigation: JSON.stringify(navigation) },
};
