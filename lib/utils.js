export const getContentList = async () => {
    const data = await fetch(`https://publish-01.obsidian.md/cache/${process.env.OBSIDIAN_SITE_ID}`)
        .then((res) => res.json())
        .then((res) => Object.entries(res).filter(([key]) => key.includes('.md')))
        .then((res) => res.map(([file, { frontmatter }]) => ({
            file,
            fileName: file.replace('.md', ''),
            title: frontmatter.title || file.replace('.md', ''),
            ...frontmatter,
        })))
        .catch(() => false);

    return data || [];
};

export const getContent = async (permalink) => {
    const contents = JSON.parse(process.env.CONTENTS);
    const data = contents.find((content) => content.permalink === permalink || content.fileName === permalink);
    const url = `https://publish-01.obsidian.md/access/${process.env.OBSIDIAN_SITE_ID}/${encodeURIComponent(data.file)}`;
    const markdown = await fetch(url, { cache: 'reload' }).then((res) => res.text()).catch(() => false);

    return { ...data, markdown };
};

export const getOptions = async () => {
    const options = await fetch(`https://publish-01.obsidian.md/options/${process.env.OBSIDIAN_SITE_ID}`)
        .then((res) => res.json())
        .catch(() => false);

    return options || {};
};
