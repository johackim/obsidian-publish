export default () => (
    <div className="render-container-inner">
        <div className="publish-renderer">
            <div className="markdown-preview-view markdown-rendered node-insert-event">
                <div className="markdown-preview-sizer markdown-preview-section">
                    <div className="el-h3">
                        <h3 dir="auto">{`Welcome to ${JSON.parse(process.env.options).siteName}`}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
