import React from 'react';
import './Account.css';

import profileIcon from '../../images/profile.svg';
import { Link, useLocation } from 'react-router-dom';

function Account({
  style
}) {
  const navigationAccountLogoColor = `${'account__icon-background'} ${useLocation().pathname === "/" ? 'account__icon-background_blue' : 'account__icon-background_grey'}`;

  /*const navigationAccountRoute = `${'account__link'} ${useLocation().pathname === "/profile" ? 'account__link_active' : ' '}`;*/
  return (
    <Link className="account" to="/profile" style={{ textDecoration: 'none' }}>
      <p className='account__link'>Аккаунт</p>

      <div className={navigationAccountLogoColor} style={style} >
        <img className="account__icon" src={profileIcon} alt="иконка профиля"></img>
      </div>
    </Link>
  );
}

export default Account;