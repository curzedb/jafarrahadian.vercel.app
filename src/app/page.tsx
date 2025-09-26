import { getPosts } from "@/utils/utils";
import { Meta } from "@once-ui-system/core";
import { home, baseURL } from "@/resources";
import { HomePageClient } from "./HomePageClient"; 

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const allProjects = getPosts(["src", "app", "work", "projects"]);

  return (
    <HomePageClient projects={allProjects} />
  );
}