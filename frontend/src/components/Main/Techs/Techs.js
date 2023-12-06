import React from 'react';
import { useLayoutEffect, useState } from 'react';
import usePageWidth from '../../../utils/pageWidth';
import './Techs.css';
import Article from '../Article/Article';

function Techs() {

  const [isMinWidth, setIsMinWidth] = useState(false);
  let width = usePageWidth();

  useLayoutEffect(() => {
    if (width <= 480) {
      setIsMinWidth(true);
    } else {
      setIsMinWidth(false);
    }
  }, [width]);

  const articleTitleBorderButtom = `${isMinWidth ? 'article__title_techs' : ' '}`;

  return (
    < Article
      title='Технологии' classContainer={'article_techs'} classTitle={articleTitleBorderButtom}>
      <section className="techs">
        <div className="techs__container">
          <h3 className="techs__title">7 технологий</h3>
          <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        </div>
        <ul className="techs__group">
          <li className="techs__text">HTML</li>
          <li className="techs__text">CSS</li>
          <li className="techs__text">JS</li>
          <li className="techs__text">React</li>
          <li className="techs__text">Git</li>
          <li className="techs__text">Express.js</li>
          <li className="techs__text">mongoDB</li>
        </ul>
      </section>
    </Article>
  );
}

export default Techs;