"use client";

import React, { useEffect } from "react";
import Empty from "@/components/Empty";
import Spinner from "@/components/Spinner";
import Post from "@/components/posts/Post";
import { CurrentUser, PostProps } from "@/types";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import useUnlimitedScrolling from "@/hooks/useUnlimitedScrolling";

interface Props {
  initialPosts: PostProps[];
  currentUser: CurrentUser | null;
}

const Posts = ({ initialPosts, currentUser }: Props) => {
  const { ref, entry, data, fetchNextPage, isFetchingNextPage } =
    useUnlimitedScrolling({
      key: "infinite-query-feed",
      query: `/api/posts/feed?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}`,
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
    <div className="w-full h-full overflow-y-auto">
      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 md:justify-items-start lg:grid-cols-3 2xl:grid-col-4 gap-5 p-5">
            {posts.map((post, i) => {
              if (i === posts.length - 1) {
                return (
                  <div key={post.id} ref={ref}>
                    <Post post={post} currentUser={currentUser} />
                  </div>
                );
              } else {
                return (
                  <Post key={post.id} post={post} currentUser={currentUser} />
                );
              }
            })}
          </div>

          {isFetchingNextPage && <Spinner />}
        </>
      ) : (
        <Empty label="No videos available" />
      )}
    </div>
  );
};

export default Posts;
