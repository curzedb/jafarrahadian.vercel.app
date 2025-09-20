import { getPosts } from "@/utils/utils";
import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { WorkPageClient } from "./WorkPageClient";

const allProjects = getPosts(["src", "app", "work", "projects"]);

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  const allProjects = getPosts(["src", "app", "work", "projects"]);

  return (
    <Column maxWidth="m" paddingTop="24" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <WorkPageClient initialProjects={allProjects} />
    </Column>
  );
}
