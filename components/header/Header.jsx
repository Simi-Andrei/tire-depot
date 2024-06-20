"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWarehouse } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { cn } from "@/lib/utils";

const Header = () => {
  const pathname = usePathname();

  const { data: session, status } = useSession();

  return (
    <div className="h-screen w-72 max-w-72 border-r sticky top-0 left-0 z-50">
      <header className="text-sm tracking-wide font-semibold p-0 flex flex-col justify-between h-full">
        <div className="h-12 p-2 grid place-items-center border-b">
          <Link
            className="flex items-center justify-center rounded w-full h-full"
            href="/dashboard"
          >
            <FaWarehouse className="text-xl mb-1 inline" />
            <h1 className="text-lg ml-1 font-bold">Tire Depot</h1>
          </Link>
        </div>
        <ul className="flex-1 flex flex-col p-2">
          <li className="my-1">
            <Link
              className={cn(
                "p-2 rounded-md flex items-center hover:bg-slate-100 duration-200",
                pathname.startsWith("/dashboard") &&
                  "bg-slate-900 hover:bg-slate-900 text-white"
              )}
              href="/dashboard"
            >
              <LayoutDashboard className="w-4 h-4 mr-1" />
              Dashboard
            </Link>
          </li>
          <li className="my-1">
            <Link
              className={cn(
                "p-2 rounded-md flex items-center hover:bg-slate-100 duration-200",
                pathname.startsWith("/tires") &&
                  "bg-slate-900 hover:bg-slate-900 text-white"
              )}
              href="/tires"
            >
              <CircleDot className="w-4 h-4 mr-1" />
              Tires
            </Link>
          </li>
          <li className="my-1">
            <Link
              className={cn(
                "p-2 rounded-md flex items-center hover:bg-slate-100 duration-200",
                pathname.startsWith("/customers") &&
                  "bg-slate-900 hover:bg-slate-900 text-white"
              )}
              href="/customers"
            >
              <Users className="w-4 h-4 mr-1" />
              Customers
            </Link>
          </li>
          <li className="my-1">
            <Link
              className={cn(
                "p-2 rounded-md flex items-center hover:bg-slate-100 duration-200",
                pathname.startsWith("/estimates") &&
                  "bg-slate-900 hover:bg-slate-900 text-white"
              )}
              href="/estimates"
            >
              <NotepadText className="w-4 h-4 mr-1" />
              Estimates
            </Link>
          </li>
          <li className="my-1">
            <Link
              className={cn(
                "p-2 rounded-md flex items-center hover:bg-slate-100 duration-200",
                pathname.startsWith("/entries") &&
                  "bg-slate-900 hover:bg-slate-900 text-white"
              )}
              href="/entries"
            >
              <Database className="w-4 h-4 mr-1" />
              Entries
            </Link>
          </li>
          {session?.user?.isAdmin && (
            <li className="my-1">
              <Link
                className={cn(
                  "p-2 rounded-md flex items-center hover:bg-slate-100 duration-200",
                  pathname.startsWith("/users") &&
                    "bg-slate-900 hover:bg-slate-900 text-white"
                )}
                href="/users"
              >
                <UsersRound className="w-4 h-4 mr-1" />
                Users
              </Link>
            </li>
          )}
          <li className="my-1">
            <Link
              className={cn(
                "p-2 rounded-md flex items-center hover:bg-slate-100 duration-200",
                pathname.startsWith("/settings") &&
                  "bg-slate-900 hover:bg-slate-900 text-white"
              )}
              href="/settings"
            >
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </Link>
          </li>
        </ul>
        <div className="h-14 p-2 grid place-items-center border-t">
          {status === "loading" ? (
            <LoaderCircle className="text-xl animate-spin" />
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-md bg-slate-900 hover:bg-slate-950 text-white flex justify-center items-center focus:outline-none hover:brightness-95 border w-full h-full duration-200">
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
                  className="min-w-52 -translate-y-1 -translate-x-2"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <BsFileEarmarkBarGraph className="mr-1" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
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
                    <DropdownMenuItem className="text-xs mt-1 pointer-events-none">
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
