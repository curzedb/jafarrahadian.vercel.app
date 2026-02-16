"use client";

import { Column, Heading, Text } from "@once-ui-system/core";
import { useLocale } from "@/i18n/client";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <Column as="section" fill center paddingBottom="160">
      <Text marginBottom="s" variant="display-strong-xl">
        404
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        {t.notFound.title}
      </Heading>
      <Text onBackground="neutral-weak">{t.notFound.description}</Text>
    </Column>
  );
}
