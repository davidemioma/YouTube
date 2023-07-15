"use client";

import React, { useEffect, useRef } from "react";
import axios from "axios";
import Empty from "@/components/Empty";
import Spinner from "@/components/Spinner";
import Post from "@/components/posts/Post";
import { useIntersection } from "@mantine/hooks";
import { CurrentUser, PostProps } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";

interface Props {
  initialPosts: PostProps[];
  currentUser: CurrentUser | null;
}

const Posts = ({ initialPosts, currentUser }: Props) => {
  const lastPostRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query-feed"],
    async ({ pageParam = 1 }) => {
      const query = `/api/posts/feed?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}`;

      const { data } = await axios.get(query);

      return data as PostProps[];
    },
    {
      getNextPageParam: (_: any, pages: string | any[]) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );

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
