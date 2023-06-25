"use client";

import React from "react";
import Link from "next/link";
import Avatar from "../Avatar";
import { User } from "@prisma/client";

interface Props {
  channel: User;
}

const SubItem = ({ channel }: Props) => {
  return (
    <Link href={`/channel/${channel.id}`}>
      <div
        className={`flex items-center gap-4 p-2.5 rounded-lg cursor-pointer hover:bg-[hsl(0,0%,18.82%)] transition`}
      >
        <Avatar imgSrc={channel.image!} small />

        <span className="text-sm">{channel.name}</span>
      </div>
    </Link>
  );
};

export default SubItem;
