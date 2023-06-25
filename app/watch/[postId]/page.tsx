import WatchContent from "./components/WatchContent";
import { getPostById } from "@/app/actions/getPostById";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getRelatedPosts } from "@/app/actions/getRelatedPosts";
import Empty from "@/components/Empty";

interface Params {
  postId: string;
}

export default async function Watch({ params }: { params: Params }) {
  const { postId } = params;

  const currentUser = await getCurrentUser();

  const post = await getPostById(postId as string);

  const relatedPosts = await getRelatedPosts(postId as string);

  if (!post) return <Empty label="Video does not exists!" />;

  return (
    <WatchContent
      currentUser={currentUser}
      post={post}
      relatedPosts={relatedPosts}
    />
  );
}
