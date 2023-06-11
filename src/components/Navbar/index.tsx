import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { useTheme } from "next-themes";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { FaLanguage } from "react-icons/fa";
import cn from "classnames";
import { SelectField } from "../form/Select";
interface NavbarProps {
  collapsed: boolean;
  setCollapsed(collapsed: boolean): void;
}

const Navbar: FC<NavbarProps> = ({ collapsed, setCollapsed }) => {
  const { theme, setTheme } = useTheme();
  const themes = ["light", "dark"];

  const { data: session } = useSession();
  // SV: Push is used to push to specific route,
  //    asPath is used to get the current route
  const { locale, locales, push, asPath } = useRouter();

  const handleSignIn = () => {
    push(`/auth/signin?callbackUrl=${asPath}`);
  };

  // return (
  //   <div>
  //     <div className="flex gap-2">
  //       <button
  //         onClick={() => {
  //           setTheme("light");
  //         }}
  //       >
  //         Light
  //       </button>
  //       <button
  //         onClick={() => {
  //           setTheme("dark");
  //         }}
  //       >
  //         Dark
  //       </button>

  //       {locales &&
  //         locales.map((locale) => (
  //           <button
  //             key={locale}
  //             className="px-4 py-2 bg-gray-800 text-white rounded-md"
  //             onClick={() => push("/", undefined, { locale })}
  //           >
  //             {locale}
  //           </button>
  //         ))}
  //     </div>
  //     {session ? (
  //       <div>
  //         <button
  //           onClick={async () => {
  //             var data = await signOut({
  //               redirect: false,
  //               callbackUrl: "/",
  //             });
  //             push(data.url);
  //           }}
  //         >
  //           Sign out
  //         </button>
  //       </div>
  //     ) : (
  //       <div>
  //         <button
  //           onClick={handleSignIn}
  //           className="dark:text-gray-200 text-red-900"
  //         >
  //           Sign in
  //         </button>
  //       </div>
  //     )}
  //   </div>
  // );

  const Icon = collapsed ? RxHamburgerMenu : RxCross1;
  return (
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
            <div>
              <h1 className="text-3xl whitespace-nowrap font-bold  dark:text-white text-slate-950">
                Ecommerce
              </h1>
            </div>
          )}
          <button
            title="Language"
            className={cn({
              "grid place-content-center": true, // position
              "hover:bg-indigo-800 ": true, // colors
              "w-10 h-10": true, // shape
            })}
            // 👇 set the collapsed state on click
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon className="w-5 h-5 hover:text-white text-slate-950 dark:text-white" />
          </button>
        </div>
        {!collapsed && (
          <div
            className={cn({
              "white-space-nowrap": true,
              "flex flex-col gap-2": true,
              "p-4": !collapsed,
            })}
          >
            <SelectField
              label="Language"
              labelClassName="text-slate-950 dark:text-white"
              className="px-4 py-2 my-1  rounded-md w-full text-slate-950 border-2 dark:text-white  border-indigo-800 dark:border-none"
              onChange={(e: any) => {
                push("/", undefined, { locale: e.target.value });
              }}
            >
              {locales &&
                locales.map((locale) => (
                  <option
                    key={locale}
                    value={locale}
                    onClick={() => push("/", undefined, { locale })}
                  >
                    {locale}
                  </option>
                ))}
            </SelectField>

            <SelectField
              label="Theme"
              labelClassName="text-slate-950 dark:text-white"
              className="px-4 py-2 my-1  rounded-md w-full text-slate-950 border-2 dark:text-white  border-indigo-800 dark:border-none"
              onChange={(e: any) => {
                setTheme(e.target.value);
              }}
            >
              {themes &&
                themes.map((theme) => (
                  <option
                    key={theme}
                    value={theme}
                    onClick={() => setTheme(theme)}
                  >
                    {theme}
                  </option>
                ))}
            </SelectField>
          </div>
        )}
        {collapsed && (
          <div
            className={cn({
              "flex flex-col gap-2": true,
              "py-4 items-center": true,
              "transition-all duration-500 ease-in-out": true,
            })}
          >
            <button
              className={cn({
                "grid place-content-center": true, // position
                "hover:bg-indigo-800 ": true, // colors
                "w-10 h-10": true, // shape
              })}
              // 👇 set the collapsed state on click
              onClick={() => setCollapsed(!collapsed)}
            >
              <FaLanguage className="w-8 h-8 hover:text-white text-slate-950 dark:text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
