"use client";

import React, { useState } from "react";
import Avatar from "../Avatar";
import Image from "next/image";
import Moment from "react-moment";
import { useRouter } from "next/navigation";
import { RxDotsVertical } from "react-icons/rx";
import { numberFormatter } from "@/util/helpers";
import { CurrentUser, PostProps } from "@/types";
import { AiOutlineClockCircle } from "react-icons/ai";
import useWatchLater from "@/hooks/useWatchLater";

interface Props {
  post: PostProps;
  currentUser: CurrentUser | null;
}

const Post = ({ post, currentUser }: Props) => {
  const router = useRouter();

  const [show, setShow] = useState(false);

  const { hasAdded, loading, handleWatchLater } = useWatchLater(
    currentUser,
    post.id
  );

  const onClickHandler = () => {
    router.push(`/watch/${post.id}`);
  };

  return (
    <div
      className="group w-full max-w-sm md:w-full h-[300px] flex flex-col cursor-pointer"
      onClick={() => show && setShow(false)}
    >
      <div
        className="relative w-full h-48 rounded-lg overflow-hidden"
        onClick={onClickHandler}
      >
        <Image
          className="object-cover group-hover:scale-105 transition duration-300"
          src={post.photoUrl}
          fill
          alt=""
        />
      </div>

      <div className="relative flex items-start justify-between gap-3 py-3">
        <div className="flex-1 flex items-start gap-3">
          <Avatar
            imgSrc={post.user?.image!}
            onClick={() => router.push(`/channel/${post.user?.id}`)}
          />

          <div
            className="flex-1 flex flex-col gap-0.5"
            onClick={onClickHandler}
          >
            <span className="font-semibold line-clamp-2">{post.title}</span>

            <span className="text-sm font-semibold text-gray-50/70 hover:text-white">
              {post.user?.name}
            </span>

            <span className="text-sm font-semibold text-gray-50/70 hover:text-white">
              {numberFormatter(post.seenIds.length)} views .{" "}
              {<Moment fromNow date={new Date(post.createdAt).toUTCString()} />}
            </span>
          </div>
        </div>

        <RxDotsVertical
          className="cursor-pointer opacity-0 group-hover:opacity-100"
          onClick={() => setShow((prev) => !prev)}
          size={20}
        />

        {show && (
          <div className="absolute top-10 right-0 z-10 w-60 bg-[hsl(0,0%,18.82%)] rounded-lg overflow-hidden">
            <button
              className="w-full flex items-center gap-4 py-2 px-4 hover:bg-[#717171] transition"
              onClick={handleWatchLater}
              disabled={loading}
            >
              <AiOutlineClockCircle size={23} />

              <span className="text-sm font-semibold whitespace-nowrap">
                {hasAdded ? "Remove from" : "Save to"} watch later
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
