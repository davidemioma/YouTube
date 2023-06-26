"use client";

import React from "react";
import { CurrentUser, PostProps } from "@/types";
import Post from "@/components/posts/Post";

interface Props {
  currentUser: CurrentUser | null;
  posts: PostProps[];
}

const SubsContent = ({ currentUser, posts }: Props) => {
  return (
    <div className="w-full h-full p-5 overflow-y-auto">
      <span className="text-lg sm:text-xl font-semibold">Latest</span>

      <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 md:justify-items-start lg:grid-cols-3 2xl:grid-col-4 gap-5 py-5">
        {posts.map((post) => (
          <Post key={post.id} post={post} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
};

export default SubsContent;
