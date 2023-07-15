"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Filters from "./Filters";
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
  const [value, setValue] = useState("all");

  const lastPostRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query-feed"],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `/api/posts/feed?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}`
      );

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

  const [filteredPosts, setFilteredPosts] = useState<PostProps[]>(posts);

  useEffect(() => {
    if (value === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.category === value));
    }
  }, [posts, value]);

  return (
    <div className="w-full h-full overflow-y-auto">
      <Filters value={value} setValue={setValue} />

      {filteredPosts.length > 0 ? (
        <>
          <div className="mt-20 grid grid-cols-1 justify-items-center md:grid-cols-2 md:justify-items-start lg:grid-cols-3 2xl:grid-col-4 gap-5 p-5">
            {filteredPosts.map((post, i) => {
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
