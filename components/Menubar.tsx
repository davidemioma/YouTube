"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import {
  MdSubscriptions,
  MdOutlineSubscriptions,
  MdVideoLibrary,
  MdOutlineVideoLibrary,
} from "react-icons/md";

const Menubar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      icon: AiOutlineHome,
      activeIcon: AiFillHome,
      active: pathname === "/",
      label: "Home",
      href: "/",
    },
    {
      icon: MdOutlineSubscriptions,
      activeIcon: MdSubscriptions,
      active: pathname === "/subscriptions",
      label: "Subscriptions",
      href: "/subscriptions",
    },
    {
      icon: MdOutlineVideoLibrary,
      activeIcon: MdVideoLibrary,
      active: pathname === "/library",
      label: "Library",
      href: "/library",
    },
  ];
  return (
    <div className="hidden md:block fixed top-14 z-30 h-full bg-black w-28">
      <div className="w-full flex flex-col pl-1 pr-8">
        {menuItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <div className="flex flex-col gap-1.5 items-center py-4 rounded-lg hover:bg-[hsl(0,0%,18.82%)] transition">
              {item.active ? (
                <item.activeIcon size={20} />
              ) : (
                <item.icon size={20} />
              )}

              <p className="text-xs">{item.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menubar;
