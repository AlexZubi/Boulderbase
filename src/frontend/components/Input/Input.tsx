import React, { ChangeEventHandler, FormEvent, FormEventHandler } from "react";

interface InputProps {
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: any;
  placeholder?: string;
}

export const Input = ({ name, onChange, value, placeholder }: InputProps) => {

  return (
    <div>
        <input
          className="input"
          type="text"
          name={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
    </div>
  );
};
