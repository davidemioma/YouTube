"use client";

import React, { useState } from "react";
import Moment from "react-moment";
import useLike from "@/hooks/useLike";
import Avatar from "@/components/Avatar";
import { useRouter } from "next/navigation";
import useSubscribe from "@/hooks/useSubscribe";
import { numberFormatter } from "@/util/helpers";
import { CurrentUser, PostDetails } from "@/types";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

interface Props {
  currentUser: CurrentUser | null;
  post: PostDetails | null;
}

const PostInfo = ({ post, currentUser }: Props) => {
  const router = useRouter();

  const [showMore, setShowMore] = useState(false);

  const { loading, hasSubscribed, handleSubscribe } = useSubscribe({
    currentUser,
    userId: post?.user?.id!,
  });

  const {
    loading: isLoading,
    hasLiked,
    hasDisliked,
    handleLike,
    handleDislike,
  } = useLike({ currentUser, postId: post?.id! });

  return (
    <div className="w-full">
      <span className="text-lg font-bold line-clamp-2 mb-1">{post?.title}</span>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Avatar
            imgSrc={post?.user?.image!}
            onClick={() => router.push(`/channel/${post?.user?.id}`)}
          />

          <div className="flex flex-col">
            <span className="font-semibold capitalize">{post?.user?.name}</span>

            <span className="text-xs font-semibold text-gray-50/70">
              {numberFormatter(post?.user?.subscribersIds?.length!)} Subscribers
            </span>
          </div>

          {post?.user?.id !== currentUser?.id && (
            <button
              className={`${
                hasSubscribed
                  ? "bg-[hsl(0,0%,18.82%)] text-white"
                  : "bg-gray-50 text-black"
              } text-sm font-semibold ml-2 px-4 py-2 rounded-full disabled:cursor-not-allowed disabled:opacity-75 transition`}
              onClick={handleSubscribe}
              disabled={loading}
            >
              {hasSubscribed ? "Unsubscribe" : "Subscribe"}
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[hsl(0,0%,18.82%)] w-[134px] flex items-center rounded-full overflow-hidden">
            <button
              className="flex items-center gap-3 py-2 px-4 hover:bg-gray-50/50 disabled:opacity-75 disabled:cursor-not-allowed transition"
              onClick={handleLike}
              disabled={isLoading}
            >
              {hasLiked ? <FaThumbsUp size={23} /> : <FiThumbsUp size={23} />}

              <span>{numberFormatter(post?.likedIds?.length!)}</span>
            </button>

            <div className="bg-[#717171] w-[1px] h-full py-2" />

            <button
              className="py-2 px-4 hover:bg-[#717171] disabled:opacity-75 disabled:cursor-not-allowed transition"
              onClick={handleDislike}
              disabled={isLoading}
            >
              {hasDisliked ? (
                <FaThumbsDown size={23} />
              ) : (
                <FiThumbsDown size={23} />
              )}
            </button>
          </div>

          <div className="flex items-center justify-center w-10 h-10 bg-[hsl(0,0%,18.82%)] hover:bg-gray-50/50 rounded-full cursor-pointer transition">
            <HiOutlineDotsHorizontal size={20} />
          </div>
        </div>
      </div>

      <div className="bg-[hsl(0,0%,18.82%)] w-full p-3 mt-4 mb-10 rounded-lg">
        <div className="flex items-center gap-2 text-sm font-semibold mb-1">
          <span>{numberFormatter(post?.seenIds.length!)} views</span>

          <span>
            {<Moment fromNow date={new Date(post?.createdAt!).toUTCString()} />}
          </span>
        </div>

        <span
          className={`text-sm ${showMore ? "line-clamp-none" : "line-clamp-2"}`}
        >
          {post?.description}
        </span>

        {post?.description.length! > 150 && (
          <span
            className="text-sm cursor-pointer hover:underline transition"
            onClick={() => setShowMore((prev) => !prev)}
          >
            show {showMore ? "less" : "more"}
          </span>
        )}
      </div>
    </div>
  );
};

export default PostInfo;
