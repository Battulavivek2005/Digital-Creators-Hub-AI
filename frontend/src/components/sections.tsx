import { motion } from "motion/react";
import {
  Bot,
  Users2,
  MessageSquareText,
  PhoneCall,
  Smartphone,
  Megaphone,
  ArrowRight,
  Utensils,
  Home,
  Sun,
  GraduationCap,
  BarChart3,
  Sparkles,
  ShieldCheck,
  Rocket,
} from "lucide-react";

const features = [
  { icon: Bot, title: "AI Business Automation", desc: "Autonomous workflows that handle operations, follow-ups and reporting 24/7 — no human bottlenecks." },
  { icon: Users2, title: "CRM Solutions", desc: "A unified CRM with AI-powered lead scoring, pipeline forecasting and one-click customer 360." },
  { icon: MessageSquareText, title: "WhatsApp Automation", desc: "Smart broadcast, drip campaigns and inbound AI replies on the world's #1 messaging channel." },
  { icon: PhoneCall, title: "AI Voice Calling", desc: "Human-like AI agents making outbound calls, qualifying leads and booking meetings in your CRM." },
  { icon: Smartphone, title: "Website & App Development", desc: "Enterprise-grade websites and mobile apps engineered around your AI stack and brand." },
  { icon: Megaphone, title: "Digital Marketing", desc: "Performance-driven campaigns across search, social and creative — powered by AI insights." },
];

const industries = [
  {
    icon: Utensils,
    emoji: "🍽",
    title: "Restaurant Automation",
    desc: "Turn every reservation, order and review into a repeat visit with intelligent guest journeys.",
    points: ["Smart table booking", "Order & delivery flows", "Guest loyalty AI"],
    tint: "from-orange-400/25 to-red-500/10",
  },
  {
    icon: Home,
    emoji: "🏘",
    title: "Real Estate CRM",
    desc: "Capture, qualify and close property leads faster with AI matchmaking and site-visit automation.",
    points: ["Lead-to-visit automation", "WhatsApp property alerts", "Broker pipeline AI"],
    tint: "from-blue-400/25 to-indigo-500/10",
  },
  {
    icon: Sun,
    emoji: "☀",
    title: "Solar CRM",
    desc: "From cold lead to installed panel — automate site surveys, quotes and financing conversations.",
    points: ["Rooftop lead scoring", "Quotation engine", "Post-install service AI"],
    tint: "from-amber-300/25 to-yellow-500/10",
  },
  {
    icon: GraduationCap,
    emoji: "🎓",
    title: "Education Admissions CRM",
    desc: "Increase enrolments with counsellor AI, campaign attribution and 1:1 student engagement.",
    points: ["Admissions funnel AI", "Parent WhatsApp bots", "Batch & fee automation"],
    tint: "from-emerald-300/25 to-teal-500/10",
  },
  {
    icon: BarChart3,
    emoji: "📢",
    title: "Digital Marketing Agency",
    desc: "White-label AI stack for agencies — client dashboards, reporting and creative automation.",
    points: ["Client workspaces", "Auto-generated reports", "Creative AI toolkit"],
    tint: "from-purple-400/25 to-fuchsia-500/10",
  },
];

export function Sections() {
  return (
    <>
      {/* About */}
      <section id="about" className="relative py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-white/70">
                <Sparkles className="h-3.5 w-3.5 text-brand-emerald" /> About Digital Creators Hub AI
              </span>
              <h2 className="mt-5 text-4xl md:text-5xl font-semibold text-white leading-[1.05]">
                One intelligent platform.{" "}
                <span className="text-gradient">Every business function, automated.</span>
              </h2>
              <p className="mt-6 text-white/70 text-lg leading-relaxed">
                Digital Creators Hub AI is an all-in-one AI business automation
                platform helping modern companies automate operations, marketing,
                lead management and customer engagement — with the polish and
                security expected by enterprise teams.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: ShieldCheck, t: "SOC 2 & GDPR ready" },
                  { icon: Rocket, t: "Deploy in under 14 days" },
                  { icon: Bot, t: "Multi-agent AI workforce" },
                  { icon: BarChart3, t: "Real-time revenue insights" },
                ].map(({ icon: Icon, t }) => (
                  <div key={t} className="glass rounded-xl p-4 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-sm text-white/85">{t}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-primary opacity-30 blur-3xl rounded-full" />
              <div className="relative glass-strong rounded-3xl p-6 shadow-elegant">
                <div className="grid grid-cols-3 gap-3">
                  {["Sales", "Marketing", "Support", "Ops", "Finance", "HR", "Data", "AI", "Growth"].map(
                    (t, i) => (
                      <motion.div
                        key={t}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="aspect-square glass rounded-2xl grid place-items-center text-xs font-medium text-white/80"
                      >
                        {t}
                      </motion.div>
                    ),
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between glass rounded-2xl p-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/50">
                      Unified AI Layer
                    </p>
                    <p className="text-sm font-semibold text-white">Hub AI Core · v4.2</p>
                  </div>
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section id="solutions" className="relative py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            eyebrow="Why choose us"
            title={<>A complete <span className="text-gradient">AI operating system</span> for growth</>}
            subtitle="Six premium modules, engineered to work as one intelligent platform."
          />
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.55 }}
                className="group relative glass rounded-3xl p-7 overflow-hidden hover:-translate-y-1 transition-all duration-500 hover:shadow-elegant"
              >
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-700" />
                <div className="relative h-12 w-12 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{f.desc}</p>
                <div className="mt-6 flex items-center gap-1.5 text-xs text-white/70 group-hover:text-white transition">
                  Explore module <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="relative py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            eyebrow="Industries we serve"
            title={<>Purpose-built AI for <span className="text-gradient">every vertical</span></>}
            subtitle="Pre-configured playbooks tuned for the metrics that matter in your industry."
          />
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.55 }}
                className="group relative glass-strong rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-500 hover:shadow-elegant"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${ind.tint} opacity-70`} />
                <div className="relative p-7 flex flex-col h-full">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl glass grid place-items-center text-2xl">
                      {ind.emoji}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{ind.title}</h3>
                  </div>
                  <p className="mt-4 text-sm text-white/70 leading-relaxed">{ind.desc}</p>
                  <ul className="mt-5 space-y-2">
                    {ind.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-white/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white group-hover:gap-3 transition-all"
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeader({
  eyebrow, title, subtitle,
}: { eyebrow: string; title: React.ReactNode; subtitle: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-white/70">
        <Sparkles className="h-3.5 w-3.5 text-brand-emerald" /> {eyebrow}
      </span>
      <h2 className="mt-5 text-4xl md:text-5xl font-semibold text-white leading-[1.05]">
        {title}
      </h2>
      <p className="mt-5 text-white/65 text-lg">{subtitle}</p>
    </div>
  );
}
