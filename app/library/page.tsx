import { getSeenPosts } from "../actions/getSeenPosts";
import { getLikedPosts } from "../actions/getLikedPosts";
import LibraryContent from "./components/LibraryContent";
import { getCurrentUser } from "../actions/getCurrentUser";
import { getWatchLaterPosts } from "../actions/getWatchLaterPosts";

export default async function Library() {
  const currentUser = await getCurrentUser();

  const seenPosts = await getSeenPosts();

  const likedPosts = await getLikedPosts();

  const savedposts = await getWatchLaterPosts();

  return (
    <div className="w-full h-full">
      <LibraryContent
        currentUser={currentUser}
        seenPosts={seenPosts}
        likedPosts={likedPosts}
        savedPosts={savedposts}
      />
    </div>
  );
}
