import Posts from "./components/Posts";
import { getPosts } from "../actions/getPosts";
import { getCurrentUser } from "../actions/getCurrentUser";

export const dynamic = "force-dynamic";

export const fetchCache = "force-no-store";

export default async function Home() {
  const posts = await getPosts();

  const currentUser = await getCurrentUser();

  return <Posts initialPosts={posts} currentUser={currentUser} />;
}
