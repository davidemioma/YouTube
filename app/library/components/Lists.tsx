"use client";

import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import { CurrentUser, PostProps } from "@/types";
import RelatedPost from "@/components/posts/RelatedPost";

interface Props {
  title: string;
  Icon: IconType;
  href: string;
  posts: PostProps[];
  currentUser: CurrentUser | null;
}

const Lists = ({ title, Icon, href, posts, currentUser }: Props) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={23} />

          <span className="text-lg font-semibold">{title}</span>
        </div>

        <Link href={href}>
          <div className="py-2 px-4 text-sm text-blue-500 rounded-full hover:bg-blue-300">
            See all
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 py-5">
        {posts.slice(0, 6).map((post) => (
          <RelatedPost key={post.id} post={post} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
};

export default Lists;
