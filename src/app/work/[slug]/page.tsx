import { notFound } from "next/navigation";
import { getLocalizedPosts } from "@/utils/utils";
import {
  Meta, Schema, Column, Heading, Text, Row, Avatar, Line, Tag,
  Carousel, Flex 
} from "@once-ui-system/core";
import { baseURL, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Projects } from "@/components/work/Projects";
import type { Metadata } from "next";
import { iconLibrary } from "@/resources/icons";
import { getServerDictionary, getServerLocale } from "@/i18n/server";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const locales = ["en", "id"];
  const slugs = Array.from(
    new Set(
      locales.flatMap((locale) =>
        getLocalizedPosts(["src", "app", "work", "projects"], locale).map((post) => post.slug),
      ),
    ),
  );

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const locale = await getServerLocale();
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join("/") : routeParams.slug || "";
  const posts = getLocalizedPosts(["src", "app", "work", "projects"], locale);
  const post = posts.find((post) => post.slug === slugPath);
  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.images?.[0] || `/api/og/generate?title=${post.metadata.title}`,
    path: `/work/${post.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const { locale, t } = await getServerDictionary();
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join("/") : routeParams.slug || "";
  const post = getLocalizedPosts(["src", "app", "work", "projects"], locale).find(
    (post) => post.slug === slugPath,
  );

  if (!post) {
    notFound();
  }

  const author = post.metadata.team?.[0] || { name: person.name, avatar: person.avatar, linkedIn: "" };

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="16">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`/work/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        image={post.metadata.images?.[0] || ''}
        author={{ name: author.name, url: author.linkedIn, image: `${baseURL}${author.avatar}` }}
      />
      
      <Heading as="h1" variant="display-strong-l" wrap="balance" align="center" marginTop="40">
        {post.metadata.title}
      </Heading>

      <Text variant="body-default-s" onBackground="neutral-weak">
        {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
      </Text>

      <Row gap="8" vertical="center">
        <Avatar src={author.avatar} size="m" />
        <Text variant="body-strong-s">{author.name}</Text>
      </Row>

      {post.metadata.tags && post.metadata.tags.length > 0 && (
        <Row gap="8" wrap horizontal="center" marginTop="m" marginBottom="l">
          {post.metadata.tags.map((tag: string) => {
            const iconKey = tag
              .toLowerCase()
              .replace(/\./g, "")
              .replace(/\s+/g, "")
              .replace(/-/g, "")
              // .replace(/\(|\)/g, ""); 

            const IconComponent = iconLibrary[iconKey];

            return (
              <Tag key={tag} size="l">
                <Flex gap="8" vertical="center">
                   {IconComponent && <IconComponent size="14" />}
                   {tag}
                </Flex>
              </Tag>
            );
          })}
        </Row>
      )}

      {post.metadata.images && post.metadata.images.length > 0 && (
        <Carousel
          sizes="(max-width: 960px) 100vw, 960px"
          items={post.metadata.images.map((image: string) => ({
            slide: image,
            alt: post.metadata.title,
          }))}
        />
      )}

      <Column style={{ margin: "auto" }} as="article" maxWidth="m" marginTop="40">
        <CustomMDX source={post.content} />
      </Column>
      
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          {t.work.relatedProjects}
        </Heading>
        <Projects projects={
          getLocalizedPosts(["src", "app", "work", "projects"], locale)
              .filter(p => p.slug !== post.slug) 
              .slice(0, 1) 
          } 
        />
      </Column>
      
      <ScrollToHash />
    </Column>
  );
}
