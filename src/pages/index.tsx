import Navbar from "@/components/Navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useState } from "react";

export default function Home() {
  const { t } = useTranslation("common");
  const [collapsed, setSidebarCollapsed] = useState<boolean>(true);
  return (
    <div className="flex gap-2">
      <Navbar
        collapsed={collapsed}
        setCollapsed={() => setSidebarCollapsed((prev) => !prev)}
      />
      <main className="font-signika">
        <p>{t("SomeText")} </p>
      </main>
    </div>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
