import { Sparkles, ArrowRight, Facebook, Instagram, Linkedin, Youtube, Send } from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/dch-logo.png";

export function CTASection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <section id="final-cta" className="relative pt-20 pb-4">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] glass-strong p-10 md:p-16 text-center shadow-elegant">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-[80%] bg-gradient-primary opacity-30 blur-3xl rounded-full" />
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-white/70">
              <Sparkles className="h-3.5 w-3.5 text-brand-emerald" /> Ready when you are
            </span>
            <h2 className="mt-6 text-4xl md:text-6xl font-semibold text-white leading-[1.02]">
              Let's build your <span className="text-gradient">AI-powered</span> business.
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-white/70 text-lg">
              Book a free consultation with our AI strategists and receive a
              custom automation blueprint for your business — in 30 minutes.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 text-sm font-medium text-white shadow-glow hover:shadow-elegant transition"
              >
                Book Free Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition"
              >
                Talk to Sales
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="mx-auto max-w-7xl px-6 mt-24">
        {/* Newsletter */}
        <div className="glass-strong rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-elegant">
          <div className="max-w-xl">
            <h3 className="text-2xl font-semibold text-white">
              Get AI insights in your inbox
            </h3>
            <p className="mt-2 text-sm text-white/65">
              Monthly playbooks, product updates and case studies from Digital Creators Hub.
            </p>
          </div>
          <form onSubmit={onSubscribe} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 md:w-72 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 text-sm font-medium text-white shadow-glow hover:shadow-elegant transition"
            >
              <Send className="h-4 w-4" />
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </form>
        </div>

        <div className="grid md:grid-cols-5 gap-10 pb-10 pt-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src={logoAsset.url}
                alt="Digital Creators Hub"
                className="h-12 w-12 rounded-full object-contain drop-shadow-[0_0_18px_rgba(120,130,255,0.35)]"
              />
              <span className="text-white font-semibold text-base">
                Digital Creators <span className="text-gradient">Hub</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-white/65 max-w-md leading-relaxed">
              One AI Platform for Restaurants, Real Estate, Solar,
              Educational Institutions & Digital Marketing.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { I: Facebook, href: "#" },
                { I: Instagram, href: "#" },
                { I: Linkedin, href: "#" },
                { I: Youtube, href: "#" },
              ].map(({ I, href }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label="Social link"
                  className="h-9 w-9 rounded-xl glass grid place-items-center text-white/70 hover:text-white hover:bg-white/10 transition"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              t: "Platform",
              l: [
                { label: "Home", href: "#home" },
                { label: "Solutions", href: "#solutions" },
                { label: "Industries", href: "#industries" },
                { label: "Services", href: "#services" },
                { label: "AI Products", href: "#ai-features" },
                { label: "Pricing", href: "#pricing" },
              ],
            },
            {
              t: "Company",
              l: [
                { label: "About", href: "#about" },
                { label: "Portfolio", href: "#portfolio" },
                { label: "Blog", href: "#blog" },
                { label: "Careers", href: "#careers" },
                { label: "Contact", href: "#contact" },
              ],
            },
            {
              t: "Legal",
              l: [
                { label: "Privacy Policy", href: "#privacy" },
                { label: "Terms & Conditions", href: "#terms" },
                { label: "Cookies", href: "#cookies" },
              ],
            },
          ].map((c) => (
            <div key={c.t}>
              <p className="text-xs uppercase tracking-widest text-white/50">{c.t}</p>
              <ul className="mt-4 space-y-2.5">
                {c.l.map((x) => (
                  <li key={x.label}>
                    <a href={x.href} className="text-sm text-white/75 hover:text-white transition">
                      {x.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Digital Creators Hub. All Rights Reserved.</p>
          <p>Crafted with intelligence · Made for enterprise</p>
        </div>
      </footer>
    </section>
  );
}
