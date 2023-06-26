import { getCurrentUser } from "../actions/getCurrentUser";
import LibraryContent from "./components/LibraryContent";

export default async function Library() {
  const currentUser = await getCurrentUser();

  return (
    <div className="w-full h-full overflow-auto">
      <LibraryContent currentUser={currentUser} />
    </div>
  );
}
