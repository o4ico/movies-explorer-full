import React from 'react';
import Auth from '../Auth/Auth';
import auth from "../../utils/Auth";
import mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';

function Register({
  onRegister,
  onRegisterFail,
  onLogin,
  onLoginFail
}) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRegister = (name, email, password) => {
    setIsLoading(true);
    auth.register(name, email, password)//если пользователь успешно зарегистрировался то выполняется запрос на вход в аккаунт
      .finally((res) => {
        onRegister();
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
          }).catch((err) => {
            let errorMessage = 'При авторизации произошла ошибка.';
            onLoginFail(errorMessage);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((res) => {
        let errorMessage;
        if (res.status === 409) {
          errorMessage = 'Пользователь с таким email уже существует';
        } else {
          errorMessage = 'При регистрации произошла ошибка.';
        }
        onRegisterFail(errorMessage);
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
            title={'Добро пожаловать!'}
            submitButtonText={'Зарегистрироваться'}
            adviceText={`Уже зарегистрированы? `}
            adviceLink={'/signin'}
            adviceTextLink={'Войти'}
            onSubmit={handleRegister}
          />
        </main>
      </>
    }
  </>
  );
}

export default Register;