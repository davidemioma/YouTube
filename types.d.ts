import { User, Post } from "@prisma/client";

export type CurrentUser = User & {
  seenPosts: Post[];
  likedPosts: Post[];
  watchLaterPosts: Post[];
};
