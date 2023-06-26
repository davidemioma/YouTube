import Empty from "@/components/Empty";
import LikedContent from "./components/LikedContent";
import { getCurrentUser } from "../actions/getCurrentUser";

export default async function LikedVideos() {
  const currentUser = await getCurrentUser();

  if (currentUser?.likedPosts.length === 0) {
    return <Empty label="You have no liked videos!" />;
  }

  return (
    <div className="w-full h-full overflow-auto">
      <LikedContent currentUser={currentUser} />
    </div>
  );
}
