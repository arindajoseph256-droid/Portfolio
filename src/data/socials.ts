import { FaGithub, FaLinkedinIn, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import type { SocialLink } from "@/types";
import { siteConfig } from "@/constants/site";

export const socials: SocialLink[] = [
  { label: "GitHub", href: siteConfig.socials.github, icon: FaGithub },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, icon: FaLinkedinIn },
  { label: "Twitter / X", href: siteConfig.socials.twitter, icon: FaXTwitter },
  { label: "Email", href: siteConfig.socials.email, icon: FaEnvelope },
];
