import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";
import NextI18NextConfig from "../../next-i18next.config";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
}

export default appWithTranslation(App, NextI18NextConfig);
