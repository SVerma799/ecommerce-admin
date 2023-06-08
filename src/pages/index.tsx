import Navbar from "@/components/Navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Home() {
  const { t } = useTranslation("common");
  return (
    <main className="font-signika">
      <Navbar />

      <h1>Next.js + TypeScript + Tailwind CSS + Google Fonts</h1>
      <p>{t("SomeText")} </p>
    </main>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
