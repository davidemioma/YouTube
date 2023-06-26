"use client";

import React from "react";

import { CurrentUser } from "@/types";
import SavedPost from "@/components/posts/SavedPost";

interface Props {
  currentUser: CurrentUser | null;
}

const HistoryContent = ({ currentUser }: Props) => {
  return (
    <div className="flex flex-col gap-5 p-5">
      <span className="text-lg sm:text-xl font-semibold">Watch History</span>

      <div className="w-full flex-1 flex flex-col gap-2 pb-10">
        {currentUser?.seenPosts?.map((post) => (
          <SavedPost key={post.id} post={post} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
};

export default HistoryContent;
