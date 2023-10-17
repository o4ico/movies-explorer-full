import React from 'react';
import './Article.css';
function Article({
  title,
  children,
  classContainer,
  classTitle
}) {


  return (
    <article className={`article ${classContainer ? `${classContainer}` : ''}`}>
      <h2 className={`article__title ${classTitle}`}>{title}</h2>
      {children}
    </article>
  );
}

export default Article;