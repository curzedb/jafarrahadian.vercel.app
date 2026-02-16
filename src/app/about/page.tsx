import {
  Avatar,
  Button,
  Column,
  Carousel,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
} from "@once-ui-system/core";
import { baseURL, about as aboutBase, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";
import { getServerDictionary } from "@/i18n/server";

export async function generateMetadata() {
  const { locale } = await getServerDictionary();
  const aboutTitle = locale === "id" ? `Tentang – ${person.name}` : aboutBase.title;
  const aboutDescription =
    locale === "id"
      ? `Kenali ${person.name}, Engineer ML/AI dan Full-Stack Web Developer dari ${person.location}`
      : aboutBase.description;

  return Meta.generate({
    title: aboutTitle,
    description: aboutDescription,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(aboutTitle)}`,
    path: aboutBase.path,
  });
}

export default async function About() {
  const { t, locale } = await getServerDictionary();
  const isIndonesian = locale === "id";

  const localizedRole = isIndonesian
    ? "Engineer ML/AI dan Full-Stack Web Developer"
    : person.role;
  const localizedLanguages = isIndonesian
    ? ["Inggris", "Bahasa Indonesia"]
    : person.languages;

  const about = isIndonesian
    ? {
        ...aboutBase,
        title: `Tentang – ${person.name}`,
        description: `Kenali ${person.name}, ${localizedRole} dari ${person.location}`,
        intro: {
          ...aboutBase.intro,
          title: "Perkenalan",
          description: (
            <>
              Lulusan Teknik Informatika dengan keahlian kuat di bidang Machine Learning dan Full-Stack Web Development.
              Berpengalaman mengembangkan solusi berbasis AI, alur analisis data, serta aplikasi web end-to-end.
              Menguasai Python (TensorFlow, Scikit-learn, Pandas, NumPy), basis data SQL (MySQL, PostgreSQL, SQL Server, SQLite),
              pengembangan Web App (Next.JS, Laravel, Tailwind, Material UI, dan Once UI), serta containerization dengan Docker.
              Cepat belajar, berorientasi inovasi, dan berkomitmen memanfaatkan teknologi untuk solusi yang berdampak.
            </>
          ),
        },
        work: {
          ...aboutBase.work,
          title: "Pengalaman Kerja",
        },
        studies: {
          ...aboutBase.studies,
          title: "Pendidikan",
          institutions: aboutBase.studies.institutions.map((institution) => {
            if (institution.name === "University Muhammadiyah Prof. Dr. Hamka") {
              return {
                ...institution,
                description: <>Sarjana Teknik Informatika, IPK: 3.82/4.00 (September 2020 - Desember 2024).</>,
              };
            }

            if (institution.name === "Indosat Ooredoo Hutchison Digital Camp 2024") {
              return {
                ...institution,
                description: (
                  <>
                    <strong>Machine Learning Engineer - Kelas Expert</strong> (Sep 2024 - Jul 2025 · 11 bln)
                    <br />
                    Menyelesaikan modul pelatihan intensif pada platform Dicoding (Bootcamp):
                    <ul style={{ paddingLeft: "20px", margin: "8px 0" }}>
                      <li><strong>Memulai Pemrograman dengan Python (31 jam):</strong> Fundamental Python, OOP, manipulasi data.</li>
                      <li><strong>Belajar Dasar AI (10 jam):</strong> Konsep inti AI, ML, dan Deep Learning.</li>
                      <li><strong>Belajar Dasar Visualisasi Data (16 jam):</strong> Visualisasi data menggunakan Google Sheets.</li>
                      <li><strong>Belajar Machine Learning untuk Pemula (75 jam):</strong> Model ML dasar (klasifikasi, regresi).</li>
                      <li><strong>Belajar Fundamental Deep Learning (90 jam):</strong> Pengolahan data teks, gambar, dan time-series.</li>
                      <li><strong>Machine Learning Terapan (40 jam):</strong> Studi kasus dunia nyata (predictive analytics, sentiment analysis).</li>
                      <li><strong>MLOps (80 jam):</strong> Mengembangkan sistem ML end-to-end yang scalable menggunakan TFX.</li>
                      <li>
                        <strong>Proyek Akhir:</strong>{" "}
                        <a href="https://github.com/curzedb/mlops-stroke-prediction" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
                          End-to-End MLOps Stroke Prediction
                        </a>
                      </li>
                    </ul>
                  </>
                ),
              };
            }

            return institution;
          }),
        },
        technical: {
          ...aboutBase.technical,
          title: "Keahlian Teknis",
          skills: aboutBase.technical.skills.map((skill) => {
            if (skill.title === "Programming Language") {
              return { ...skill, title: "Bahasa Pemrograman", description: <>Bahasa dan library inti.</> };
            }
            if (skill.title === "Framework in Programming Language") {
              return { ...skill, title: "Framework Pemrograman", description: <>Framework pemrograman yang pernah saya gunakan.</> };
            }
            if (skill.title === "AI & Data Science") {
              return { ...skill, title: "AI & Sains Data", description: <>Bahasa dan library inti untuk analisis data serta machine learning.</> };
            }
            if (skill.title === "Database") {
              return { ...skill, title: "Basis Data", description: <>Manajemen data untuk aplikasi.</> };
            }
            if (skill.title === "CI/CD, Monitoring, and Testing Software") {
              return { ...skill, title: "CI/CD, Monitoring, dan Software Testing", description: <>Kemampuan menggunakan berbagai software untuk tracking data, monitoring, dan layanan pengembangan aplikasi.</> };
            }
            if (skill.title === "Office Software") {
              return { ...skill, title: "Perangkat Lunak Perkantoran", description: <>Kemampuan menggunakan berbagai software perkantoran untuk visualisasi data dan pekerjaan operasional.</> };
            }
            if (skill.title === "Multimedia Software") {
              return { ...skill, title: "Perangkat Lunak Multimedia", description: <>Kemampuan menggunakan berbagai software untuk editing grafis dan produksi video.</> };
            }
            return skill;
          }),
        },
      }
    : aboutBase;

  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];
  return (
    <Column maxWidth="m" className={styles.aboutContainer}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Row fillWidth s={{ direction: "column"}} horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Row>
            {localizedLanguages && localizedLanguages.length > 0 && (
              <Row wrap gap="8">
                {localizedLanguages.map((language) => (
                  <Tag key={language} size="l">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
            <Row marginTop="8">
              <Button
                href="/cv-jafarrahadian.pdf"
                prefixIcon="download"
                variant="secondary"
                download
              >
                {t.about.downloadCv}
              </Button>
            </Row>
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.calendar.display && (
              <Row
                fitWidth
                border="brand-alpha-medium"
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                <Row paddingX="8">{t.about.scheduleCall}</Row>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Row>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {localizedRole}
            </Text>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social.map(
                  (item) =>
                    item.link && (
                      <React.Fragment key={item.name}>
                        <Row s={{ hide: true }}>
                          <Button
                            key={item.name}
                            href={item.link}
                            prefixIcon={item.icon}
                            label={item.name}
                            size="s"
                            weight="default"
                            variant="secondary"
                          />
                        </Row>
                        <Row hide s={{ hide: false }}>
                          <IconButton
                            size="l"
                            key={`${item.name}-icon`}
                            href={item.link}
                            icon={item.icon}
                            variant="secondary"
                          />
                        </Row>
                      </React.Fragment>
                    ),
                )}
              </Row>
            )}
          </Column>

          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl" style={{ textAlign: 'justify' }}>
              {about.intro.description}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                    <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Row>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map(
                        (achievement: React.ReactNode, index: number) => (
                          <Text
                            as="li"
                            variant="body-default-m"
                            key={`${experience.company}-${index}`}
                          >
                            {achievement}
                          </Text>
                        ),
                      )}
                    </Column>
                    {experience.images && experience.images.length > 0 && (
                      <Row 
                        paddingTop="m" 
                        paddingLeft="40"
                        className={styles.carouselContainer}>
                        <Carousel
                          items={experience.images.map((image) => ({
                            slide: image.src,
                            alt: image.alt,
                          }))}
                        />
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
                marginBottom="40"
              >
                {about.technical.title}
              </Heading>
              <Column fillWidth gap="l">
                {about.technical.skills.map((skill) => (
                  <Column key={skill.title} fillWidth gap="4">
                    <Text id={skill.title} variant="heading-strong-l">
                      {skill.title}
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {skill.description}
                    </Text>
                    {skill.tags && skill.tags.length > 0 && (
                      <Row wrap gap="8" paddingTop="8">
                        {skill.tags.map((tag, tagIndex) => (
                          <Tag key={`${skill.title}-${tagIndex}`} size="l" prefixIcon={tag.icon}>
                            {tag.name}
                          </Tag>
                        ))}
                      </Row>
                    )}
                    {skill.images && skill.images.length > 0 && (
                      <Row fillWidth paddingTop="m" gap="12" wrap>
                        {skill.images.map((image) => (
                          <Row
                            key={`${image.src}-${image.alt}`}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}
        </Column>
      </Row>
    </Column>
  );
}