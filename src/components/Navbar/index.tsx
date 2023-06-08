import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { useTheme } from "next-themes";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { theme, setTheme } = useTheme();

  const { data: session } = useSession();
  // SV: Push is used to push to specific route,
  //    asPath is used to get the current route
  const { locale, locales, push, asPath } = useRouter();

  const handleSignIn = () => {
    push(`/auth/signin?callbackUrl=${asPath}`);
  };

  return (
    <div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setTheme("light");
          }}
        >
          Light
        </button>
        <button
          onClick={() => {
            setTheme("dark");
          }}
        >
          Dark
        </button>

        {locales &&
          locales.map((locale) => (
            <button
              key={locale}
              className="px-4 py-2 bg-gray-800 text-white rounded-md"
              onClick={() => push("/", undefined, { locale })}
            >
              {locale}
            </button>
          ))}
      </div>
      {session ? (
        <div>
          <button
            onClick={async () => {
              var data = await signOut({
                redirect: false,
                callbackUrl: "/",
              });
              push(data.url);
            }}
          >
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleSignIn}
            className="dark:text-gray-200 text-red-900"
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
