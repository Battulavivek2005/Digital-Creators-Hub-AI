import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

function useCountUp(target: number, inView: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, inView, duration]);
  return value;
}

const stats = [
  { label: "Businesses Automated", value: 2400, suffix: "+" },
  { label: "AI Conversations / mo", value: 18, suffix: "M+" },
  { label: "Avg. Revenue Lift", value: 42, suffix: "%" },
  { label: "Enterprise Uptime", value: 99.99, suffix: "%", decimals: 2 },
];

export function TrustedStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-white/50">
          Trusted by businesses worldwide
        </p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} i={i} inView={inView} {...s} />
          ))}
        </div>
        <div className="mt-14 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60">
          {["NORTHWIND", "ATLAS", "HELIOS", "PRISMA", "ORBIT", "QUANTA"].map((b) => (
            <span
              key={b}
              className="text-sm md:text-base font-semibold tracking-[0.35em] text-white/50"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  label, value, suffix, decimals = 0, inView, i,
}: { label: string; value: number; suffix: string; decimals?: number; inView: boolean; i: number }) {
  const n = useCountUp(value, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.08, duration: 0.6 }}
      className="glass rounded-2xl p-6 text-center"
    >
      <p className="text-3xl md:text-4xl font-semibold text-gradient">
        {n.toFixed(decimals)}
        {suffix}
      </p>
      <p className="mt-2 text-xs uppercase tracking-widest text-white/55">{label}</p>
    </motion.div>
  );
}
