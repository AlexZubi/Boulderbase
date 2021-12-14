import React, { ChangeEventHandler } from "react";

interface InputProps {
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: any;
  placeholder?: string;
}

export const Input = ({ name, onChange, value, placeholder }: InputProps) => {
  return (
    <input
      className="input"
      type="text"
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
};
