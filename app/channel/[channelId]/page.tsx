import Empty from "@/components/Empty";
import ChannelContent from "./components/ChannelContent";
import { getChannelById } from "@/app/actions/getChannelById";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface Params {
  channelId: string;
}

export default async function Channel({ params }: { params: Params }) {
  const { channelId } = params;

  const currentUser = await getCurrentUser();

  const channel = await getChannelById(channelId as string);

  if (!channel) return <Empty label="Channel does not exists!" />;

  return <ChannelContent currentUser={currentUser} channel={channel} />;
}
