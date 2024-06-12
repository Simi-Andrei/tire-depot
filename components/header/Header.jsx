"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaWarehouse } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { CgChevronDown } from "react-icons/cg";
import {
  LoaderCircle,
  LayoutDashboard,
  CircleDot,
  Users,
  UsersRound,
  NotepadText,
  Database,
  Settings,
} from "lucide-react";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import { GiCarWheel } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import { GrDocumentText } from "react-icons/gr";
import { CgDatabase } from "react-icons/cg";
import { HiUsers } from "react-icons/hi";
import { GoGear } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";

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
    <div className="flex items-center h-screen w-72 max-w-72 border-r">
      <header className="text-sm tracking-wide font-semibold px-1 flex flex-col justify-between h-full">
        <div className="h-12 p-1 grid place-items-center border-b">
          <Link
            className="flex items-center justify-center rounded w-full h-full"
            href="/dashboard"
          >
            <FaWarehouse className="text-xl mb-1 inline" />
            <h1 className="text-lg ml-1 font-bold">Tire Depot</h1>
          </Link>
        </div>
        <ul className="flex-1 flex flex-col p-1">
          <li className="my-1">
            <Link
              className={`${
                pathname === "/dashboard" &&
                "bg-slate-900 hover:bg-black text-white"
              } p-2 rounded flex items-center hover:bg-slate-200 duration-200`}
              href="/dashboard"
            >
              <LayoutDashboard className="w-4 h-4 mr-1" />
              Dashboard
            </Link>
          </li>
          <li className="my-1">
            <Link
              className={`${
                pathname === "/tires" &&
                "bg-slate-900 hover:bg-black text-white"
              } p-2 rounded flex items-center hover:bg-slate-200 duration-200`}
              href="/tires"
            >
              <CircleDot className="w-4 h-4 mr-1" />
              Tires
            </Link>
          </li>
          <li className="my-1">
            <Link
              className={`${
                pathname === "/customers" &&
                "bg-slate-900 hover:bg-black text-white"
              } p-2 rounded flex items-center hover:bg-slate-200 duration-200`}
              href="/customers"
            >
              <Users className="w-4 h-4 mr-1" />
              Customers
            </Link>
          </li>
          <li className="my-1">
            <Link
              className={`${
                pathname === "/estimates" &&
                "bg-slate-900 hover:bg-black text-white"
              } p-2 rounded flex items-center hover:bg-slate-200 duration-200`}
              href="/estimates"
            >
              <NotepadText className="w-4 h-4 mr-1" />
              Estimates
            </Link>
          </li>
          <li className="my-1">
            <Link
              className={`${
                pathname === "/entries" &&
                "bg-slate-900 hover:bg-black text-white"
              } p-2 rounded flex items-center hover:bg-slate-200 duration-200`}
              href="/entries"
            >
              <Database className="w-4 h-4 mr-1" />
              Entries
            </Link>
          </li>
          {session?.user?.isAdmin && (
            <li className="my-1">
              <Link
                className={`${
                  pathname === "/users" &&
                  "bg-slate-900 hover:bg-black text-white"
                } p-2 rounded flex items-center hover:bg-slate-200 duration-200`}
                href="/users"
              >
                <UsersRound className="w-4 h-4 mr-1" />
                Users
              </Link>
            </li>
          )}
          <li className="my-1">
            <Link
              className={`${
                pathname === "/settings" &&
                "bg-slate-900 hover:bg-black text-white"
              } p-2 rounded flex items-center hover:bg-slate-200 duration-200`}
              href="/settings"
            >
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </Link>
          </li>
        </ul>
        <div className="h-12 p-1 grid place-items-center border-t">
          {status === "loading" ? (
            <LoaderCircle className="text-xl animate-spin" />
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded flex justify-center items-center focus:outline-none hover:brightness-95 border w-full h-full duration-200">
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
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="min-w-44 translate-y-2"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <BsFileEarmarkBarGraph className="mr-1" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/tires">
                        <GiCarWheel className="mr-1" />
                        Tires
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/customers">
                        <FaPeopleGroup className="mr-1" />
                        Customers
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/estimates">
                        <GrDocumentText className="mr-1" />
                        Estimates
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/entries">
                        <CgDatabase className="mr-1" />
                        Entries
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/users">
                        <HiUsers className="mr-1" />
                        Users
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <GoGear className="mr-1" />
                        Settings
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>
                            <Link href="/settings">General settings</Link>
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <button
                        className="w-full"
                        onClick={() =>
                          signOut({ callbackUrl: "/", redirect: true })
                        }
                      >
                        <FiLogOut className="mr-1" />
                        Logout
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="justify-end text-xs mt-1 pointer-events-none">
                      Logged in as {session.user.isAdmin ? "Admin" : "User"}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <DropdownMenu>
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
                  {notifications.length === 0 ? (
                    <p className="text-sm p-2 text-center">
                      No notifications found.
                    </p>
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
                              onClick={() =>
                                markNotifAsReadHandler(notification._id)
                              }
                            >
                              <LuClock4 className="text-lg mr-2" />
                              {notification.message}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu> */}
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
