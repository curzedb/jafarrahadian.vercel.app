import { getLocalizedPosts } from "@/utils/utils";
import { Meta } from "@once-ui-system/core";
import { home, baseURL } from "@/resources";
import { HomePageClient } from "./HomePageClient"; 
import { getServerLocale } from "@/i18n/server";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function Home() {
  const locale = await getServerLocale();
  const localizedProjects = getLocalizedPosts(["src", "app", "work", "projects"], locale);

  return (
    <HomePageClient projects={localizedProjects} initialLocale={locale} />
  );
}