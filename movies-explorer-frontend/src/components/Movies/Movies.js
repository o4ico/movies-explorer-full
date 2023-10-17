import React from 'react';
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from "../../utils/MoviesApi";
import Preloader from '../Preloader/Preloader';

function Movies({
  isLoggiedIn,
  handleNavigateButtonClick,
  onSaveMovie
}) {

  const [foundMovies, setFoundMovies] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const searchingResults = JSON.parse(localStorage.getItem('searchingResults'));

  //-----------------------------------------------------------------------------поиск по фильмам

  const handleSearch = (query, short) => {//обработчик кнопки Найти фильм
    setIsLoading(true);
    //все фильмы в localStorage
    const allMovies = JSON.parse(localStorage.getItem('movies'));
    //загружаются с moviesApi если нет
    if (!allMovies) {
      moviesApi.getMoviesData()
        .then((movies) => {
          localStorage.setItem('movies', JSON.stringify(movies));//сохранение фильмов
          filter(query, short);
        })
        .catch(() => {
          setError('Произошла ошибка');
        });
    } else {
      filter(allMovies, query, short);
    }
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

  const filter = (allMovies, query, short) => {//фильтр по запросу
    const filtered = searchFilter(allMovies, query, short);
    if (filtered.length === 0) {
      setIsLoading(false);
      setError(true);
    }
    if (filtered.length > 0) {
      setError(false);
      localStorage.setItem('searchingResults', JSON.stringify(filtered));//сохранение результата поиска
    }
    setFoundMovies(filtered);
    setIsLoading(false);
  };

  //---------------------------------------------------------загрузка последнего поиска из localStorage

  React.useEffect(() => {
    if (ValidSearshingResults(searchingResults)) {
      setFoundMovies(searchingResults);
    }
  }, []);


  const ValidSearshingResults = (searchingResults) => {
    console.log(searchingResults);
    if (searchingResults.every(obj => obj.image.url)) {
      return true
    }
  }

  return (
    <>
      {isLoading ? <Preloader /> :
        <>
          < Header isLoggiedIn={isLoggiedIn} handleNavigateButtonClick={handleNavigateButtonClick} />
          <main className="content__container">
            < SearchForm handleSearch={handleSearch} />
            < MoviesCardList
              movies={foundMovies}
              error={error}
              onSaveMovie={onSaveMovie}
            />
          </main>
          < Footer />
        </>
      }
    </>
  );
}

export default Movies;