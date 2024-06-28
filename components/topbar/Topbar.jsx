"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";
import Link from "next/link";

const Topbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        setLoadingNotifications(true);
        const res = await fetch("/api/notifications", { cache: "no-store" });
        const { notifications } = await res.json();
        setNotifications(notifications);
        setLoadingNotifications(false);
      } catch (error) {
        console.log(error);
      }
    };

    getNotifications();

    const interval = setInterval(getNotifications, 100000);

    return () => clearInterval(interval);
  }, []);

  const markNotifAsReadHandler = async (id) => {
    try {
      await fetch(`/api/notifications/${id}`, { method: "PUT" });

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const unreadNotificationsCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="border-b h-12 flex items-center justify-end p-2 sticky top-0 right-0 bg-white z-50">
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded flex items-center focus:outline-none hover:brightness-110 py-1 px-2">
          <div className="relative">
            <IoNotificationsOutline className="text-xl" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1/2 -right-1/2 text-[10px] bg-orange-600 rounded-full h-[1.15rem] w-[1.15rem] grid place-items-center text-white font-semibold">
                {unreadNotificationsCount}
              </span>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="min-w-80 translate-y-3.5 px-2"
        >
          <p className="border-b border-accent mb-1">Notifications</p>
          {notifications.length === 0 ? (
            <p className="text-sm p-2 text-center">No notifications found.</p>
          ) : (
            <>
              {!loadingNotifications &&
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification._id}
                    className={`justify-end py-4 ${
                      notification.read
                        ? "focus:bg-white focus:brightness-[0.98] duration-100"
                        : "bg-orange-50 focus:bg-orange-50 focus:brightness-[0.98] duration-100"
                    }`}
                    asChild
                  >
                    <Link
                      href={`/entries/${notification.correspEntry}`}
                      onClick={() => markNotifAsReadHandler(notification._id)}
                    >
                      <LuClock4 className="text-lg mr-2" />
                      {notification.message}
                    </Link>
                  </DropdownMenuItem>
                ))}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Topbar;
