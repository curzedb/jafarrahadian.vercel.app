"use client"; 

import { useState, useMemo } from "react";
import { Heading, Column, DropdownWrapper, Button, Option } from "@once-ui-system/core";
import { Projects } from "@/components/work/Projects";
// import styles from "./WorkPage.module.scss";

type Post = {
  slug: string;
  metadata: any;
  content: string;
};

const sortOptions = [
  { label: 'Sort by: Newest', value: 'newest' },
  { label: 'Sort by: Oldest', value: 'oldest' }
];

export function WorkPageClient({ initialProjects }: { initialProjects: Post[] }) {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [isOpen, setIsOpen] = useState(false); 

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
      } else {
        return dateA - dateB;
      }
    });
  }, [sortOrder, initialProjects]);

return (
    <>
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        List of my projects
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