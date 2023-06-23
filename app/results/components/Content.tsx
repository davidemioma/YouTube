"use client";

import React from "react";
import { PostProps, CurrentUser } from "@/types";
import SearchedPost from "@/components/posts/SearchedPost";

interface Props {
  posts: PostProps[];
  currentUser: CurrentUser | null;
}

const Content = ({ posts, currentUser }: Props) => {
  return (
    <div className="w-full p-5">
      <h1 className="mb-5 text-lg font-semibold">Results</h1>

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <SearchedPost key={post.id} post={post} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
};

export default Content;
