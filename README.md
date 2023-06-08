This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

yarn dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How did I add the Internationalization

First I installed the dependencies that were required.
next-i18next
react-i18next,
I18next,

- After this created a new file called next-i18next.config.js
- imported the same file in the next.config.js

- After this I imported this
  import { appWithTranslation } from "next-i18next";
  import NextConfig from 'path to newly created config"
  and exported the main app component with wrapped up like this

appWithTranslation(app, NextConfig);

- This made sure that the internationalization is being used everywhere.

- Need to make sure that in the public directory under locales folder created the localization folder such as en , fs

- must have common.js file
- Create the string that you want to translate

Let say in the navbar you want to use the localized text

- import { usetranslation }
- import ServerSidetranslation

in the getStaticPath make sure to send the localized file values.

- const {t } = useTranslation("SpecificFileName" if any else common will be used)

now you are ready to use the translation.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
