import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import { Mailchimp, Footer } from "@/components";
import { Projects } from "@/components/work/Projects";
import styles from "./Home.module.scss";
import { getPosts } from "@/utils/utils";

const ProfileSection = () => {
  return (
    <section className={styles.profileSection}>
      <Row fillWidth vertical="start" gap="40">
        <Column flex={3}>
          <Heading variant="display-strong-s">PROFILE:</Heading>
        </Column>
        <Column flex={9} gap="24">
          <Text onBackground="neutral-weak" variant="body-default-m" style={{ lineHeight: "175%", textAlign: 'justify' }}>
            Recent Informatics Engineering graduate with strong expertise in Machine Learning and Full-Stack Web Development. Skilled in developing AI-driven solutions, data analysis workflows, and end-to-end web applications. Proficient in Python (TensorFlow, Scikit-learn, Pandas, NumPy), SQL databases (MySQL, PostgreSQL, SQL Server, SQLite), Web App (Next.JS, Laravel, Tailwind, Material UI, and Once UI) and containerization with Docker.
          </Text>
          <Text onBackground="neutral-weak" variant="body-default-m" style={{ lineHeight: "175%", textAlign: 'justify' }}>
            Experienced in building responsive frontends with Next.Js, Laravel 12, and CI4, and developing backend systems with PHP and Fast API Python. At PT. Astra Visteon Indonesia, contributed to projects involving AI, process automation, and system development, delivering measurable improvements in efficiency and performance. A fast learner with a passion for innovation, committed to leveraging technology to create impactful solutions.
          </Text>
        </Column>
      </Row>
    </section>
  );
};

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
   const sortedProjects = [...allProjects].sort((a, b) => 
    new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );
  const featuredProject = sortedProjects.slice(0, 1);
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
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY="16" delay={0.6}>
        <Projects projects={featuredProject} />
      </RevealFx>
      <ProfileSection/>
    </Column>
  );
}
