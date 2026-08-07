import { sendContact } from "../services/contactAPI";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  Clock,
  Send,
  Calendar,
  FileText,
  Sparkles,
  Building2,
} from "lucide-react";

const services = [
  "AI Business Automation",
  "WhatsApp Automation",
  "AI CRM",
  "Website / App Development",
  "AI Voice Calling",
  "Digital Marketing",
  "Custom AI Development",
  "White Label Solutions",
];

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    service: services[0],
    message: "",
  });

const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await sendContact({
      name: form.name,
      company: form.company,
      phone: form.phone,
      email: form.email,
      service: form.service,
      message: form.message,
    });

    if (response.success) {
      setSent(true);

      setForm({
        name: "",
        company: "",
        phone: "",
        email: "",
        service: services[0],
        message: "",
      });

      setTimeout(() => setSent(false), 4000);
    } else {
      alert("Unable to send your message.");
    }
  } catch (error) {
    console.error("Contact Error:", error);
    alert("Server error. Please try again.");
  } finally {
    setLoading(false);
  }
};
  const bind = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value })),
  });

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-white/70">
            <Sparkles className="h-3.5 w-3.5 text-brand-emerald" /> Get in touch
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-semibold text-white leading-[1.05]">
            Let's Build Your Business with <span className="text-gradient">AI</span>
          </h2>
          <p className="mt-5 text-white/70 text-lg">
            Talk to our AI strategists and receive a custom automation blueprint for your business.
          </p>
        </div>

        {/* Quick contact cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Phone,
              label: "Call Now",
              value: "+91 99127 99855",
              href: "tel:+919912799855",
            },
            {
              icon: MessageCircle,
              label: "WhatsApp",
              value: "+91 99127 99855",
              href: "https://wa.me/919912799855",
            },
            {
              icon: Mail,
              label: "Email",
              value: "info@digitalcreatorshub.in",
              href: "mailto:info@digitalcreatorshub.in",
            },
            {
              icon: MapPin,
              label: "Office",
              value: "Kondapur, Hyderabad",
              href: "#map",
            },
          ].map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass rounded-2xl p-5 hover:bg-white/[0.07] hover:-translate-y-0.5 transition group"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-white shadow-glow">
                <c.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-widest text-white/50">{c.label}</p>
              <p className="mt-1 text-white font-medium text-sm truncate">{c.value}</p>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-strong rounded-3xl p-7 md:p-9 shadow-elegant"
          >
            <h3 className="text-2xl font-semibold text-white">Send us a message</h3>
            <p className="mt-2 text-sm text-white/60">
              We'll respond within 24 hours with a tailored proposal.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name">
                <input {...bind("name")} required className={inputCls} placeholder="John Doe" />
              </Field>
              <Field label="Company">
                <input {...bind("company")} className={inputCls} placeholder="Acme Inc." />
              </Field>
              <Field label="Phone">
                <input
                  {...bind("phone")}
                  type="tel"
                  className={inputCls}
                  placeholder="+91 99999 99999"
                />
              </Field>
              <Field label="Email">
                <input
                  {...bind("email")}
                  type="email"
                  required
                  className={inputCls}
                  placeholder="you@company.com"
                />
              </Field>
              <Field label="Service" className="sm:col-span-2">
                <select {...bind("service")} className={`${inputCls} appearance-none`}>
                  {services.map((s) => (
                    <option key={s} value={s} className="bg-[#0b0d1f]">
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Message" className="sm:col-span-2">
                <textarea
                  {...bind("message")}
                  required
                  rows={4}
                  className={`${inputCls} resize-none`}
                  placeholder="Tell us about your business and goals..."
                />
              </Field>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
<button
  type="submit"
  disabled={loading}
  className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 text-sm font-medium text-white shadow-glow hover:shadow-elegant transition disabled:opacity-60"
>
  <Send className="h-4 w-4" />
  {loading ? "Sending..." : "Send Message"}
</button>
              <a
                href="https://wa.me/919912799855"
                className="inline-flex items-center gap-2 rounded-xl glass px-5 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition"
              >
                <MessageCircle className="h-4 w-4 text-brand-emerald" />
                WhatsApp Now
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-xl glass px-5 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition"
              >
                <FileText className="h-4 w-4" />
                Get Free Proposal
              </a>
              {sent && (
                <span className="text-sm text-brand-emerald">✓ Message sent — we'll be in touch.</span>
              )}
            </div>
          </motion.form>

          {/* Right side: address, hours, map */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-strong rounded-3xl p-7"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-white shadow-glow shrink-0">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-white font-semibold">Digital Creators Hub</h4>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    Jayabheri Silver Plaza,<br />
                    Kondapur, Hyderabad,<br />
                    Telangana, India
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl glass text-brand-emerald shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Business Hours</h4>
                  <p className="mt-2 text-sm text-white/70">Mon – Sat · 10:00 AM – 7:00 PM IST</p>
                  <p className="text-sm text-white/50">Sunday — Closed</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-xs font-medium text-white shadow-glow"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  Book Free Demo
                </a>
                <a
                  href="tel:+919912799855"
                  className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-xs font-medium text-white"
                >
                  <Phone className="h-3.5 w-3.5" /> Call Now
                </a>
              </div>
            </motion.div>

            <motion.div
              id="map"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-strong rounded-3xl overflow-hidden shadow-elegant"
            >
              <div className="relative h-64 w-full">
                <iframe
                  title="Digital Creators Hub Office"
                  src="https://www.google.com/maps?q=Jayabheri+Silver+Plaza+Kondapur+Hyderabad&output=embed"
                  className="absolute inset-0 h-full w-full grayscale-[30%] contrast-110"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 pointer-events-none ring-1 ring-white/10 rounded-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-white/20 transition";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs uppercase tracking-widest text-white/50">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
