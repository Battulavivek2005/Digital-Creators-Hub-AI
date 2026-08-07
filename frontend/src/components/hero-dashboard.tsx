import { motion } from "motion/react";
import { MessageCircle, Phone, TrendingUp, Users, Zap, Activity } from "lucide-react";

export function HeroDashboard() {
  return (
    <div className="relative w-full aspect-[5/4] md:aspect-[16/11]">
      {/* Ambient glows */}
      <div className="absolute -inset-10 bg-hero-radial pointer-events-none" />
      <div className="absolute -top-16 -right-10 h-72 w-72 rounded-full bg-brand-purple/30 blur-3xl animate-pulse-glow" />
      <div className="absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-brand-blue/30 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.2s" }} />

      {/* Main dashboard frame */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative h-full w-full glass-strong rounded-3xl overflow-hidden shadow-elegant"
      >
        {/* Top bar */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
          <div className="ml-4 text-xs text-white/50 font-mono">
            hub.ai / control-center
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </div>
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-6 grid-rows-6 gap-3 p-4 h-[calc(100%-44px)]">
          {/* Revenue chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="col-span-4 row-span-3 glass rounded-2xl p-4 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/50">Revenue impact</p>
                <p className="text-2xl font-semibold text-white mt-1">$248,930</p>
              </div>
              <span className="text-xs text-emerald-300 flex items-center gap-1 glass rounded-full px-2 py-1">
                <TrendingUp className="h-3 w-3" /> +34.2%
              </span>
            </div>
            <svg viewBox="0 0 300 100" className="w-full h-24 mt-2">
              <defs>
                <linearGradient id="lineg" x1="0" x2="1">
                  <stop offset="0%" stopColor="oklch(0.65 0.19 250)" />
                  <stop offset="50%" stopColor="oklch(0.62 0.22 300)" />
                  <stop offset="100%" stopColor="oklch(0.72 0.17 165)" />
                </linearGradient>
                <linearGradient id="fillg" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.62 0.22 300 / 0.45)" />
                  <stop offset="100%" stopColor="oklch(0.62 0.22 300 / 0)" />
                </linearGradient>
              </defs>
              <path d="M0 80 L30 70 L60 74 L90 55 L120 60 L150 40 L180 45 L210 28 L240 32 L270 18 L300 22 L300 100 L0 100 Z" fill="url(#fillg)" />
              <path
                d="M0 80 L30 70 L60 74 L90 55 L120 60 L150 40 L180 45 L210 28 L240 32 L270 18 L300 22"
                fill="none"
                stroke="url(#lineg)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="270" cy="18" r="4" fill="oklch(0.72 0.17 165)">
                <animate attributeName="r" values="4;7;4" dur="1.6s" repeatCount="indefinite" />
              </circle>
            </svg>
          </motion.div>

          {/* KPI cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="col-span-2 row-span-2 glass rounded-2xl p-3 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-white/50">Active leads</span>
              <Users className="h-3.5 w-3.5 text-brand-blue" />
            </div>
            <div>
              <p className="text-xl font-semibold text-white">12,847</p>
              <p className="text-[10px] text-emerald-300">▲ 2,340 this week</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="col-span-2 row-span-1 glass rounded-2xl p-3 flex items-center gap-3"
          >
            <div className="h-8 w-8 rounded-lg bg-brand-emerald/20 grid place-items-center">
              <Zap className="h-4 w-4 text-brand-emerald" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Automations</p>
              <p className="text-sm font-semibold text-white truncate">1,204 running</p>
            </div>
          </motion.div>

          {/* WhatsApp automation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="col-span-3 row-span-3 glass rounded-2xl p-3 relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="h-7 w-7 rounded-lg bg-emerald-500/20 grid place-items-center">
                <MessageCircle className="h-3.5 w-3.5 text-emerald-300" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">WhatsApp Flow</p>
                <p className="text-[10px] text-white/50">Auto-reply · 98% delivery</p>
              </div>
              <span className="ml-auto text-[10px] text-emerald-300 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> live
              </span>
            </div>
            <div className="space-y-1.5">
              {[
                { t: "Hi! I'm interested in the 2BHK 🏘", me: false },
                { t: "Sure! Booking a visit for Sat 3pm ✨", me: true },
                { t: "Perfect, please confirm.", me: false },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.25 }}
                  className={`max-w-[85%] text-[11px] px-2.5 py-1.5 rounded-xl ${
                    m.me
                      ? "ml-auto bg-gradient-primary text-white"
                      : "bg-white/8 text-white/85"
                  }`}
                >
                  {m.t}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Voice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="col-span-3 row-span-3 glass rounded-2xl p-3 relative overflow-hidden"
          >
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-brand-purple/25 grid place-items-center">
                <Phone className="h-3.5 w-3.5 text-brand-purple" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">AI Voice Calling</p>
                <p className="text-[10px] text-white/50">Aria · outbound follow-up</p>
              </div>
              <span className="ml-auto text-[10px] text-white/60 font-mono">02:41</span>
            </div>
            <div className="mt-3 flex items-end gap-1 h-14">
              {Array.from({ length: 28 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 flex-1 rounded-full bg-gradient-primary origin-bottom"
                  style={{
                    height: `${20 + Math.abs(Math.sin(i * 0.7)) * 80}%`,
                    animation: `rise-bar 1.1s ease-in-out ${i * 0.05}s infinite alternate`,
                  }}
                />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="glass rounded-lg py-1.5">
                <p className="text-[9px] text-white/50 uppercase">Calls</p>
                <p className="text-xs font-semibold text-white">1.2k</p>
              </div>
              <div className="glass rounded-lg py-1.5">
                <p className="text-[9px] text-white/50 uppercase">Booked</p>
                <p className="text-xs font-semibold text-emerald-300">342</p>
              </div>
              <div className="glass rounded-lg py-1.5">
                <p className="text-[9px] text-white/50 uppercase">Sentiment</p>
                <p className="text-xs font-semibold text-brand-emerald">+87</p>
              </div>
            </div>
          </motion.div>

          {/* Bottom activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="col-span-6 row-span-1 glass rounded-2xl px-4 flex items-center gap-4 overflow-hidden"
          >
            <Activity className="h-4 w-4 text-brand-emerald" />
            <div className="text-[11px] text-white/70 whitespace-nowrap overflow-hidden">
              <span className="text-white">New lead ·</span> Sarah booked a solar consultation ·
              <span className="text-brand-emerald"> AI qualified</span> · sent WhatsApp confirmation · CRM updated
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating chips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="hidden md:flex absolute -left-6 top-1/3 glass-strong rounded-2xl px-4 py-3 items-center gap-3 animate-float-slow"
      >
        <div className="h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/50">Deal closed</p>
          <p className="text-sm font-semibold text-white">$18,400 · AI-assisted</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.25 }}
        className="hidden md:flex absolute -right-4 bottom-8 glass-strong rounded-2xl px-4 py-3 items-center gap-3 animate-float-fast"
      >
        <div className="h-9 w-9 rounded-xl bg-emerald-500/25 grid place-items-center">
          <MessageCircle className="h-4 w-4 text-emerald-300" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/50">Reply rate</p>
          <p className="text-sm font-semibold text-white">96.4%</p>
        </div>
      </motion.div>
    </div>
  );
}
