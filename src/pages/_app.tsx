import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";
import NextI18NextConfig from "../../next-i18next.config";

function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(App, NextI18NextConfig);
