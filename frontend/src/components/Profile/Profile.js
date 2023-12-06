import React from 'react';
import './Profile.css'
import { Link } from 'react-router-dom';
import Header from "../Header/Header";
import { useFormWithValidation } from '../../utils/validation';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import Preloader from '../Preloader/Preloader';
import SubmitButton from '../SubmitButton/SubmitButton';

function Profile({
  isLoggiedIn,
  handleNavigateButtonClick,
  handleLogout,
  onUpdateProfile,
  onUpdateProfileFail
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [editError, setEditError] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const { values, handleChange, errors, isValid, setIsValid, resetForm } = useFormWithValidation();

  function changeEditingState() {
    return setIsEditing((state) => !state);
  }

  React.useEffect(() => {
    if (editError === '') {
      setIsError(false);
    } else {
      setIsError(true);
    }
  }, [editError]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    if (values.name !== currentUser.name || values.email !== currentUser.email) {
      mainApi.patchUserInfoServer({ name: values.name || currentUser.name, email: values.email || currentUser.email })
        .then((res) => {
          onUpdateProfile(res);
          changeEditingState();
        })
        .catch((res) => {
          let errorMessage;
          if (res.status === 409) {
            errorMessage = 'Пользователь с таким email уже существует';
          } else {
            errorMessage = 'При обновлении профиля произошла ошибка';
          }
          setEditError(errorMessage);
          onUpdateProfileFail(errorMessage);
        })
        .finally(() => {
          setIsLoading(false);
          setIsEditing(false);
          resetForm();
          setEditError('');
        });
    }
    setIsEditing(false);
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleCheckValidity();
  }, [values]);

  const handleCheckValidity = () => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setIsValid(false);
    }
  }

  return (
    <>
      {isLoading ? <Preloader /> :
        <>
          < Header isLoggiedIn={isLoggiedIn} handleNavigateButtonClick={handleNavigateButtonClick} />
          <main className="content__container">
            <section className="profile">
              <div className="profile__container">
                <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                <form className="profile__form" name='profile' id='profile' noValidate onSubmit={handleSubmit}>
                  <label className="profile__input-container">
                    <span className="profile__input-label">Имя</span>
                    <input
                      className="profile__input"
                      type="text"
                      placeholder='Имя'
                      value={isEditing ? `${values.name ?? currentUser.name}` : `${currentUser.name}`}
                      onChange={handleChange}
                      name="name"
                      id="profile-name"
                      required
                      minLength={2}
                      maxLength={100}
                      disabled={!isEditing}
                    />
                  </label>
                  <span className="profile__text-error profile-name-text-error" ></span>
                  <label className="profile__input-container">
                    <span className="profile__input-label">E-mail</span>
                    <input
                      className="profile__input"
                      type="email"
                      placeholder='E-mail'
                      value={isEditing ? `${values.email ?? currentUser.email}` : `${currentUser.email}`}
                      onChange={handleChange}
                      name="email"
                      id="profile-email"
                      required
                      minLength={6}
                      maxLength={100}
                      disabled={!isEditing}
                    />
                  </label>
                  <span className="profile__text-error profile-email-text-error" ></span>
                </form>
              </div>

              {isEditing ? (
                <div className="profile__submit-container">
                  <span className={`profile__submit-massage  ${isError ? 'profile__submit-massage_error' : ''}`}>{editError}</span>
                  <SubmitButton
                    value={'Сохранить'}
                    isValid={isValid}
                    form={'profile'}
                    isEdit={isEditing}
                    isLoading={isLoading}
                  />
                </div>
              ) : (
                <div className="profile__submit-container">
                  <SubmitButton
                    value={'Редактировать'}
                    isValid={true}
                    form={'profile'}
                    isEdit={isEditing}
                    onClick={changeEditingState}
                    isLoading={false}
                  />
                  <Link to="/"><button className="profile__button-exit" onClick={handleLogout}>Выйти из аккаунта</button></Link>
                </div>)
              }
            </section>
          </main>
        </>
      }
    </>
  );
}

export default Profile;