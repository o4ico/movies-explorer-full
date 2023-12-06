import React from "react";
import './App.css'

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedMoviesContext } from "../../contexts/SavedMoviesContext";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Menu from "../Menu/Menu";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import mainApi from "../../utils/MainApi";

function App() {
  //меню и попап
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [statusInfo, setStatusInfo] = React.useState(false);
  const [messageText, setMessageText] = React.useState('');
  //данные пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);//для проверки верстки шапки для авторизованного и неавторизованного пользователя поменяйте^^

  const [savedMovies, setSavedMovies] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {

    const token = localStorage.getItem('jwt');

    if (token) {
      mainApi.getUserInfoServer()
        .then((res) => {
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, []);

  React.useEffect(() => {

    if (isLoggedIn) {
      mainApi.getUserInfoServer()
        .then((res) => {
          setCurrentUser(res);
          mainApi.getSavedMovies()
            .then((res) => {
              setSavedMovies(res);
            })
            .catch((err) => {
              console.log(err);
            })
          navigate('/movies', { replace: true });
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [isLoggedIn]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleNavigateButtonClick() {
    setIsMenuOpen(true);
  }

  function closeTooltip() {
    setIsTooltipOpen(false);
  }

  const handleSaveMovie = (movie, movieId, isSaved) => {
    if (isSaved) {
      handleDeleteMovie(movieId);
    } else {
      mainApi.saveMovieServer(movie)
        .then(res => {
          setSavedMovies([...savedMovies, res]);
        })
        .catch(err => console.log(err));
    }
  };

  const handleDeleteMovie = (movieId) => {

    mainApi.deleteMovieServer(movieId)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== movieId));
      })
      .catch(err => console.log(err));
  };

  const handleRegister = () => {
    navigate('/signin', { replace: true });
  }

  const handleRegisterFail = (message) => {
    setStatusInfo(false);
    setMessageText(message);
    setIsTooltipOpen(true);
  }

  function handleUpdateUser(userData) {
    setCurrentUser(userData);
    setStatusInfo(true);
    setMessageText('Данные обнвлены.');
    setIsTooltipOpen(true);
  }

  function handleUpdateUserFail(message) {
    setStatusInfo(false);
    setMessageText(message);
    setIsTooltipOpen(true);
  }

  const handleLogin = (res) => {
    setCurrentUser(res);
    setIsLoggedIn(true);
    setStatusInfo(true);
    setMessageText('Вы вошли в аккаунт.');
    setIsTooltipOpen(true);
  }

  const handleLoginFail = (message) => {
    setStatusInfo(false);
    setMessageText(message);
    setIsTooltipOpen(true);
  }

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SavedMoviesContext.Provider value={savedMovies}>
        <Routes>
          <Route path="/movies" element={
            <ProtectedRoute isLoggiedIn={isLoggedIn}>
              <Movies
                isLoggiedIn={isLoggedIn}
                handleNavigateButtonClick={handleNavigateButtonClick}
                onSaveMovie={handleSaveMovie}
              />
            </ProtectedRoute>
          } />
          <Route path="/saved-movies" element={
            <ProtectedRoute isLoggiedIn={isLoggedIn}>
              < SavedMovies
                isLoggiedIn={isLoggedIn}
                handleNavigateButtonClick={handleNavigateButtonClick}
                onDeleteMovie={handleDeleteMovie}
              />

            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute isLoggiedIn={isLoggedIn}>
              < Profile
                isLoggiedIn={isLoggedIn}
                handleNavigateButtonClick={handleNavigateButtonClick}
                handleLogout={handleLogout}
                onUpdateProfile={handleUpdateUser}
                onUpdateProfileFail={handleUpdateUserFail}
              />
            </ProtectedRoute>
          } />
          <Route path="/" element={
            <>
              < Main
                isLoggiedIn={isLoggedIn}
                handleNavigateButtonClick={handleNavigateButtonClick}
              />
            </>
          } />
          <Route path="/signup" element={
            < Register
              onRegister={handleRegister}
              onRegisterFail={handleRegisterFail}
              onLogin={handleLogin}
              onLoginFail={handleLoginFail}
            />
          } />
          <Route path="/signin" element={
            < Login
              onLogin={handleLogin}
              onLoginFail={handleLoginFail}
            />
          } />
          <Route
            path="*"
            element={
              < NotFound />
            } />
        </Routes>
      </SavedMoviesContext.Provider>
      < Menu
        isOpen={isMenuOpen}
        onClose={closeMenu} />
      <InfoTooltip
        isOpen={isTooltipOpen}
        onClose={closeTooltip}
        isStatus={statusInfo}
        message={messageText}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
