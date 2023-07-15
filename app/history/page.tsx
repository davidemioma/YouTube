import Empty from "@/components/Empty";
import { getCurrentUser } from "../actions/getCurrentUser";
import HistoryContent from "./components/HistoryContent";
import { getSeenPosts } from "../actions/getSeenPosts";

export default async function History() {
  const currentUser = await getCurrentUser();

  const posts = await getSeenPosts();

  if (posts.length === 0) {
    return <Empty label="You have not watched any videos!" />;
  }

  return (
    <div className="w-full h-full overflow-auto">
      <HistoryContent initialPosts={posts} currentUser={currentUser} />
    </div>
  );
}
