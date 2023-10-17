import React from 'react';
import './SearchForm.css';
import { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Checkbox from '../Checkbox/Checkbox';
import usePageWidth from '../../utils/pageWidth';

function SearchForm({
  handleSearch
}) {
  const isMoviesRoute = useLocation().pathname === "/movies";
  const isChecked = JSON.parse(localStorage.getItem('checkBoxState'));
  const [isShortsFilm, setIsShortsFilm] = useState(isChecked);//состояние чекбокса для короткометражек, по умолчанию из localStorage
  const [searchValue, setSearchValue] = useState(`${isMoviesRoute ? (JSON.parse(localStorage.getItem('searchQueryText')) || '') : ''}`);//запрос по умолчанию из localStorage
  const [isSmartphone, setIsSmartphone] = useState(false);

  let width = usePageWidth();

  useLayoutEffect(() => {
    if (width <= 640) {
      setIsSmartphone(true);
    } else {
      setIsSmartphone(false);
    }
  }, [width]);

  function handleChangeSearch(e) {
    setSearchValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleSearch(searchValue, isShortsFilm);
    if (isMoviesRoute) {
      localStorage.setItem('searchQueryText', JSON.stringify(searchValue));//сохранение значения поиска
    }
  }

  function toggleCheckbox() {
    setIsShortsFilm(!isShortsFilm);
    if (searchValue.length > 0) {
      handleSearch(searchValue, !isShortsFilm); //поиск по значению чекбокса только при наличии запроса
    }
    if (isMoviesRoute) {
      localStorage.setItem('checkBoxState', JSON.stringify(!isShortsFilm));//сохранение значения чекбокса
    }
  }

  return (
    <section className="search-form">

      {isSmartphone ? (
        <>
          <div className="search-form__container">
            <form className="search-form__form" name='searchMovie' noValidate="" onSubmit={handleSubmit}>
              <input
                className="search-form__input"
                type="text"
                placeholder="Фильм"
                name="movie"
                id="movie-search"
                onChange={handleChangeSearch}
                value={searchValue || ''}
                required
                minLength={1}
                maxLength={100}
              />
              <input
                className="search-form__submit-button"
                type="submit"
                value='Найти'

              />
            </form>

          </div>
          < Checkbox onChange={toggleCheckbox} value={isShortsFilm} />
        </>
      ) : (
        <div className="search-form__container">
          <div className="search-form__loupe"></div>
          <form className="search-form__form" name='searchMovie' noValidate="" onSubmit={handleSubmit}>
            <input
              className="search-form__input"
              type="text"
              placeholder="Фильм"
              name="movie"
              id="movie-search"
              onChange={handleChangeSearch}
              value={searchValue || ''}
              required
              minLength={1}
              maxLength={100}
            />
            <input
              className="search-form__submit-button"
              type="submit"
              value='Найти'
            />
          </form>
          < Checkbox onChange={toggleCheckbox} value={isShortsFilm} />
        </div>
      )}
      <div className="search-form__line"></div>
    </section>
  );
}

export default SearchForm;