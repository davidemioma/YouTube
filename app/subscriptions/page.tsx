import Empty from "@/components/Empty";
import SubsContent from "./components/SubsContent";
import { getCurrentUser } from "../actions/getCurrentUser";
import { getSubscribedToPosts } from "../actions/getSubcribedToPosts";

export default async function Subscriptions() {
  const currentUser = await getCurrentUser();

  const posts = await getSubscribedToPosts();

  if (posts.length === 0) return <Empty label="No videos available!" />;

  return <SubsContent currentUser={currentUser} initialPosts={posts} />;
}
