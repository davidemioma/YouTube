"use client";

import React from "react";
import Image from "next/image";
import useSubscribe from "@/hooks/useSubscribe";
import { CurrentUser, ChannelProps } from "@/types";

interface Props {
  channel: ChannelProps | null;
  currentUser: CurrentUser | null;
}

const ProfileInfo = ({ channel, currentUser }: Props) => {
  const { loading, hasSubscribed, handleSubscribe } = useSubscribe({
    currentUser,
    userId: channel?.id!,
  });

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-7 px-5">
      <div className="flex items-center gap-3">
        <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden">
          <Image
            className="object-cover"
            src={channel?.image || "/assets/no-profile.jpeg"}
            fill
            alt=""
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-lg md:text-xl font-medium capitalize">
            {channel?.name}
          </span>

          <div className="flex items-center gap-2 text-sm text-[#717171]">
            <span>@{channel?.name}</span>

            <span>{channel?.subscribersIds.length} Subscribers</span>

            <span>{channel?.posts.length} Videos</span>
          </div>
        </div>
      </div>

      {currentUser && (
        <>
          {channel?.id !== currentUser?.id && (
            <button
              className={`${
                hasSubscribed
                  ? "bg-[hsl(0,0%,18.82%)] text-white"
                  : "bg-gray-50 text-black"
              } text-sm font-semibold ml-2 px-4 py-2 rounded-full disabled:cursor-not-allowed disabled:opacity-75 transition`}
              onClick={handleSubscribe}
              disabled={loading}
            >
              {hasSubscribed ? "Unsubscribe" : "Subscribe"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileInfo;
