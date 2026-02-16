"use client";

import { useState, useEffect } from "react";
import {
  Heading, Text, Button, Avatar, RevealFx, Column,
  Badge, Row, Schema, Icon
} from "@once-ui-system/core";
import { home, about, person, baseURL } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import styles from "./Home.module.scss";
import type { AppLocale } from "@/i18n/config";
import { useLocale } from "@/i18n/client";

type ProjectPost = {
  slug: string;
  metadata: Record<string, unknown>;
  content: string;
};

const ProfileSection = ({
  profileTitle,
  paragraphOne,
  paragraphTwo,
}: {
  profileTitle: string;
  paragraphOne: string;
  paragraphTwo: string;
}) => {
  return (
    <section className={styles.profileSection}>
      <Row fillWidth vertical="start" gap="40">
        <Column flex={3}>
          <Heading variant="display-strong-s">{profileTitle}</Heading>
        </Column>
        <Column flex={9} gap="24">
          <Text onBackground="neutral-weak" variant="body-default-m" style={{ lineHeight: "175%", textAlign: 'justify' }}>
            {paragraphOne}
          </Text>
          <Text onBackground="neutral-weak" variant="body-default-m" style={{ lineHeight: "175%", textAlign: 'justify' }}>
            {paragraphTwo}
          </Text>
        </Column>
      </Row>
    </section>
  );
};

const ViewCounter = ({ label }: { label: string }) => {
  const [views, setViews] = useState<number | null>(null);
  useEffect(() => {
    fetch('/api/views')
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch((err) => console.error("Failed to fetch views:", err));
  }, []);
  if (views === null) return null;
  return (
    <Row gap="4" vertical="center" onBackground="neutral-weak" textVariant="label-default-s">
      <Icon name="eye" size="s" />
      <span>{new Intl.NumberFormat().format(views)} {label}</span>
    </Row>
  );
};

export function HomePageClient({ projects, initialLocale }: { projects: ProjectPost[]; initialLocale: AppLocale }) {
  const featuredProject = projects.slice(0, 1);
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    if (locale !== initialLocale) {
      setLocale(initialLocale);
    }
  }, [initialLocale, locale, setLocale]);
  
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx fillWidth horizontal="center" paddingTop="16" paddingBottom="32" paddingLeft="12">
              <Badge background="brand-alpha-weak" paddingX="12" paddingY="4" onBackground="neutral-strong" textVariant="label-default-s" arrow={false} href={home.featured.href}>
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">{home.headline}</Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">{home.subline}</Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Row gap="16" vertical="center">
                <Button id="about" data-border="rounded" href={about.path} variant="secondary" size="m" weight="default" arrowIcon>
                <Row gap="8" vertical="center" paddingRight="4">
                    {about.avatar.display && (
                    <Avatar marginRight="8" style={{ marginLeft: "-0.75rem" }} src={person.avatar} size="m" />
                    )}
                    {t.home.aboutButton}
                </Row>
                </Button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://hits.sh/jafarrahadian.vercel.app.svg?style=flat&label=Visitors&color=4c1d95" alt="Visitors counter" />

            </Row>
           </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY="16" delay={0.6}>
        <Projects projects={featuredProject} />
      </RevealFx>
      <ViewCounter label={t.home.views} />
      <ProfileSection
        profileTitle={t.home.profileTitle}
        paragraphOne={t.home.profileParagraph1}
        paragraphTwo={t.home.profileParagraph2}
      />
    </Column>
  );
}