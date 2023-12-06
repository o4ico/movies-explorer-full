import React from 'react';
import './AboutProject.css';
import Article from '../Article/Article';

function AboutProject() {
  return (
    < Article
      title='О проекте'>

      <section className="about-project">
        <div className="about-project__container">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__container">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className="about-project__time">
          <div className='about-project__green-background'>
            <h4 className="about-project__time-title about-project__time-title_green">1 неделя</h4>
          </div>
          <div className='about-project__grey-background'>
            <h4 className="about-project__time-title">4 недели</h4>
          </div>
          <p className="about-project__time-subtitle">Back-end</p>
          <p className="about-project__time-subtitle">Front-end</p>
        </div>
      </section>
    </Article>
  );
}

export default AboutProject;