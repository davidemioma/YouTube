"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import Input from "../inputs/Input";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../inputs/Button";

const Login = () => {
  const loginModal = useLoginModal();

  const registerModal = useRegisterModal();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const openRegisterModal = () => {
    loginModal.onClose();

    registerModal.onOpen();
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {};

  return (
    <Modal
      title="Login to your account"
      isOpen={loginModal.isOpen}
      onClose={() => loginModal.onClose()}
      disabled={loading}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          id="email"
          type="email"
          placeholder="Email"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="password"
          type="password"
          placeholder="Password"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />

        <Button type="submit" label="Sign In" disabled={loading} />

        <p className="text-sm text-[#717171]">
          New to YouTube{" "}
          <span
            className="cursor-pointer underline"
            onClick={openRegisterModal}
          >
            Creata an account
          </span>
        </p>
      </form>
    </Modal>
  );
};

export default Login;
