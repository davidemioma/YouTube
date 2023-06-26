"use client";

import React, { useEffect } from "react";
import axios from "axios";
import Player from "./Player";
import Comments from "./Comments";
import PostInfo from "./PostInfo";
import { toast } from "react-hot-toast";
import RelatedPosts from "./RelatedPosts";
import { useRouter } from "next/navigation";
import { getRandomPosts } from "@/util/helpers";
import useInfoModal from "@/hooks/useInfoModal";
import { CurrentUser, PostDetails, PostProps } from "@/types";

interface Props {
  currentUser: CurrentUser | null;
  post: PostDetails | null;
  relatedPosts: PostProps[];
}

const WatchContent = ({ currentUser, post, relatedPosts }: Props) => {
  const router = useRouter();

  const infoModal = useInfoModal();

  const closeAllModals = () => {
    infoModal.isOpen && infoModal.onClose();
  };

  useEffect(() => {
    const viewVideo = async () => {
      await axios
        .post("/api/watch", {
          postId: post?.id,
        })
        .then(() => {
          router.refresh();
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    };

    if (currentUser) {
      viewVideo();
    }
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto" onClick={closeAllModals}>
      <Player videoUrl={post?.videoUrl!} />

      <div className="flex flex-col lg:flex-row gap-5 p-5">
        <div className="w-full lg:flex-1">
          <PostInfo currentUser={currentUser} post={post} />

          <div className="hidden lg:block mt-5 w-full">
            <Comments currentUser={currentUser} post={post} />
          </div>
        </div>

        <RelatedPosts
          currentUser={currentUser}
          posts={getRandomPosts(relatedPosts, 10)}
        />

        <div className="lg:hidden w-full">
          <Comments currentUser={currentUser} post={post} />
        </div>
      </div>
    </div>
  );
};

export default WatchContent;
