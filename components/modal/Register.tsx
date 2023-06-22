"use client";

import React, { useRef, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import Image from "next/image";
import Input from "../inputs/Input";
import Button from "../inputs/Button";
import { toast } from "react-hot-toast";
import TextArea from "../inputs/TextArea";
import { AiFillCamera } from "react-icons/ai";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { uploadFile, getFileUrl } from "@/util/helpers";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Register = () => {
  const loginModal = useLoginModal();

  const registerModal = useRegisterModal();

  const [loading, setLoading] = useState(false);

  const [imgFile, setImgFile] = useState<any>(null);

  const imgPickerRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      description: "",
    },
  });

  const openLoginModal = () => {
    registerModal.onClose();

    loginModal.onOpen();
  };

  const uploadImageHandler = (e: React.FormEvent) => {
    uploadFile(e, setImgFile);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    const image = await getFileUrl(imgFile, `users/images/${data.email}`);

    axios
      .post("/api/register", {
        ...data,
        image,
      })
      .then(() => {
        toast.success("Registration successful");

        reset();

        setImgFile(null);

        registerModal.onClose();

        loginModal.onOpen();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      title="Create an account"
      isOpen={registerModal.isOpen}
      onClose={() => registerModal.onClose()}
      disabled={loading}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="w-full flex items-center justify-center">
          <div
            className="group relative w-16 h-16 rounded-full overflow-hidden cursor-pointer"
            onClick={
              !imgFile
                ? () => imgPickerRef?.current?.click()
                : () => setImgFile(null)
            }
          >
            <Image
              className="object-cover"
              src={imgFile || "/assets/no-profile.jpeg"}
              fill
              alt=""
            />

            <input
              ref={imgPickerRef}
              type="file"
              accept="image/*"
              disabled={loading}
              hidden
              onChange={uploadImageHandler}
            />

            <AiFillCamera
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black/70 opacity-0 group-hover:opacity-100 transition"
              size={23}
            />
          </div>
        </div>

        <Input
          id="name"
          type="text"
          placeholder="Name"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />

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

        <TextArea
          id="description"
          rows={5}
          placeholder="Description"
          disabled={loading}
          register={register}
          errors={errors}
        />

        <Button type="submit" label="Create an account" disabled={loading} />

        <p className="text-sm text-[#717171]">
          Already have an account{" "}
          <span className="cursor-pointer underline" onClick={openLoginModal}>
            Creata an account
          </span>
        </p>
      </form>
    </Modal>
  );
};

export default Register;
