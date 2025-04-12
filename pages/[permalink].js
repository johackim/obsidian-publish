import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { nodeTypes } from '@mdx-js/mdx';
import Head from 'next/head';
import Link from 'next/link';
import rehypeRaw from 'rehype-raw';
import remarkFrontmatter from 'remark-frontmatter';
import remarkObsidian from 'remark-obsidian';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import remarkComment from 'remark-comment';
import components from '../lib/components';
import { getContent } from '../lib/utils';

const Page = ({ title, content }) => {
    const { siteName, indexFile, showNavigation } = JSON.parse(process.env.OPTIONS);
    const contents = JSON.parse(process.env.CONTENTS).sort((a, b) => a.fileName.localeCompare(b.fileName));

    return (
        <div className={`published-container print ${showNavigation ? 'has-navigation' : ''}`}>
            <Head><title>{title}</title></Head>
            <div className="site-body">
                {showNavigation && (
                    <div className="site-body-left-column">
                        <div className="site-body-left-column-inner">
                            <Link className="site-body-left-column-site-logo" aria-label={`${siteName} logo`} href={`/${indexFile}`} />
                            <Link className="site-body-left-column-site-name" aria-label={siteName} href={`/${indexFile}`}>{siteName}</Link>
                            <div className="nav-view-outer">
                                <div className="nav-view">
                                    <div className="tree-item">
                                        <div className="tree-item-children">
                                            {contents.map(({ fileName, permalink }) => (
                                                <div key={fileName} className="tree-item">
                                                    <div className="tree-item-self is-clickable" data-path={fileName}>
                                                        <div className="tree-item-inner">
                                                            <Link href={permalink}>{fileName}</Link>
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
                                        <MDXRemote {...content} components={components} />
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

export const getStaticProps = async ({ params }) => {
    const { title, markdown } = await getContent(params.permalink);

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

    return { props: { title, content } };
};

export const getStaticPaths = async () => {
    const contents = JSON.parse(process.env.CONTENTS);

    const paths = contents.map(({ permalink }) => ({
        params: { permalink },
    }));

    return { paths, fallback: false };
};

export default Page;
