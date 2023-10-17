import React from 'react';
import './Header.css';
import { useLayoutEffect } from 'react';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import usePageWidth from '../../utils/pageWidth';

function Header({
  children,
  isLoggiedIn,
  handleNavigateButtonClick
}) {
  const [isBurgerMenu, setIsBurgerMenu] = React.useState(false);

  let width = usePageWidth();

  useLayoutEffect(() => {
    if (width <= 771) {
      setIsBurgerMenu(true);
    } else {
      setIsBurgerMenu(false);
    }
  }, [width]);

  return (
    <header className="header">
      < Logo />
      {children}

      {isLoggiedIn ? (
        <>
          {isBurgerMenu ? (
            <button className='header__menu' onClick={handleNavigateButtonClick}></button>
          ) : (
            <Navigation isLoggiedIn={isLoggiedIn} />
          )}
        </>
      ) : (
        <Navigation isLoggiedIn={isLoggiedIn} />
      )}

    </header>
  );
}

export default Header;