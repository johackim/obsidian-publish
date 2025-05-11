import { MDXRemote } from 'next-mdx-remote-client/rsc'; // eslint-disable-line
import { notFound } from 'next/navigation';
import { nodeTypes } from '@mdx-js/mdx';
import rehypeRaw from 'rehype-raw';
import remarkFrontmatter from 'remark-frontmatter';
import remarkObsidian from 'remark-obsidian';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import remarkComment from 'remark-comment';
import components from '../../lib/components';
import { getContent, getContentList } from '../../lib/utils';

const Page = async ({ params }) => {
    const { permalink } = await params;
    const { markdown } = await getContent(permalink);

    if (!markdown) notFound();

    const options = {
        mdxOptions: {
            remarkPlugins: [
                remarkObsidian,
                remarkFrontmatter,
                remarkEmoji,
                remarkGfm,
                [remarkComment, { ast: true }],
                [(await import('mdx-mermaid')).default, { output: 'svg' }], // eslint-disable-line
            ],
            rehypePlugins: [[rehypeRaw, { passThrough: nodeTypes }]],
        },
    };

    return (
        <div className="render-container-inner">
            <div className="publish-renderer">
                <div className="markdown-preview-view markdown-rendered node-insert-event">
                    <div className="markdown-preview-sizer markdown-preview-section">
                        <MDXRemote source={markdown} options={options} components={components} />
                    </div>
                </div>
            </div>
        </div>
    );
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
