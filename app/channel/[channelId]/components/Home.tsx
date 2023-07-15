"use client";

import React from "react";
import { CurrentUser, PostProps } from "@/types";
import ChannelPost from "@/components/posts/ChannelPost";

interface Props {
  currentUser: CurrentUser | null;
  posts: PostProps[];
  viewAll: () => void;
}

const Home = ({ currentUser, posts, viewAll }: Props) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <span className="text-lg sm:text-xl font-semibold">Videos</span>

        <span
          className="text-sm text-blue-500 cursor-pointer hover:underline transition"
          onClick={viewAll}
        >
          View All
        </span>
      </div>

      <div className="flex flex-wrap gap-4 py-5">
        {posts.map((post) => (
          <ChannelPost key={post.id} post={post} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
};

export default Home;
