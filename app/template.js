'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '../components/navigation';

export default ({ children }) => {
    const options = JSON.parse(process.env.options);
    const contents = JSON.parse(process.env.navigation);

    const { siteName, indexFile, showNavigation } = options;
    const [isNavigationOpen, setIsNavigationOpen] = useState(false);

    return (
        <div className={`published-container print ${showNavigation ? 'has-navigation' : ''} ${isNavigationOpen ? 'is-left-column-open' : ''}`}>
            <div className="site-body">
                {showNavigation && <Navigation contents={contents} {...options} />}
                <div className="site-body-center-column">
                    <div className="site-header">
                        <div className="clickable-icon" onClick={() => setIsNavigationOpen(!isNavigationOpen)}> {/* eslint-disable-line */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svg-icon lucide-menu">
                                <line x1="4" y1="12" x2="20" y2="12" />
                                <line x1="4" y1="6" x2="20" y2="6" />
                                <line x1="4" y1="18" x2="20" y2="18" />
                            </svg>
                        </div>
                        <Link href={`/${indexFile}`} className="site-header-text">{siteName}</Link>
                    </div>
                    <div className="render-container">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
