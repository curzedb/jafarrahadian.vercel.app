"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_LOCALE,
  i18n,
  LOCALE_COOKIE_KEY,
  LOCALE_STORAGE_KEY,
  normalizeLocale,
} from "./config";
import type { AppLocale } from "./config";

const setLocalePersistence = (locale: AppLocale) => {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  document.cookie = `${LOCALE_COOKIE_KEY}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
  document.documentElement.lang = locale === "id" ? "id" : "en";
  document.documentElement.setAttribute("data-locale", locale);
};

const getClientLocale = (): AppLocale => {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  const fromStorage = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (fromStorage) return normalizeLocale(fromStorage);

  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${LOCALE_COOKIE_KEY}=`));

  if (!match) return DEFAULT_LOCALE;
  const value = match.split("=")[1];
  return normalizeLocale(value);
};

export const useLocale = () => {
  const [locale, setLocaleState] = useState<AppLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    const initial = getClientLocale();
    setLocaleState(initial);
    setLocalePersistence(initial);
  }, []);

  const setLocale = (nextLocale: AppLocale) => {
    setLocaleState(nextLocale);
    setLocalePersistence(nextLocale);
  };

  const t = useMemo(() => i18n[locale], [locale]);

  return {
    locale,
    setLocale,
    t,
  };
};
