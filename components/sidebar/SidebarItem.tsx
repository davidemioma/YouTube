"use client";

import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import { useRouter } from "next/navigation";
import useLoginModal from "@/hooks/useLoginModal";
import useSideModal from "@/hooks/useSideModal";

interface Props {
  label: string;
  href: string;
  Icon: IconType;
  active: boolean;
  ActiveIcon: IconType;
}

const SidebarItem = ({ label, href, Icon, active, ActiveIcon }: Props) => {
  const currentUser = null;

  const router = useRouter();

  const sideModal = useSideModal();

  const loginModal = useLoginModal();

  const handleClick = () => {
    sideModal.onClose();

    if (href === "/") {
      router.push(href);
    } else if (href !== "/" && !currentUser) {
      return loginModal.onOpen();
    } else {
      router.push(href);
    }
  };
  return (
    <div
      className={`flex items-center gap-4 ${
        active && "bg-[hsl(0,0%,18.82%)]"
      } p-2.5 rounded-lg cursor-pointer hover:bg-[hsl(0,0%,18.82%)] transition`}
      onClick={handleClick}
    >
      {active ? <ActiveIcon size={23} /> : <Icon size={23} />}

      <span className="text-sm">{label}</span>
    </div>
  );
};

export default SidebarItem;
