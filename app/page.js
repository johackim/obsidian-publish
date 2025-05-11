import { permanentRedirect } from 'next/navigation';
import { getContent } from '../lib/utils.js';

export default async () => {
    const { siteName, indexFile } = JSON.parse(process.env.options);

    if (indexFile) {
        const { permalink } = await getContent(indexFile);
        return permanentRedirect(`/${permalink}`);
    }

    return (
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
    );
};
