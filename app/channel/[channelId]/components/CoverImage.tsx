"use client";

import React, { useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CurrentUser, ChannelProps } from "@/types";
import { uploadFile, getFileUrl } from "@/util/helpers";

interface Props {
  channel: ChannelProps | null;
  currentUser: CurrentUser | null;
}

const CoverImage = ({ channel, currentUser }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [imgFile, setImgFile] = useState<any>(null);

  const filePickerRef = useRef<HTMLInputElement>(null);

  const uploadFileHandler = (e: React.FormEvent) => {
    uploadFile(e, setImgFile);
  };

  const uploadCoverImage = async () => {
    setLoading(true);

    const coverImage = await getFileUrl(
      imgFile,
      `users/cover/${currentUser?.email}`
    );

    axios
      .patch("/api/cover-upload", {
        coverImage,
      })
      .then(() => {
        toast.success("Cover image updated");

        setImgFile(null);

        router.refresh();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="relative w-full h-28 md:h-36 lg:h-40 bg-[hsl(0,0%,18.82%)] overflow-hidden">
      {channel?.coverImage && !imgFile && (
        <Image className="object-cover" src={channel?.coverImage} fill alt="" />
      )}

      {imgFile && <Image className="object-cover" src={imgFile} fill alt="" />}

      <input
        ref={filePickerRef}
        type="file"
        accept="image/*"
        disabled={loading}
        hidden
        onChange={uploadFileHandler}
      />

      {channel?.id === currentUser?.id && !imgFile && (
        <button
          className="absolute bottom-5 right-5 bg-red-600 px-2 py-1 font-semibold rounded-lg"
          onClick={
            !imgFile
              ? () => filePickerRef?.current?.click()
              : () => setImgFile(null)
          }
        >
          Upload
        </button>
      )}

      {imgFile && (
        <div className="absolute bottom-5 right-5 flex items-center gap-3">
          <button
            className="bg-blue-500 py-1 px-3 font-semibold rounded-full disabled:opacity-75 disabled:cursor-not-allowed transition"
            onClick={uploadCoverImage}
            disabled={loading}
          >
            Save
          </button>

          <button
            className="bg-red-600 py-1 px-3 font-semibold rounded-full disabled:opacity-75 disabled:cursor-not-allowed transition"
            onClick={() => setImgFile(null)}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default CoverImage;
