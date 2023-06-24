import axios from "axios";
import { CurrentUser } from "@/types";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useWatchLater = (currentUser: CurrentUser | null, postId: string) => {
  const router = useRouter();

  const [hasAdded, setHasAdded] = useState(false);

  const [loading, setLoading] = useState(false);

  const message = hasAdded
    ? "Post has been removed from watch later"
    : "Post has been added to watch later";

  useEffect(() => {
    setHasAdded(
      currentUser?.watchLaterPosts.findIndex((post) => post.id === postId) !==
        -1
    );
  }, [currentUser]);

  const handleWatchLater = () => {
    setLoading(true);

    axios
      .patch("/api/watch-later", {
        hasAdded,
        postId,
      })
      .then(() => {
        toast.success(message);

        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { hasAdded, loading, handleWatchLater };
};

export default useWatchLater;
