import React from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsGithub, BsGoogle, BsFacebook } from "react-icons/bs";

const provider = [
  {
    name: "Github",
    Icon: BsGithub,
  },
  {
    name: "Facebook",
    Icon: BsFacebook,
  },
  {
    name: "Google",
    Icon: BsGoogle,
  },
];

const SignIn = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();
  if (status === "loading")
    return <h1 className="font-sagnika">Checking Authentication...</h1>;

  if (session) {
    setTimeout(() => {
      push("/");
    }, 1000);

    return (
      <div className="flex font-signika flex-col items-center justify-center h-screen ">
        <div className="flex flex-col space-y-2 border-2 border-grey-900 p-10 rounded-md">
          <h1>Signed in as {session.user?.name ?? session.user?.email}</h1>
        </div>
      </div>
    );
  }

  const handleSignIn = (provider: string) => {
    signIn(provider);
  };

  return (
    <div className="flex font-signika flex-col items-center justify-center h-screen ">
      <div className="flex flex-col space-y-2 border-2 border-grey-900 p-10 rounded-md">
        <h1 className="text-3xl font-semibold text-center ">Sign In</h1>
        <p className="text-center ">With</p>
        {provider.map(({ name, Icon }) => (
          <button
            key={name}
            className="flex items-center justify-center px-4 py-2 space-x-2 text-white bg-gray-800 rounded-md mb-8"
            onClick={() => signIn(name.toLowerCase())}
          >
            <Icon />
            <span>Sign in with {name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SignIn;
