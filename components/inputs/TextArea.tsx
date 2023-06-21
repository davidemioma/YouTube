"use client";

import React from "react";
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";

interface Props {
  id: string;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const TextArea = ({
  id,
  rows,
  disabled,
  required,
  placeholder,
  register,
  errors,
}: Props) => {
  return (
    <textarea
      className={`bg-transparent py-2 px-4 border rounded-lg focus:outline-none opacity-70 focus:opacity-100 ${
        errors[id] ? "border-red-500" : "border-gray-50/50"
      } transition`}
      id={id}
      rows={rows}
      placeholder={placeholder}
      disabled={disabled}
      {...register(id, { required })}
    />
  );
};

export default TextArea;
