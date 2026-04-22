"use client"; 

import { useState, useMemo, useEffect } from "react";
import { Heading, Column, DropdownWrapper, Button, Option, Row } from "@once-ui-system/core";
import { Projects } from "@/components/work/Projects";
import type { AppLocale } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
// import styles from "./WorkPage.module.scss";

type Post = {
  slug: string;
  metadata: {
    publishedAt: string;
    tags?: string[];
  };
  content: string;
};

export function WorkPageClient({ initialProjects, initialLocale }: { initialProjects: Post[]; initialLocale: AppLocale }) {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [filterCategory, setFilterCategory] = useState<'all' | 'ai' | 'web'>('all');
  const [isOpen, setIsOpen] = useState(false); 
  const { locale, setLocale, t } = useLocale();

  const AI_TAGS = ['python', 'tensorflow', 'pytorch', 'deep learning', 'mlops', 'llm', 'rag', 'fastapi', 'django', 'celery', 'streamlit', 'scikit', 'keras'];
  const WEB_TAGS = ['php', 'laravel', 'next.js', 'reactjs', 'web dev', 'iis', 'sql server', 'internet information service'];

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

  const filteredProjects = useMemo(() => {
    if (filterCategory === 'all') return sortedProjects;
    const targetTags = filterCategory === 'ai' ? AI_TAGS : WEB_TAGS;
    return sortedProjects.filter((p) =>
      p.metadata.tags?.some((tag) =>
        targetTags.some((t) => tag.toLowerCase().includes(t))
      )
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCategory, sortedProjects]);

return (
    <>
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {t.work.listTitle}
      </Heading>

      <Column horizontal="start" fillWidth paddingX="l" marginTop="m" marginBottom="l" gap="12">
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

        <Row gap="8" wrap>
          {([
            { label: t.work.filterAll, value: 'all' as const },
            { label: t.work.filterAI, value: 'ai' as const },
            { label: t.work.filterWeb, value: 'web' as const },
          ] as { label: string; value: 'all' | 'ai' | 'web' }[]).map((opt) => (
            <Button
              key={opt.value}
              variant={filterCategory === opt.value ? "primary" : "secondary"}
              size="s"
              onClick={() => setFilterCategory(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </Row>
      </Column>
      
      <Projects projects={filteredProjects} />
    </>
  );
}