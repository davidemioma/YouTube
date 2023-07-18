import Empty from "@/components/Empty";
import { getCurrentUser } from "../actions/getCurrentUser";
import SavedContent from "./components/SavedContent";
import { getWatchLaterPosts } from "../actions/getWatchLaterPosts";

export default async function WatchLater() {
  const currentUser = await getCurrentUser();

  const posts = await getWatchLaterPosts();

  if (posts.length === 0) {
    return <Empty label="You have no liked videos!" />;
  }

  return (
    <div className="w-full h-full">
      <SavedContent initialPosts={posts} currentUser={currentUser} />
    </div>
  );
}
