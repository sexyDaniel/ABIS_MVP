import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownProps = {
    children: string;
};

const Markdown: FC<MarkdownProps> = ({ children }) => {
    return <ReactMarkdown className='markdown' children={children} remarkPlugins={[remarkGfm]} />;
};

export default Markdown;
