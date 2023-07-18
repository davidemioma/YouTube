"use client";

import React, { useRef, useState, MouseEventHandler } from "react";
import Image from "next/image";
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

const SavedPost = ({ post, currentUser }: Props) => {
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

  const onToggle: MouseEventHandler<any> = (e) => {
    e.stopPropagation();

    setShow((prev) => !prev);
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
      className="group w-full flex gap-2 hover:bg-[hsl(0,0%,18.82%)] p-2 sm:p-3 rounded-lg cursor-pointer transition"
      ref={postRef}
      onClick={onClickHandler}
    >
      <div className="relative w-[40%] max-w-[200px] h-28 overflow-hidden rounded-lg">
        <Image
          className="object-cover group-hover:scale-105 transition duration-300"
          src={post.photoUrl}
          fill
          alt=""
        />
      </div>

      <div className="relative w-[60%] flex-1 flex items-start gap-3 justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-semibold line-clamp-2">{post.title}</span>

          <span className="text-sm font-semibold text-gray-50/70">
            {post.user.name} . {numberFormatter(post.seenIds.length)} views .{" "}
            {<Moment fromNow date={new Date(post.createdAt).toUTCString()} />}
          </span>
        </div>

        {currentUser && (
          <RxDotsVertical
            className="cursor-pointer opacity-0 group-hover:opacity-100 flex-shrink-0"
            onClick={onToggle}
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

export default SavedPost;
