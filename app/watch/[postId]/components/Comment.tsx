"use client";

import React from "react";
import Moment from "react-moment";
import { CommentProps } from "@/types";
import Avatar from "@/components/Avatar";

interface Props {
  comment: CommentProps;
}

const Comment = ({ comment }: Props) => {
  return (
    <div className="w-full flex items-start gap-3">
      <Avatar imgSrc={comment.user?.image!} />

      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold">
          @{comment.user?.name}{" "}
          <span className="text-[#717171]">
            {" "}
            {
              <Moment
                fromNow
                date={new Date(comment.createdAt).toUTCString()}
              />
            }
          </span>
        </span>

        <span className="text-sm">{comment.comment}</span>
      </div>
    </div>
  );
};

export default Comment;
