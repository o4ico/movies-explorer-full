import React from 'react';
import './MoviesCard.css';
import { Link, useLocation } from 'react-router-dom';
import { SavedMoviesContext } from "../../contexts/SavedMoviesContext";

function MoviesCard({
  movie,
  onSaveMovie,
  onDeleteMovie,
}) {
  const savedMovies = React.useContext(SavedMoviesContext);
  const isSavedMoviesRoute = useLocation().pathname === "/saved-movies";
  const [isLoading, setIsLoading] = React.useState(false);

  const savedMovie = savedMovies ? savedMovies.find((m) => m.movieId === movie.id) : '';
  const isSaved = savedMovies ? savedMovies.some((m) => m.movieId === movie.id) : false;

  const handleClickSave = () => {
    setIsLoading(true);
    onSaveMovie(movie, savedMovie?._id, isSaved)
    setIsLoading(false);
  }

  const handleClickDelete = () => {
    setIsLoading(true);
    onDeleteMovie(movie._id);
    setIsLoading(false);
  }

  function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours > 0 ? ` ${hours}ч` : ''}${minutes > 0 ? ` ${minutes}м` : ''}`;
  }

  return (
    <li className="movies-card">
      <Link to={movie.trailerLink} target='_blank'><img className="movies-card__image" src={`${(!movie.image.url) ? `${movie.image}` : `https://api.nomoreparties.co/${movie.image.url}`}`} alt={`постер к фильму ${movie.nameRU}`} /></Link>
      <div className="movies-card__caption">
        <h2 className="movies-card__text">{movie.nameRU}</h2>
        {isSavedMoviesRoute ? (
          <button className="movies-card__delete-button " type="button" onClick={handleClickDelete}></button>
        ) : (
          <button className={`movies-card__save-button ${isSaved ? " movies-card__save-button_active" : ''}`} type="button" onClick={handleClickSave} />
        )}

      </div>
      <div className="movies-card__duration-container">
        <p className="movies-card__duration">{toHoursAndMinutes(movie.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;