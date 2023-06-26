import Empty from "@/components/Empty";
import { getCurrentUser } from "../actions/getCurrentUser";
import HistoryContent from "./components/HistoryContent";

export default async function History() {
  const currentUser = await getCurrentUser();

  if (currentUser?.seenPosts.length === 0) {
    return <Empty label="You have not watched any videos!" />;
  }

  return (
    <div className="w-full h-full overflow-auto">
      <HistoryContent currentUser={currentUser} />
    </div>
  );
}
