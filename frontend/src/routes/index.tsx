import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Calendar, PlayCircle, Sparkles } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { HeroDashboard } from "@/components/hero-dashboard";
import { TrustedStats } from "@/components/trusted-stats";
import { Sections } from "@/components/sections";
import { CTASection } from "@/components/cta-footer";
import {
  ServicesSection,
  AIFeaturesSection,
  PortfolioSection,
  TestimonialsSection,
  GrowthCTASection,
} from "@/components/more-sections";
import { PricingSection } from "@/components/pricing";
import { FAQSection } from "@/components/faq";
import { ContactSection } from "@/components/contact";
import {
  ScrollProgress,
  ScrollToTop,
  FloatingWhatsApp,
  PageLoader,
} from "@/components/floating-widgets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital Creators Hub AI — Grow Any Business with AI Automation" },
      {
        name: "description",
        content:
          "Digital Creators Hub AI is the all-in-one AI business automation platform for CRM, WhatsApp automation, AI voice calling, marketing and more — for restaurants, real estate, solar, education and agencies.",
      },
      { property: "og:title", content: "Digital Creators Hub AI — AI Business Automation Platform" },
      {
        property: "og:description",
        content:
          "Automate operations, marketing, lead management and customer engagement with one intelligent AI platform.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://creators-ai-nexus.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Digital Creators Hub AI" },
      {
        name: "twitter:description",
        content: "The all-in-one AI business automation platform.",
      },
    ],
    links: [{ rel: "canonical", href: "https://creators-ai-nexus.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Digital Creators Hub",
          url: "https://creators-ai-nexus.lovable.app/",
          logo: "https://creators-ai-nexus.lovable.app/__l5e/assets-v1/ffad0cda-83a1-4d5b-b6d7-5894bc644772/dch-logo.png",
          description:
            "All-in-one AI business automation platform for CRM, WhatsApp automation, AI voice calling and digital marketing.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Jayabheri Silver Plaza, Kondapur",
            addressLocality: "Hyderabad",
            addressRegion: "Telangana",
            addressCountry: "IN",
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+91-9912799855",
              contactType: "customer service",
              areaServed: "IN",
              availableLanguage: ["English", "Hindi", "Telugu"],
            },
          ],
          sameAs: [],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden scroll-smooth">
      <PageLoader />
      <ScrollProgress />

      {/* Global ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-blue/20 blur-3xl" />
        <div className="absolute top-40 right-0 h-[500px] w-[500px] rounded-full bg-brand-purple/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-brand-emerald/15 blur-3xl" />
      </div>

      <Navbar />

      {/* HERO */}
      <section id="home" className="relative pt-36 md:pt-44 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-14 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-white/80"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <Sparkles className="h-3.5 w-3.5 text-brand-emerald" />
                New · Multi-agent AI workforce is live
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="mt-6 text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.02] tracking-tight"
              >
                Grow Any Business with{" "}
                <span className="text-gradient">AI Automation</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed"
              >
                Restaurants · Real Estate · Solar · Educational Institutions ·
                Digital Marketing — all managed from one intelligent AI platform.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-9 flex flex-wrap gap-3"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-3.5 text-sm font-medium text-white shadow-glow hover:shadow-elegant transition"
                >
                  <Calendar className="h-4 w-4" />
                  Book Free Demo
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl glass-strong px-5 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition"
                >
                  Schedule Consultation
                </a>
                <a
                  href="#solutions"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium text-white/85 hover:text-white transition"
                >
                  <PlayCircle className="h-4 w-4" />
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex items-center gap-6 text-xs text-white/55"
              >
                <div className="flex -space-x-2">
                  {[
                    "from-brand-blue to-brand-purple",
                    "from-brand-purple to-brand-emerald",
                    "from-brand-emerald to-brand-blue",
                    "from-brand-blue to-brand-emerald",
                  ].map((c, i) => (
                    <span
                      key={i}
                      className={`h-7 w-7 rounded-full bg-gradient-to-br ${c} ring-2 ring-background`}
                    />
                  ))}
                </div>
                <p>
                  Loved by 2,400+ operators across 40+ countries · No credit card required
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <HeroDashboard />
            </motion.div>
          </div>
        </div>
      </section>

      <TrustedStats />
      <Sections />
      <ServicesSection />
      <AIFeaturesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <GrowthCTASection />
      <CTASection />

      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  );
}
