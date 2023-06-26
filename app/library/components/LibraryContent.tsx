"use client";

import React from "react";
import Lists from "./Lists";
import { CurrentUser } from "@/types";
import { BsClock } from "react-icons/bs";
import { GoHistory } from "react-icons/go";
import { FiThumbsUp } from "react-icons/fi";

interface Props {
  currentUser: CurrentUser | null;
}

const LibraryContent = ({ currentUser }: Props) => {
  return (
    <div className="flex flex-col w-full h-full p-5 overflow-y-auto">
      <div className="border-b border-[hsl(0,0%,18.82%)]">
        <Lists
          title="History"
          Icon={GoHistory}
          href="/history"
          posts={currentUser?.seenPosts || []}
          currentUser={currentUser}
        />
      </div>

      <div className="pt-5 pb-2 border-b border-[hsl(0,0%,18.82%)]">
        <Lists
          title="Watch Later"
          Icon={BsClock}
          href="/watch-later"
          posts={currentUser?.watchLaterPosts || []}
          currentUser={currentUser}
        />
      </div>

      <div className="pt-5">
        <Lists
          title="Liked Videos"
          Icon={FiThumbsUp}
          href="/liked-videos"
          posts={currentUser?.likedPosts || []}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default LibraryContent;
