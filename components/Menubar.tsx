"use client";

import React from "react";
import {
  MdSubscriptions,
  MdOutlineSubscriptions,
  MdVideoLibrary,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import useLoginModal from "@/hooks/useLoginModal";
import { usePathname, useRouter } from "next/navigation";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";

const Menubar = () => {
  const currentUser = null;

  const router = useRouter();

  const pathname = usePathname();

  const loginModal = useLoginModal();

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

  const handleClick = (href: string) => {
    if (href === "/") {
      router.push(href);
    } else if (href !== "/" && !currentUser) {
      return loginModal.onOpen();
    } else {
      router.push(href);
    }
  };

  return (
    <div className="hidden md:block xl:hidden fixed top-14 z-30 h-full bg-black w-28">
      <div className="w-full flex flex-col pl-1 pr-8">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1.5 items-center py-4 rounded-lg hover:bg-[hsl(0,0%,18.82%)] transition"
            onClick={() => handleClick(item.href)}
          >
            {item.active ? (
              <item.activeIcon size={20} />
            ) : (
              <item.icon size={20} />
            )}

            <p className="text-xs">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menubar;
