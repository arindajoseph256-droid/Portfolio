import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "building-ai-powered-apps-with-nextjs",
    title: "Building AI-Powered Apps with Next.js",
    excerpt:
      "A practical guide to integrating large language models into modern web applications using the Next.js App Router.",
    category: "AI",
    date: "2024-11-10",
    readingTime: "8 min read",
    image: "/blog/ai-nextjs.svg",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    slug: "mastering-tailwind-design-systems",
    title: "Mastering Tailwind CSS Design Systems",
    excerpt:
      "How to build scalable, consistent and maintainable design systems with Tailwind CSS and design tokens.",
    category: "Frontend",
    date: "2024-10-02",
    readingTime: "6 min read",
    image: "/blog/tailwind.svg",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    slug: "the-african-developer-journey",
    title: "My Journey as an African Developer",
    excerpt:
      "Lessons learned building a self-taught path into software engineering from Uganda, and how you can too.",
    category: "Career",
    date: "2024-09-15",
    readingTime: "5 min read",
    image: "/blog/journey.svg",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    slug: "web-performance-that-matters",
    title: "Web Performance That Actually Matters",
    excerpt:
      "Practical techniques to hit a 95+ Lighthouse score and deliver blazing-fast experiences to real users.",
    category: "Performance",
    date: "2024-08-20",
    readingTime: "7 min read",
    image: "/blog/performance.svg",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    slug: "designing-accessible-interfaces",
    title: "Designing Truly Accessible Interfaces",
    excerpt:
      "Why accessibility is non-negotiable and how to build inclusive products that work for everyone.",
    category: "UI/UX",
    date: "2024-07-05",
    readingTime: "6 min read",
    image: "/blog/accessibility.svg",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    slug: "typescript-tips-for-scale",
    title: "TypeScript Tips for Scaling Codebases",
    excerpt:
      "Advanced TypeScript patterns that keep large applications type-safe, refactorable and enjoyable to work in.",
    category: "Engineering",
    date: "2024-06-12",
    readingTime: "9 min read",
    image: "/blog/typescript.svg",
    gradient: "from-sky-500 to-blue-500",
  },
];
