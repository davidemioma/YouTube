"use client";

import React from "react";
import { CurrentUser, PostDetails } from "@/types";
import Player from "./Player";
import RelatedPosts from "./RelatedPosts";
import PostInfo from "./PostInfo";

interface Props {
  currentUser: CurrentUser | null;
  post: PostDetails | null;
}

const WatchContent = ({ currentUser, post }: Props) => {
  return (
    <div className="w-full h-full overflow-y-auto">
      <Player videoUrl={post?.videoUrl!} />

      <div className="flex flex-col lg:flex-row gap-5 p-5">
        <div className="w-full lg:flex-1">
          <PostInfo currentUser={currentUser} post={post} />
        </div>

        <RelatedPosts currentUser={currentUser} posts={[]} />
      </div>
    </div>
  );
};

export default WatchContent;
