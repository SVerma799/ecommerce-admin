"use client";

import Navbar from "@/components/Navbar";
import { SelectField } from "@/components/form/Select";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const Settings: FC = () => {
  const themes = ["light", "dark"];
  const locales = ["en", "fr"];
  const { t } = useTranslation("common");
  const { push, pathname } = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    let persistedTheme = localStorage.getItem("theme") ?? "light";
    if (persistedTheme === "system") {
      persistedTheme = "light";
    }
    setTheme(persistedTheme);
  }, [setTheme]);

  return (
    <div className="flex gap-2">
      <Navbar />
      <div className="w-full">
        <h1 className="text-3xl">{t("Settings")}</h1>
        <div id="Language m-8 border-b border-b-indigo-800">
          <SelectField
            label="Language"
            labelClassName=" text-xl text-slate-950 dark:text-white"
            className="px-4 py-2 my-1  rounded-md w-full text-slate-950 border-2 dark:text-white  border-indigo-800 dark:border-none"
            onChange={(e: any) => {
              push(pathname, undefined, { locale: e.target.value });
            }}
          >
            {locales &&
              locales.map((locale) => (
                <option key={locale} value={locale}>
                  {locale}
                </option>
              ))}
          </SelectField>
        </div>
        <SelectField
          label="Theme"
          labelClassName=" text-xl text-slate-950 dark:text-white"
          className="px-4 py-2 my-1  rounded-md w-full text-slate-950 border-2 dark:text-white  border-indigo-800 dark:border-none"
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
