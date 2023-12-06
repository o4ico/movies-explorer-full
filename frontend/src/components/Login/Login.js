import React from 'react';
import Auth from '../Auth/Auth';
import auth from "../../utils/Auth";
import mainApi from "../../utils/MainApi";
import Preloader from '../Preloader/Preloader';

function Login({
  onLogin,
  onLoginFail
}) {

  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = (email, password) => {
    setIsLoading(true);
    auth.authorize(email, password)
      .then(({ token }) => {
        localStorage.setItem('jwt', token);
        mainApi.getUserInfoServer()
          .then((res) => {
            onLogin(res);
          })
          .catch((err) => {
            console.log(err);
          })
      }).catch((res) => {
        let errorMessage;
        if (res.status === 401) {
          errorMessage = 'Вы ввели неправильный логин или пароль.';
        } else {
          errorMessage = 'При авторизации произошла ошибка.';
        }
        onLoginFail(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (<>
    {isLoading ? <Preloader /> :
      <>
        <main className="content__container">
          <Auth
            formName={'register'}
            title={'Рады видеть!'}
            submitButtonText={'Войти'}
            adviceText={`Ещё не зарегистрированы? `}
            adviceLink={'/signup'}
            adviceTextLink={'Регистрация'}
            onSubmit={handleLogin}
          />
        </main>
      </>
    }
  </>
  );
}

export default Login;