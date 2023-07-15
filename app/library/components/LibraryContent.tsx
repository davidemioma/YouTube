"use client";

import React from "react";
import Lists from "./Lists";
import { CurrentUser, PostProps } from "@/types";
import { BsClock } from "react-icons/bs";
import { GoHistory } from "react-icons/go";
import { FiThumbsUp } from "react-icons/fi";

interface Props {
  currentUser: CurrentUser | null;
  seenPosts: PostProps[];
  savedPosts: PostProps[];
  likedPosts: PostProps[];
}

const LibraryContent = ({
  currentUser,
  seenPosts,
  savedPosts,
  likedPosts,
}: Props) => {
  return (
    <div className="flex flex-col w-full h-full p-5 overflow-y-auto">
      <div className="border-b border-[hsl(0,0%,18.82%)]">
        <Lists
          title="History"
          Icon={GoHistory}
          href="/history"
          posts={seenPosts}
          currentUser={currentUser}
        />
      </div>

      <div className="pt-5 pb-2 border-b border-[hsl(0,0%,18.82%)]">
        <Lists
          title="Watch Later"
          Icon={BsClock}
          href="/watch-later"
          posts={savedPosts}
          currentUser={currentUser}
        />
      </div>

      <div className="pt-5">
        <Lists
          title="Liked Videos"
          Icon={FiThumbsUp}
          href="/liked-videos"
          posts={likedPosts}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default LibraryContent;
