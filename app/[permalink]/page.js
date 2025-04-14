import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';
import { nodeTypes } from '@mdx-js/mdx';
import rehypeRaw from 'rehype-raw';
import remarkFrontmatter from 'remark-frontmatter';
import remarkObsidian from 'remark-obsidian';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import remarkComment from 'remark-comment';
import Markdown from '../../components/markdown';
import Navigation from '../../components/navigation';
import { getContent, getContentList, getOptions } from '../../lib/utils';

const Page = async ({ params }) => {
    const options = await getOptions();
    const { permalink } = await params;
    const { markdown } = await getContent(permalink);
    const { siteName, indexFile, showNavigation } = options;

    const contents = (await getContentList()).sort((a, b) => a.fileName.localeCompare(b.fileName));

    const content = await serialize(markdown, {
        parseFrontmatter: true,
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
    });

    if (!markdown) {
        notFound();
    }

    return (
        <div className={`published-container print ${showNavigation ? 'has-navigation' : ''}`}>
            <div className="site-body">
                {showNavigation && <Navigation contents={contents} {...options} />}
                <div className="site-body-center-column">
                    <div className="site-header">
                        <Link href={`/${indexFile}`} className="site-header-text">{siteName}</Link>
                    </div>
                    <div className="render-container">
                        <div className="render-container-inner">
                            <div className="publish-renderer">
                                <div className="markdown-preview-view markdown-rendered node-insert-event">
                                    <div className="markdown-preview-sizer markdown-preview-section">
                                        <Markdown content={content} />
                                    </div>
                                </div>
                            </div>
                        </div>
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
