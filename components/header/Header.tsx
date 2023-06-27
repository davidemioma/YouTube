"use client";

import React, { useState } from "react";
import Link from "next/link";
import qs from "query-string";
import Avatar from "../Avatar";
import Image from "next/image";
import { CurrentUser } from "@/types";
import IconButton from "./IconButton";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import useSideModal from "@/hooks/useSideModal";
import useLoginModal from "@/hooks/useLoginModal";
import { RiVideoAddLine } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import useAddPostModal from "@/hooks/useAddPostModal";
import useProfileModal from "@/hooks/useProfileModal";
import useNotificationsModal from "@/hooks/useNotificationsModal";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";

interface Props {
  currentUser: CurrentUser | null;
}

const Header = ({ currentUser }: Props) => {
  const router = useRouter();

  const sideModal = useSideModal();

  const loginModal = useLoginModal();

  const addPostModal = useAddPostModal();

  const profileModal = useProfileModal();

  const notificationsModal = useNotificationsModal();

  const [showSearch, setShowSearch] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const onOpenPostModal = () => {
    if (!currentUser) return loginModal.onOpen();

    addPostModal.onOpen();
  };

  const onSearchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchValue.trim()) return;

    const query = {
      search_query: searchValue,
    };

    const url = qs.stringifyUrl({
      url: "/results",
      query,
    });

    router.push(url);
  };

  return (
    <header className="fixed top-0 w-screen h-14 z-30 bg-black">
      <div className="w-full h-full flex items-center gap-3 justify-between px-5">
        <div
          className={`${
            showSearch ? "hidden md:flex" : "flex"
          } flex items-center gap-1`}
        >
          <IconButton
            Icon={RxHamburgerMenu}
            onClick={() => sideModal.onOpen()}
          />

          <Link href="/">
            <div className="relative w-[70px] h-[70px] overflow-hidden">
              <Image
                className="object-cover"
                src="/assets/logo.png"
                fill
                alt=""
              />
            </div>
          </Link>
        </div>

        {showSearch && (
          <div className="md:hidden">
            <IconButton
              Icon={BsArrowLeft}
              onClick={() => setShowSearch(false)}
            />
          </div>
        )}

        <form
          onSubmit={onSearchHandler}
          className={`${
            showSearch ? "flex" : "hidden md:flex"
          } flex-1 md:flex items-center w-full max-w-lg mx-auto overflow-hidden`}
        >
          <div className="bg-[hsl(0,0%,7%)] flex-1 flex items-center gap-3 h-9 px-2 border border-[hsl(0,0%,18.82%)] rounded-l-full">
            <input
              className="bg-transparent h-full px-2 flex-1 focus:outline-none focus:border-blue-500"
              value={searchValue}
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchValue(e.target.value)}
            />

            {searchValue.trim() && (
              <IoMdClose size={23} onClick={() => setSearchValue("")} />
            )}
          </div>

          <button
            type="submit"
            className="bg-[hsl(0,0%,18.82%)] h-9 flex items-center justify-center px-4 rounded-r-full"
          >
            <AiOutlineSearch size={23} />
          </button>
        </form>

        <div
          className={`${
            showSearch ? "hidden md:flex" : "flex"
          } flex items-center gap-1 sm:gap-2`}
        >
          <div className="md:hidden">
            <IconButton
              Icon={AiOutlineSearch}
              onClick={() => setShowSearch(true)}
            />
          </div>

          <IconButton Icon={RiVideoAddLine} onClick={onOpenPostModal} />

          <IconButton
            Icon={
              notificationsModal.isOpen
                ? IoMdNotifications
                : IoMdNotificationsOutline
            }
            onClick={() =>
              currentUser ? notificationsModal.toggle() : loginModal.onOpen()
            }
          />

          <div className="ml-1">
            {currentUser ? (
              <Avatar
                imgSrc={currentUser?.image!}
                onClick={() => profileModal.toggle()}
              />
            ) : (
              <button
                className="px-2 py-0.5 text-blue-500 text-sm md:text-base border border-blue-500"
                onClick={() => loginModal.onOpen()}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
