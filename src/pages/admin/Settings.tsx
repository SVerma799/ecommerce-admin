import Navbar from "@/components/Navbar";
import { SelectField } from "@/components/form/Select";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";

const Settings: FC = () => {
  const themes = ["light", "dark"];
  const locales = ["en", "fr"];
  const { t } = useTranslation("common");
  const { push, pathname } = useRouter();
  const { theme, setTheme } = useTheme();
  const [persistedlocale, setPersistedLocale] = useState("en");

  useEffect(() => {
    let persistedTheme = localStorage.getItem("theme") ?? "light";
    if (persistedTheme === "system") {
      persistedTheme = "light";
    }
    setTheme(persistedTheme);
    setPersistedLocale(localStorage.getItem("locale") ?? "en");
  }, [setTheme, setPersistedLocale]);

  return (
    <div className="flex gap-2">
      <Navbar />
      <div className="w-1/2 p-7">
        <h1 className="text-3xl">{t("Settings")}</h1>

        <div className=" flex flex-col border border-indigo-800 m-7 p-7 gap-4 rounded">
          <SelectField
            label={t("Languages")}
            labelClassName=" text-xl text-slate-950 dark:text-white mb-2"
            className="px-4 py-2 my-1  rounded-md text-slate-950 border-2 dark:text-white  border-indigo-800 dark:border-none w-1/2 "
            onChange={(e: any) => {
              setPersistedLocale(e.target.value);
              push(pathname, undefined, { locale: e.target.value });
              localStorage.setItem("locale", e.target.value);
            }}
            value={persistedlocale}
          >
            {locales &&
              locales.map((locale) => (
                <option key={locale} value={locale}>
                  {locale}
                </option>
              ))}
          </SelectField>
          <SelectField
            label={t("Themes")}
            labelClassName=" text-xl text-slate-950 dark:text-white  mb-2"
            className="px-4 py-2 my-1  rounded-md w-1/2 text-slate-950 border-2 dark:text-white  border-indigo-800 dark:border-none"
            onChange={(e: any) => {
              setTheme(e.target.value);
            }}
            value={theme}
          >
            {themes &&
              themes.map((th) => (
                <option key={th} value={th}>
                  {th}
                </option>
              ))}
          </SelectField>
        </div>
      </div>
    </div>
  );
};

export default Settings;

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
