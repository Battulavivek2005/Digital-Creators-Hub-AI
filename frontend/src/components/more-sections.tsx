import { getTestimonials } from "../services/testimonialAPI";
import { getPortfolio } from "../services/portfolioAPI";
import { useEffect, useState } from "react";
import { getServices } from "../services/serviceAPI";
import { motion } from "motion/react";
import {
  Globe,
  Code2,
  Database,
  BrainCircuit,
  MessageSquareText,
  PhoneCall,
  Bot,
  Smartphone,
  Search,
  MousePointerClick,
  Target,
  Share2,
  Palette,
  Workflow,
  UserPlus,
  Briefcase,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Mic,
  Handshake,
  ClipboardCheck,
  FileText,
  Calculator,
  Mail,
  MessagesSquare,
  PenLine,
  ImageIcon,
  BarChart3,
  TrendingUp,
  Megaphone,
  Star,
  Quote,
} from "lucide-react";

const defaultServices = [
  { icon: Globe, title: "Google Business Profile Optimization", desc: "Rank higher on Maps with fully-optimized GBP, reviews and posts." },
  { icon: Code2, title: "Website Development", desc: "Blazing-fast, conversion-focused websites engineered for growth." },
  { icon: Database, title: "CRM Development", desc: "Custom-built CRMs perfectly aligned with your sales process." },
  { icon: BrainCircuit, title: "AI CRM Solutions", desc: "Intelligent CRM enriched with AI scoring, forecasting and copilots." },
  { icon: MessageSquareText, title: "WhatsApp Business Automation", desc: "Broadcasts, chatbots and drip journeys on the #1 messaging channel." },
  { icon: PhoneCall, title: "AI Voice Calling Solutions", desc: "Human-like AI agents that call, qualify and book meetings 24/7." },
  { icon: Bot, title: "AI Chatbots & AI Agents", desc: "Multi-channel AI agents trained on your business knowledge base." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native-quality iOS and Android apps with AI baked in." },
  { icon: Search, title: "Search Engine Optimization (SEO)", desc: "Technical, content and off-page SEO that compounds every month." },
  { icon: MousePointerClick, title: "Google Ads Management", desc: "High-intent search and PMax campaigns built for ROAS." },
  { icon: Target, title: "Meta Ads Management", desc: "Facebook and Instagram ads that scale with creative velocity." },
  { icon: Share2, title: "Social Media Marketing", desc: "Content, community and creators — managed end-to-end." },
  { icon: Palette, title: "Branding & Creative Design", desc: "Distinctive brand systems, identities and design languages." },
  { icon: Workflow, title: "AI Business Automation", desc: "Autonomous workflows that eliminate manual busywork." },
  { icon: UserPlus, title: "Lead Generation Solutions", desc: "Full-funnel lead engines that fill your pipeline predictably." },
  { icon: Briefcase, title: "Business Consulting", desc: "Strategy sessions with senior operators and AI architects." },
];

const aiFeatures = [
  { icon: MessageCircle, title: "AI Chatbot", desc: "24/7 conversational AI trained on your business." },
  { icon: Mic, title: "AI Voice Agent", desc: "Human-like voice calls with real-time reasoning." },
  { icon: Handshake, title: "AI Sales Assistant", desc: "Coaches reps live and closes faster." },
  { icon: ClipboardCheck, title: "AI Lead Qualification", desc: "Auto-scores every lead by intent and fit." },
  { icon: FileText, title: "AI Proposal Generator", desc: "On-brand proposals in seconds." },
  { icon: Calculator, title: "AI Quotation Generator", desc: "Precise quotes with dynamic pricing rules." },
  { icon: Mail, title: "AI Email Writer", desc: "Personalized outbound at any scale." },
  { icon: MessagesSquare, title: "AI WhatsApp Reply Generator", desc: "Perfect replies on the world's #1 chat app." },
  { icon: PenLine, title: "AI Content Creator", desc: "Blogs, captions and scripts on demand." },
  { icon: ImageIcon, title: "AI Poster Generator", desc: "Stunning creatives from a single prompt." },
  { icon: BarChart3, title: "AI Analytics", desc: "Ask questions, get instant business insights." },
  { icon: TrendingUp, title: "AI Sales Forecast", desc: "Revenue predictions you can plan around." },
  { icon: Megaphone, title: "AI Marketing Assistant", desc: "Runs campaigns end-to-end, on autopilot." },
];

const defaultProjects = [
  { cat: "Restaurant Automation", title: "Aurora Bistro — Guest AI", desc: "Full reservation, order & loyalty automation for a 12-outlet chain.", tint: "from-orange-500/40 to-red-500/20", icon: "🍽" },
  { cat: "Real Estate CRM", title: "Skyline Realty CRM", desc: "WhatsApp-first lead engine with AI matchmaking and visit booking.", tint: "from-blue-500/40 to-indigo-500/20", icon: "🏘" },
  { cat: "Solar CRM", title: "Helios Solar Platform", desc: "End-to-end solar sales, from rooftop lead to installed panel.", tint: "from-amber-400/40 to-yellow-500/20", icon: "☀" },
  { cat: "Education CRM", title: "NextGen Admissions Suite", desc: "AI counsellor, parent bots and admissions funnel for 40+ campuses.", tint: "from-emerald-400/40 to-teal-500/20", icon: "🎓" },
  { cat: "Digital Marketing", title: "Prisma Growth Studio", desc: "Performance stack with client workspaces and creative AI toolkit.", tint: "from-fuchsia-500/40 to-purple-500/20", icon: "📢" },
  { cat: "Restaurant Automation", title: "Nomad Café Cloud", desc: "Voice-ordering AI and personalized guest journeys.", tint: "from-pink-400/40 to-orange-500/20", icon: "🍽" },
];

const defaultTestimonials = [
  { name: "Priya Menon", company: "Skyline Realty", type: "Real Estate", quote: "Our lead-to-visit ratio jumped 3.4× within 60 days. The AI voice agent alone books 40+ site visits every week." },
  { name: "Rohan Sharma", company: "Aurora Bistro", type: "Restaurant Chain", quote: "Guest retention has never been this high. WhatsApp automation feels like having a concierge on every table." },
  { name: "Aisha Verma", company: "Helios Solar", type: "Solar Energy", quote: "From lead capture to installation, everything runs on autopilot. Our reps focus on closing, not chasing." },
  { name: "Daniel Cole", company: "NextGen Campus", type: "Education", quote: "Admissions counsellors are 5× more productive. Parents love how instant and personal every reply feels." },
  { name: "Sara Ibrahim", company: "Prisma Studio", type: "Marketing Agency", quote: "The white-label AI stack lets us serve 3× more clients without hiring. This is the future of agencies." },
  { name: "Vikram Nair", company: "Orbit Foods", type: "Restaurant Chain", quote: "Rolled out to 12 outlets in one week. The dashboards make ops decisions feel obvious." },
  { name: "Jessica Chen", company: "Northwind Homes", type: "Real Estate", quote: "AI qualification saves us hundreds of hours. Only serious buyers reach our sales team now." },
  { name: "Arjun Kapoor", company: "Solaris Group", type: "Solar Energy", quote: "The quotation AI closes deals while I sleep. Genuinely enterprise-grade." },
];

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: React.ReactNode; subtitle: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-white/70">
        <Sparkles className="h-3.5 w-3.5 text-brand-emerald" /> {eyebrow}
      </span>
      <h2 className="mt-5 text-4xl md:text-5xl font-semibold text-white leading-[1.05]">{title}</h2>
      <p className="mt-5 text-white/65 text-lg">{subtitle}</p>
    </div>
  );
}

export function ServicesSection() {

  const [services, setServices] = useState(defaultServices);

  const iconMap: Record<string, any> = {
    "fa-globe": Globe,
    "fa-code": Code2,
    "fa-database": Database,
    "fa-brain": BrainCircuit,
    "fa-whatsapp": MessageSquareText,
    "fa-phone": PhoneCall,
    "fa-robot": Bot,
    "fa-mobile": Smartphone,
    "fa-search": Search,
    "fa-google": MousePointerClick,
    "fa-bullseye": Target,
    "fa-share": Share2,
    "fa-palette": Palette,
    "fa-workflow": Workflow,
    "fa-user-plus": UserPlus,
    "fa-briefcase": Briefcase,
  };

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await getServices();

        if (response.success) {
          const mappedServices = response.services.map((service: any) => ({
            ...service,
            desc: service.description,
            icon: iconMap[service.icon] || Globe,
          }));

          setServices(mappedServices);
        }
      } catch (error) {
        console.error("Error loading services:", error);
      }
    };

    loadServices();
  }, []);

  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">

        <SectionHeader
          eyebrow="Our services"
          title={
            <>
              Our <span className="text-gradient">Business Growth</span> Solutions
            </>
          }
          subtitle="Helping businesses automate operations, generate leads, improve customer engagement and accelerate growth using AI-powered solutions."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {services.map((s: any, i: number) => {

            const Icon = s.icon || Globe;

            return (

              <motion.div
                key={s.id || s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: (i % 4) * 0.05,
                  duration: 0.5,
                }}
                className="group relative glass rounded-2xl p-6 overflow-hidden hover:-translate-y-1 transition-all duration-500 hover:shadow-elegant"
              >

                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"
                  style={{
                    boxShadow:
                      "inset 0 0 0 1px oklch(0.72 0.17 165 / 0.35), 0 0 30px -8px oklch(0.62 0.22 300 / 0.55)",
                  }}
                />

                <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-25 blur-3xl transition duration-700" />

                <div className="relative h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
                  <Icon className="h-5 w-5 text-white" />
                </div>

                <h3 className="relative mt-5 text-base font-semibold text-white leading-snug">
                  {s.title}
                </h3>

                <p className="relative mt-2 text-sm text-white/60 leading-relaxed">
                  {s.desc}
                </p>

                <a
                  href="#contact"
                  className="relative mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-white/75 hover:text-white group-hover:gap-2.5 transition-all"
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>

              </motion.div>

            );

          })}

        </div>

      </div>
    </section>
  );
}

export function AIFeaturesSection() {
  return (
    <section id="ai-features" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="AI features"
          title={<>Powerful <span className="text-gradient">AI Features</span></>}
          subtitle="A complete AI workforce, purpose-built to run every function of your business."
        />
        <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {aiFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 4) * 0.06, duration: 0.5 }}
              className="group relative glass-strong rounded-2xl p-6 overflow-hidden hover:-translate-y-1 transition-all duration-500"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
                   style={{ background: "radial-gradient(circle at 50% 0%, oklch(0.62 0.22 300 / 0.22), transparent 60%)" }} />
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"
                   style={{ background: "linear-gradient(135deg, oklch(0.65 0.19 250 / 0.4), transparent 40%, oklch(0.72 0.17 165 / 0.4))", mask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)", WebkitMask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)", padding: "1px", WebkitMaskComposite: "xor", maskComposite: "exclude" }} />
              <div className="relative h-12 w-12 rounded-2xl glass grid place-items-center">
                <f.icon className="h-5 w-5 text-brand-emerald" />
              </div>
              <h3 className="relative mt-5 text-base font-semibold text-white">{f.title}</h3>
              <p className="relative mt-1.5 text-sm text-white/60 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PortfolioSection() {

  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const response = await getPortfolio();

        if (response.success) {

          const mappedProjects = response.portfolios.map((project: any) => ({

            id: project.id,
            title: project.title,
            desc: project.description,
            cat: project.category,

            image: project.image,

            tint: "from-blue-500/40 to-indigo-500/20",

            icon:
              project.category === "Restaurant Automation"
                ? "🍽"
                : project.category === "Real Estate CRM"
                ? "🏘"
                : project.category === "Solar CRM"
                ? "☀"
                : project.category === "Education CRM"
                ? "🎓"
                : project.category === "Digital Marketing"
                ? "📢"
                : "🚀",

          }));

          setProjects(mappedProjects);

        }

      } catch (error) {
        console.error("Error loading portfolio:", error);
      }
    };

    loadPortfolio();

  }, []);

  return (
    <section id="portfolio" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">

        <SectionHeader
          eyebrow="Portfolio"
          title={
            <>
              Our <span className="text-gradient">Recent Projects</span>
            </>
          }
          subtitle="A glimpse of the businesses we've transformed with AI-driven automation."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {["All", "Restaurant Automation", "Real Estate CRM", "Solar CRM", "Education CRM", "Digital Marketing"].map((c, i) => (
            <span
              key={c}
              className={`text-xs px-4 py-2 rounded-full glass border border-white/10 ${
                i === 0
                  ? "bg-gradient-primary text-white border-transparent"
                  : "text-white/75 hover:text-white cursor-pointer"
              }`}
            >
              {c}
            </span>
          ))}
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {projects.map((p: any, i: number) => (

            <motion.article
              key={p.id || p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: (i % 3) * 0.08,
                duration: 0.55,
              }}
              className="group glass-strong rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-500 hover:shadow-elegant"
            >

              <div
                className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${p.tint}`}
              >

                <div className="absolute inset-0 grid-bg opacity-40" />

<div className="absolute inset-0 overflow-hidden">

  {p.image ? (

    <img
      src={p.image}
      alt={p.title}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
    />

  ) : (

    <div className="grid h-full w-full place-items-center text-7xl">
      {p.icon}
    </div>

  )}

</div>
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-white glass rounded-full px-3 py-1">
                  {p.cat}
                </span>

              </div>

              <div className="p-6">

                <h3 className="text-lg font-semibold text-white">
                  {p.title}
                </h3>

                <p className="mt-2 text-sm text-white/65 leading-relaxed">
                  {p.desc}
                </p>

                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/85 hover:text-white group-hover:gap-3 transition-all"
                >
                  View Project
                  <ArrowRight className="h-4 w-4" />
                </a>

              </div>

            </motion.article>

          ))}

        </div>

      </div>
    </section>
  );
}

export function TestimonialsSection() {

  const [testimonials, setTestimonials] = useState(defaultTestimonials);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const response = await getTestimonials();

        if (response.success) {

          const mappedTestimonials = response.testimonials.map((item: any) => ({
            id: item.id,
            name: item.client_name,
            company: item.company,
            type: item.designation,
            quote: item.review,
            rating: item.rating,
          }));

          setTestimonials(mappedTestimonials);
        }

      } catch (error) {
        console.error("Error loading testimonials:", error);
      }
    };

    loadTestimonials();
  }, []);

  const row = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="relative py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">

        <SectionHeader
          eyebrow="Testimonials"
          title={
            <>
              What Our <span className="text-gradient">Clients Say</span>
            </>
          }
          subtitle="Trusted by founders and operators across restaurants, real estate, solar, education and marketing."
        />

      </div>

      <div className="relative mt-14">

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />

        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex gap-5 marquee">

          {row.map((t: any, i: number) => (

            <div
              key={t.id ? `${t.id}-${i}` : i}
              className="w-[340px] shrink-0 glass-strong rounded-3xl p-6 hover:shadow-elegant transition-shadow"
            >

              <Quote className="h-5 w-5 text-brand-purple" />

              <p className="mt-3 text-sm text-white/80 leading-relaxed">
                "{t.quote}"
              </p>

              <div className="mt-5 flex items-center gap-3">

                <div className="h-11 w-11 rounded-full bg-gradient-primary grid place-items-center text-white text-sm font-semibold shadow-glow">
                  {t.name
                    .split(" ")
                    .map((x: string) => x[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div className="min-w-0">

                  <p className="text-sm font-semibold text-white truncate">
                    {t.name}
                  </p>

                  <p className="text-xs text-white/55 truncate">
                    {t.company} · {t.type}
                  </p>

                </div>

                <div className="ml-auto flex gap-0.5">

                  {Array.from({
                    length: t.rating || 5,
                  }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-3.5 w-3.5 fill-amber-300 text-amber-300"
                    />
                  ))}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      <style>{`
        .marquee {
          animation: marquee 60s linear infinite;
          width: max-content;
        }

        .marquee:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>

    </section>
  );
}

export function GrowthCTASection() {
  return (
    <section id="grow" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] p-10 md:p-16 text-center shadow-elegant border border-white/10">
          <div className="absolute inset-0 bg-gradient-primary opacity-25" />
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-brand-blue/50 blur-3xl animate-pulse-glow" />
          <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-brand-purple/50 blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-[70%] bg-brand-emerald/25 blur-3xl rounded-full" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-white/85">
              <Sparkles className="h-3.5 w-3.5 text-brand-emerald" /> Growth, on autopilot
            </span>
            <h2 className="mt-6 text-4xl md:text-6xl font-semibold text-white leading-[1.02]">
              Ready to Grow Your Business <br className="hidden md:block" />
              with <span className="text-gradient">AI?</span>
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-white/80 text-lg">
              Meet the AI platform trusted by ambitious teams. See it live, tailored to your industry.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-900 px-6 py-3.5 text-sm font-semibold hover:bg-white/90 transition shadow-glow">
                Book Free Demo <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl glass-strong px-6 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition">
                Schedule Consultation
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition">
                Get Free Proposal
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
