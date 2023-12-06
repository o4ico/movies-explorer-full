import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Logo.css';
import headerLogo from '../../images/logo.svg'; // Путь к изображению внутри сборки

function Logo() {

  const logoPlace = `${'logo'} ${useLocation().pathname !== ("/signup" || "/signin") ? 'logo_header' : ''}`;
  return (
    <Link className={logoPlace} to="/" >
      <img
        className='logo__image'
        src={headerLogo}
        alt="логотип"
      />
    </Link>
  );
}

export default Logo;