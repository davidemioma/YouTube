"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Avatar from "@/components/Avatar";
import { useRouter } from "next/navigation";
import { CurrentUser, PostDetails } from "@/types";
import Comment from "./Comment";

interface Props {
  currentUser: CurrentUser | null;
  post: PostDetails | null;
}

const Comments = ({ currentUser, post }: Props) => {
  const router = useRouter();

  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);

  const addCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) return;

    axios
      .post("/api/comment", {
        postId: post?.id,
        comment,
      })
      .then(() => {
        toast.success("Comment added");

        setComment("");

        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <span className="text-lg font-semibold">
        {post?.comments.length} Comments
      </span>

      <form onSubmit={addCommentHandler} className="flex items-start gap-3">
        <Avatar imgSrc={currentUser?.image!} />

        <div className="flex-1 flex flex-col gap-1">
          <input
            className="bg-transparent pb-1 border-b border-[hsl(0,0%,18.82%)] text-sm focus:outline-none focus:border-white transition"
            value={comment}
            type="text"
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
          />

          {comment.trim() && (
            <button
              type="submit"
              className="bg-blue-400 text-black text-sm font-semibold px-3 py-1.5 rounded-full w-full max-w-[120px] ml-auto disabled:text-[#717171] disabled:bg-[hsl(0,0%,18.82%)] transition"
              disabled={!comment.trim() || loading}
            >
              Comment
            </button>
          )}
        </div>
      </form>

      <div className="flex flex-col gap-3">
        {post?.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
