import React from 'react';
import './Navigation.css';
import { Link, useLocation } from 'react-router-dom';
import Account from '../Account/Account';

function Navigation({
  isLoggiedIn
}) {

  const navigationMoviesRoute = `${'navigation__link'} ${useLocation().pathname === "/movies" ? 'navigation__link_active' : ' '}`;
  const navigationSavedMoviesRoute = `${'navigation__link'} ${useLocation().pathname === "/saved-movies" ? 'navigation__link_active' : ' '}`;

  return (
    <>
      {isLoggiedIn ? (
        <nav className="navigation">
          <nav className="navigation__links">
            <Link className={navigationMoviesRoute} to="/movies" >Фильмы</Link>
            <Link className={navigationSavedMoviesRoute} to="/saved-movies" >Сохранённые фильмы</Link>
          </nav>
          < Account />
        </nav>
      ) : (
        <nav className="navigation navigation_unauthorized">
          <Link to="/signup" style={{ textDecoration: 'none' }}><button className="navigation__button">Регистрация</button></Link>
          <Link to="/signin" style={{ textDecoration: 'none' }}><button className="navigation__button navigation__button_login">Войти</button></Link>
        </nav>
      )
      }
    </>
  );
}

export default Navigation;