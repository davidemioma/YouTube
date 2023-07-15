"use client";

import React, { useEffect } from "react";
import Spinner from "@/components/Spinner";
import { CurrentUser, PostProps } from "@/types";
import ChannelPost from "@/components/posts/ChannelPost";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import useUnlimitedScrolling from "@/hooks/useUnlimitedScrolling";

interface Props {
  channelId: string;
  currentUser: CurrentUser | null;
  initialPosts: PostProps[];
}

const Videos = ({ channelId, currentUser, initialPosts }: Props) => {
  const { ref, entry, data, fetchNextPage, isFetchingNextPage } =
    useUnlimitedScrolling({
      key: "infinite-query-channel-posts",
      query: `/api/posts/channel-posts?id=${channelId}&limit=${INFINITE_SCROLL_PAGINATION_RESULTS}`,
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
    <>
      <div className="w-full flex flex-wrap gap-4 mb-4">
        {posts.map((post, i) => {
          if (i === posts.length - 1) {
            return (
              <div key={post.id} ref={ref}>
                <ChannelPost post={post} currentUser={currentUser} />
              </div>
            );
          } else {
            return (
              <ChannelPost
                key={post.id}
                post={post}
                currentUser={currentUser}
              />
            );
          }
        })}
      </div>

      {isFetchingNextPage && <Spinner />}
    </>
  );
};

export default Videos;
