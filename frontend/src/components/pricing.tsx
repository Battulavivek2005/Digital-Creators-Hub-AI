import { useState } from "react";
import { motion } from "motion/react";
import { Check, Sparkles, ArrowRight } from "lucide-react";

type Plan = {
  name: string;
  desc: string;
  monthly: number;
  yearly: number;
  features: string[];
  cta: string;
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    desc: "For small businesses getting started with AI automation.",
    monthly: 49,
    yearly: 39,
    features: [
      "AI Chatbot (1 channel)",
      "WhatsApp Automation basic",
      "Basic CRM (500 contacts)",
      "Landing page builder",
      "Email support",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Professional",
    desc: "For growing teams that need advanced automation & marketing.",
    monthly: 129,
    yearly: 99,
    features: [
      "Everything in Starter",
      "AI Voice Calling (500 min)",
      "Multi-channel WhatsApp bots",
      "CRM (10,000 contacts)",
      "SEO & marketing suite",
      "Priority chat support",
    ],
    cta: "Get Professional",
    highlight: true,
  },
  {
    name: "Business",
    desc: "For established businesses scaling operations with AI.",
    monthly: 299,
    yearly: 239,
    features: [
      "Everything in Professional",
      "Unlimited AI voice minutes",
      "Advanced automations",
      "Team seats (up to 25)",
      "Custom AI training",
      "Dedicated success manager",
    ],
    cta: "Choose Business",
  },
  {
    name: "Enterprise",
    desc: "Custom AI infrastructure for enterprises & agencies.",
    monthly: 0,
    yearly: 0,
    features: [
      "Custom AI models",
      "White-label platform",
      "Unlimited seats",
      "SLA & 24/7 support",
      "On-prem / private cloud",
      "Custom integrations",
    ],
    cta: "Contact Sales",
  },
];

export function PricingSection() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-white/70">
            <Sparkles className="h-3.5 w-3.5 text-brand-emerald" /> Pricing
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-semibold text-white leading-[1.05]">
            Choose the Perfect Plan for{" "}
            <span className="text-gradient">Your Business</span>
          </h2>
          <p className="mt-5 text-white/70 text-lg">
            Flexible AI-powered solutions designed for businesses of every size.
          </p>

          <div className="mt-8 inline-flex items-center gap-1 glass-strong rounded-full p-1 text-sm">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-2 rounded-full transition ${
                !yearly ? "bg-gradient-primary text-white shadow-glow" : "text-white/70"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-2 rounded-full transition flex items-center gap-2 ${
                yearly ? "bg-gradient-primary text-white shadow-glow" : "text-white/70"
              }`}
            >
              Yearly
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-emerald/20 text-brand-emerald">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((p, i) => {
            const price = yearly ? p.yearly : p.monthly;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 ${
                  p.highlight
                    ? "glass-strong shadow-elegant border-white/20"
                    : "glass hover:bg-white/[0.06]"
                }`}
              >
                {p.highlight && (
                  <>
                    <div className="absolute -inset-px rounded-3xl bg-gradient-primary opacity-30 blur-xl -z-10" />
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-medium tracking-wide px-3 py-1 rounded-full bg-gradient-primary text-white shadow-glow">
                      MOST POPULAR
                    </span>
                  </>
                )}
                <h3 className="text-xl font-semibold text-white">{p.name}</h3>
                <p className="mt-2 text-sm text-white/65 min-h-[42px]">{p.desc}</p>
                <div className="mt-6 flex items-end gap-1">
                  {price === 0 ? (
                    <span className="text-4xl font-semibold text-white">Custom</span>
                  ) : (
                    <>
                      <span className="text-5xl font-semibold text-white">${price}</span>
                      <span className="text-white/60 text-sm mb-2">
                        /{yearly ? "mo billed yearly" : "month"}
                      </span>
                    </>
                  )}
                </div>
                <a
                  href="#contact"
                  className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    p.highlight
                      ? "bg-gradient-primary text-white shadow-glow hover:shadow-elegant"
                      : "glass-strong text-white hover:bg-white/10"
                  }`}
                >
                  {p.cta} <ArrowRight className="h-4 w-4" />
                </a>
                <ul className="mt-7 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/80">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-emerald/15 text-brand-emerald">
                        <Check className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
