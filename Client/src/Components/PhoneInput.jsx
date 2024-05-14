import React from 'react';
import InputMask from 'react-input-mask';

const PhoneInput = ({ value, onChange }) => {
  return (
    <InputMask
      mask="+7 (999) 999-9999"
      value={value}
      onChange={onChange}
      placeholder="(123) 456-7890"
    />
  );
};

export default PhoneInput;
