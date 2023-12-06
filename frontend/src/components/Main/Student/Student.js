import React from 'react';
import './Student.css';

import Article from '../Article/Article';
import studentPhoto from '../../../images/portfolio.jpg';
import { Link } from 'react-router-dom';

function Student() {
  return (
    < Article
      title='Студент' classContainer={'article_student'}>

      <section className="student">
        <h3 className="student__name">Дарья</h3>
        <p className="student__about">Фронтенд-разработчик, 23 года</p>
        <p className="student__text">Я родилась и живу в Волгограде, отучилась на&nbsp;кафедре «Дизайн и&nbsp;технология моды» ВТК по&nbsp;специальности «Технолог-конструктор». Попутно училась заочно на рекламе. Я&nbsp;люблю рисовать, закончила художественную школу с&nbsp;отличием. Не так давно заинтересовалась IT-сферой, так и&nbsp;начала кодить. Прошла курс по веб-разработке, с&nbsp;нуля освоив новую профессию.
        </p>
        <img className="student__photo" src={studentPhoto} alt="фото для портфолио"></img>
        <Link className="student__link" to="https://github.com/o4ico" target='_blank'>Github</Link>
      </section>
    </Article>
  );
}

export default Student;