"use client";

import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";

interface Props {
  label: string;
  href: string;
  Icon: IconType;
  active: boolean;
  ActiveIcon: IconType;
}

const SidebarItem = ({ label, href, Icon, active, ActiveIcon }: Props) => {
  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-4 ${
          active && "bg-[hsl(0,0%,18.82%)]"
        } p-2.5 rounded-lg cursor-pointer hover:bg-[hsl(0,0%,18.82%)] transition`}
      >
        {active ? <ActiveIcon size={23} /> : <Icon size={23} />}

        <span className="text-sm">{label}</span>
      </div>
    </Link>
  );
};

export default SidebarItem;
