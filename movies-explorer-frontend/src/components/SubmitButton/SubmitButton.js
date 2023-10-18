import React from 'react';
import './SubmitButton.css'

function SubmitButton({
  value,
  isValid,
  isEdit,
  form,
  isLoading,
  onClick
}) {

  return (
    <input
      className={`submit-button ${!isEdit ? 'submit-button_edit' : ''} ${!isValid ? 'submit-button_disabled' : ''} ${isLoading ? 'submit-button_disabled' : ''}`}
      type="submit"
      value={value}
      disabled={!isValid}
      form={form}
      onClick={onClick}
    />
  )
}

export default SubmitButton;