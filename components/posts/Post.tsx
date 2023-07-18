"use client";

import React, { useRef, useState } from "react";
import Avatar from "../Avatar";
import Image from "next/image";
import Moment from "react-moment";
import WatchLater from "../modal/WatchLater";
import { useRouter } from "next/navigation";
import { RxDotsVertical } from "react-icons/rx";
import { numberFormatter } from "@/util/helpers";
import { CurrentUser, PostProps } from "@/types";
import useWatchLater from "@/hooks/useWatchLater";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

interface Props {
  post: PostProps;
  currentUser: CurrentUser | null;
}

const Post = ({ post, currentUser }: Props) => {
  const router = useRouter();

  const [show, setShow] = useState(false);

  const postRef = useRef<HTMLDivElement>(null);

  const { hasAdded, loading, handleWatchLater } = useWatchLater(
    currentUser,
    post.id
  );

  const onClickHandler = () => {
    router.push(`/watch/${post.id}`);
  };

  const watchLaterHandler = () => {
    handleWatchLater();

    setShow(false);
  };

  useOnClickOutside(postRef, () => {
    setShow(false);
  });

  return (
    <div
      className="group w-full max-w-sm md:w-full h-[300px] flex flex-col cursor-pointer"
      ref={postRef}
      onClick={() => show && setShow(false)}
    >
      <div
        className="relative bg-[hsl(0,0%,18.82%)] w-full h-48 rounded-lg overflow-hidden"
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

        {currentUser && (
          <RxDotsVertical
            className="cursor-pointer opacity-0 group-hover:opacity-100 flex-shrink-0"
            onClick={() => setShow((prev) => !prev)}
            size={20}
          />
        )}

        {show && (
          <WatchLater
            onClick={watchLaterHandler}
            disabled={loading}
            label={`${hasAdded ? "Remove from" : "Save to"} watch later`}
          />
        )}
      </div>
    </div>
  );
};

export default Post;
