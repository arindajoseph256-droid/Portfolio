import { Trophy, Award, Rocket, Star, Medal, Zap } from "lucide-react";
import type { Achievement } from "@/types";

export const achievements: Achievement[] = [
  {
    title: "Innovation Competition Finalist",
    description:
      "Reached the finals of a national innovation competition with an AI-powered education solution.",
    year: "2024",
    category: "Innovation",
    icon: Trophy,
  },
  {
    title: "Hackathon Winner",
    description:
      "Led a team to first place at a regional hackathon, building a working prototype in 48 hours.",
    year: "2024",
    category: "Hackathon",
    icon: Award,
  },
  {
    title: "Launched EduShare",
    description:
      "Designed, built and shipped an AI-powered learning platform used by fellow students.",
    year: "2024",
    category: "Product",
    icon: Rocket,
  },
  {
    title: "25+ Projects Shipped",
    description:
      "Built and deployed a diverse portfolio of 25+ web, AI and tool projects.",
    year: "2023",
    category: "Milestone",
    icon: Star,
  },
  {
    title: "Top Academic Performer",
    description:
      "Recognized for outstanding academic performance in science and technology subjects.",
    year: "2022",
    category: "Academic",
    icon: Medal,
  },
  {
    title: "Open-Source Contributor",
    description:
      "Contributed features and fixes to open-source projects in the developer community.",
    year: "2023",
    category: "Community",
    icon: Zap,
  },
];
