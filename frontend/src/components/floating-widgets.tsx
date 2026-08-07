import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { ArrowUp, MessageCircle } from "lucide-react";
import logoAsset from "@/assets/dch-logo.png";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-primary shadow-glow"
    />
  );
}

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-gradient-primary text-white shadow-glow hover:shadow-elegant transition"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919912799855"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-emerald-500/40 blur-xl animate-pulse-glow" />
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] transition group-hover:scale-105">
        <MessageCircle className="h-6 w-6" />
      </span>
      <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg glass-strong px-3 py-1.5 text-xs text-white opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition">
        Chat on WhatsApp
      </span>
    </a>
  );
}

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <div className="absolute inset-0 bg-hero-radial opacity-70" />
          <div className="relative flex flex-col items-center gap-6">
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-gradient-primary opacity-40 blur-2xl animate-pulse-glow" />
              <motion.img
                src={logoAsset.url}
                alt="Digital Creators Hub"
                className="relative h-20 w-20 rounded-full object-contain drop-shadow-[0_0_25px_rgba(120,130,255,0.5)]"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
                className="h-full w-1/2 bg-gradient-primary"
              />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Digital Creators Hub
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
