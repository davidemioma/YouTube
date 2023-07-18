"use client";

import React, { MouseEventHandler } from "react";
import Image from "next/image";

interface Props {
  imgSrc?: string;
  onClick?: () => void;
  small?: boolean;
}

const Avatar = ({ imgSrc, onClick, small }: Props) => {
  const onClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();

    if (onClick) return onClick();
  };

  return (
    <div
      className={`relative ${
        small ? "h-6 w-6" : "w-8 h-8"
      } rounded-full overflow-hidden cursor-pointer`}
      onClick={onClickHandler}
    >
      <Image
        className="object-cover"
        src={imgSrc || "/assets/no-profile.jpeg"}
        fill
        alt=""
      />
    </div>
  );
};

export default Avatar;
