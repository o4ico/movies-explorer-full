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
        <p className="student__text">Я родилась и живу в Волгограде, закончила ВТК по&nbsp;специальности технолог&#8209;конструктор кафедры Дизайн и&nbsp;технология моды. Попутно училась заочно на&nbsp;рекламе.
        </p>
        <p className="student__text">Люблю рисовать, закончила художественную школу с&nbsp;отличием. Меня всегда привлекала идея создавать красивые и при это функциональные вещи, будь то одежда, дизайн-проект комнаты или сайты. Ориентируясь на это, в&nbsp;поиске себя заинтересовалась веб-разработкой.
        </p>
        <img className="student__photo" src={studentPhoto} alt="фото для портфолио"></img>
        <Link className="student__link" to="https://github.com/o4ico" target='_blank'>Github</Link>
      </section>
    </Article>
  );
}

export default Student;