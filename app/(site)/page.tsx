import Empty from "@/components/Empty";
import Posts from "./components/Posts";
import { getPosts } from "../actions/getPosts";
import { getCurrentUser } from "../actions/getCurrentUser";

export default async function Home() {
  const posts = await getPosts();

  const currentUser = await getCurrentUser();

  if (posts.length === 0) {
    return <Empty label="No videos available" />;
  }

  return <Posts posts={posts} currentUser={currentUser} />;
}
