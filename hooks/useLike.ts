import { useEffect, useState } from "react";
import axios from "axios";
import { CurrentUser } from "@/types";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  currentUser: CurrentUser | null;
  postId: string;
}

const useLike = ({ currentUser, postId }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [hasLiked, setHasLiked] = useState(false);

  const [hasDisliked, setHasDisliked] = useState(false);

  useEffect(() => {
    setHasLiked(
      currentUser?.likedPosts.findIndex((post) => post.id === postId) !== -1
    );
  }, [currentUser, postId]);

  useEffect(() => {
    setHasDisliked(
      currentUser?.dislikedPosts.findIndex((post) => post.id === postId) !== -1
    );
  }, [currentUser, postId]);

  const handleLike = () => {
    setLoading(true);

    axios
      .patch("/api/like", {
        hasLiked,
        postId,
      })
      .then(() => {
        toast.success(`Succesfully ${hasLiked ? "unlike" : "like"} post`);

        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDislike = () => {
    setLoading(true);

    axios
      .patch("/api/dislike", {
        hasDisliked,
        postId,
      })
      .then(() => {
        toast.success(
          `Succesfully ${hasDisliked ? "dislike" : "removed dislike from"} post`
        );

        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, hasLiked, hasDisliked, handleLike, handleDislike };
};

export default useLike;
