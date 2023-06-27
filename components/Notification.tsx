"use client";

import React from "react";
import axios from "axios";
import Avatar from "./Avatar";
import Image from "next/image";
import Moment from "react-moment";
import { toast } from "react-hot-toast";
import { NotificationProps } from "@/types";
import { useRouter } from "next/navigation";
import useNotificationsModal from "@/hooks/useNotificationsModal";

interface Props {
  notification: NotificationProps;
}

const Notification = ({ notification }: Props) => {
  const router = useRouter();

  const notificationModal = useNotificationsModal();

  const onClickHandler = () => {
    if (notification.hasSeen) {
      router.push(`/watch/${notification.post?.id}`);
    } else {
      axios
        .patch("/api/notification", {
          notificationId: notification.id,
        })
        .then(() => {
          router.refresh();

          router.push(`/watch/${notification.post?.id}`);

          notificationModal.onClose();
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    }
  };

  return (
    <div
      className="flex items-start gap-3 p-3 hover:bg-[#717171] cursor-pointer transition"
      onClick={onClickHandler}
    >
      <div className="flex items-center gap-2">
        {!notification.hasSeen && (
          <span className="bg-blue-500 w-1 h-1 rounded-full overflow-hidden" />
        )}

        <Avatar imgSrc={notification.post?.user?.image!} />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold">
          {notification.post?.title}
        </span>

        <span className="text-xs text-gray-50/50">
          {
            <Moment
              fromNow
              date={new Date(notification.createdAt).toUTCString()}
            />
          }
        </span>
      </div>

      <div className="relative w-32 h-16 rounded-lg overflow-hidden">
        <Image
          className="object-cover"
          src={notification?.post?.photoUrl!}
          fill
          alt=""
        />
      </div>
    </div>
  );
};

export default Notification;
