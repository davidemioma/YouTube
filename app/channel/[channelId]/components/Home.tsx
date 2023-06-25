"use client";

import React from "react";
import { ChannelProps, CurrentUser } from "@/types";
import ChannelPost from "@/components/posts/ChannelPost";

interface Props {
  channel: ChannelProps | null;
  currentUser: CurrentUser | null;
  viewAll: () => void;
}

const Home = ({ channel, currentUser, viewAll }: Props) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <span className="text-lg sm:text-xl font-semibold">Videos</span>

        {channel?.posts.length! > 5 && (
          <span
            className="text-sm text-blue-500 cursor-pointer hover:underline transition"
            onClick={viewAll}
          >
            View All
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-4 py-5">
        {channel?.posts.slice(0, 5).map((post) => (
          <ChannelPost key={post.id} post={post} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
};

export default Home;
