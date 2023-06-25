"use client";

import React from "react";
import { ChannelProps, CurrentUser } from "@/types";
import ChannelPost from "@/components/posts/ChannelPost";

interface Props {
  channel: ChannelProps | null;
  currentUser: CurrentUser | null;
}

const Videos = ({ channel, currentUser }: Props) => {
  return (
    <div className="w-full flex flex-wrap gap-4">
      {channel?.posts.map((post) => (
        <ChannelPost key={post.id} post={post} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default Videos;
