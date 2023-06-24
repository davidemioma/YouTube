import { useEffect, useState } from "react";
import axios from "axios";
import { CurrentUser } from "@/types";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  currentUser: CurrentUser | null;
  userId: string;
}

const useSubscribe = ({ currentUser, userId }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [hasSubscribed, setHasSubscribed] = useState(false);

  const message = `You ${hasSubscribed ? "unsubscribed" : "subscribed"} ${
    hasSubscribed ? "from" : "to"
  } a channel`;

  useEffect(() => {
    setHasSubscribed(
      currentUser?.subscribedToIds.findIndex((id) => id === userId) !== -1
    );
  }, [currentUser, userId]);

  const handleSubscribe = () => {
    setLoading(true);

    axios
      .patch("/api/subscribe", {
        hasSubscribed,
        userId,
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

  return { loading, hasSubscribed, handleSubscribe };
};

export default useSubscribe;
