"use client";

import React from "react";
import {
  AiFillHome,
  AiOutlineHome,
  AiOutlineHistory,
  AiOutlineClockCircle,
  AiFillClockCircle,
  AiFillLike,
  AiOutlineLike,
} from "react-icons/ai";
import {
  MdSubscriptions,
  MdOutlineSubscriptions,
  MdVideoLibrary,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import SubItem from "./SubItem";
import { CurrentUser } from "@/types";
import { User } from "@prisma/client";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

interface Props {
  currentUser: CurrentUser | null;
  channels: User[];
}

const Sidebar = ({ currentUser, channels }: Props) => {
  const pathname = usePathname();

  return (
    <div className="h-full w-full px-4">
      <div className="flex flex-col gap-1 pb-3 border-b border-[hsl(0,0%,18.82%)]">
        <SidebarItem
          label="Home"
          href="/"
          active={pathname === "/"}
          Icon={AiOutlineHome}
          ActiveIcon={AiFillHome}
          currentUser={currentUser}
        />

        <SidebarItem
          label="Subscriptions"
          href="/subscriptions"
          active={pathname === "/subscriptions"}
          Icon={MdOutlineVideoLibrary}
          ActiveIcon={MdSubscriptions}
          currentUser={currentUser}
        />
      </div>

      <div className="flex flex-col gap-1 py-3 border-b border-[hsl(0,0%,18.82%)]">
        <SidebarItem
          label="Library"
          href="/library"
          active={pathname === "/library"}
          Icon={MdOutlineSubscriptions}
          ActiveIcon={MdVideoLibrary}
          currentUser={currentUser}
        />

        <SidebarItem
          label="History"
          href="/history"
          active={pathname === "/history"}
          Icon={AiOutlineHistory}
          ActiveIcon={AiOutlineHistory}
          currentUser={currentUser}
        />

        <SidebarItem
          label="Watch later"
          href="/watch-later"
          active={pathname === "/watch-later"}
          Icon={AiOutlineClockCircle}
          ActiveIcon={AiFillClockCircle}
          currentUser={currentUser}
        />

        <SidebarItem
          label="Liked videos"
          href="/liked-videos"
          active={pathname === "/liked-videos"}
          Icon={AiOutlineLike}
          ActiveIcon={AiFillLike}
          currentUser={currentUser}
        />
      </div>

      {channels.length > 0 && (
        <div className="flex flex-col gap-1 py-3 border-b border-[hsl(0,0%,18.82%)]">
          <h2>Subscriptions</h2>

          {channels.map((channel) => (
            <SubItem key={channel.id} channel={channel} />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3 py-3 pb-24">
        <div className="flex flex-wrap gap-x-1.5 gap-y-1 items-center text-sm text-[#aaa]">
          {[
            "About",
            "Press",
            "Copyright",
            "Contact us",
            "Creators",
            "Advertise",
            "Developers",
          ].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-1.5 gap-y-1 items-center text-sm text-[#aaa]">
          {[
            "Terms",
            "Privacy",
            "Policy & safety",
            "How YouTube works",
            "Test new features",
          ].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <span className="text-xs text-[#717171]">© 2023 David Emioma</span>
      </div>
    </div>
  );
};

export default Sidebar;
