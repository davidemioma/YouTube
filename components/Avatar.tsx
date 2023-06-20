"use client";

import React from "react";
import Image from "next/image";

interface Props {
  imgSrc?: string;
  onClick?: () => void;
}

const Avatar = ({ imgSrc, onClick }: Props) => {
  const onClickHandler = () => {
    if (onClick) return onClick();
  };

  return (
    <div
      className="relative w-8 h-8 rounded-full overflow-hidden cursor-pointer"
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
