import { Html, Head, Main, NextScript } from 'next/document';

export default () => (
    <Html>
        <Head>
            <link rel="stylesheet" href="https://publish.obsidian.md/app.css" />
            <link rel="stylesheet" href={`https://publish-01.obsidian.md/access/${process.env.OBSIDIAN_SITE_ID}/publish.css`} />
        </Head>
        <body className="theme-light">
            <Main />
            <NextScript />
        </body>
    </Html>
);
