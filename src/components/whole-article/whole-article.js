import React from 'react';
import ReactDom from 'react-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Article from "../article/article";

const markdown = 'Just a link: https://reactjs.com.';

export const WholeArticle = () => {

  return (
    <div>
      <Article />
      <ReactMarkdown />
    </div>
  );
}