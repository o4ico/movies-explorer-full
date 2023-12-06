import React from 'react';
import './Menu.css';
import { Link, useLocation } from 'react-router-dom';
import Account from '../Account/Account';

function Menu({
  isOpen,
  onClose
}) {

  const navigationMainRoute = `${'menu__link'} ${useLocation().pathname === "/" ? 'menu__link_active' : ' '}`;
  const navigationMoviesRoute = `${'menu__link'} ${useLocation().pathname === "/movies" ? 'menu__link_active' : ' '}`;
  const navigationSavedMoviesRoute = `${'menu__link'} ${useLocation().pathname === "/saved-movies" ? 'menu__link_active' : ' '}`;

  return (
    <div className={`menu ${isOpen ? " menu_opened" : ''}`}>
      <div className="menu__container">
        <div className="menu__group">
          <button className="menu__close-button menu__close-button_edit" type="button" onClick={onClose} />

          <div className="menu__links">
            <Link className={navigationMainRoute} to="/" >Главная</Link>
            <Link className={navigationMoviesRoute} to="/movies" >Фильмы</Link>
            <Link className={navigationSavedMoviesRoute} to="/saved-movies" >Сохранённые фильмы</Link>
          </div>
        </div>
        < Account style={{ backgroundColor: '#313131' }} />
      </div>
    </div>
  );
}

export default Menu;