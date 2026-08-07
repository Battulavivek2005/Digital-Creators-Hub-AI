import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What is AI business automation and how does it help my business?",
    a: "AI business automation combines chatbots, voice agents, CRM workflows and marketing tools to run repetitive operations for you — so your team can focus on closing deals and delighting customers. Expect faster response times, lower cost per lead and higher conversion.",
  },
  {
    q: "How does WhatsApp automation work?",
    a: "We connect the official WhatsApp Business API to our AI engine. Customers chat naturally, our AI qualifies them, books meetings, sends catalogs and hands hot leads to your team — 24/7.",
  },
  {
    q: "Do you offer a CRM as part of the platform?",
    a: "Yes. Our AI CRM captures leads from every channel, auto-scores them, triggers follow-ups and gives your team a clear pipeline view — no separate subscription needed.",
  },
  {
    q: "Can you build a custom website or web app for us?",
    a: "Absolutely. Our team designs and ships premium websites, dashboards and mobile apps tailored to your industry, integrated with your AI stack from day one.",
  },
  {
    q: "How does AI voice calling work?",
    a: "Our AI voice agents make and receive real phone calls in natural human voices, qualify leads, confirm appointments and log everything to your CRM automatically.",
  },
  {
    q: "Do you handle digital marketing as well?",
    a: "Yes — SEO, performance ads, content, email and social — powered by our AI marketing suite so campaigns learn and improve over time.",
  },
  {
    q: "How much does it cost to get started?",
    a: "Plans start at $39/month billed yearly. Most customers begin on Professional and upgrade as their volume grows. Custom pricing is available for Enterprise.",
  },
  {
    q: "What kind of support do you provide?",
    a: "Email support on Starter, priority chat on Professional, a dedicated success manager on Business and 24/7 SLA support on Enterprise.",
  },
  {
    q: "Can you build custom AI features specific to my industry?",
    a: "Yes. We build custom AI models, workflows and integrations for restaurants, real estate, solar, education and more — on top of your existing tools.",
  },
  {
    q: "Do you offer a white-label version of the platform?",
    a: "Yes. Agencies and enterprises can white-label the entire platform under their own brand, including domains, dashboards and mobile apps.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-white/70">
            <HelpCircle className="h-3.5 w-3.5 text-brand-emerald" /> FAQ
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-semibold text-white leading-[1.05]">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="mt-5 text-white/70 text-lg">
            Everything you need to know about the platform and services.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className={`rounded-2xl transition ${
                  isOpen ? "glass-strong shadow-elegant" : "glass hover:bg-white/[0.06]"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                >
                  <span className="text-white font-medium text-[15px] md:text-base">
                    {f.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${
                      isOpen ? "bg-gradient-primary text-white rotate-45" : "glass text-white/80"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm text-white/70 leading-relaxed">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
