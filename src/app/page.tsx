"use client";
import { useState } from "react";

const Logo = () => (
  <div className="flex items-center gap-2.5">
    <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="url(#logo-grad)"/>
      <path d="M8 22L13 10L16 18L19 13L22 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="24" cy="10" r="2" fill="#4fc3f7"/>
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c6aff"/>
          <stop offset="1" stopColor="#5c4ae0"/>
        </linearGradient>
      </defs>
    </svg>
    <span className="font-bold text-xl tracking-tight text-white">Meridian<span className="gradient-text">Digital</span></span>
  </div>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-violet-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowRight = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function Home() {
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", business: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const problems = [
    "Customers check your site and leave in 3 seconds",
    "You're invisible on mobile (60%+ of searches)",
    "No after-hours lead capture — calls go to voicemail",
    "Competitors with better sites are stealing your jobs",
  ];

  const services = [
    {
      icon: "⚡",
      title: "Speed-First Redesign",
      desc: "Sub-2s load times on mobile. Google rewards fast sites with better rankings. Your competitors are still on 8s loads.",
    },
    {
      icon: "🤖",
      title: "AI Lead-Capture Bot",
      desc: "A trained AI assistant answers questions, qualifies leads, and collects contact info 24/7 — even at 2am when you're asleep.",
    },
    {
      icon: "📅",
      title: "Automated Scheduling",
      desc: "Customers book directly from your site. No phone tag, no back-and-forth. Jobs show up in your calendar automatically.",
    },
    {
      icon: "🔍",
      title: "Local SEO Foundation",
      desc: "Schema markup, Google Business integration, and review embeds built in. Be the first result when locals search for you.",
    },
    {
      icon: "📊",
      title: "Live Analytics Dashboard",
      desc: "See exactly how many people visited, where they came from, and which pages convert. No more guessing.",
    },
    {
      icon: "🔄",
      title: "Ongoing Updates Included",
      desc: "Your site stays fresh with your retainer. Promotions, new services, seasonal pages — we handle it, you focus on the work.",
    },
  ];

  const steps = [
    { num: "01", title: "Free Audit", desc: "We analyze your current site and identify exactly what's costing you customers." },
    { num: "02", title: "Custom Build", desc: "Your new AI-powered hub is live in 14 days or less. Zero downtime, zero headaches." },
    { num: "03", title: "Launch & Grow", desc: "We flip the switch. You start capturing leads you were previously losing." },
  ];

  const niches = [
    { name: "HVAC & Plumbing", emoji: "🔧" },
    { name: "Law Firms", emoji: "⚖️" },
    { name: "Dental Practices", emoji: "🦷" },
    { name: "Auto Repair", emoji: "🚗" },
    { name: "General Contractors", emoji: "🏗️" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#process" className="hover:text-white transition-colors">Process</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <a
            href="#contact"
            className="btn-primary px-5 py-2 rounded-full text-sm font-semibold text-white"
          >
            Get Free Audit
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-cyan-900/10 pointer-events-none" />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-violet-300 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            AI-Powered Websites for Service Businesses
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Your website is
            <br />
            <span className="gradient-text">losing you money.</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            We transform outdated business websites into AI-powered hubs that capture leads, book appointments, and grow revenue — automatically, 24/7.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn-primary px-8 py-4 rounded-xl font-bold text-lg text-white flex items-center justify-center gap-2 glow">
              Get Your Free Site Audit <ArrowRight />
            </a>
            <a href="#services" className="glass px-8 py-4 rounded-xl font-semibold text-gray-300 hover:text-white transition-colors">
              See What We Build
            </a>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>✓ 14-day delivery</span>
            <span>✓ No long-term contracts</span>
            <span>✓ AI included from day one</span>
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-gray-500 text-sm mb-6 uppercase tracking-widest">Built for service businesses</p>
          <div className="flex flex-wrap justify-center gap-4">
            {niches.map((n) => (
              <div key={n.name} className="glass px-5 py-2.5 rounded-full text-gray-300 text-sm flex items-center gap-2">
                <span>{n.emoji}</span> {n.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">The Problem</p>
              <h2 className="text-4xl font-extrabold mb-6 leading-tight">
                An outdated site is a<br /><span className="gradient-text">silent revenue leak.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Every day your website is slow, broken on mobile, or missing AI features — you&apos;re handing jobs to competitors who&apos;ve made the upgrade. Most business owners don&apos;t even know it&apos;s happening.
              </p>
              <div className="space-y-4">
                {problems.map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs">✕</span>
                    </div>
                    <span className="text-gray-300">{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-8 glow">
              <h3 className="font-bold text-lg mb-6 text-violet-300">With a Meridian Digital Hub:</h3>
              <div className="space-y-4">
                {[
                  "Loads in under 2 seconds on any device",
                  "AI bot captures leads around the clock",
                  "Customers book jobs directly — no phone tag",
                  "Ranks higher in local Google searches",
                  "You see real stats — visits, leads, conversions",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">What You Get</p>
            <h2 className="text-4xl font-extrabold mb-4">Everything in one hub.</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Not just a website. A full AI-powered business engine built to convert visitors into paying customers.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="glass rounded-2xl p-6 hover:border-violet-500/30 transition-all group">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-violet-300 transition-colors">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">Simple Pricing</p>
            <h2 className="text-4xl font-extrabold">One job covers the cost.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-8 border border-white/10">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="font-bold text-xl mb-2">Setup</h3>
              <div className="text-4xl font-extrabold mb-2">$2,500<span className="text-lg text-gray-400 font-normal">–$4,000</span></div>
              <p className="text-gray-400 text-sm mb-6">One-time investment. Delivered in 14 days.</p>
              <ul className="space-y-3 text-sm">
                {["Full custom design", "AI chat integration", "Booking system", "Mobile & speed optimized", "SEO foundation"].map(i => (
                  <li key={i} className="flex items-center gap-2 text-gray-300"><CheckIcon /> {i}</li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-8 border border-violet-500/40 glow">
              <div className="text-3xl mb-4">🔄</div>
              <h3 className="font-bold text-xl mb-2">Monthly Retainer</h3>
              <div className="text-4xl font-extrabold mb-2">$500<span className="text-lg text-gray-400 font-normal">/mo</span></div>
              <p className="text-gray-400 text-sm mb-6">Ongoing management and growth.</p>
              <ul className="space-y-3 text-sm">
                {["Unlimited content updates", "AI bot training & tuning", "Monthly performance reports", "Priority support", "Seasonal promotions"].map(i => (
                  <li key={i} className="flex items-center gap-2 text-gray-300"><CheckIcon /> {i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">How It Works</p>
            <h2 className="text-4xl font-extrabold">Live in 14 days.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.num} className="text-center relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-violet-500/40 to-transparent" />
                )}
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-extrabold gradient-text">
                  {s.num}
                </div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-12 text-center border border-violet-500/20 glow relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-cyan-600/5 pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 relative">
            Find out what your site is costing you.
          </h2>
          <p className="text-gray-400 mb-8 relative">Free audit. No obligation. We&apos;ll show you exactly what&apos;s broken and what it&apos;s worth to fix it.</p>
          <a href="#contact" className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white glow">
            Get My Free Audit <ArrowRight />
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">Let&apos;s Talk</p>
            <h2 className="text-4xl font-extrabold mb-4">Get your free audit.</h2>
            <p className="text-gray-400">Tell us about your business. We&apos;ll review your current site and come back with a real assessment — no fluff, no hard sell.</p>
          </div>
          
          {status === "sent" ? (
            <div className="glass rounded-2xl p-12 text-center border border-green-500/30">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-bold text-xl mb-2">You&apos;re on the list.</h3>
              <p className="text-gray-400">We&apos;ll review your site and be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Your Name *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="John Smith"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Business Name *</label>
                  <input
                    required
                    type="text"
                    value={form.business}
                    onChange={e => setForm(f => ({ ...f, business: e.target.value }))}
                    placeholder="Smith HVAC & Cooling"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="john@smithhvac.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="(555) 000-0000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Your website URL</label>
                <input
                  type="url"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="https://yoursite.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full btn-primary py-4 rounded-xl font-bold text-lg text-white disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Request My Free Audit →"}
              </button>
              {status === "error" && (
                <p className="text-red-400 text-sm text-center">Something went wrong. Email us directly at hello@meridiandigital.agency</p>
              )}
              <p className="text-gray-600 text-xs text-center">No spam. No hard sell. Just an honest assessment.</p>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo />
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#process" className="hover:text-white transition-colors">Process</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <a href="mailto:hello@meridiandigital.agency" className="hover:text-white transition-colors">hello@meridiandigital.agency</a>
          </div>
          <p className="text-gray-600 text-sm">© 2025 Meridian Digital. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
