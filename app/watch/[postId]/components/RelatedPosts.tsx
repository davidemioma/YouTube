"use client";

import React from "react";
import { CurrentUser, PostProps } from "@/types";
import RelatedPost from "@/components/posts/RelatedPost";

interface Props {
  currentUser: CurrentUser | null;
  posts: PostProps[];
}

const RelatedPosts = ({ currentUser, posts }: Props) => {
  if (posts.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 w-full max-w-[360px] lg:order-2">
      {posts.map((post) => (
        <RelatedPost key={post.id} currentUser={currentUser} post={post} />
      ))}
    </div>
  );
};

export default RelatedPosts;
