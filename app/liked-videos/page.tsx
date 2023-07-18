import Empty from "@/components/Empty";
import LikedContent from "./components/LikedContent";
import { getLikedPosts } from "../actions/getLikedPosts";
import { getCurrentUser } from "../actions/getCurrentUser";

export default async function LikedVideos() {
  const currentUser = await getCurrentUser();

  const posts = await getLikedPosts();

  if (posts.length === 0) {
    return <Empty label="You have no liked videos!" />;
  }

  return <LikedContent initialPosts={posts} currentUser={currentUser} />;
}
