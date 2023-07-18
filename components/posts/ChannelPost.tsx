"use client";

import React, { useRef, useState, MouseEventHandler } from "react";
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

const ChannelPost = ({ post, currentUser }: Props) => {
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
      className="group flex flex-col gap-2 w-52 h-52 cursor-pointer"
      ref={postRef}
      onClick={onClickHandler}
    >
      <div className="relative w-full h-32 rounded-lg overflow-hidden">
        <Image
          className="object-cover group-hover:scale-105 transition duration-300"
          src={post.photoUrl}
          fill
          alt=""
        />
      </div>

      <div className="relative flex items-start gap-2 justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold line-clamp-2">
            {post.title}
          </span>

          <span className="text-xs text-[#717171]">
            {numberFormatter(post.seenIds.length)} views .{" "}
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

export default ChannelPost;
