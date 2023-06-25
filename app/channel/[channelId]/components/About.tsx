"use client";

import React from "react";
import Moment from "react-moment";
import { ChannelProps } from "@/types";

interface Props {
  channel: ChannelProps | null;
}

const About = ({ channel }: Props) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="text-lg sm:text-xl font-semibold">About</h1>

      <span className="text-sm text-[#717171]">{channel?.description}</span>

      <span className="text-sm text-[#717171]">
        Joined{" "}
        {<Moment fromNow date={new Date(channel?.createdAt!).toUTCString()} />}
      </span>
    </div>
  );
};

export default About;
