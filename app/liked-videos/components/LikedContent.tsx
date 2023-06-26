"use client";

import React from "react";
import { CurrentUser } from "@/types";
import SavedPost from "@/components/posts/SavedPost";

interface Props {
  currentUser: CurrentUser | null;
}

const LikedContent = ({ currentUser }: Props) => {
  return (
    <div className="flex flex-col gap-5 p-5">
      <span className="text-lg sm:text-xl font-semibold">Liked Videos</span>

      <div className="w-full flex-1 flex flex-col gap-2 pb-10">
        {currentUser?.likedPosts.map((post) => (
          <SavedPost key={post.id} post={post} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
};

export default LikedContent;
