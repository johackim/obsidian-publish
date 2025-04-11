import Head from 'next/head';
import Link from 'next/link';
import { getOptions } from '../lib/utils';

export default ({ siteName, indexFile }) => (
    <div className="published-container print has-not-found">
        <Head>
            <title>404</title>
        </Head>
        <div className="site-body">
            <div className="site-body-center-column">
                <div className="site-header">
                    <Link href={`/${indexFile}`} className="site-header-text">{siteName}</Link>
                </div>
                <div className="render-container">
                    <div className="not-found-container">
                        <div className="not-found-image" />
                        <div className="not-found-title">Not found</div>
                        <div className="not-found-description">This page does not exist</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const getStaticProps = async () => {
    const { siteName, indexFile } = await getOptions();

    return { props: { siteName, indexFile } };
};
