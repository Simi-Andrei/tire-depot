"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaWarehouse } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CgSpinner, CgChevronDown } from "react-icons/cg";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  const pathname = usePathname();

  const { data: session, status } = useSession();

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

    const interval = setInterval(getNotifications, 600000);

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
    <div className="bg-gradient-to-b from-slate-700 to-black h-16 flex items-center">
      <header className="text-sm tracking-wide font-semibold text-white px-2 py-3 flex items-center justify-between">
        <div>
          <Link className="flex items-center rounded" href="/dashboard">
            <FaWarehouse className="text-xl mb-1" />
            <h1 className="text-lg ml-1 font-bold">Tire Depot</h1>
          </Link>
        </div>
        <ul className="flex">
          <li className="mx-2">
            <Link
              className={`${
                pathname === "/dashboard" &&
                "bg-gradient-to-b from-slate-600 via-slate-800 to-slate-900"
              } inline-block py-1 px-4 rounded`}
              href="/dashboard"
            >
              Dashboard
            </Link>
          </li>
          <li className="mx-2">
            <Link
              className={`${
                pathname === "/tires" &&
                "bg-gradient-to-b from-slate-600 via-slate-800 to-slate-900"
              } inline-block py-1 px-4 rounded`}
              href="/tires"
            >
              Tires
            </Link>
          </li>
          <li className="mx-2">
            <Link
              className={`${
                pathname === "/estimates" &&
                "bg-gradient-to-b from-slate-600 via-slate-800 to-slate-900"
              } inline-block py-1 px-4 rounded`}
              href="/estimates"
            >
              Estimates
            </Link>
          </li>
          <li className="mx-2">
            <Link
              className={`${
                pathname === "/entries" &&
                "bg-gradient-to-b from-slate-600 via-slate-800 to-slate-900"
              } inline-block py-1 px-4 rounded`}
              href="/entries"
            >
              Entries
            </Link>
          </li>
          {session?.user?.isAdmin && (
            <li className="mx-2">
              <Link
                className={`${
                  pathname === "/users" &&
                  "bg-gradient-to-b from-slate-600 via-slate-800 to-slate-900"
                } inline-block py-1 px-4 rounded`}
                href="/users"
              >
                Users
              </Link>
            </li>
          )}
          <li className="mx-2">
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`${
                  pathname === "/settings" &&
                  "bg-gradient-to-b from-slate-600 via-slate-800 to-slate-900"
                } inline-block py-1 px-4 rounded`}
              >
                Settings
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-44 translate-y-2"
              >
                <DropdownMenuItem className="justify-end" asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
        {status === "loading" ? (
          <div className="min-w-32 grid place-items-center">
            <CgSpinner className="text-xl animate-spin" />
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded flex items-center focus:outline-none hover:brightness-110 py-1 px-2">
                {session?.user && session.user.name}
                <Avatar className="h-6 w-6 mx-2 border-2">
                  <AvatarImage
                    src={`${
                      session.user.isAdmin
                        ? "/avatars/adminAvatar.jpg"
                        : "/avatars/userAvatar.jpg"
                    }`}
                    alt="User avatar"
                    className="border-none"
                  />
                  <AvatarFallback className="bg-orange-600 font-normal">
                    AD
                  </AvatarFallback>
                </Avatar>
                <CgChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-44 translate-y-2"
              >
                <DropdownMenuItem className="justify-end" asChild>
                  <button
                    className="w-full"
                    onClick={() =>
                      signOut({ callbackUrl: "/", redirect: true })
                    }
                  >
                    Logout
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem className="border-t justify-end text-xs mt-1 pointer-events-none">
                  Logged in as {session.user.isAdmin ? "Admin" : "User"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded flex items-center focus:outline-none hover:brightness-110 py-1 px-2">
                <div className="relative">
                  <IoNotificationsOutline className="text-xl" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1/2 -right-1/2 text-[10px] bg-orange-600 rounded-full h-[1.15rem] w-[1.15rem] grid place-items-center">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-80 translate-y-2 px-2"
              >
                <p className="border-b border-accent mb-1">Notifications</p>
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
