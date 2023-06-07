import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { data: session } = useSession();
  // SV: Push is used to push to specific route,
  //    asPath is used to get the current route
  const { push, asPath } = useRouter();

  const handleSignIn = () => {
    push(`/auth/signin?callbackUrl=${asPath}`);
  };

  return (
    <div>
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
          <button onClick={handleSignIn}>Sign in</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
