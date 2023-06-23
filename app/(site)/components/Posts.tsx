"use client";

import React from "react";

import Post from "@/components/posts/Post";
import { CurrentUser, PostProps } from "@/types";

interface Props {
  posts: PostProps[];
  currentUser: CurrentUser | null;
}

const Posts = ({ posts, currentUser }: Props) => {
  return (
    <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 md:justify-items-start lg:grid-cols-3 2xl:grid-col-4 gap-5 w-full h-full p-5 overflow-y-auto">
      {posts.map((post) => (
        <Post key={post.id} post={post} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default Posts;
