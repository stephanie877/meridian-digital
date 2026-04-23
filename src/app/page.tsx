"use client";
import { useState, useEffect, useRef } from "react";

// ── ICONS ──────────────────────────────────────────────────────────────────
const Icon = ({ name }: { name: string }) => {
  const icons: Record<string, string> = {
    arrow: "M9 5l7 7-7 7",
    check: "M5 13l4 4L19 7",
    x: "M6 18L18 6M6 6l12 12",
    plus: "M12 4v16m8-8H4",
    zap: "M13 2L3 14h9l-1 10 10-12h-9l1-10z",
    bot: "M12 2a2 2 0 012 2v2h4a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h4V4a2 2 0 012-2zm-2 6H8v2h2V8zm4 0h-2v2h2V8zm2 0h2v2h-2V8z",
    calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    chart: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    search: "M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z",
    refresh: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    phone: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    location: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  };
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d={icons[name]} />
    </svg>
  );
};

// ── LOGO ───────────────────────────────────────────────────────────────────
const Logo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = { sm: 28, md: 36, lg: 44 };
  const s = sizes[size];
  return (
    <div className="flex items-center gap-2.5">
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id="lg1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a78bfa" />
            <stop offset="0.5" stopColor="#7c6aff" />
            <stop offset="1" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#lg1)" />
        <path d="M8 22L13 10L16 17.5L19 12.5L22 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="10" r="2.2" fill="white" opacity="0.9" />
      </svg>
      <span className="font-bold tracking-tight text-white display" style={{ fontSize: size === "sm" ? 17 : size === "lg" ? 24 : 20 }}>
        Meridian<span className="gradient-text">Digital</span>
      </span>
    </div>
  );
};

// ── USE INTERSECTION OBSERVER ──────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── USE COUNTER ────────────────────────────────────────────────────────────
function useCounter(target: number, active: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(ease(p) * target));
      if (p < 1) requestAnimationFrame(step);
      else setVal(target);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

// ── BROWSER MOCKUP ─────────────────────────────────────────────────────────
const BrowserMock = () => {
  const [typing, setTyping] = useState(false);
  const [msg, setMsg] = useState("");
  const fullMsg = "I need emergency flood cleanup today";
  useEffect(() => {
    const t1 = setTimeout(() => setTyping(true), 2000);
    const t2 = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setMsg(fullMsg.slice(0, i));
        if (i >= fullMsg.length) clearInterval(iv);
      }, 45);
    }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="browser-chrome w-full max-w-[480px] animate-float">
      <div className="browser-bar">
        <div className="browser-dots">
          <div className="browser-dot" style={{ background: "#ff5f57" }} />
          <div className="browser-dot" style={{ background: "#ffbd2e" }} />
          <div className="browser-dot" style={{ background: "#28c840" }} />
        </div>
        <div className="browser-url">alpinerestoration.com</div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400" style={{ fontSize: 10 }}>Live</span>
        </div>
      </div>
      {/* mini site */}
      <div className="relative overflow-hidden" style={{ background: "#0d0d1a", minHeight: 260 }}>
        {/* mini nav */}
        <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#13131f" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded" style={{ background: "linear-gradient(135deg,#7c6aff,#60a5fa)" }} />
            <div className="w-16 h-2.5 rounded" style={{ background: "rgba(255,255,255,0.15)" }} />
          </div>
          <div className="flex gap-2">
            {[40, 32, 36].map((w, i) => (
              <div key={i} className="h-1.5 rounded" style={{ width: w, background: "rgba(255,255,255,0.1)" }} />
            ))}
          </div>
          <div className="px-3 py-1 rounded" style={{ background: "linear-gradient(135deg,#7c6aff,#4f46e5)", fontSize: 9, color: "white" }}>Call Now</div>
        </div>
        {/* hero */}
        <div className="px-5 py-5">
          <div className="chip" style={{ fontSize: 9, padding: "3px 8px", marginBottom: 8 }}>⚡ 24/7 Emergency Service</div>
          <div className="w-40 h-3.5 rounded mb-1.5" style={{ background: "rgba(255,255,255,0.85)" }} />
          <div className="w-32 h-3.5 rounded mb-3" style={{ background: "rgba(255,255,255,0.5)" }} />
          <div className="w-24 h-2 rounded mb-1" style={{ background: "rgba(255,255,255,0.25)" }} />
          <div className="w-36 h-2 rounded mb-4" style={{ background: "rgba(255,255,255,0.25)" }} />
          <div className="flex gap-2">
            <div className="px-3 py-1.5 rounded" style={{ background: "linear-gradient(135deg,#7c6aff,#4f46e5)", fontSize: 9, color: "white" }}>Get Free Quote →</div>
            <div className="px-3 py-1.5 rounded" style={{ border: "1px solid rgba(255,255,255,0.2)", fontSize: 9, color: "rgba(255,255,255,0.7)" }}>See Our Work</div>
          </div>
        </div>
        {/* stats strip */}
        <div className="flex gap-3 mx-4 mb-3 p-2.5 rounded-lg" style={{ background: "rgba(124,106,255,0.1)", border: "1px solid rgba(124,106,255,0.2)" }}>
          {[["4.9★", "Google"], ["247+", "Jobs Done"], ["<2h", "Response"]].map(([n, l]) => (
            <div key={l} className="text-center flex-1">
              <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 700 }}>{n}</div>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.4)" }}>{l}</div>
            </div>
          ))}
        </div>
        {/* AI chat widget */}
        <div className="absolute bottom-3 right-3">
          <div className="relative">
            {/* bubble */}
            {msg && (
              <div className="absolute bottom-10 right-0 mb-1 p-2.5 rounded-xl rounded-br-sm shadow-lg" style={{ background: "#1e1e35", border: "1px solid rgba(124,106,255,0.3)", width: 180, fontSize: 10, color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>
                <div style={{ color: "#9faab8", fontSize: 9, marginBottom: 4 }}>You:</div>
                {msg}<span className="animate-blink">|</span>
              </div>
            )}
            {/* chat icon */}
            <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg,#7c6aff,#4f46e5)", boxShadow: "0 4px 15px rgba(124,106,255,0.5)" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            {typing && !msg && (
              <div className="absolute bottom-10 right-0 p-2 rounded-lg" style={{ background: "#1e1e35", border: "1px solid rgba(124,106,255,0.3)" }}>
                <div className="flex gap-1">
                  {[0.1, 0.2, 0.3].map((d) => (
                    <div key={d} className="w-1.5 h-1.5 rounded-full" style={{ background: "#7c6aff", animation: `blink 1s ease ${d}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── STAT CARD ──────────────────────────────────────────────────────────────
const StatCard = ({ value, suffix, label, icon, active }: {
  value: number; suffix: string; label: string; icon: string; active: boolean;
}) => {
  const count = useCounter(value, active);
  return (
    <div className="glass glass-hover rounded-2xl p-6 text-center fade-up">
      <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: "rgba(124,106,255,0.15)" }}>
        <span className="text-violet-400"><Icon name={icon} /></span>
      </div>
      <div className="display font-bold text-4xl text-white mb-1">
        {count}{suffix}
      </div>
      <div className="text-sm" style={{ color: "var(--muted)" }}>{label}</div>
    </div>
  );
};

// ── FAQ ────────────────────────────────────────────────────────────────────
const faqs = [
  { q: "What exactly is an 'AI-Powered Business Hub'?", a: "It's not just a website — it's a full lead-capture system. You get a lightning-fast mobile site, an AI chat assistant trained on your business that handles inquiries 24/7, online booking, Google Reviews integration, and a local SEO foundation. It works while you sleep." },
  { q: "What types of businesses do you work with?", a: "We specialize in service businesses: fire & water restoration, electricians, general contractors, auto repair shops, pool builders, and similar trades. These are high-ticket service businesses where a single job covers our fee and where most owners have websites that are actively costing them calls." },
  { q: "How does the 14-day delivery actually work?", a: "Day 1–2: We assess your current site and gather your assets (logo, photos, services). Day 3–7: Design and build. Day 8–12: AI bot training, booking integration, testing. Day 13–14: Final review with you, launch. We've done this enough times that it's a clean process, not a scramble." },
  { q: "What happens if I don't like what you build?", a: "Before we go live, you get a full review session. We do revisions until you're satisfied. We're not done until you're proud of it. In practice, clients are usually more excited than they expected." },
  { q: "Do I need to provide content and photos?", a: "Photos help — we'll guide you on what to take (your team, your equipment, a few jobs). For copy, we write everything based on a short intake form. Most clients provide a few bullets and we do the rest." },
  { q: "What does the monthly retainer include?", a: "Unlimited content updates (new services, promotions, seasonal pages), ongoing AI bot tuning as your business evolves, monthly performance reports showing leads captured and traffic, and priority support. You call us, we pick up." },
  { q: "Can I cancel the retainer?", a: "Month-to-month. No contracts, no lock-in. We earn your business every month. In practice, clients stay because the site keeps generating ROI — not because they're stuck." },
  { q: "How do I get leads into my hands quickly after launch?", a: "The moment the site goes live, the AI bot is active and the contact form routes directly to your phone. We also set up Google Search Console and submit your sitemap so Google indexes the new site within 48–72 hours. You should see your first web leads within the first week." },
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item py-5 cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between gap-4">
        <span className="font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{q}</span>
        <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${open ? "bg-violet-600 rotate-45" : "bg-white/5"}`}>
          <Icon name="plus" />
        </div>
      </div>
      <div className={`faq-answer ${open ? "open" : ""}`}>
        <p className="pt-3 pb-1 leading-relaxed" style={{ color: "var(--muted)" }}>{a}</p>
      </div>
    </div>
  );
};

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function Home() {
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [statsActive, setStatsActive] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useScrollReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsActive(true); }, { threshold: 0.3 });
    io.observe(statsRef.current);
    return () => io.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) setForm({ name: "", business: "", email: "", phone: "", website: "" });
    } catch { setStatus("error"); }
  };

  const marqueeItems = ["🔥 Restoration Companies", "⚡ Electricians", "🏗️ General Contractors", "🚗 Auto Repair Shops", "🏊 Pool Builders", "💆 Med Spas", "🔧 Plumbers", "🌿 Landscapers"];
  const results = [
    "62% More Leads in Month 1", "AI Bot Active 24/7", "14-Day Delivery Guaranteed", "$0 After-Hours Calls Missed",
    "Sub-2s Mobile Load Time", "Local SEO Included", "No Long-Term Contracts", "Stripe Payments Built In",
  ];

  const caseStudies = [
    {
      niche: "🔥 Restoration", co: "Alpine Restoration Co.", city: "Lakewood, CO",
      before: { score: 24, issues: ["2016 Wix site", "No mobile", "Gmail contact", "No intake form"], monthlyLeads: 2 },
      after: { score: 91, wins: ["AI bot captures leads 24/7", "8 emergency inquiries in week 1", "Online intake pre-qualifies jobs"], monthlyLeads: 19 },
      quote: "The AI chat captured a $14,000 job at 2am that we would have missed completely.",
      person: "Marcus T., Owner",
    },
    {
      niche: "⚡ Electrical", co: "Front Range Electric", city: "Arvada, CO",
      before: { score: 31, issues: ["2018 WordPress", "0/100 mobile speed", "No booking", "No reviews widget"], monthlyLeads: 3 },
      after: { score: 88, wins: ["Online booking brought 2 commercial contracts", "Google reviews embedded", "Top 3 local search ranking"], monthlyLeads: 16 },
      quote: "Two commercial clients came through the website in the first week. The site pays for itself every month.",
      person: "Kevin R., Owner",
    },
    {
      niche: "🏗️ Contracting", co: "Summit Pro Builders", city: "Aurora, CO",
      before: { score: 19, issues: ["No portfolio", "Table-based layout", "Loads in 9s on mobile", "No project gallery"], monthlyLeads: 1 },
      after: { score: 93, wins: ["Project gallery converts browsers to callers", "AI bot pre-qualifies $30k+ jobs", "$62k in tracked site revenue in 60 days"], monthlyLeads: 12 },
      quote: "Clients show up to the first call already sold. The site does the qualifying for me.",
      person: "David M., Owner",
    },
  ];

  const testimonials = [
    { quote: "In September we got 2 web leads all month. By November — two weeks after launch — we got 19. The AI bot captured a $14,000 flood job at 2am on a Saturday. I woke up to the lead in my inbox. Didn’t even know it happened.", name: "Marcus T.", title: "Owner, Alpine Restoration Co.", location: "Lakewood, CO", stars: 5 },
    { quote: "My old site was embarrassing and I knew it. Three weeks after the new site went live, two commercial contracts came through the contact form — jobs I never would have gotten from referrals alone. The retainer pays for itself twice over every month.", name: "Kevin R.", title: "Owner, Front Range Electric", location: "Arvada, CO", stars: 5 },
    { quote: "Clients show up to the first meeting already sold. They’ve seen the project gallery, talked to the AI bot, and they already trust us before I say a word. It completely changed how we close.", name: "David M.", title: "Owner, Summit Pro Builders", location: "Aurora, CO", stars: 5 },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg" : "bg-transparent"}`} style={{ borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "var(--muted)" }}>
            {["Services", "Results", "Process", "Pricing", "FAQ"].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-white transition-colors">{s}</a>
            ))}
          </div>
          <a href="#contact" className="btn-primary px-5 py-2.5 rounded-full text-sm font-semibold text-white">
            Free Assessment →
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 px-5 overflow-hidden">
        {/* background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #7c6aff, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, #60a5fa, transparent 70%)", filter: "blur(60px)" }} />
        </div>

        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <div>
              <div className="chip mb-7" style={{ animationDelay: "0.1s" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                Accepting new clients — Denver Metro
              </div>
              <h1 className="display font-bold leading-[1.08] mb-6" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}>
                Your website is
                <br />
                <span className="gradient-text">losing you jobs</span>
                <br />
                every single day.
              </h1>
              <p className="text-lg leading-relaxed mb-4" style={{ color: "var(--muted)", maxWidth: 480 }}>
                Right now, someone in your city is Googling your services. They&apos;ll call whoever loads first, looks credible, and has a way to reach them. If that&apos;s not you — that job goes to your competitor. We fix that in 14 days.
              </p>
              {/* social comparison */}
              <div className="flex items-start gap-2.5 mb-8 p-3.5 rounded-xl" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                <span className="text-red-400 flex-shrink-0 mt-0.5" style={{ fontSize: 15 }}>⚠️</span>
                <p className="text-sm" style={{ color: "#fca5a5" }}>The top-ranked restoration company in Denver captures <strong>14+ web leads a month</strong>. The average company on page 2 captures <strong>2</strong>. Same city. Same services. Different website.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a href="#contact" className="btn-primary px-7 py-4 rounded-xl font-bold text-lg text-white text-center">
                  Find Out What My Site Is Costing Me →
                </a>
                <a href="#results" className="btn-ghost px-7 py-4 rounded-xl font-semibold text-white text-center">
                  See Real Results
                </a>
              </div>
              {/* trust strip */}
              <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm justify-between">
                  <span className="flex items-center gap-1.5 font-semibold text-white">47<span style={{ color: "var(--muted)", fontWeight: 400 }}> sites built</span></span>
                  <span className="flex items-center gap-1.5 font-semibold text-white">94%<span style={{ color: "var(--muted)", fontWeight: 400 }}> still clients</span></span>
                  <span className="flex items-center gap-1.5 font-semibold text-white">8×<span style={{ color: "var(--muted)", fontWeight: 400 }}> avg lead increase</span></span>
                  <span className="flex items-center gap-1.5"><span className="text-yellow-400">★★★★★</span><span className="font-semibold text-white"> 4.9</span></span>
                </div>
              </div>
            </div>
            {/* RIGHT — browser mock */}
            <div className="flex justify-center lg:justify-end">
              <BrowserMock />
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE — NICHES ── */}
      <div className="py-5 overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
        <div className="marquee-container">
          <div className="marquee-track animate-marquee">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-3 px-8 text-sm font-medium whitespace-nowrap" style={{ color: "var(--muted)" }}>
                {item} <span style={{ color: "rgba(124,106,255,0.4)" }}>•</span>
              </span>
            ))}
          </div>
          <div className="marquee-track animate-marquee" aria-hidden>
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-3 px-8 text-sm font-medium whitespace-nowrap" style={{ color: "var(--muted)" }}>
                {item} <span style={{ color: "rgba(124,106,255,0.4)" }}>•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── MARQUEE — RESULTS ── */}
      <div className="py-4 overflow-hidden" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(124,106,255,0.04)" }}>
        <div className="marquee-container">
          <div className="marquee-track animate-marquee-slow">
            {[...results, ...results].map((item, i) => (
              <span key={i} className="flex items-center gap-3 px-6 text-xs font-semibold uppercase tracking-widest whitespace-nowrap" style={{ color: "rgba(124,106,255,0.7)" }}>
                <span style={{ color: "rgba(79,195,247,0.5)" }}>◆</span> {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="py-20 px-5" ref={statsRef}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value={50} suffix="+" label="Sites Built & Live" icon="zap" active={statsActive} />
            <StatCard value={14} suffix=" days" label="Average Delivery Time" icon="calendar" active={statsActive} />
            <StatCard value={94} suffix="%" label="Client Retention Rate" icon="star" active={statsActive} />
            <StatCard value={2400000} suffix="" label="Client Revenue Tracked" icon="chart" active={statsActive} />
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* before */}
            <div className="fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
                ❌ What prospects see on your outdated site
              </div>
              <div className="p-6 rounded-2xl" style={{ background: "#0f0f1a", border: "1px solid rgba(239,68,68,0.15)" }}>
                <div className="space-y-4">
                  {[
                    { label: "Mobile Speed", score: 22, max: 100, color: "#ef4444" },
                    { label: "Visual Design", score: 15, max: 100, color: "#ef4444" },
                    { label: "Lead Capture", score: 5, max: 100, color: "#ef4444" },
                    { label: "Local SEO", score: 20, max: 100, color: "#f59e0b" },
                  ].map(({ label, score, max, color }) => (
                    <div key={label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span style={{ color: "var(--muted)" }}>{label}</span>
                        <span style={{ color }}>{score}/{max}</span>
                      </div>
                      <div className="score-bar">
                        <div className="score-fill" style={{ width: `${(score / max) * 100}%`, background: color }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <p className="text-sm" style={{ color: "#f87171" }}>Result: 78% of mobile visitors bounce before the page loads. Every bounce is a missed call.</p>
                </div>
              </div>
            </div>
            {/* after */}
            <div className="fade-up delay-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "#4ade80" }}>
                ✅ What a Meridian Digital hub delivers
              </div>
              <div className="p-6 rounded-2xl" style={{ background: "#0f0f1a", border: "1px solid rgba(34,197,94,0.15)" }}>
                <div className="space-y-4">
                  {[
                    { label: "Mobile Speed", score: 94, max: 100, color: "#22c55e" },
                    { label: "Visual Design", score: 97, max: 100, color: "#22c55e" },
                    { label: "Lead Capture", score: 100, max: 100, color: "#22c55e" },
                    { label: "Local SEO", score: 91, max: 100, color: "#22c55e" },
                  ].map(({ label, score, max, color }) => (
                    <div key={label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span style={{ color: "var(--muted)" }}>{label}</span>
                        <span style={{ color }}>{score}/{max}</span>
                      </div>
                      <div className="score-bar">
                        <div className="score-fill" style={{ width: `${(score / max) * 100}%`, background: color }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <p className="text-sm" style={{ color: "#4ade80" }}>Result: Loads in 1.4s on mobile. AI bot captures leads 24/7. One job covers the cost.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 px-5" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <div className="chip mx-auto mb-5">What&apos;s Included</div>
            <h2 className="display font-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Not just a website.<br />A full revenue system.
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
              Every hub is built with the same goal: make your phone ring and your calendar fill up — without you having to lift a finger.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "⚡", title: "Speed-First Build", sub: "Sub-2s mobile load", desc: "Built on Next.js and deployed on enterprise CDN. Google rewards fast sites. Your competitors on Wix are paying for it in rankings." },
              { icon: "🤖", title: "AI Lead-Capture Bot", sub: "24/7 intake, never sleeps", desc: "A trained AI assistant answers questions, qualifies leads, and captures contact details — at 2am on a Saturday, when your competitors' phones go to voicemail." },
              { icon: "📅", title: "Online Scheduling", sub: "Jobs booked automatically", desc: "Customers book directly from your site. Appointments hit your calendar. No phone tag, no back-and-forth — just booked jobs." },
              { icon: "🔍", title: "Local SEO Foundation", sub: "Built to rank", desc: "Schema markup, Google Business integration, local keyword structure, and review embeds — all built in from day one, not bolted on later." },
              { icon: "📊", title: "Analytics Dashboard", sub: "Know your numbers", desc: "See exactly how many visits, where they came from, which pages convert, and how many leads your AI bot captured. Real data, not guesses." },
              { icon: "🔄", title: "Ongoing Updates", sub: "Included in retainer", desc: "New service? Seasonal promo? Price change? Send us a message and it&apos;s live within 24 hours. Your site stays current without touching it yourself." },
              { icon: "📱", title: "Review & Text Engine", sub: "Add-on: +$250/mo", desc: "After every job, your customer gets an automated text asking for a Google review. Missed a call? They get a text-back instantly. 2-way SMS inbox included." },
              { icon: "🎯", title: "Lead Machine", sub: "Add-on: +$400/mo", desc: "We build and run automated outreach to your referral sources — insurance adjusters, property managers, contractors. The businesses that send you jobs, on autopilot." },
            ].map((s, i) => (
              <div key={s.title} className={`glass glass-hover rounded-2xl p-6 fade-up delay-${i + 1}`}>
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="display font-semibold text-white mb-0.5">{s.title}</div>
                <div className="text-xs font-medium mb-3 gradient-text">{s.sub}</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS / CASE STUDIES ── */}
      <section id="results" className="py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <div className="chip mx-auto mb-5">Real Results</div>
            <h2 className="display font-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              What happens when a service business<br />
              <span className="gradient-text">upgrades their digital presence.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <div key={cs.co} className={`glass rounded-2xl overflow-hidden fade-up delay-${i + 1}`} style={{ border: "1px solid var(--border)" }}>
                <div className="p-5" style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid var(--border)" }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>{cs.niche}</span>
                    <span className="text-xs" style={{ color: "var(--muted)" }}>{cs.city}</span>
                  </div>
                  <div className="display font-bold text-white">{cs.co}</div>
                </div>
                <div className="p-5 space-y-5">
                  {/* before */}
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#f87171" }}>Before</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#f87171" }}>{cs.before.score}</div>
                      <div>
                        <div className="text-xs font-medium" style={{ color: "var(--muted)" }}>PageSpeed Mobile</div>
                        <div className="score-bar w-20 mt-1"><div className="score-fill" style={{ width: `${cs.before.score}%`, background: "#ef4444" }} /></div>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-xs" style={{ color: "var(--muted)" }}>Monthly leads</div>
                        <div className="font-bold text-lg" style={{ color: "#f87171" }}>{cs.before.monthlyLeads}</div>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {cs.before.issues.map(iss => (
                        <li key={iss} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted)" }}>
                          <span style={{ color: "#f87171" }}>✕</span> {iss}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* after */}
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#4ade80" }}>After</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#4ade80" }}>{cs.after.score}</div>
                      <div>
                        <div className="text-xs font-medium" style={{ color: "var(--muted)" }}>PageSpeed Mobile</div>
                        <div className="score-bar w-20 mt-1"><div className="score-fill" style={{ width: `${cs.after.score}%`, background: "#22c55e" }} /></div>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-xs" style={{ color: "var(--muted)" }}>Monthly leads</div>
                        <div className="font-bold text-lg" style={{ color: "#4ade80" }}>{cs.after.monthlyLeads}</div>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {cs.after.wins.map(w => (
                        <li key={w} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted)" }}>
                          <span style={{ color: "#4ade80" }}>✓</span> {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* quote */}
                  <blockquote className="pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                    <p className="text-sm italic mb-2 leading-relaxed" style={{ color: "var(--text)" }}>&ldquo;{cs.quote}&rdquo;</p>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>— {cs.person}</p>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-24 px-5" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <div className="chip mx-auto mb-5">How It Works</div>
            <h2 className="display font-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>Live in 14 days. Zero headaches.</h2>
            <p style={{ color: "var(--muted)" }}>We&apos;ve done this enough times to have it down to a science.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: "01", icon: "🔍", title: "Free Assessment", desc: "We analyze your current site in 24 hours. You get a full breakdown of exactly what's costing you leads." },
              { n: "02", icon: "🎨", title: "Design & Build", desc: "Your new hub is designed, built, and AI-trained over 10 days. You review it before anything goes live." },
              { n: "03", icon: "🤖", title: "AI Training", desc: "We train your chat bot on your services, prices, and business. It answers like you would — just faster." },
              { n: "04", icon: "🚀", title: "Launch", desc: "We flip the switch. Your new hub goes live, AI bot activates, and you start capturing leads you were losing." },
            ].map((step, i) => (
              <div key={step.n} className={`text-center fade-up delay-${i + 1}`}>
                <div className="relative inline-block mb-5">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-2xl mx-auto">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg,#7c6aff,#4f46e5)", fontFamily: "'Space Grotesk',sans-serif" }}>
                    {step.n.slice(1)}
                  </div>
                </div>
                <div className="display font-semibold text-white mb-2">{step.title}</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 fade-up">
            <div className="chip mx-auto mb-5">Client Stories</div>
            <h2 className="display font-bold" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>Don&apos;t take our word for it.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.name} className={`glass glass-hover rounded-2xl p-7 fade-up delay-${i + 1}`}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <svg key={j} className="w-4 h-4" viewBox="0 0 24 24" fill="#f59e0b"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed mb-5" style={{ color: "var(--text)" }}>&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: "linear-gradient(135deg,#7c6aff,#60a5fa)", fontFamily: "'Space Grotesk',sans-serif" }}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">{t.name}</div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-5" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 fade-up">
            <div className="chip mx-auto mb-5">Pricing</div>
            <h2 className="display font-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>One job covers the cost.</h2>
            <p style={{ color: "var(--muted)" }}>No hidden fees. No surprises. Cancel any month.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {/* Hub */}
            <div className="glass rounded-2xl p-7 fade-up">
              <div className="text-2xl mb-3">🚀</div>
              <div className="display font-bold text-lg text-white mb-0.5">The Hub</div>
              <div className="text-xs mb-3 gradient-text font-medium">Website + AI + SEO</div>
              <div className="display font-bold mb-1" style={{ fontSize: "2rem" }}>$2,500<span className="text-base font-normal" style={{ color: "var(--muted)" }}>+</span></div>
              <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>setup + <span className="text-white font-medium">$500/mo</span></div>
              <div className="my-4" style={{ borderTop: "1px solid var(--border)" }} />
              <ul className="space-y-2 mb-6">
                {["AI chat bot (24/7)", "Online booking", "Mobile-first build", "Local SEO foundation", "Monthly updates"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "var(--text)" }}>
                    <span className="text-violet-400 flex-shrink-0"><Icon name="check" /></span> {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="block w-full btn-ghost py-2.5 rounded-xl text-sm font-semibold text-center text-white">Get Started →</a>
            </div>
            {/* Full Stack */}
            <div className="rounded-2xl p-7 fade-up delay-2 glow" style={{ background: "rgba(124,106,255,0.08)", border: "1px solid rgba(124,106,255,0.35)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">⚡</div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(124,106,255,0.25)", color: "#a78bfa" }}>Most Popular</span>
              </div>
              <div className="display font-bold text-lg text-white mb-0.5">Full Stack</div>
              <div className="text-xs mb-3 gradient-text font-medium">Hub + Lead Machine + Reviews</div>
              <div className="display font-bold mb-1" style={{ fontSize: "2rem" }}>$5,000<span className="text-base font-normal" style={{ color: "var(--muted)" }}>+</span></div>
              <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>setup + <span className="text-white font-medium">$1,200/mo</span></div>
              <div className="my-4" style={{ borderTop: "1px solid rgba(124,106,255,0.2)" }} />
              <ul className="space-y-2 mb-6">
                {["Everything in Hub", "Automated review requests via SMS", "Missed-call text-back", "2-way customer texting", "Outbound referral lead gen", "Monthly performance report"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "var(--text)" }}>
                    <span className="text-violet-400 flex-shrink-0"><Icon name="check" /></span> {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="block w-full btn-primary py-2.5 rounded-xl text-sm font-semibold text-center text-white">Get Started →</a>
            </div>
            {/* Add-ons */}
            <div className="glass rounded-2xl p-7 fade-up delay-3">
              <div className="text-2xl mb-3">🔧</div>
              <div className="display font-bold text-lg text-white mb-0.5">Add-Ons</div>
              <div className="text-xs mb-3" style={{ color: "var(--muted)" }}>Bolt onto any package</div>
              <div className="space-y-3 mb-6">
                <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-white">📱 Review & Text</span>
                    <span className="font-bold text-sm gradient-text">+$250/mo</span>
                  </div>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>Post-job review texts, missed-call text-back, 2-way SMS</p>
                </div>
                <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-white">🎯 Lead Machine</span>
                    <span className="font-bold text-sm gradient-text">+$400/mo</span>
                  </div>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>Automated outreach to insurance adjusters, property managers & referral sources</p>
                </div>
              </div>
              <a href="#contact" className="block w-full btn-ghost py-2.5 rounded-xl text-sm font-semibold text-center text-white">Ask About Add-Ons →</a>
            </div>
          </div>
          <p className="text-center text-sm" style={{ color: "var(--muted)" }}>All packages: 50% upfront, 50% on launch. Month-to-month retainers, cancel any time. Free site assessment before you commit.</p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14 fade-up">
            <div className="chip mx-auto mb-5">FAQ</div>
            <h2 className="display font-bold" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>Questions we hear a lot.</h2>
          </div>
          <div className="fade-up">
            {faqs.map((faq) => <FAQItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-5">
        <div className="max-w-4xl mx-auto rounded-3xl p-12 md:p-16 text-center relative overflow-hidden fade-up" style={{ background: "linear-gradient(135deg, rgba(124,106,255,0.15), rgba(79,195,247,0.08))", border: "1px solid rgba(124,106,255,0.25)" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(124,106,255,0.12), transparent 70%)" }} />
          <div className="relative">
            <h2 className="display font-bold mb-4 text-white" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}>
              Every day your site is slow,<br />you&apos;re handing jobs to your competitor.
            </h2>
            <p className="mb-8 text-lg" style={{ color: "var(--muted)" }}>
              Free assessment. Back to you in 24 hours. We&apos;ll show you exactly how many leads your site is losing and what it takes to fix it.
            </p>
            <a href="#contact" className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white glow">
              Show Me What I&apos;m Missing →
            </a>
            <p className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
              Free. No pitch. Just the data.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 px-5" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12 fade-up">
            <div className="chip mx-auto mb-5">Get Started</div>
            <h2 className="display font-bold mb-3" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)" }}>Find out what your site is costing you.</h2>
            <p style={{ color: "var(--muted)" }}>Tomorrow morning you could know exactly how many leads your site is leaking — and what your business looks like with that fixed.</p>
          </div>

          {/* objection pre-emption */}
          <div className="grid grid-cols-3 gap-3 mb-6 fade-up">
            {[
              { q: "No long commitment?", a: "Month-to-month. Cancel any time." },
              { q: "What if I hate it?", a: "We revise until you’re proud of it." },
              { q: "We’re not tech people.", a: "You won’t touch a line of code. Ever." },
            ].map(({ q, a }) => (
              <div key={q} className="glass rounded-xl p-3 text-center">
                <div className="text-xs font-semibold text-white mb-1">{q}</div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>{a}</div>
              </div>
            ))}
          </div>

          {status === "sent" ? (
            <div className="glass rounded-2xl p-14 text-center fade-up" style={{ border: "1px solid rgba(34,197,94,0.3)" }}>
              <div className="text-5xl mb-4">✅</div>
              <div className="display font-bold text-xl text-white mb-2">You&apos;re in the queue.</div>
              <p style={{ color: "var(--muted)" }}>We&apos;ll review your site and follow up within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-4 fade-up">
              {/* future pacing */}
              <div className="text-center pb-2">
                <p className="text-sm" style={{ color: "var(--muted)" }}>In 24 hours you’ll know exactly what your site is costing you — and what it would look like to fix it.</p>
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "var(--muted)" }}>Your current website URL</label>
                <input type="url" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="https://yoursite.com"
                  className="w-full rounded-xl px-4 py-3 text-white text-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)" }} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "var(--muted)" }}>Your Name *</label>
                  <input required type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Smith"
                    className="w-full rounded-xl px-4 py-3 text-white text-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)" }} />
                </div>
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "var(--muted)" }}>Business Name *</label>
                  <input required type="text" value={form.business} onChange={e => setForm(f => ({ ...f, business: e.target.value }))} placeholder="Smith Restoration Co."
                    className="w-full rounded-xl px-4 py-3 text-white text-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)" }} />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "var(--muted)" }}>Email *</label>
                  <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="john@smithrestoration.com"
                    className="w-full rounded-xl px-4 py-3 text-white text-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)" }} />
                </div>
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "var(--muted)" }}>Phone</label>
                  <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(720) 000-0000"
                    className="w-full rounded-xl px-4 py-3 text-white text-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)" }} />
                </div>
              </div>
              <button type="submit" disabled={status === "sending"}
                className="w-full btn-primary py-4 rounded-xl font-bold text-lg text-white disabled:opacity-50">
                {status === "sending" ? "Running your assessment..." : "Find Out What My Site Is Costing Me →"}
              </button>
              {status === "error" && <p className="text-sm text-center" style={{ color: "#f87171" }}>Something went wrong. Email us at hello@meridiandigital.agency</p>}
              <div className="flex items-center justify-center gap-4 text-xs" style={{ color: "var(--muted)" }}>
                <span>🔒 No spam, ever</span>
                <span>·</span>
                <span>✅ Free, no obligation</span>
                <span>·</span>
                <span>⏰ Back to you in 24 hours</span>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-5 py-14">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <Logo />
              <p className="mt-4 text-sm leading-relaxed max-w-xs" style={{ color: "var(--muted)" }}>
                AI-powered business hubs for service companies. We rebuild outdated websites into revenue-generating machines — in 14 days.
              </p>
              <div className="flex gap-3 mt-5">
                <a href="mailto:hello@meridiandigital.agency" className="flex items-center gap-2 text-sm" style={{ color: "var(--muted)" }}>
                  <span className="text-violet-400"><Icon name="mail" /></span>
                  hello@meridiandigital.agency
                </a>
              </div>
            </div>
            <div>
              <div className="display font-semibold text-white text-sm mb-4">Services</div>
              <ul className="space-y-2.5 text-sm" style={{ color: "var(--muted)" }}>
                {["AI-Powered Design", "Lead Capture Bot", "Online Scheduling", "Local SEO", "Monthly Retainer"].map(s => (
                  <li key={s}><a href="#services" className="hover:text-white transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="display font-semibold text-white text-sm mb-4">We Serve</div>
              <ul className="space-y-2.5 text-sm" style={{ color: "var(--muted)" }}>
                {["Restoration Companies", "Electricians", "General Contractors", "Auto Repair Shops", "Pool Builders", "Med Spas"].map(s => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-6" style={{ borderTop: "1px solid var(--border)" }}>
            <p className="text-sm" style={{ color: "var(--muted)" }}>© 2025 Meridian Digital. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm" style={{ color: "var(--muted)" }}>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
