import getToken from './constants'

class MainApi {
  constructor(config) {
    this._url = config.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ой ${res.status}`);
  }

  getSavedMovies() {
    return fetch(`${this._url}movies`, {
      method: 'GET',
      headers: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      }
    }
    )
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  getUserInfoServer() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      }
    }
    )
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  patchUserInfoServer(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      })
    }
    )
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  saveMovieServer(movie) {
    return fetch(`${this._url}movies`, {
      method: 'POST',
      headers: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: movie.country,
        description: movie.description,
        director: movie.director,
        duration: movie.duration,
        movieId: movie.id,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
        nameEN: movie.nameEN,
        nameRU: movie.nameRU,
        trailerLink: movie.trailerLink,
        year: movie.year
      })
    }
    )
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  deleteMovieServer(movieId) {
    return fetch(`${this._url}movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      }
    }
    )
      .then((res) => {
        return this._checkResponse(res);
      })
  }

}

const mainApi = new MainApi({
  baseUrl: 'https://api.film.nomoredomainsrocks.ru/',
  //baseUrl: 'http://127.0.0.1:4000/'
});

export default mainApi;