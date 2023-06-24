"use client";

import React from "react";
import Player from "./Player";
import PostInfo from "./PostInfo";
import RelatedPosts from "./RelatedPosts";
import useInfoModal from "@/hooks/useInfoModal";
import { CurrentUser, PostDetails, PostProps } from "@/types";

interface Props {
  currentUser: CurrentUser | null;
  post: PostDetails | null;
  relatedPosts: PostProps[];
}

const WatchContent = ({ currentUser, post, relatedPosts }: Props) => {
  const infoModal = useInfoModal();

  const closeAllModals = () => {
    infoModal.isOpen && infoModal.onClose();
  };

  return (
    <div className="w-full h-full overflow-y-auto" onClick={closeAllModals}>
      <Player videoUrl={post?.videoUrl!} />

      <div className="flex flex-col lg:flex-row gap-5 p-5">
        <div className="w-full lg:flex-1">
          <PostInfo currentUser={currentUser} post={post} />
        </div>

        <RelatedPosts currentUser={currentUser} posts={relatedPosts} />
      </div>
    </div>
  );
};

export default WatchContent;
