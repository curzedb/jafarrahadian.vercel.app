export type AppLocale = "en" | "id";

export const DEFAULT_LOCALE: AppLocale = "en";
export const LOCALE_STORAGE_KEY = "app-locale";
export const LOCALE_COOKIE_KEY = "app-locale";

export const normalizeLocale = (value?: string | null): AppLocale => {
  if (value === "id") return "id";
  return DEFAULT_LOCALE;
};

export const languageLabel = {
  en: "English International",
  id: "Bahasa Indonesia",
} as const;

export const i18n = {
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      certificates: "Certificates",
      gallery: "Gallery",
    },
    switcher: {
      title: "Language",
      en: "EN",
      id: "ID",
    },
    home: {
      profileTitle: "PROFILE:",
      views: "views",
      aboutButton: "About Me",
      profileParagraph1:
        "Informatics Engineering graduate with strong expertise in Machine Learning and Full-Stack Web Development. Skilled in developing AI-driven solutions, data analysis workflows, and end-to-end web applications. Proficient in Python (TensorFlow, Scikit-learn, Pandas, NumPy), SQL databases (MySQL, PostgreSQL, SQL Server, SQLite), Web App (Next.JS, Laravel, Tailwind, Material UI, and Once UI) and containerization with Docker.",
      profileParagraph2:
        "Experienced in building responsive frontends with Next.Js, Laravel 12, and CI4, and developing backend systems with PHP and Fast API Python. At PT. Astra Visteon Indonesia, contributed to projects involving AI, process automation, and system development, delivering measurable improvements in efficiency and performance. A fast learner with a passion for innovation, committed to leveraging technology to create impactful solutions.",
    },
    work: {
      listTitle: "List of my projects",
      sortNewest: "Sort by: Newest",
      sortOldest: "Sort by: Oldest",
      relatedProjects: "Related projects",
      readCaseStudy: "Read case study",
      viewProject: "View project",
    },
    blog: {
      earlierPosts: "Earlier posts",
      recentPosts: "Recent posts",
      onThisPage: "On this page",
      blog: "Blog",
    },
    certificates: {
      title: "Certifications",
      subtitle: "Professional certifications and credentials I've earned throughout my learning journey.",
      certificatesLabel: "Certificates",
      issuersLabel: "Issuers",
      viewCertificate: "View Certificate",
    },
    about: {
      downloadCv: "Download My CV",
      scheduleCall: "Schedule a call",
    },
    footer: {
      attributionPrefix: "This website using material from",
    },
    notFound: {
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
    },
  },
  id: {
    nav: {
      about: "Tentang",
      projects: "Proyek",
      certificates: "Sertifikat",
      gallery: "Galeri",
    },
    switcher: {
      title: "Bahasa",
      en: "EN",
      id: "ID",
    },
    home: {
      profileTitle: "PROFIL:",
      views: "dilihat",
      aboutButton: "Tentang Saya",
      profileParagraph1:
        "Lulusan Teknik Informatika dengan keahlian kuat di bidang Machine Learning dan Full-Stack Web Development. Berpengalaman mengembangkan solusi berbasis AI, alur analisis data, serta aplikasi web end-to-end. Menguasai Python (TensorFlow, Scikit-learn, Pandas, NumPy), basis data SQL (MySQL, PostgreSQL, SQL Server, SQLite), pengembangan Web App (Next.JS, Laravel, Tailwind, Material UI, dan Once UI), serta containerization dengan Docker.",
      profileParagraph2:
        "Berpengalaman membangun frontend responsif dengan Next.Js, Laravel 12, dan CI4, serta mengembangkan sistem backend dengan PHP dan Fast API Python. Di PT. Astra Visteon Indonesia, berkontribusi pada proyek AI, otomatisasi proses, dan pengembangan sistem dengan dampak peningkatan efisiensi serta performa yang terukur. Cepat belajar, berorientasi inovasi, dan berkomitmen memanfaatkan teknologi untuk solusi yang berdampak.",
    },
    work: {
      listTitle: "Daftar proyek saya",
      sortNewest: "Urutkan: Terbaru",
      sortOldest: "Urutkan: Terlama",
      relatedProjects: "Proyek terkait",
      readCaseStudy: "Baca studi kasus",
      viewProject: "Lihat proyek",
    },
    blog: {
      earlierPosts: "Tulisan sebelumnya",
      recentPosts: "Tulisan terbaru",
      onThisPage: "Di halaman ini",
      blog: "Blog",
    },
    certificates: {
      title: "Sertifikasi",
      subtitle: "Sertifikasi profesional dan kredensial yang saya peroleh sepanjang perjalanan belajar saya.",
      certificatesLabel: "Sertifikat",
      issuersLabel: "Penerbit",
      viewCertificate: "Lihat Sertifikat",
    },
    about: {
      downloadCv: "Unduh CV Saya",
      scheduleCall: "Jadwalkan panggilan",
    },
    footer: {
      attributionPrefix: "Website ini menggunakan materi dari",
    },
    notFound: {
      title: "Halaman Tidak Ditemukan",
      description: "Halaman yang Anda cari tidak tersedia.",
    },
  },
} as const;

export type LocaleDictionary = (typeof i18n)[AppLocale];
