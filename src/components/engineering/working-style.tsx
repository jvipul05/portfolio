"use client";

import { motion } from "framer-motion";
import { MessageSquareText, Search, ShieldCheck, Wrench } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const practices = [
  {
    title: "I ask what can fail",
    copy: "Before coding, I map the unhappy paths: retries, duplicate requests, bad integrations, slow databases, and missing observability.",
    icon: ShieldCheck,
  },
  {
    title: "I keep APIs boring",
    copy: "Clear request/response contracts, predictable errors, idempotent actions where needed, and documentation that helps the next engineer.",
    icon: MessageSquareText,
  },
  {
    title: "I debug from evidence",
    copy: "Logs, traces, database state, queues, and deployment changes matter more than guesses when distributed workflows break.",
    icon: Search,
  },
  {
    title: "I use AI with guardrails",
    copy: "AI helps me plan, compare approaches, draft code, and review edge cases, but final decisions stay grounded in requirements and tests.",
    icon: Wrench,
  },
];

export function WorkingStyle() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Working style" title="Human judgment behind the engineering">
          I try to make the portfolio feel closer to how I actually work: collaborative, curious, careful with claims,
          and focused on systems that can be operated by real teams.
        </SectionHeading>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {practices.map((practice, index) => {
            const Icon = practice.icon;
            return (
              <Reveal key={practice.title} delay={index * 0.05}>
                <motion.article
                  whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="glass h-full rounded-3xl p-6"
                >
                  <Icon className="mb-5 size-7 text-sky-300" />
                  <h3 className="text-xl font-bold text-white">{practice.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{practice.copy}</p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
