import React, { useCallback } from 'react';
import isEmail from 'validator/es/lib/isEmail';

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());

    if (name === 'email') {
      if (isEmail(value)) {
        target.setCustomValidity('');
      } if (!isEmail(value)) {
        target.setCustomValidity('Некорректный адрес почты');
      }
    }

    if (name === 'name') {
      if (!/^(?=.{1,30}$)[а-яёА-ЯЁa-zA-Z]+(?:[- ][а-яёА-ЯЁa-zA-Z]+)*$/.test(value)) {
        target.setCustomValidity('Некоректное имя пользователя');
      } else {
        target.setCustomValidity('');
      }
    }

  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, setIsValid, resetForm };
}