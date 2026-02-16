"use client"; 

import { useState, useMemo, useEffect } from "react";
import { Heading, Column, DropdownWrapper, Button, Option } from "@once-ui-system/core";
import { Projects } from "@/components/work/Projects";
import type { AppLocale } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
// import styles from "./WorkPage.module.scss";

type Post = {
  slug: string;
  metadata: {
    publishedAt: string;
  };
  content: string;
};

export function WorkPageClient({ initialProjects, initialLocale }: { initialProjects: Post[]; initialLocale: AppLocale }) {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [isOpen, setIsOpen] = useState(false); 
  const { locale, setLocale, t } = useLocale();

  const sortOptions = [
    { label: t.work.sortNewest, value: 'newest' },
    { label: t.work.sortOldest, value: 'oldest' }
  ];

  useEffect(() => {
    if (locale !== initialLocale) {
      setLocale(initialLocale);
    }
  }, [initialLocale, locale, setLocale]);

  const handleSelect = (value: string) => {
    setSortOrder(value as 'newest' | 'oldest');
    setIsOpen(false); 
  };

  const sortedProjects = useMemo(() => {
    return [...initialProjects].sort((a, b) => {
      const dateA = new Date(a.metadata.publishedAt).getTime();
      const dateB = new Date(b.metadata.publishedAt).getTime();
      if (sortOrder === 'newest') {
        return dateB - dateA;
      }
      return dateA - dateB;
    });
  }, [sortOrder, initialProjects]);

return (
    <>
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {t.work.listTitle}
      </Heading>

      <Column horizontal="start" fillWidth paddingX="l" marginTop="m" marginBottom="l">
        <DropdownWrapper
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          trigger={
            <Button
              variant="secondary"
              suffixIcon={isOpen ? "chevronUp" : "chevronDown"}
              onClick={() => setIsOpen(!isOpen)}
            >
              {sortOptions.find(opt => opt.value === sortOrder)?.label}
            </Button>
          }
          dropdown={
            <Column minWidth={20} padding="4" gap="2">
              {sortOptions.map((option) => (
                <Option
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  selected={sortOrder === option.value}
                  onClick={() => handleSelect(option.value)}
                />
              ))}
            </Column>
          }
        />
      </Column>
      
      <Projects projects={sortedProjects} />
    </>
  );
}