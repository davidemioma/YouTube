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
  currentUser: CurrentUser | null;
  post: PostProps;
}

const RelatedPost = ({ currentUser, post }: Props) => {
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

  const watchLaterHandler: MouseEventHandler<any> = (e) => {
    e.stopPropagation();

    handleWatchLater();

    setShow(false);
  };

  useOnClickOutside(postRef, () => {
    setShow(false);
  });

  return (
    <div
      className="group w-full flex items-start gap-2 cursor-pointer"
      ref={postRef}
      onClick={onClickHandler}
    >
      <div className="relative w-[45%] h-24 rounded-lg overflow-hidden">
        <Image
          className="object-cover group-hover:scale-105 transition duration-300"
          src={post.photoUrl}
          fill
          alt=""
        />
      </div>

      <div className="relative w-[55%] flex item-start gap-3 justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold line-clamp-2">
            {post.title}
          </span>

          <span className="text-sm capitalize font-semibold text-gray-50/70">
            {post.user?.name}
          </span>

          <span className="text-xs font-semibold text-gray-50/70">
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

export default RelatedPost;
