import React from 'react';
import './Student.css';

import Article from '../Article/Article';
import studentPhoto from '../../../images/portfolio.png';
import { Link } from 'react-router-dom';

function Student() {
  return (
    < Article
      title='Студент' classContainer={'article_student'}>

      <section className="student">
        <h3 className="student__name">Виталий</h3>
        <p className="student__about">Фронтенд-разработчик, 30 лет</p>
        <p className="student__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
        </p>
        <img className="student__photo" src={studentPhoto} alt="фото для портфолио"></img>
        <Link className="student__link" to="https://github.com/o4ico" target='_blank'>Github</Link>
      </section>
    </Article>
  );
}

export default Student;