"use client";

import React, { useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Button from "../inputs/Button";
import { toast } from "react-hot-toast";
import Category from "../inputs/Category";
import TextArea from "../inputs/TextArea";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import useAddPostModal from "@/hooks/useAddPostModal";
import { uploadFile, getFileUrl } from "@/util/helpers";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

enum STEPS {
  INFO = 0,
  CATEGORY = 1,
  THUMBNAIL = 2,
  VIDEO = 3,
}

const AddPost = () => {
  const router = useRouter();

  const addPostModal = useAddPostModal();

  const [step, setStep] = useState(STEPS.INFO);

  const [loading, setLoading] = useState(false);

  const [imgFile, setImgFile] = useState<any>(null);

  const imgPickerRef = useRef<HTMLInputElement>(null);

  const [videoFile, setVideoFile] = useState<any>(null);

  const videoPickerRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState("");

  const [subCategory, setSubCategory] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
  });

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addHandler = (e: React.FormEvent<HTMLFormElement>) => {
    if (!input.trim()) return;

    e.preventDefault();

    const category = subCategory.find((cat) => cat === input);

    if (category) {
      setInput("");

      return;
    }

    setSubCategory((prev) => [input, ...prev]);

    setInput("");
  };

  const removeHandler = (cat: string) => {
    setSubCategory((prev) => [...prev].filter((c) => c !== cat));
  };

  const uploadImageHandler = (e: React.FormEvent) => {
    uploadFile(e, setImgFile);
  };

  const uploadVideoHandler = (e: React.FormEvent) => {
    uploadFile(e, setVideoFile);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.VIDEO) {
      return setStep((prev) => prev + 1);
    }

    if (!videoFile) {
      toast.error("Upload a video");

      return;
    }

    setLoading(true);

    const photoUrl = await getFileUrl(imgFile, `posts/images/${data.title}`);

    const videoUrl = await getFileUrl(videoFile, `posts/videos/${data.title}`);

    axios
      .post("/api/upload", {
        ...data,
        subCategory,
        photoUrl,
        videoUrl,
      })
      .then(() => {
        toast.success("Video uploaded");

        setImgFile(null);

        setVideoFile(null);

        setSubCategory([]);

        reset();

        setStep(STEPS.INFO);

        addPostModal.onClose();

        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  let content = (
    <div className="flex flex-col gap-5">
      <Input
        id="title"
        type="text"
        placeholder="Title"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />

      <TextArea
        id="description"
        rows={6}
        placeholder="Description"
        disabled={loading}
        register={register}
        errors={errors}
      />
    </div>
  );

  if (step === STEPS.CATEGORY) {
    content = (
      <div className="w-full flex flex-col gap-3">
        <h1 className="text-lg font-semibold">Select a category</h1>

        <Category
          value={category}
          onChange={(value) => setCustomValue("category", value)}
        />

        <div className="flex flex-col gap-3">
          <h1 className="text-lg font-semibold">Add your tags</h1>

          <form className="flex flex-col gap-2" onSubmit={addHandler}>
            <input
              className="bg-transparent py-2 px-4 border border-gray-50/50 rounded-lg focus:outline-none opacity-70 focus:opacity-100 transition"
              value={input}
              type="text"
              placeholder="Tags.."
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
            />

            <div className="flex flex-wrap gap-1 cursor-pointer">
              {subCategory.map((cat, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-0.5 text-xs text-blue-500"
                >
                  <span>#{cat}</span>

                  <IoClose
                    className="text-red-500 opacity-0 group-hover:opacity-100 transition"
                    onClick={() => removeHandler(cat)}
                  />
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (step === STEPS.THUMBNAIL) {
    content = (
      <div className="w-full flex flex-col gap-3">
        <h1 className="text-lg font-semibold">Choose your Thumbnail</h1>

        <div
          className="flex items-center justify-center w-full h-60 bg-black/50 rounded-lg overflow-hidden"
          onClick={
            !imgFile
              ? () => imgPickerRef?.current?.click()
              : () => setImgFile(null)
          }
        >
          {!imgFile ? (
            <div className="relative w-40 h-40 overflow-hidden cursor-pointer animate-bounce">
              <Image
                className="object-cover"
                src="/assets/empty.png"
                fill
                alt=""
              />
            </div>
          ) : (
            <div className="relative w-full h-full overflow-hidden">
              <Image className="object-cover" src={imgFile} fill alt="" />
            </div>
          )}

          <input
            ref={imgPickerRef}
            type="file"
            accept="image/*"
            disabled={loading}
            hidden
            onChange={uploadImageHandler}
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.VIDEO) {
    content = (
      <div className="w-full flex flex-col gap-3">
        <h1 className="text-lg font-semibold">Upload a video</h1>

        <div
          className="flex items-center justify-center w-full h-60 bg-black/50 rounded-lg overflow-hidden"
          onClick={
            !videoFile
              ? () => videoPickerRef?.current?.click()
              : () => setVideoFile(null)
          }
        >
          {videoFile ? (
            <video className="w-full h-full" src={videoFile} controls />
          ) : (
            <div className="relative w-40 h-40 overflow-hidden cursor-pointer animate-bounce">
              <Image
                className="object-cover"
                src="/assets/empty.png"
                fill
                alt=""
              />
            </div>
          )}
        </div>

        <input
          ref={videoPickerRef}
          type="file"
          accept="video/*"
          disabled={loading}
          hidden
          onChange={uploadVideoHandler}
        />
      </div>
    );
  }

  return (
    <Modal
      title="Upload a video"
      isOpen={addPostModal.isOpen}
      onClose={() => addPostModal.onClose()}
      disabled={loading}
    >
      <div className="flex flex-col gap-5">
        {content}

        <div className="w-full flex items-center gap-10">
          {step !== STEPS.INFO && (
            <Button
              type="button"
              label="Prev"
              disabled={loading}
              onClick={() => setStep((prev) => prev - 1)}
            />
          )}

          <Button
            type="button"
            label={step === STEPS.VIDEO ? "Upload" : "Next"}
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddPost;
