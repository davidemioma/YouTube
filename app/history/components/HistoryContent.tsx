"use client";

import React, { useEffect } from "react";
import Spinner from "@/components/Spinner";
import { CurrentUser, PostProps } from "@/types";
import SavedPost from "@/components/posts/SavedPost";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import useUnlimitedScrolling from "@/hooks/useUnlimitedScrolling";

interface Props {
  currentUser: CurrentUser | null;
  initialPosts: PostProps[];
}

const HistoryContent = ({ initialPosts, currentUser }: Props) => {
  const { ref, entry, data, fetchNextPage, isFetchingNextPage } =
    useUnlimitedScrolling({
      key: "infinite-query-history",
      query: `/api/posts/history?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}`,
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
    <div className="flex flex-col gap-5 p-5">
      <span className="text-lg sm:text-xl font-semibold">Watch History</span>

      <div className="w-full flex-1 flex flex-col gap-2 pb-10">
        {posts.map((post, i) => {
          if (i === posts.length - 1) {
            return (
              <div key={post.id} ref={ref}>
                <SavedPost post={post} currentUser={currentUser} />
              </div>
            );
          } else {
            return (
              <SavedPost key={post.id} post={post} currentUser={currentUser} />
            );
          }
        })}

        {isFetchingNextPage && <Spinner />}
      </div>
    </div>
  );
};

export default HistoryContent;
