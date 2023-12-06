import React from 'react';
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SavedMoviesContext } from "../../contexts/SavedMoviesContext";

function SavedMovies({
  isLoggiedIn,
  handleNavigateButtonClick,
  onDeleteMovie
}) {
  const savedMovies = React.useContext(SavedMoviesContext);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchParams, setSearchParams] = React.useState(null);

  const handleSearch = (query, short) => {//обработчик кнопки Найти фильм
    setIsLoading(true);
    filter(query, short);
    setSearchParams({ query, short });
  };

  function searchFilter(array, query, short) {
    if (!array) {
      return [];
    }
    let filtered = [...array];
    if (query) {
      filtered = filtered.filter((item) => item.nameRU
        .toLowerCase()
        .includes(query.toLowerCase()));
    }
    if (short) {
      return filtered.filter((item) => item.duration <= 50);//максимальна длина короткометражки
    }
    return filtered;
  }

  const filter = (query, short) => {//фильтр по запросу

    const filtered = searchFilter(savedMovies, query, short);
    if (filtered.length === 0) {
      setError(true);
    }
    if (filtered.length > 0) {
      setError(false);
    }
    setFoundMovies(filtered);
    setIsLoading(false);
  };

  React.useEffect(() => {//все фильмы при загрузке страницы
    setFoundMovies(searchParams);
  }, []);

  React.useEffect(() => {
    setFoundMovies(savedMovies);
  }, [onDeleteMovie]);

  React.useEffect(() => {
    if (searchParams) {
      filter(searchParams.query, searchParams.short);
    }
  }, [savedMovies]);

  return (
    <>
      < Header isLoggiedIn={isLoggiedIn} handleNavigateButtonClick={handleNavigateButtonClick} />
      <main className="content__container">
        < SearchForm handleSearch={handleSearch} />
        < MoviesCardList
          movies={foundMovies}
          error={error}
          onDeleteMovie={onDeleteMovie}
        />
      </main>
      < Footer />
    </>
  );
}

export default SavedMovies;