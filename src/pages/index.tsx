import Navbar from "@/components/Navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import classNames from "classnames";

export default function Home() {
  const { t } = useTranslation("common");
  const [collapsed, setSidebarCollapsed] = useState<boolean>(true);
  return (
    <>
      <div
        className={classNames({
          "grid min-h-screen": true,
          "grid-cols-sidebar": !collapsed,
          "grid-cols-sidebar-collapsed": collapsed,
          "transition-[grid-template-columns] duration-300 ease-in-out": true,
        })}
      >
        <Navbar
          collapsed={collapsed}
          setCollapsed={() => setSidebarCollapsed((prev) => !prev)}
        />
      </div>
      <main className="font-signika">
        <p>{t("SomeText")} </p>
      </main>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
