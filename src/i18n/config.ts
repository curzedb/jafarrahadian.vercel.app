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
      blog: "Blog",
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
      impactTitle: "At a Glance",
      headline: "I'm Jafar Rahadian, L1 Cloud Engineer & Freelance Developer",
      subline:
        "Specializing in cloud infrastructure & hypervisors, while building production-grade AI and full-stack solutions as a freelancer.",
      profileParagraph1:
        "Informatics Engineering graduate currently focusing as an L1 Cloud Engineer, with hands-on expertise in cloud platform operations and hypervisor environments like ZStack. In addition to cloud infrastructure, I actively work as a Freelance Full-Stack Web Developer and Machine Learning Engineer, building robust end-to-end web applications and intelligent AI-driven systems.",
      profileParagraph2:
        "Skilled in Linux and Windows Server administration, containerization with Docker, and performance monitoring with Prometheus and Grafana. Proficient in modern full-stack development (Next.js, React, Laravel, FastAPI, SQL/NoSQL databases) and machine learning workflows (TensorFlow, Scikit-learn, RAG, MLOps). At PT. Infrapro Digital Teknologi, I handle ZStack cloud hypervisor operations, supported by my previous achievements at PT. Astra Visteon Indonesia in building award-winning process automations, AI chatbots, and predictive monitoring tools. A fast learner committed to infrastructure reliability and delivering high-impact technological solutions.",
    },
    work: {
      listTitle: "List of my projects",
      sortNewest: "Sort by: Newest",
      sortOldest: "Sort by: Oldest",
      relatedProjects: "Related projects",
      readCaseStudy: "Read case study",
      viewProject: "View project",
      filterAll: "All",
      filterAI: "AI / ML",
      filterWeb: "Web Dev",
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
      selectedWinsTitle: "Selected Wins",
      downloadCv: "Download My CV",
      scheduleCall: "Schedule a call",
    },
    footer: {
      attributionPrefix: "This website using material from",
      collaborationText: "Open to work \u0026 collaboration",
      contactButton: "Get in touch",
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
      blog: "Blog",
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
      impactTitle: "Ringkasan",
      headline: "Saya Jafar Rahadian, L1 Cloud Engineer & Freelance Developer",
      subline:
        "Fokus pada infrastruktur cloud & hypervisor, serta berpengalaman membangun solusi AI dan web full-stack siap produksi secara freelance.",
      profileParagraph1:
        "Lulusan Teknik Informatika yang saat ini berfokus sebagai L1 Cloud Engineer, dengan keahlian dalam operasional infrastruktur cloud dan teknologi hypervisor seperti ZStack. Di samping fokus utama pada teknologi cloud, saya juga aktif berkarya sebagai Freelance Full-Stack Web Developer dan Machine Learning Engineer, membangun sistem web end-to-end yang tangguh serta solusi cerdas berbasis AI.",
      profileParagraph2:
        "Menguasai administrasi server Linux dan Windows Server, containerization dengan Docker, serta sistem monitoring performa (Prometheus & Grafana). Berpengalaman mengembangkan frontend & backend modern (Next.js, React, Laravel, FastAPI, basis data SQL/NoSQL) serta implementasi AI/ML (TensorFlow, Scikit-learn, RAG, MLOps). Di PT. Infrapro Digital Teknologi, saya menangani operasional platform cloud ZStack, diperkuat pengalaman sebelumnya di PT. Astra Visteon Indonesia dalam membangun otomasi proses, chatbot AI, dan sistem pemantauan prediktif. Pembelajar cepat dan berorientasi pada inovasi teknologi yang andal serta berdampak nyata.",
    },
    work: {
      listTitle: "Daftar proyek saya",
      sortNewest: "Urutkan: Terbaru",
      sortOldest: "Urutkan: Terlama",
      relatedProjects: "Proyek terkait",
      readCaseStudy: "Baca studi kasus",
      viewProject: "Lihat proyek",
      filterAll: "Semua",
      filterAI: "AI / ML",
      filterWeb: "Web Dev",
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
      selectedWinsTitle: "Pencapaian Terpilih",
      downloadCv: "Unduh CV Saya",
      scheduleCall: "Jadwalkan panggilan",
    },
    footer: {
      attributionPrefix: "Website ini menggunakan materi dari",
      collaborationText: "Terbuka untuk kerja \u0026 kolaborasi",
      contactButton: "Hubungi saya",
    },
    notFound: {
      title: "Halaman Tidak Ditemukan",
      description: "Halaman yang Anda cari tidak tersedia.",
    },
  },
} as const;

export type LocaleDictionary = (typeof i18n)[AppLocale];
