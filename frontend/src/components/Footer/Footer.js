import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <section className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2023</p>
        <ul className="footer__list">
          <li className="footer__list-item">
            <Link className="footer__link" to="https://practicum.yandex.ru/" target='_blank' >Яндекс.Практикум</Link>
          </li>
          <li className="footer__list-item">
            <Link className="footer__link" to="https://github.com/o4ico/movies-explorer-frontend" target='_blank'>Github</Link>
          </li>
        </ul>
      </div>

    </section>
  );
}

export default Footer;