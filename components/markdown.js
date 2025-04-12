'use client';

import { MDXRemote } from 'next-mdx-remote';
import components from '../lib/components';

export default ({ content }) => (
    <MDXRemote {...content} components={components} />
);
