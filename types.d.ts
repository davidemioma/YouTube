import { User, Post, Comment, Notification } from "@prisma/client";

export type PostProps = Post & {
  user: User;
};

export type CommentProps = Comment & {
  user: User;
};

export type PostDetails = Post & {
  user: User;
  comments: CommentProps[];
};

export type ChannelProps = User & {
  posts: PostProps[];
};

export type CurrentUser = User & {
  seenPosts: PostProps[];
  likedPosts: PostProps[];
  dislikedPosts: Post[];
  watchLaterPosts: PostProps[];
};

export type NotificationProps = Notification & {
  post: PostProps | null;
};
