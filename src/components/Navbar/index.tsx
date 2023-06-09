"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { FC, useState } from "react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { GiShoppingBag } from "react-icons/gi";
import { RiProductHuntLine } from "react-icons/ri";
import {
  MdOutlineSpaceDashboard,
  MdFavoriteBorder,
  MdOutlineSettings,
} from "react-icons/md";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const Navbar: FC = () => {
  const [collapsed, setSidebarCollapsed] = useState<boolean>(true);
  const { t } = useTranslation("common");
  const { data: session } = useSession();
  // SV: Push is used to push to specific route,
  // asPath is used to get the current route
  // const { locales, push, asPath } = useRouter();
  const { push } = useRouter();

  const Icon = collapsed ? RxHamburgerMenu : RxCross1;

  return (
    <div
      className={cn({
        "grid min-h-screen": true,
        "grid-cols-sidebar": !collapsed,
        "grid-cols-sidebar-collapsed": collapsed,
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}
    >
      <div
        className={cn({
          " text-zinc-50 z-20 border-r border-indigo-800": true,
        })}
      >
        <div
          className={cn({
            "flex flex-col justify-between": true,
          })}
        >
          {/* logo and collapse button */}
          <div
            className={cn({
              "flex items-center border-b border-b-indigo-800": true,
              "p-4 justify-between": !collapsed,
              "py-4 justify-center": collapsed,
            })}
          >
            {!collapsed && (
              <div className="flex items-center gap-2">
                <GiShoppingBag className="w-7 h-7 text-indigo-800" />
                <Link href="/">
                  <h1 className="text-xl whitespace-nowrap font-bold  dark:text-white text-slate-950">
                    Ecommerce
                  </h1>
                </Link>
              </div>
            )}
            <button
              title="Language"
              className={cn({
                "grid place-content-center": true,
                "hover:fill-indigo-900": true, // position
                "w-7 h-7": true, // shape
              })}
              // 👇 set the collapsed state on click
              onClick={() => setSidebarCollapsed(!collapsed)}
            >
              <Icon className="w-6 h-6 hover:text-white text-slate-950 dark:text-white" />
            </button>
          </div>

          {/* *************************************** */}
          {/* Navbar Section */}
          <div
            className={cn({
              "p-4 flex  flex-col gap-6": true,
              "transition-all duration-500 ease-in-out": true,
            })}
          >
            <div
              className="flex gap-4 items-center"
              onClick={() => {
                push("/admin/Dashboard");
              }}
              onKeyDown={() => {
                push("/admin/Dashboard");
              }}
              role="button"
              tabIndex={0}
            >
              <button
                className={cn({
                  "transition delay-75 duration-100 ease-in-out  flex items-center  gap-4 text-slate-950 dark:text-white text-lg":
                    true,
                })}
                onClick={() => push("/admin/Dashboard")}
              >
                <MdOutlineSpaceDashboard className="w-7 h-7 hover:fill-indigo-900 text-slate-950 dark:text-white" />
              </button>
              {!collapsed && (
                <p className="transition delay-75 duration-100 ease-in-out text-md  text-slate-950 dark:text-white">
                  {t("Dashboard")}
                </p>
              )}
            </div>
            <div
              className="flex gap-4 items-center"
              onClick={() => {
                push("/admin/Products");
              }}
              onKeyDown={() => {
                push("/admin/Products");
              }}
              role="button"
              tabIndex={0}
            >
              <button
                className={cn({
                  "transition delay-75 duration-100 ease-in-out  flex items-center  gap-4 text-slate-950 dark:text-white text-lg":
                    true,
                })}
                onClick={() => push("/admin/Products")}
              >
                <RiProductHuntLine className="w-7 h-7 hover:fill-indigo-900 text-slate-950 dark:text-white" />
              </button>
              {!collapsed && (
                <p className="transition delay-75 duration-100 ease-in-out text-md  text-slate-950 dark:text-white">
                  {t("Products")}
                </p>
              )}
            </div>
            <div
              className="flex gap-4 items-center"
              onClick={() => {
                push("/admin/Orders");
              }}
              onKeyDown={() => {
                push("/admin/Orders");
              }}
              role="button"
              tabIndex={0}
            >
              <button
                className={cn({
                  "transition delay-75 duration-100 ease-in-out  flex items-center  gap-4 text-slate-950 dark:text-white text-lg":
                    true,
                })}
                onClick={() => push("/admin/Orders")}
              >
                <MdFavoriteBorder className="w-7 h-7 hover:fill-indigo-900 text-slate-950 dark:text-white" />
              </button>
              {!collapsed && (
                <p className=" transition delay-75 duration-100 ease-in-out  text-md  text-slate-950 dark:text-white">
                  {t("Orders")}
                </p>
              )}
            </div>
            <div
              className="flex gap-4 items-center"
              onClick={() => {
                push("/admin/Categories");
              }}
              onKeyDown={() => {
                push("/admin/Categories");
              }}
              role="button"
              tabIndex={0}
            >
              <button
                className={cn({
                  "transition delay-75 duration-100 ease-in-out  flex items-center  gap-4 text-slate-950 dark:text-white text-lg":
                    true,
                })}
                onClick={() => push("/admin/Categories")}
              >
                <AiOutlineUnorderedList className="w-7 h-7 hover:fill-indigo-900 text-slate-950 dark:text-white" />
              </button>
              {!collapsed && (
                <p className="transition delay-75 duration-100 ease-in-out  text-md  text-slate-950 dark:text-white">
                  {t("Categories")}
                </p>
              )}
            </div>
            <div
              className="flex gap-4 items-center"
              onClick={() => {
                push("/admin/Settings");
              }}
              onKeyDown={() => {
                push("/admin/Settings");
              }}
              role="button"
              tabIndex={0}
            >
              <button
                className={cn({
                  "transition delay-75 duration-100 ease-in-out  flex items-center  gap-4 text-slate-950 dark:text-white text-lg":
                    true,
                })}
                onClick={() => push("/admin/Settings")}
              >
                <MdOutlineSettings className="w-7 h-7 hover:fill-indigo-900 text-slate-950 dark:text-white" />
              </button>
              {!collapsed && (
                <p className="transition delay-75 duration-100 ease-in-out  text-md  text-slate-950 dark:text-white">
                  {t("Settings")}
                </p>
              )}
            </div>
            <div
              className="flex gap-4 items-center"
              onClick={() => {
                push(`/auth/signin?callbackUrl=${usePathname}`);
              }}
              onKeyDown={() => {
                push(`/auth/signin?callbackUrl=${usePathname}`);
              }}
              role="button"
              tabIndex={0}
            >
              <button
                className={cn({
                  "transition delay-75 duration-100 ease-in-out  flex items-center  gap-4 text-slate-950 dark:text-white text-lg":
                    true,
                })}
                onClick={() => push(`/auth/signin?callbackUrl=${usePathname}`)}
              >
                {session && session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Picture of the author"
                    width={32}
                    height={32}
                    className="rounded-full w-7 h-7"
                  />
                ) : (
                  <FaRegUserCircle className="w-7 h-7 hover:fill-indigo-900 text-slate-950 dark:text-white" />
                )}
              </button>
              {!collapsed &&
                (session ? (
                  <button
                    onClick={() => {
                      signOut();
                    }}
                  >
                    SignOut
                  </button>
                ) : (
                  <p className="transition delay-75 duration-100 ease-in-out text-md text-slate-950 dark:text-white">
                    {t("SignIn")}
                  </p>
                ))}
            </div>
          </div>
          {/* ***************************************** */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
