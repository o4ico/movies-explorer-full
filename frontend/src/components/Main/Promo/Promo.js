import React from 'react';
import './Promo.css';
import promoImage from '../../../images/line.svg';

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <img className="promo__image" src={promoImage} alt="иконка профиля"></img>
    </section>
  );
}

export default Promo;