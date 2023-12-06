import getToken from './constants'

class Auth {
  constructor(baseUrl) {
    this._url = baseUrl;
  }

  _checkResponse(res) {
    console.log(res)
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ой ${res.status}`);
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    })
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password
      })
    }
    )
      .then(res => {
        return this._checkResponse(res);
      });
  }
}
const auth = new Auth('http://127.0.0.1:4000');
//const auth = new Auth('https://api.film.nomoredomainsrocks.ru');

export default auth;