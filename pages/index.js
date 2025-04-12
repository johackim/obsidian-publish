import Link from 'next/link';

export default () => {
    const { indexFile, siteName } = JSON.parse(process.env.OPTIONS);

    return (
        <div className="published-container print">
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
                                        <div className="el-h3">
                                            <h3 dir="auto">{`Welcome to ${siteName}`}</h3>
                                        </div>
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
