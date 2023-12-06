import React from "react";
import './InfoTooltip.css'
import success from '../../images/Success.svg';
import fail from '../../images/Fail.svg';

function InfoTooltip({
  isOpen,
  onClose,
  isStatus,
  message
}) {

  return (
    <div className={`popup ${isOpen ? " popup_opened" : ''}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        {isStatus ? <>
          <img className="popup__icon" src={success} alt="Галочка" />
          <h3 className="popup__status">{message}</h3>
        </> : <>
          <img className="popup__icon" src={fail} alt="Крестик" />
          <h3 className="popup__status">{message}</h3>
        </>}
      </div>
    </div>
  );
}

export default InfoTooltip;