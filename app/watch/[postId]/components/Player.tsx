"use client";

import React, { useState } from "react";
import Image from "next/image";
import ReactPlayer from "react-player/lazy";

interface Props {
  videoUrl: string;
}

const Player = ({ videoUrl }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-[hsl(0,0%,7%)] relative w-full h-[55vh] overflow-hidden">
      <div className="absolute inset-0">
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          playing={isPlaying}
          controls={isPlaying}
        />
      </div>

      {!isPlaying && (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <div
            className="relative w-48 h-48 cursor-pointer overflow-hidden"
            onClick={() => setIsPlaying(true)}
          >
            <Image
              className="object-cover"
              src="/assets/logo.png"
              fill
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
