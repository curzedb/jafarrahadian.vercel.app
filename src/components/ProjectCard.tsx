"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  Tag,
  Row
} from "@once-ui-system/core";

import { iconLibrary } from "@/resources/icons";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  tags?: string[];
  impact?: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  tags,
  impact,
}) => {
  return (
    <div className={styles.projectCard}>
      <Column fillWidth gap="m">
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-l)' }}>
          <Carousel
            sizes="(max-width: 960px) 100vw, 960px"
            items={images.map((image) => ({
              slide: image,
              alt: title,
            }))}
            className={styles.projectImage}
          />
          <div className={styles.projectOverlay} />
        </div>

        <Flex
          s={{ direction: "column" }}
          fillWidth
          paddingX="s"
          paddingTop="12"
          paddingBottom="24"
          gap="l"
        >
          {title && (
            <Flex flex={5}>
              <Heading as="h2" wrap="balance" variant="heading-strong-xl">
                {title}
              </Heading>
            </Flex>
          )}

          {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
            <Column flex={7} gap="16">
              {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}

              {description?.trim() && (
                <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                  {description}
                </Text>
              )}

              {/* Impact Metrics Badges */}
              {impact && impact.length > 0 && (
                <Row gap="8" wrap marginTop="s">
                  {impact.map((metric, i) => (
                    <span key={i} className={styles.impactBadge}>
                      {metric}
                    </span>
                  ))}
                </Row>
              )}

              {/* Tech Stack Tags with Icons */}
              {tags && tags.length > 0 && (
                <Row marginTop="m" gap="8" wrap>
                  {tags.map((tag: string) => {
                    const iconKey = tag
                      .toLowerCase()
                      .replace(/\./g, "")
                      .replace(/\s+/g, "")
                      .replace(/-/g, "");

                    const IconComponent = iconLibrary[iconKey];

                    return (
                      <Tag key={tag} size="l" className={styles.techTag}>
                        <Flex gap="8" vertical="center">
                          {IconComponent && <IconComponent size="14" />}
                          {tag}
                        </Flex>
                      </Tag>
                    );
                  })}
                </Row>
              )}

              {/* Action Links */}
              <Flex gap="16" wrap marginTop="m">
                {content?.trim() && (
                  <SmartLink
                    className={styles.linkButton}
                    href={href}
                  >
                    <Text variant="body-default-s">Read case study</Text>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </SmartLink>
                )}
                {link && (
                  <SmartLink
                    className={`${styles.linkButton} ${styles.demoButton}`}
                    href={link}
                  >
                    <Text variant="body-default-s">View project</Text>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </SmartLink>
                )}
              </Flex>
            </Column>
          )}
        </Flex>
      </Column>
    </div>
  );
};
