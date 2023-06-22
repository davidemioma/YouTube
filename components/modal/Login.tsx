"use client";

import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Button from "../inputs/Button";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const registerModal = useRegisterModal();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Login successful");

          reset();

          loginModal.onClose();

          router.refresh();
        }
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setLoading(false));
  };

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
