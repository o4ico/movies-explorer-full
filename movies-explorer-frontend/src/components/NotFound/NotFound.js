import React from 'react';
import './NotFound.css'
import { Link } from 'react-router-dom';

function NotFound() {

  return (

    <main className="content__container">
      <section className="not-found">
        <div className="not-found__container">
          <h1 className="not-found__title">404</h1>
          <h3 className="not-found__subtitle">Страница не найдена</h3>
        </div>
        <Link className="not-found__advice" to='/'>Назад</Link>
      </section>
    </main>
  );
}

export default NotFound;