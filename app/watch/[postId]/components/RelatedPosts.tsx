"use client";

import React from "react";
import { CurrentUser, PostProps } from "@/types";

interface Props {
  currentUser: CurrentUser | null;
  posts: PostProps[];
}

const RelatedPosts = ({ currentUser, posts }: Props) => {
  return <div className="w-full max-w-[360px] lg:order-2">RelatedPosts</div>;
};

export default RelatedPosts;
