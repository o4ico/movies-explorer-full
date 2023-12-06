import React from 'react';
import './Auth.css'
import Logo from '../Logo/Logo'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/validation';
import auth from '../../utils/Auth';

function Auth({
  formName,
  title,
  submitButtonText,
  adviceText,
  adviceLink,
  adviceTextLink,
  onSubmit
}) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const isRegisterRoute = useLocation().pathname === "/signup";

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isRegisterRoute) {
      onSubmit(values.name, values.email, values.password);
    } else {
      onSubmit(values.email, values.password);
    }
  }

  return (
    <section className="auth">
      <div className="auth__container">
        < Logo />
        <h1 className="auth__title">{title}</h1>
        <form className="auth__form" id={formName} name={formName} onSubmit={handleSubmit} noValidate>
          {isRegisterRoute ? (
            <>
              <label className="auth__input-container">
                <span className="auth__input-label">Имя</span>
                <input
                  className={`auth__input ${errors.name ? 'auth__input_error' : ''} `}
                  type="text"
                  placeholder='Имя'
                  name="name"
                  id="auth-name"
                  value={values.name || ''}
                  onChange={handleChange}
                  required
                  minLength={2}
                  maxLength={30}
                />
              </label>
              <span className={`auth__text-error ${errors.name ? 'auth__text-error' : ''}`}>{errors.name}</span>
            </>
          ) : (
            <></>
          )}
          <label className="auth__input-container">
            <span className="auth__input-label">E-mail</span>
            <input
              className={`auth__input ${errors.email ? 'auth__input_error' : ''} `}
              type="email"
              placeholder='E-mail'
              name="email"
              id="auth-email"
              value={values.email || ''}
              onChange={handleChange}
              required
            />
          </label>
          <span className={`auth__text-error ${errors.email ? 'auth__text-error' : ''}`}>{errors.email}</span>
          <label className="auth__input-container">
            <span className="auth__input-label">Пароль</span>
            <input
              className={`auth__input ${errors.password ? 'auth__input_error' : ''} `}
              type="password"
              placeholder='Пароль'
              name="password"
              id="auth-password"
              value={values.password || ''}
              onChange={handleChange}
              required
              minLength={8}
            />
          </label>
          <span className={`auth__text-error ${errors.password ? 'auth__text-error' : ''}`}>{errors.password}</span>

        </form>
      </div>
      <div className="auth__submit-container">
        <input
          className={`auth__submit-button ${!isValid ? 'auth__submit-button_disabled' : ''}`}
          type="submit"
          value={submitButtonText}
          disabled={!isValid}
          form={formName}
        />
        <p className="auth__advice">{adviceText}
          <Link className="auth__advice-link" to={adviceLink}>
            {adviceTextLink}
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Auth;