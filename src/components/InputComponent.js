import React from 'react';
import styled from 'styled-components';

function InputComponent({ id, label, type, placeholder, register, required }) {
  return (
    <InputWrapper>
      <Label htmlFor={id}>{label}</Label>
      <InputField
        type={type}
        id={id}
        placeholder={placeholder}
        {...register} 
        required={required}
      />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: black;
  margin-bottom: 0.5rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  box-sizing: border-box;
  &::placeholder {
    color: #aaa;
  }
`;

export default InputComponent;
