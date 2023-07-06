import React from "react";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { BsGithub, BsGoogle, BsFacebook } from "react-icons/bs";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
  const { t } = useTranslation("common");
  const { push } = useRouter();
  if (status === "loading")
    return <h1 className="font-sagnika">{t("CheckingAuthentication")}</h1>;

  if (session) {
    setTimeout(() => {
      push("/");
    }, 500);

    return (
      <div className="flex font-signika flex-col items-center justify-center h-screen ">
        <div className="flex flex-col space-y-2 border-2 border-grey-900 p-10 rounded-md">
          <Image
            src={session.user?.image ?? ""}
            width={20}
            height={20}
            alt="User Profile Picture"
          />
          <h1>
            {t("SignedInAs")} {session.user?.name ?? session.user?.email}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex font-signika flex-col items-center justify-center h-screen ">
      <div className="flex flex-col space-y-2 border-2 border-grey-900 p-10 rounded-md border-indigo-800">
        <h1 className="text-3xl font-semibold text-center ">{t("SignIn")}</h1>
        <p className="text-center ">{t("With")}</p>
        {provider.map(({ name, Icon }) => (
          <button
            key={name}
            className="flex items-center justify-center px-4 py-2 space-x-2 text-white bg-indigo-800 rounded-md mb-8"
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

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
