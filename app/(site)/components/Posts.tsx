"use client";

import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import Empty from "@/components/Empty";
import Post from "@/components/posts/Post";
import { CurrentUser, PostProps } from "@/types";

interface Props {
  posts: PostProps[];
  currentUser: CurrentUser | null;
}

const Posts = ({ posts, currentUser }: Props) => {
  const [value, setValue] = useState("all");

  const [filteredPosts, setFilteredPosts] = useState(posts);

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
        <div className="mt-20 grid grid-cols-1 justify-items-center md:grid-cols-2 md:justify-items-start lg:grid-cols-3 2xl:grid-col-4 gap-5 p-5">
          {filteredPosts.map((post) => (
            <Post key={post.id} post={post} currentUser={currentUser} />
          ))}
        </div>
      ) : (
        <Empty label="No videos available" />
      )}
    </div>
  );
};

export default Posts;
