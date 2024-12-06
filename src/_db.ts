export interface Repository {
  id: string;
  name: string;
  version: string;
  description: string;
  releaseNotes: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface User {
  id: string;
  name: string;
  verified: boolean;
}

export interface UserRepository {
  id: string;
  status: "ACTIVE" | "INACTIVE";
  user_id: string;
  repository_id: string;
}

export type DB = {
  users: User[];
  repositories: Repository[];
  userRepositories: UserRepository[];
};

let repositories: Repository[] = [
  {
    id: "1",
    name: "React",
    version: "1.1",
    description:
      "A JavaScript library for building user interfaces, maintained by Facebook.",
    releaseNotes:
      "Added support for new concurrent rendering APIs and improved error boundaries.",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Express",
    version: "16.1",
    description: "A minimal and flexible Node.js web application framework.",
    releaseNotes:
      "Updated middleware handling and fixed a vulnerability in cookie parsing.",
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "Next JS",
    version: "3.5.13",
    description:
      "A React-based framework for building server-side rendered and static web applications.",
    releaseNotes:
      "Introduced experimental support for React Server Components and improved build times.",
    status: "ACTIVE",
  },
  {
    id: "4",
    name: "Nest JS",
    version: "7.4.1",
    description:
      "A progressive Node.js framework for building scalable server-side applications.",
    releaseNotes:
      "Added WebSocket support and enhanced dependency injection performance.",
    status: "ACTIVE",
  },
  {
    id: "5",
    name: "dayjs",
    version: "13.2",
    description:
      "A lightweight JavaScript library for working with dates and times.",
    releaseNotes:
      "Enhanced plugin support for internationalization and improved parsing accuracy.",
    status: "ACTIVE",
  },
  {
    id: "6",
    name: "tailwind-merge",
    version: "13.7",
    description: "Utility for intelligently merging Tailwind CSS classes.",
    releaseNotes:
      "Improved conflict resolution for responsive and dark mode classes.",
    status: "ACTIVE",
  },
  {
    id: "7",
    name: "css",
    version: "13.7",
    description: "A tool for managing and optimizing CSS stylesheets.",
    releaseNotes:
      "Added support for new CSS grid properties and improved minification.",
    status: "ACTIVE",
  },
  {
    id: "8",
    name: "tailwindcss",
    version: "13.7",
    description: "A utility-first CSS framework for rapid UI development.",
    releaseNotes:
      "Introduced new typography utilities and expanded color palette options.",
    status: "ACTIVE",
  },
  {
    id: "9",
    name: "material",
    version: "13.7",
    description:
      "A library for implementing Google's Material Design guidelines.",
    releaseNotes:
      "Added new components for data visualization and accessibility improvements.",
    status: "ACTIVE",
  },
  {
    id: "10",
    name: "vitest",
    version: "13.7",
    description:
      "A fast, lightweight testing framework for modern JavaScript applications.",
    releaseNotes:
      "Enhanced support for mocking modules and improved TypeScript integration.",
    status: "ACTIVE",
  },
  {
    id: "11",
    name: "vite",
    version: "13.7",
    description:
      "A next-generation frontend build tool focused on speed and simplicity.",
    releaseNotes:
      "Added experimental support for server-side rendering and enhanced plugin API.",
    status: "ACTIVE",
  },
  {
    id: "12",
    name: "react-qr-code",
    version: "13.7",
    description: "A simple React component for generating QR codes.",
    releaseNotes:
      "Improved SVG rendering and added options for customizable QR code styles.",
    status: "ACTIVE",
  },
];

let users: User[] = [
  { id: "100", name: "Sakar", verified: true },
  { id: "200", name: "Shubham", verified: false },
  { id: "300", name: "Yash", verified: true },
];

let userRepositories: UserRepository[] = [
  { id: "1", status: "ACTIVE", user_id: "100", repository_id: "2" },
  { id: "2", status: "ACTIVE", user_id: "200", repository_id: "1" },
  { id: "3", status: "ACTIVE", user_id: "300", repository_id: "3" },
  { id: "4", status: "ACTIVE", user_id: "200", repository_id: "4" },
  { id: "5", status: "ACTIVE", user_id: "200", repository_id: "5" },
  { id: "6", status: "ACTIVE", user_id: "100", repository_id: "2" },
  { id: "7", status: "ACTIVE", user_id: "300", repository_id: "1" },
];

export default { repositories, users, userRepositories };
