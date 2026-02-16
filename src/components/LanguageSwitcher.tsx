"use client";

import { Row, Text } from "@once-ui-system/core";
import type { AppLocale } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import styles from "./LanguageSwitcher.module.scss";

export const LanguageSwitcher = () => {
  const { locale, setLocale, t } = useLocale();

  const onChange = (nextLocale: AppLocale) => {
    if (nextLocale === locale) return;
    setLocale(nextLocale);
    window.location.reload();
  };

  return (
    <div className={styles.floatingWrapper}>
      <Row
        border="neutral-alpha-medium"
        background="surface"
        radius="full"
        padding="4"
        gap="4"
        vertical="center"
      >
        <Text variant="label-default-xs" onBackground="neutral-weak" paddingX="8">
          {t.switcher.title}
        </Text>

        <button
          type="button"
          onClick={() => onChange("en")}
          className={`${styles.langButton} ${locale === "en" ? styles.active : ""}`}
          aria-pressed={locale === "en"}
        >
          {t.switcher.en}
        </button>

        <button
          type="button"
          onClick={() => onChange("id")}
          className={`${styles.langButton} ${locale === "id" ? styles.active : ""}`}
          aria-pressed={locale === "id"}
        >
          {t.switcher.id}
        </button>
      </Row>
    </div>
  );
};
