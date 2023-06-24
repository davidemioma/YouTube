import { getPostById } from "@/app/actions/getPostById";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import WatchContent from "./components/WatchContent";

interface Params {
  postId: string;
}

export default async function Watch({ params }: { params: Params }) {
  const { postId } = params;

  const post = await getPostById(postId as string);

  const currentUser = await getCurrentUser();

  return <WatchContent currentUser={currentUser} post={post} />;
}
