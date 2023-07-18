"use client";

import React, { useEffect } from "react";
import Post from "@/components/posts/Post";
import { CurrentUser, PostProps } from "@/types";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import useUnlimitedScrolling from "@/hooks/useUnlimitedScrolling";
import Spinner from "@/components/Spinner";

interface Props {
  currentUser: CurrentUser | null;
  initialPosts: PostProps[];
}

const SubsContent = ({ currentUser, initialPosts }: Props) => {
  const { ref, entry, data, fetchNextPage, isFetchingNextPage } =
    useUnlimitedScrolling({
      key: "infinite-query-subscripton",
      query: `/api/posts/subscription?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}`,
      initialData: initialPosts,
    });

  //@ts-ignore
  const posts: PostProps[] =
    data?.pages?.flatMap((page) => page) ?? initialPosts;

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return (
    <div className="w-full h-full p-5">
      <span className="text-lg sm:text-xl font-semibold">Latest</span>

      <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 md:justify-items-start lg:grid-cols-3 2xl:grid-col-4 gap-5 py-5">
        {posts.map((post, i) => {
          if (i === initialPosts.length - 1) {
            return (
              <div key={post.id} ref={ref}>
                <Post post={post} currentUser={currentUser} />
              </div>
            );
          } else {
            return <Post key={post.id} post={post} currentUser={currentUser} />;
          }
        })}
      </div>

      {isFetchingNextPage && <Spinner />}
    </div>
  );
};

export default SubsContent;
