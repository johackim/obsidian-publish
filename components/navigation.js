'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Switch from './switch';

export default ({ contents, siteName, indexFile, showThemeToggle = false }) => {
    const currentPath = usePathname();
    const router = useRouter();

    return (
        <div className="site-body-left-column">
            <div className="site-body-left-column-inner">
                <Link className="site-body-left-column-site-logo" aria-label={`${siteName} logo`} href={`/${indexFile}`} />
                <Link className="site-body-left-column-site-name" aria-label={siteName} href={`/${indexFile}`}>{siteName}</Link>
                {showThemeToggle && (<Switch />)}
                <div className="nav-view-outer">
                    <div className="nav-view">
                        <div className="tree-item">
                            <div className="tree-item-children">
                                {contents.map(({ fileName, permalink }) => (
                                    <div key={fileName} className="tree-item">
                                        <div className={`tree-item-self is-clickable ${currentPath === `/${permalink}` ? 'mod-active' : ''}`} onClick={() => router.push(permalink)}> {/* eslint-disable-line */}
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
    );
};
