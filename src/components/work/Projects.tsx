import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

type Post = {
  slug: string;
  metadata: any;
  content: string;
};

interface ProjectsProps {
  projects: Post[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {projects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member: any) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
          tags={post.metadata.tags}
          impact={post.metadata.impact}
        />
      ))}
    </Column>
  );
}