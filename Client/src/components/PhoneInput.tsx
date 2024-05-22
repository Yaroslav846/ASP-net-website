import React from 'react';
import InputMask from 'react-input-mask';

interface PhoneInputProps {
  type: string; // Define the type property
  id: string;
  className: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
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