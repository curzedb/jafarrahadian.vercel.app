import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tags?: string[];
  team: Team[];
  link?: string;
};

import { notFound } from "next/navigation";

const BLOG_POSTS_DIR = path.join(process.cwd(), "src", "app", "blog", "posts");
const WORK_PROJECTS_DIR = path.join(process.cwd(), "src", "app", "work", "projects");

const resolveContentDir = (customPath: string[]) => {
  const normalizedPath = customPath.filter(Boolean).join("/");

  if (normalizedPath === "src/app/blog/posts") {
    return BLOG_POSTS_DIR;
  }

  if (normalizedPath === "src/app/work/projects") {
    return WORK_PROJECTS_DIR;
  }

  throw new Error(`Unsupported content path: ${normalizedPath}`);
};

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tags: data.tags || [],
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath: string[]) {
  const postsDir = resolveContentDir(customPath);
  return getMDXData(postsDir);
}

export function getLocalizedPosts(
  customPath: string[],
  locale?: string,
) {
  const postsDir = resolveContentDir(customPath);

  if (locale) {
    const localizedDir = path.join(postsDir, locale);
    if (fs.existsSync(localizedDir)) {
      return getMDXData(localizedDir);
    }
  }

  return getMDXData(postsDir);
}
