"use client";

import React, { useEffect } from "react";
import Spinner from "@/components/Spinner";
import { PostProps, CurrentUser } from "@/types";
import SearchedPost from "@/components/posts/SearchedPost";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import useUnlimitedScrolling from "@/hooks/useUnlimitedScrolling";

interface Props {
  initialPosts: PostProps[];
  query: string;
  currentUser: CurrentUser | null;
}

const Content = ({ initialPosts, query, currentUser }: Props) => {
  const { ref, entry, data, fetchNextPage, isFetchingNextPage } =
    useUnlimitedScrolling({
      key: "infinite-query-search",
      query: `/api/posts/search?q=${query}&limit=${INFINITE_SCROLL_PAGINATION_RESULTS}`,
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
    <div className="p-5">
      <h1 className="mb-5 text-lg font-semibold">Results</h1>

      <div className="flex flex-col gap-4 pb-10">
        {posts.map((post, i) => {
          if (i === posts.length - 1) {
            return (
              <div key={post.id} ref={ref}>
                <SearchedPost post={post} currentUser={currentUser} />
              </div>
            );
          } else {
            return (
              <SearchedPost
                key={post.id}
                post={post}
                currentUser={currentUser}
              />
            );
          }
        })}
      </div>

      {isFetchingNextPage && <Spinner />}
    </div>
  );
};

export default Content;
