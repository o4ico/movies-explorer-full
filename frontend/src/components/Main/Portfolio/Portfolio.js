import React from 'react';
import './Portfolio.css';
import { Link } from 'react-router-dom';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <Link className="portfolio__link" to="https://github.com/o4ico/how-to-learn" target='_blank' >Статичный сайт
            <p className="portfolio__link-arrow">↗</p>
          </Link>

        </li>
        <li className="portfolio__list-item">
          <Link className="portfolio__link" to="https://github.com/o4ico/russian-travel" target='_blank'>Адаптивный сайт
            <p className="portfolio__link-arrow">↗</p>
          </Link>

        </li>
        <li className="portfolio__list-item">
          <Link className="portfolio__link" to="https://github.com/o4ico/react-mesto-api-full-gha" target='_blank'>Одностраничное приложение
            <p className="portfolio__link-arrow">↗</p>
          </Link>

        </li>
      </ul>
    </section>
  );
}

export default Portfolio;