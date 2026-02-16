import { cookies } from "next/headers";
import { i18n, LOCALE_COOKIE_KEY, normalizeLocale } from "./config";

export const getServerLocale = async () => {
  const cookieStore = await cookies();
  return normalizeLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value);
};

export const getServerDictionary = async () => {
  const locale = await getServerLocale();
  return {
    locale,
    t: i18n[locale],
  };
};
