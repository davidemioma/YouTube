"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Avatar from "../Avatar";
import Moment from "react-moment";
import { useRouter } from "next/navigation";
import WatchLater from "../modal/WatchLater";
import { RxDotsVertical } from "react-icons/rx";
import { CurrentUser, PostProps } from "@/types";
import { numberFormatter } from "@/util/helpers";
import useWatchLater from "@/hooks/useWatchLater";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

interface Props {
  post: PostProps;
  currentUser: CurrentUser | null;
}

const SearchedPost = ({ post, currentUser }: Props) => {
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
      className="group flex flex-col md:flex-row gap-5 cursor-pointer"
      ref={postRef}
      onClick={() => show && setShow(false)}
    >
      <div
        className="relative w-full md:max-w-xs h-48 overflow-hidden rounded-lg"
        onClick={onClickHandler}
      >
        <Image
          className="object-cover group-hover:scale-105 transition duration-300"
          src={post.photoUrl}
          fill
          alt=""
        />
      </div>

      <div className="relative flex-1 flex items-start gap-3 justify-between">
        <div className="flex flex-col" onClick={onClickHandler}>
          <span className="font-semibold line-clamp-2 md:line-clamp-1">
            {post.title}
          </span>

          <span className="text-sm font-semibold text-gray-50/70 hover:text-white">
            {numberFormatter(post.seenIds.length)} views .{" "}
            {<Moment fromNow date={new Date(post.createdAt).toUTCString()} />}
          </span>

          <div className="flex items-center gap-3 py-3">
            <Avatar
              imgSrc={post.user?.image!}
              onClick={() => router.push(`/channel/${post.user?.id}`)}
            />

            <span className="text-sm font-semibold text-gray-50/70 hover:text-white">
              {post.user?.name}
            </span>
          </div>

          <span className="text-sm text-gray-50/70 line-clamp-2 md:line-clamp-1">
            {post.description}
          </span>
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

export default SearchedPost;
