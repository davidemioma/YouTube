import Empty from "@/components/Empty";
import Content from "./components/Content";
import { getCurrentUser } from "../actions/getCurrentUser";
import { getPostsBySearchQuery } from "../actions/getPostsBySearchQuery";

interface Props {
  searchParams: { search_query: string };
}

export default async function Results({ searchParams }: Props) {
  const posts = await getPostsBySearchQuery(searchParams.search_query);

  const currentUser = await getCurrentUser();

  if (posts.length === 0) {
    return <Empty label="No posts available!" />;
  }

  return <Content posts={posts} currentUser={currentUser} />;
}
