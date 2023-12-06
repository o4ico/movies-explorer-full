import React from 'react';
import './Checkbox.css';
function Checkbox({
  onChange,
  value
}) {

  return (
    <div className="checkbox">
      <label className="checkbox__container" htmlFor="checkbox">
        <input className="checkbox__element" type='checkbox' id='checkbox' checked={value} onChange={onChange}></input>
        <span className="checkbox__visible "></span>
      </label>
      <p className='checkbox__text'>Короткометражки</p>
    </div>
  );
}

export default Checkbox;