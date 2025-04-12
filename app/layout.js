import { ThemeProvider } from '../lib/contexts';
import '../styles/globals.css';

export default ({ children }) => (
    <ThemeProvider>
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://publish.obsidian.md/app.css" />
                <link rel="stylesheet" href={`https://publish-01.obsidian.md/access/${process.env.OBSIDIAN_SITE_ID}/publish.css`} />
            </head>
            <body className="theme-light">{children}</body>
        </html>
    </ThemeProvider>
);
