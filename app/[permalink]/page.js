import { notFound } from 'next/navigation';
import Client from './client';
import { getContent, getContentList, getOptions, compileMdxToJs } from '../../lib/utils';

const Page = async ({ params }) => {
    const options = await getOptions();
    const { permalink } = await params;
    const { markdown } = await getContent(permalink);

    const contents = (await getContentList()).sort((a, b) => a.fileName.localeCompare(b.fileName));

    const content = await compileMdxToJs(markdown);

    if (!markdown) notFound();

    return <Client options={options} contents={contents} content={content} />;
};

export const generateMetadata = async ({ params }) => {
    const { permalink } = await params;
    const { title } = await getContent(permalink);

    return { title };
};

export const generateStaticParams = async () => {
    const contents = await getContentList();

    return contents.map(({ permalink }) => ({ permalink }));
};

export default Page;
