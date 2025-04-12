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
import Switch from '../../components/switch';
import Markdown from '../../components/markdown';
import { getContent, getContentList, getOptions } from '../../lib/utils';

const Page = async ({ params }) => {
    const { permalink } = await params;
    const contents = (await getContentList()).sort((a, b) => a.fileName.localeCompare(b.fileName));
    const { siteName, indexFile, showNavigation, showThemeToggle } = await getOptions();
    const { markdown } = await getContent(permalink);

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
                {showNavigation && (
                    <div className="site-body-left-column">
                        <div className="site-body-left-column-inner">
                            <Link className="site-body-left-column-site-logo" aria-label={`${siteName} logo`} href={`/${indexFile}`} />
                            <Link className="site-body-left-column-site-name" aria-label={siteName} href={`/${indexFile}`}>{siteName}</Link>
                            {showThemeToggle && (<Switch />)}
                            <div className="nav-view-outer">
                                <div className="nav-view">
                                    <div className="tree-item">
                                        <div className="tree-item-children">
                                            {contents.map(({ fileName, permalink: link }) => (
                                                <div key={fileName} className="tree-item">
                                                    <div className="tree-item-self is-clickable" data-path={fileName}>
                                                        <div className="tree-item-inner">
                                                            <Link href={link}>{fileName}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
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
