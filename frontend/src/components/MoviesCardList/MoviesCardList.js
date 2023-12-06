import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import usePageWidth from '../../utils/pageWidth';

function MoviesCardList({
  movies,
  error,
  onSaveMovie,
  onDeleteMovie
}) {

  const [maxMovies, setMaxMovies] = React.useState(0); //максимальное кол-во фильмов при первой загрузке
  const [more, setMore] = React.useState(0);//максимальное кол-во фильмов, добавляемых при нажатии кнопки еще

  let width = usePageWidth();
  const isMoviesRoute = useLocation().pathname === "/movies";
  const isSavedMoviesRoute = useLocation().pathname === "/saved-movies";
  //---------------------------------------------логика отображения фильмов
  //обработчик кнопки еще
  const handleMoreShow = () => {
    setMaxMovies(maxMovies + more);
  };

  const setMoviesRules = () => {

    if (width <= 1279 && width >= 991) { //3 колонки
      setMaxMovies(12);
      setMore(3);
    } else if (width <= 990 && width >= 631) {//2 колонки
      setMaxMovies(8);
      setMore(2);
    } else if ((width <= 630 && width >= 320) || (width < 320)) {//1 колонка
      setMaxMovies(5);
      setMore(2);
    } else {//4 колонки
      setMaxMovies(16);
      setMore(4);
    }
  };

  React.useEffect(() => {
    setMoviesRules();
  }, [width, movies]);//изменение ширины страницы и новый поиск 
  //должны устанавливать новые значения maxMovies и more

  return (
    <>
      <section className="movies-card-list">

        {error ? (<p className="movies-card-list__not-found">Ничего не найдено</p>
        ) : (
          <ul className="movies-card-list__container" >
            {isSavedMoviesRoute ? (<>
              {movies.map((item) => {
                if (isSavedMoviesRoute) {
                  return (<MoviesCard
                    movie={item}
                    key={item._id}
                    onSaveMovie={onSaveMovie}
                    onDeleteMovie={onDeleteMovie}
                  />);
                }
                return
              })}
            </>) : (<>
              {movies.map((item, index) => {
                if (index < maxMovies) {
                  return (<MoviesCard
                    movie={item}
                    key={item.id}
                    onSaveMovie={onSaveMovie}
                    onDeleteMovie={onDeleteMovie}
                  />);
                }
                return
              })}
            </>)
            }
          </ul>
        )}
        {movies.length > maxMovies && isMoviesRoute ? (
          <div className="movies-card-list__more">
            <button className="movies-card-list__more-button" type="button" onClick={handleMoreShow}>Ещё</button>
          </div>) : (<></>)}
      </section>

    </>
  );
}

export default MoviesCardList;