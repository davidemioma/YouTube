"use client";

import React, { useState } from "react";
import Avatar from "../Avatar";
import IconButton from "./IconButton";
import { FaYoutube } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { RiVideoAddLine } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdNotificationsOutline } from "react-icons/Io";

const Header = () => {
  const currentUser = null;

  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="fixed top-0 w-screen h-14 z-30 bg-black">
      <div className="w-full h-full flex items-center gap-3 justify-between px-5">
        <div
          className={`${
            showSearch ? "hidden md:flex" : "flex"
          } flex items-center gap-3`}
        >
          <IconButton Icon={RxHamburgerMenu} onClick={() => {}} />

          <FaYoutube size={30} color="red" />
        </div>

        {showSearch && (
          <div className="md:hidden">
            <IconButton
              Icon={BsArrowLeft}
              onClick={() => setShowSearch(false)}
            />
          </div>
        )}

        <div
          className={`${
            showSearch ? "flex" : "hidden md:flex"
          } flex-1 md:flex items-center w-full max-w-lg mx-auto overflow-hidden`}
        >
          <input
            className="bg-[hsl(0,0%,7%)] flex-1 px-5 h-9 border border-[hsl(0,0%,18.82%)] rounded-l-full focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search"
          />

          <button className="bg-[hsl(0,0%,18.82%)] h-9 flex items-center justify-center px-4 rounded-r-full">
            <AiOutlineSearch size={23} />
          </button>
        </div>

        <div
          className={`${
            showSearch ? "hidden md:flex" : "flex"
          } flex items-center gap-2`}
        >
          <div className="md:hidden">
            <IconButton
              Icon={AiOutlineSearch}
              onClick={() => setShowSearch(true)}
            />
          </div>

          <IconButton Icon={RiVideoAddLine} onClick={() => {}} />

          <IconButton Icon={IoMdNotificationsOutline} />

          <div className="ml-1">
            {currentUser ? (
              <Avatar />
            ) : (
              <button
                className="px-2 py-0.5 text-blue-500 text-sm md:text-base border border-blue-500"
                onClick={() => {}}
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
