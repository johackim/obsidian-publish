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
import { getContent, getContentList, getOptions } from '../lib/utils';

const components = {
    h2: ({ children }) => (
        <div className="el-h2">
            <h2 data-heading={children} dir="auto" className="publish-article-heading">
                <span className="heading-collapse-indicator collapse-indicator collapse-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svg-icon right-triangle"><path d="M3 8L12 17L21 8" /></svg></span>
                {children}
                <span className="clickable-icon" aria-label="Copy link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svg-icon lucide-link">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                </span>
            </h2>
        </div>
    ),
    ul: ({ children }) => (
        <div className="el-ul">
            <ul dir="auto">{children}</ul>
        </div>
    ),
    p: ({ children }) => (
        <div className="el-p">
            <p dir="auto">{children}</p>
        </div>
    ),
    a: ({ children, href }) => {
        const isExternal = href.startsWith('http') || href.startsWith('mailto:');

        return (
            <a
                href={href}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer', className: 'external-link' } : {})}
            >
                {children}
            </a>
        );
    },
    pre: ({ children }) => (
        <div className="el-pre">
            <pre dir="auto">{children}</pre>
        </div>
    ),
};

const Page = ({ title, content, siteName, indexFile }) => (
    <div className="published-container print">
        <Head>
            <title>{title}</title>
        </Head>
        <div className="site-body">
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

export const getStaticProps = async ({ params }) => {
    const { title, markdown } = await getContent(params.permalink);
    const { siteName, indexFile } = await getOptions();

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

    return { props: { title, content, siteName, indexFile } };
};

export const getStaticPaths = async () => {
    const contents = await getContentList();

    const paths = contents.map(({ permalink }) => ({
        params: { permalink },
    }));

    return { paths, fallback: false };
};

export default Page;
