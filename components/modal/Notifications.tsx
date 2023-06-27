"use client";

import React, { useEffect, useMemo, useState } from "react";
import { find } from "lodash";
import Notification from "../Notification";
import { NotificationProps } from "@/types";
import { pusherClient } from "@/libs/pusher";
import { useSession } from "next-auth/react";
import useNotificationsModal from "@/hooks/useNotificationsModal";

interface Props {
  notifications: NotificationProps[];
}

const Notifications = ({ notifications }: Props) => {
  const { data: session } = useSession();

  const notificationsModal = useNotificationsModal();

  const [allNotifications, setAllNotifications] = useState(notifications);

  const pusherKey = useMemo(() => session?.user?.email, [session?.user?.email]);

  useEffect(() => {
    if (!pusherKey) return;

    pusherClient.subscribe(pusherKey);

    const newHandler = (notification: NotificationProps) => {
      setAllNotifications((current) => {
        if (find(current, { id: notification.id })) {
          return current;
        }

        return [notification, ...current];
      });
    };

    pusherClient.bind("notification:new", newHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);

      pusherClient.unbind("notification:new", newHandler);
    };
  }, [pusherKey]);

  if (!notificationsModal.isOpen) return null;

  return (
    <div className="fixed top-14 right-10 sm:right-16 z-30 bg-[hsl(0,0%,18.82%)] w-[85%] max-w-md h-[85vh] flex flex-col rounded-lg overflow-y-auto">
      <div className="p-3 border-b border-[#717171]">
        <span className="text-lg font-semibold">Notifications</span>
      </div>

      {allNotifications.length > 0 ? (
        <div className="flex-1 flex flex-col">
          {allNotifications.map((notification) => (
            <Notification key={notification.id} notification={notification} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-lg font-semibold">
            Sorry, you have no new notification!
          </span>
        </div>
      )}
    </div>
  );
};

export default Notifications;
