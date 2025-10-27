import { About, Blog, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

interface GalleryImage {
  src: string;
  alt: string;
  orientation: 'vertical' | 'horizontal'; 
}

interface Gallery {
  path: string;
  label: string;
  title: string;
  description: string;
  images: GalleryImage[];
}

const person: Person = {
  firstName: "Jafar",
  lastName: "Rahadian",
  name: "Jafar Rahadian",
  role: " ML/AI Engineer and Full-Stack Web Dev ",
  avatar: "/images/foto.png",
  email: "muhammadjafar954@gmail.com",
  location: "Asia/Jakarta", 
  languages: ["English", "Bahasa"], 
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/curzedb",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/jafar-rahadian",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>I'm Jafar Rahadian, AI/ML Engineer and Full-Stack Developer</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured Project</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Stocks Predict and Analysis APP 
        </Text>
      </Row>
    ),
    href: "/work/spp-app",
  },
  subline: (
    <>"Leveraging AI and Full-Stack skills to create impactful solutions"</>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Recent Informatics Engineering graduate with strong expertise in Machine Learning and Full-Stack Web Development.
        Skilled in developing AI-driven solutions, data analysis workflows, and end-to-end web applications.
        Proficient in Python (TensorFlow, Scikit-learn, Pandas, NumPy), SQL databases (MySQL, PostgreSQL, SQL Server, SQLite), Web App (Next.JS, Laravel, Tailwind, Material UI, and Once UI) and containerization with Docker.
        A fast learner with a passion for innovation, committed to leveraging technology to create impactful solutions.
      </>
    ),
  },
  work: {
    display: true, 
    title: "Work Experience",
    experiences: [
      {
        company: "PT. Astra Visteon Indonesia",
        timeframe: "June 2025 - Present",
        role: "Full-Stack Web Dev and AI/ML Engineer Internship",
        achievements: [
          <>Built an automated RFQ email system, boosting operational efficiency by up to 50%.</>,
          <>Developed a web-based workflow system for internal claims, improving process automation by up to 40%.</>,
          <>Created an AI-powered chatbot for document search, accelerating information retrieval by up to 50%.</>,
          <>Engineered a web-based monitoring solution for compressors using ML, reducing production failure risk by up to 5-15%.</>,
          <>Designed and implemented an automated database backup system to ensure data integrity, mitigating the risk of data loss due to human error by up to 80% (use SSMS).</>,
          <>Developed a web-based data management dashboard for monitoring PC resource usage (CPU, GPU, RAM, Disk) using Windows Exporter, Prometheus, and Grafana, reducing application crash risk caused by sudden resource spikes by approximately 25%.</>,
        ],
        images: [
        { src: "/images/projects/avi/rfq.png", alt: "RFQ", width: 16, height: 9 },
        { src: "/images/projects/avi/aisite.png", alt: "AI-Site", width: 16, height: 9 },
        { src: "/images/projects/avi/compressor.png", alt: "Compressor-Predictive", width: 16, height: 9 },
        { src: "/images/projects/avi/internal-claim.png", alt: "Internal-Claim", width: 16, height: 9 },
      ],
      },
      {
        company: "BPTI (Badan Pengembangan Teknologi dan Informasi) UHAMKA",
        timeframe: "Feb 2023 - June 2023",
        role: "Multimedia",
        achievements: [
          <>Created onboarding video tutorials for 25+ new UHAMKA lecturers.</>,
          <>Operated camera and live-streamed a conference for 250+ attendees using vMix and OBS.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, 
    title: "Education",
    institutions: [
      {
        name: "University of Muhammadiyah Prof. Dr. Hamka",
        description: <>Bachelor Degree in Informatics Engineering, GPA: 3.82/4.00 (September 2020 - December 2024).</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Programming Language",
        description: <>Core languages and libraries.</>,
        tags: [
          { name: "Python" },
          { name: "PHP" },
          { name: "Typescript" },
          { name: "Javascript" },
        ],
        images: [],
      },
      {
        title: "Framework in Programming Language",
        description: <>Some programming frameworks that I have used.</>,
        tags: [
          { name: "FastAPI" },
          { name: "Laravel" },
          { name: "Next.js" },
          { name: "ReactJS" },
        ],
        images: [],
      },
      {
        title: "AI & Data Science",
        description: <>Core languages and libraries for data analysis and machine learning.</>,
        tags: [
          { name: "TensorFlow" },
          { name: "Py-Torch" },
          { name: "Scikit-learn" },
          { name: "Pandas & NumPy" },
        ],
        images: [],
      },
      {
        title: "Database",
        description: <>Data management for app.</>,
        tags: [
          { name: "MySQL" },
          { name: "SSMS (SQL Server)" },
          { name: "Postgre SQL" },
        ],
        images: [],
      },
      {
        title: "CI/CD, Monitoring, and Testing Software",
        description: <>Proficiency in various software for data tracking, monitoring, and app development service.</>,
        tags: [
          { name: "Prometheus" },
          { name: "Grafana" },
          { name: "NSSM" },
          { name: "Redis" },
          { name: "Celery Worker" },
          { name: "Postman" },
          { name: "RDP" },
          { name: "Docker" },
          { name: "Git" },
        ],
        images: [],
      },
      {
        title: "Office Software",
        description: <>Proficiency in various Office software for data visualization and office workload.</>,
        tags: [
          { name: "MS. Power BI" },
          { name: "MS. Office" },
          { name: "MS. Excel" },
          { name: "MS. Power Point" },
          { name: "Outlook" },
        ],
        images: [],
      },
      {
        title: "Multimedia Software",
        description: <>Proficiency in various software for Graphic editing and video production.</>,
        tags: [
          { name: "Adobe Photoshop" },
          { name: "Adobe Illustrator" },
          { name: "Adobe Audition" },
          { name: "Adobe Premiere Pro" },
          { name: "OBS Studio" },
          { name: "V-Mix" },
          { name: "Canva" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about AI and Technology...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: `List of my projects`,
  description: `Tech projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
