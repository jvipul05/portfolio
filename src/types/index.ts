import type { LucideIcon } from "lucide-react";
export type NavItem = { label: string; href: string };
export type LinkItem = { label: string; href: string };
export type SkillCategory = { title: string; items: string[]; icon: LucideIcon };
export type Experience = { role: string; company: string; period: string; summary: string; bullets: string[] };
export type Project = { title: string; description: string; technologies: string[]; architecture: string[]; challenges: string[]; status?: string };
export type Article = { title: string; excerpt: string; body: string[] };
