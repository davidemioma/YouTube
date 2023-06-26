import Empty from "@/components/Empty";
import { getCurrentUser } from "../actions/getCurrentUser";
import SavedContent from "./components/SavedContent";

export default async function WatchLater() {
  const currentUser = await getCurrentUser();

  if (currentUser?.watchLaterPosts.length === 0) {
    return <Empty label="You have no liked videos!" />;
  }

  return (
    <div className="w-full h-full overflow-auto">
      <SavedContent currentUser={currentUser} />
    </div>
  );
}
