import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { MonitorPlay, Server, Terminal, Rocket, Github, Linkedin, Mail, ExternalLink, Menu, X, Cpu, Brain, Database, Quote, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import joboBg from './assets/jobo-align.png';
import alphaSyncBg from './assets/alpha-sync.png';
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Component
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.15, ease: 'power2.out' });
    const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.15, ease: 'power2.out' });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);
  return (
    <div ref={cursorRef} className="fixed top-0 left-0 w-6 h-6 rounded-full border border-accent1 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 bg-accent1/10 hidden md:block" />
  );
};

// Sticky Navbar
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = ['Home', 'About', 'Projects', 'Services', 'Pricing', 'Testimonials', 'Contact'];
  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-card bg-background/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-end items-center">
        <div className="hidden md:flex gap-6">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium hover:text-accent1 transition-colors">{link}</a>
          ))}
        </div>
        <button className="md:hidden text-textMain" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden bg-card/90 backdrop-blur-lg overflow-hidden">
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="block px-6 py-4 border-b border-background/20 text-sm hover:text-accent1">{link}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const timer = setTimeout(() => setLoading(false), 2000);
    return () => {
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <div className="orb-purple"></div>
      <div className="orb-teal"></div>

      <AnimatePresence>
        {loading ? (
          <motion.div key="loader" exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.8 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
            <motion.div animate={{ rotate: 360, scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-16 h-16 border-4 border-t-accent1 border-r-accentPurple border-b-transparent border-l-transparent rounded-full" />
          </motion.div>
        ) : (
          <main className="relative w-full overflow-x-clip pt-20">
            <Navbar />
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <ProjectsSection />
            <PricingSection />
            <TestimonialSection />
            <ContactSection />
          </main>
        )}
      </AnimatePresence>
    </>
  );
};

// HERO SECTION (GSAP Intro & Bento UI)
const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gsap-fade-up",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".gsap-img-scale",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative z-10 pt-32 pb-20 px-6 min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Content */}
        <div className="lg:col-span-7 space-y-8">
          <div className="gsap-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent1/10 border border-accent1/20 shadow-[0_0_15px_rgba(102,252,241,0.15)]">
            <span className="w-2 h-2 rounded-full bg-accent1 animate-pulse"></span>
            <span className="text-accent1 font-mono text-xs uppercase tracking-widest font-medium">Available for new opportunities</span>
          </div>

          <div className="space-y-4">
            <h2 className="gsap-fade-up text-textMuted font-mono text-sm uppercase tracking-[0.3em]">Full Stack Developer</h2>
            <h1 className="gsap-fade-up text-6xl md:text-8xl font-heading font-extrabold tracking-tighter leading-[0.9] text-textMain">
              Aman<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent1 to-accentPurple"> Kumar</span>
            </h1>
          </div>

          <p className="gsap-fade-up text-xl md:text-2xl text-textMuted max-w-2xl leading-relaxed">
            Building <span className="text-white font-semibold">scalable</span>, <span className="text-white font-semibold">high-performance</span> digital experiences. Translating complex technical requirements into elegant user-centric solutions.
          </p>

          <div className="gsap-fade-up flex flex-wrap gap-4 pt-4">
            <motion.a href="#projects" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-8 py-4 bg-gradient-to-br from-accent1 to-accent2 text-background rounded-xl font-heading font-bold text-lg shadow-[0_10px_30px_-10px_rgba(102,252,241,0.4)] block">
              View Projects
            </motion.a>
            <motion.a href="#footer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-8 py-4 bg-card/50 backdrop-blur-md border border-accent1/20 text-accent1 rounded-xl font-heading font-bold text-lg hover:bg-card transition-all block">
              Hire Me
            </motion.a>
          </div>

          {/* Tech Stack Minimalist Display */}
          <div className="gsap-fade-up pt-12 flex flex-col gap-4">
            <span className="text-textMuted font-mono text-[10px] uppercase tracking-widest">Featured Stack</span>
            <div className="flex flex-wrap gap-3">
              {['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker'].map((tech) => (
                <div key={tech} className="px-4 py-1.5 bg-card/80 rounded-full border border-white/5 text-textMuted font-mono text-xs hover:text-accent1 transition-colors hover:border-accent1/30 cursor-default">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Visual / Asymmetric Bento Preview */}
        <div className="lg:col-span-5 relative mt-12 lg:mt-0">
          <div className="relative grid grid-cols-2 gap-4">
            {/* Main Image Frame - gsap-img-scale */}
            <div className="gsap-img-scale col-span-2 aspect-[4/3] rounded-2xl overflow-hidden bg-card/80 group relative border border-white/5 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10"></div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKBVUzKXj8_7V177C-S4og-jHWSOi0mI_OL1J9KBybGEQFSRjcM4Xy-PZq_VaVQMeoQGaFTto-B5iz8xKAgQw_Gzmyb5Me2_vfXB3mhLUHStEuhG4kN02XZ53vkdUAGGpZPdW96sO1Fgjhdetj25Grr_1U6LdLxtEurB-hdfG5MWshjPQH0Bx8A0tHEeBWvLooDyjE8mXCtT4x_jwiaSz-ff6h_HqKUULVv5LanpxHUAxupDbkGKT9cz53tmjUms3MG24k7vE7Qy3k"
                alt="Workspace preview"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <span className="font-mono text-[10px] text-accent1 uppercase tracking-[0.2em] block mb-1">Latest Mission</span>
                <h3 className="text-white font-heading font-bold text-xl">Cloud Architect v2.0</h3>
              </div>
            </div>

            {/* Side Stats */}
            <motion.div whileHover={{ scale: 1.02, borderColor: "rgba(102,252,241,0.3)" }} className="gsap-img-scale aspect-square bg-card/60 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center border border-white/5 group transition-colors shadow-lg">
              <span className="text-4xl md:text-5xl font-heading font-black text-textMain group-hover:text-accent1 transition-colors delay-75">05+</span>
              <span className="font-mono text-[10px] text-textMuted uppercase tracking-widest mt-2 text-center px-2">Years Experience</span>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02, borderColor: "rgba(187,134,252,0.3)" }} className="gsap-img-scale aspect-square bg-card/60 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center border border-white/5 group transition-colors shadow-lg">
              <div className="relative flex items-center justify-center">
                <Terminal className="text-accentPurple w-10 h-10 relative z-10" />
                <div className="absolute inset-0 bg-accentPurple/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
              </div>
              <span className="font-mono text-[10px] text-textMuted uppercase tracking-widest mt-4 text-center px-2">10+ Deploys</span>
            </motion.div>
          </div>

          {/* Floating Abstract Element */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="gsap-img-scale absolute -top-8 -right-8 w-28 h-28 bg-accent1/10 backdrop-blur-2xl rounded-full border border-accent1/20 flex flex-col items-center justify-center z-30"
          >
            <Rocket className="text-accent1 w-10 h-10" />
            <span className="text-[9px] uppercase font-bold text-accent1 tracking-widest mt-1">Verified</span>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

// ABOUT / IDENTITY SECTION (Framer Motion)
const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <h3 className="text-accentPurple font-mono text-xs uppercase tracking-[0.3em] mb-4">The Identity</h3>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-textMain tracking-tight">Engineering Digital Mastery</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Core Philosophy Block */}
        <motion.div whileHover={{ scale: 1.01 }} className="md:col-span-8 bg-card/60 rounded-2xl p-10 lg:p-14 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent1/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <Terminal className="text-accent1/20 w-16 h-16 absolute top-8 right-10" />
          <h3 className="text-3xl font-heading font-bold text-white mb-6">Architecture meets Aesthetics</h3>
          <p className="text-textMuted text-lg leading-relaxed max-w-xl mb-8">
            As a full stack engineer, my mandate isn't just to write code that works, but to sculpt resilient digital infrastructures that command attention. By fusing robust backend systems with fluid, pixel-perfect frontends, I forge platforms that scale securely while offering unparalleled user experiences.
          </p>
          <div className="flex flex-col gap-3 mt-2">
            <span className="text-textMuted font-mono text-[10px] uppercase tracking-widest">Core Tech Stack</span>
            <div className="flex flex-wrap gap-3">
              {['React / Next.js', 'Angular', 'Node.js / Express', 'Python Flask', 'PostgreSQL', 'Docker', 'AWS Cloud'].map(skill => (
                <span key={skill} className="px-4 py-2 bg-background/50 rounded-full border border-white/5 text-xs font-mono text-accent1 hover:bg-accent1/10 hover:text-white transition-colors cursor-default">{skill}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Identity Stats / Details */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <motion.div whileHover={{ scale: 1.02 }} className="flex-1 bg-card/60 rounded-2xl p-8 border border-white/5 hover:border-accent2/30 transition-all flex flex-col justify-between group">
            <Server className="w-8 h-8 text-accent2 mb-6" />
            <h4 className="text-xl font-heading font-bold text-white mb-2">Backend Tenets</h4>
            <p className="text-textMuted text-sm leading-relaxed">
              Resilient services deployed over containerized clusters. Zero-downtime microservices driven by Node.
            </p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="flex-1 bg-card/60 rounded-2xl p-8 border border-white/5 hover:border-accentPurple/30 transition-all flex flex-col justify-between group">
            <MonitorPlay className="w-8 h-8 text-accentPurple mb-6" />
            <h4 className="text-xl font-heading font-bold text-white mb-2">Frontend Ethos</h4>
            <p className="text-textMuted text-sm leading-relaxed">
              Declarative UI. State-driven animations. Creating DOM structures that react with fluidity.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// SERVICES SECTION
const ServicesSection = () => {
  return (
    <section id="services" className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Services Header */}
      <div className="mb-20 text-center relative">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent1/10 blur-[120px] rounded-full pointer-events-none"></div>
        <p className="font-mono text-accentPurple text-xs uppercase tracking-[0.3em] mb-4">The Infrastructure of Excellence</p>
        <h2 className="font-heading text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-textMain">Scalable <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent1 to-accentPurple">Ecosystems</span></h2>
        <p className="font-sans text-textMuted max-w-2xl mx-auto text-lg leading-relaxed">We don't just write code. We architect future-proof digital environments tailored for performance and scale.</p>
      </div>

      {/* Services Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Web Dev */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="md:col-span-8 bg-card/40 backdrop-blur-md p-10 rounded-[2rem] border border-white/5 group hover:bg-card/60 transition-all duration-500 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 p-8">
            <Terminal className="text-accent1 w-16 h-16 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
          </div>
          <div className="relative z-10">
            <span className="inline-block px-4 py-1 bg-accent1/10 text-accent1 border border-accent1/20 rounded-full font-mono text-xs tracking-widest uppercase mb-6">Architecture</span>
            <h3 className="font-heading text-3xl font-bold mb-4 text-textMain">Web Development</h3>
            <p className="font-sans text-textMuted max-w-md text-lg">Next-generation interfaces built with React, Next.js, and cutting-edge frontend paradigms. Seamless, fluid, and responsive by design.</p>
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <span className="px-3 py-1 bg-accentPurple/10 border border-accentPurple/20 text-accentPurple rounded-full font-mono text-xs uppercase">ReactJs</span>
            <span className="px-3 py-1 bg-accentPurple/10 border border-accentPurple/20 text-accentPurple rounded-full font-mono text-xs uppercase">Angular</span>
            <span className="px-3 py-1 bg-accentPurple/10 border border-accentPurple/20 text-accentPurple rounded-full font-mono text-xs uppercase">Tailwind</span>
          </div>
        </motion.div>

        {/* API Dev */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.1 }} className="md:col-span-4 bg-card/60 backdrop-blur-md p-8 rounded-[2rem] border border-white/5 flex flex-col justify-between hover:border-accent1/30 transition-all duration-500 shadow-lg">
          <div>
            <div className="w-12 h-12 rounded-xl bg-accent2/10 flex items-center justify-center mb-6">
              <Server className="text-accent2 w-6 h-6" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3 text-textMain">API Development</h3>
            <p className="font-sans text-textMuted text-sm leading-relaxed">Robust, type-safe backend systems and GraphQL/REST architectures that power complex data flows.</p>
          </div>
          <div className="mt-8">
            <div className="h-[2px] w-full bg-white/5 mb-4"></div>
            <div className="flex flex-wrap gap-4">
              <span className="px-3 py-1 bg-accentPurple/10 border border-accentPurple/20 text-accentPurple rounded-full font-mono text-xs uppercase">Flask</span>
              <span className="px-3 py-1 bg-accentPurple/10 border border-accentPurple/20 text-accentPurple rounded-full font-mono text-xs uppercase">Express</span>
            </div>
          </div>
        </motion.div>

        {/* Fine Tuning */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.2 }} className="md:col-span-4 bg-card/60 backdrop-blur-md p-8 rounded-[2rem] border border-white/5 flex flex-col justify-between hover:border-accentPurple/30 transition-all duration-500 shadow-lg">
          <div>
            <div className="w-12 h-12 rounded-xl bg-accentPurple/10 flex items-center justify-center mb-6">
              <Brain className="text-accentPurple w-6 h-6" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3 text-textMain">Model Fine-Tuning</h3>
            <p className="font-sans text-textMuted text-sm leading-relaxed">Specialized adaptation of LLMs and Computer Vision models to your proprietary datasets.</p>
          </div>
          <div className="mt-8">
            <div className="h-[2px] w-full bg-white/5 mb-4"></div>
            <p className="font-mono text-[10px] text-accentPurple/70 uppercase tracking-widest">Tech: LoRA, QLoRA, PyTorch</p>
          </div>
        </motion.div>

        {/* Automation */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.3 }} className="md:col-span-4 bg-card/80 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] flex flex-col items-center text-center justify-center relative group overflow-hidden shadow-lg hover:border-accentPurple/30 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-b from-accentPurple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <Cpu className="text-accentPurple w-16 h-16 mb-6 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500" />
          <h3 className="font-heading text-2xl font-bold mb-3 text-textMain relative z-10">Automation</h3>
          <p className="font-sans text-textMuted text-sm relative z-10">Automate repetitive workflows and deploy AI-driven processing pipelines.</p>
        </motion.div>

        {/* Infrastructure */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.4 }} className="md:col-span-4 bg-card/60 backdrop-blur-md p-8 rounded-[2rem] border border-white/5 flex flex-col justify-between hover:border-accent1/30 transition-all duration-500 shadow-lg">
          <div>
            <div className="w-12 h-12 rounded-xl bg-accent1/10 flex items-center justify-center mb-6">
              <Database className="text-accent1 w-6 h-6" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3 text-textMain">Infrastructure</h3>
            <p className="font-sans text-textMuted text-sm leading-relaxed">Scaling databases and managing containerized microservices across cloud environments.</p>
          </div>
          <div className="mt-8">
            <div className="h-[2px] w-full bg-white/5 mb-4"></div>
            <p className="font-mono text-[10px] text-accent1/70 uppercase tracking-widest">Stack: AWS, Docker, Kubernetes</p>
          </div>
        </motion.div>

        {/* Custom Software */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.5 }} className="md:col-span-12 bg-card/40 backdrop-blur-md p-10 rounded-[2rem] border border-white/5 relative group hover:shadow-[0_0_40px_rgba(102,252,241,0.1)] hover:border-accent1/20 transition-all duration-500 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center gap-10 relative z-10">
            <div className="flex-1">
              <h3 className="font-heading text-3xl font-bold mb-4 text-textMain">Custom Software</h3>
              <p className="font-sans text-textMuted text-lg">Tailor-made solutions designed for specific enterprise needs, from ERPs to niche data visualizations.</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3 text-sm text-textMuted font-sans">
                  <span className="w-5 h-5 rounded-full bg-accent2/20 flex items-center justify-center text-accent2 text-xs">✓</span> Scalable Infrastructure
                </li>
                <li className="flex items-center gap-3 text-sm text-textMuted font-sans">
                  <span className="w-5 h-5 rounded-full bg-accent2/20 flex items-center justify-center text-accent2 text-xs">✓</span> Enterprise-grade Security
                </li>
              </ul>
            </div>
            <div className="w-full md:w-64 h-48 rounded-xl bg-background border border-white/5 overflow-hidden relative">
              <div className="absolute inset-0 bg-accent1/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500"></div>
              <img alt="Software Architecture" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALWoOMck1juPMFmK_bZ7Eue0kvFlngJ6NuAEIuoFhmgjvWvZP1-_GDsJ7zIlaqGafVAGAxU7BsInnWJ5bAZMK9yccKCjUtKq4FXfMd0lLx_duLznStqvbigjO7ynDuUlYk1MScncGJqy_8_LYqhMwXqk1aaUwjeqP5bwRzHWkYS_oq0pwwN1R5gZL1vcjxpbPLKDSJwzXIqaRQRCRRyXOzjPktW7E84uZ0fpQK2-QsXCP5qQriO3RV07GPiFTDuePzOU-JduS62iMi" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// PROJECTS SECTION
const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const projects = [
    {
      title: "Jobo Align",
      desc: "A smart resume tailoring platform that analyzes job descriptions and customizes resumes to match role-specific requirements, improving relevance and increasing chances of selection.",
      tech: ["Angular", "Python"],
      link: "https://joboalign-frontend.onrender.com/",
      img: joboBg,
      color: "from-background via-background/60",
      neonBorder: "border-accent1/60 shadow-[0_0_20px_rgba(102,252,241,0.2)]"
    },
    {
      title: "AlphaSync",
      desc: "A copy trading platform that enables users to automatically replicate strategies of top-performing traders in real time. Built to simplify investing with intelligent syncing, risk controls, and seamless portfolio management.",
      tech: ["Angular", "Python", "Docker", "Wine"],
      link: "https://alphasync-frontend.onrender.com/",
      img: alphaSyncBg,
      color: "from-background/90 via-accentPurple/10",
      neonBorder: "border-accentPurple/60 shadow-[0_0_20px_rgba(187,134,252,0.2)]"
    },
    {
      title: "ebonow",
      desc: "A leading Indian platform offering end-to-end decoration services, specializing in birthdays and balloon décor.",
      tech: ["ReactJs", "NodeJs"],
      link: "https://extraordinary-taiyaki-45b4f7.netlify.app/",
      img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2976&auto=format&fit=crop",
      color: "from-background/90 via-accent1/10",
      neonBorder: "border-accent2/60 shadow-[0_0_20px_rgba(255,107,107,0.2)]"
    }
  ];

  useEffect(() => {
    if (!containerRef.current || cardsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${projects.length * 100}%`,
          scrub: 1.2, // Smoother interpolation
          pin: true,
          anticipatePin: 1 // Prevents jank when un-pinning and pinning
        }
      });

      // Initial Deck Layout (Overlapped Stack)
      projects.forEach((_, i) => {
        if (i === 0) {
          gsap.set(cardsRef.current[i], { zIndex: projects.length - i });
          return;
        }
        // Use force3D to enforce hardware layer
        gsap.set(cardsRef.current[i], {
          scale: 1 - i * 0.05,
          x: i * 50, // Stacked overlapping tightly to the right
          y: 0,
          opacity: 1, // High visibility
          zIndex: projects.length - i,
          force3D: true
        });
      });

      // Scroll Unstacking Sequence
      projects.forEach((_, i) => {
        if (i === projects.length - 1) return; // Last card stays

        // Current topmost card flies out to the LEFT
        tl.to(cardsRef.current[i], {
          x: "-100vw",
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "power2.inOut",
          force3D: true
        }, `step${i}`);

        // The rest of the stack pulls LEFT into focus
        for (let j = i + 1; j < projects.length; j++) {
          tl.to(cardsRef.current[j], {
            scale: "+=0.05",
            x: "-=50",
            duration: 1,
            ease: "power2.inOut",
            force3D: true
          }, `step${i}`);
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="bg-background relative">
      <div ref={containerRef} className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden">

        <div className="absolute top-[10%] left-6 md:left-[10%] z-[100] w-full max-w-7xl mx-auto">
          <h3 className="text-accent1 font-mono text-xs uppercase tracking-[0.3em] mb-4">Crafting Solutions</h3>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-textMain tracking-tight mb-2">Projects</h2>
        </div>

        <div className="relative w-[90%] max-w-5xl h-[65vh] mt-16 md:mt-24 perspective-[2000px]">
          {projects.map((proj, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className={`absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden border-2 group bg-card flex items-center justify-center origin-top will-change-transform ${proj.neonBorder}`}
              style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
            >
              {/* Image overlay - Hardware accelerated and non-blocking */}
              <img
                src={proj.img}
                alt={proj.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-[transform,filter] duration-700 ease-out pointer-events-none will-change-transform"
              />
              {/* Gradient Mask */}
              <div className={`absolute inset-0 bg-gradient-to-t ${proj.color} to-transparent z-10 opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

              {/* Content */}
              <div className="relative z-20 p-8 md:p-14 w-full h-full flex flex-col justify-end">
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-white/10 text-white text-[10px] font-mono uppercase tracking-widest rounded-full border border-white/10">{t}</span>
                  ))}
                </div>
                <h4 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-white mb-4 drop-shadow-2xl tracking-tight">{proj.title}</h4>
                <p className="text-textMuted text-lg md:text-2xl mb-8 leading-relaxed drop-shadow-md max-w-3xl">{proj.desc}</p>
                <div className="flex gap-4">
                  <a href={proj.link} className="inline-flex items-center gap-3 text-background bg-accent1 px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors shadow-lg shadow-accent1/20" target='blank'>
                    View <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// PRICING SECTION
const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20 relative">
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-textMain">Investment Tiers</h2>
        <p className="font-sans text-textMuted max-w-xl mx-auto text-lg">Transparent pricing for premium results. Select the tier that matches your roadmap.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {/* Basic Plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-card/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5 flex flex-col hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500 pb-12 shadow-lg">
          <div className="mb-8">
            <h4 className="font-mono text-sm uppercase tracking-widest text-textMuted mb-2">Basic</h4>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-heading font-bold text-textMain">₹2,999</span>
              <span className="text-textMuted text-sm">/start</span>
            </div>
          </div>
          <div className="space-y-4 mb-10 flex-grow">
            <p className="font-sans text-sm text-textMuted mb-6">Essential digital presence for startups.</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm font-sans text-textMain">
                <span className="text-accent1 font-bold">✓</span> Single Page Site
              </li>
              <li className="flex items-center gap-3 text-sm font-sans text-textMain">
                <span className="text-accent1 font-bold">✓</span> Mobile Optimization
              </li>
              <li className="flex items-center gap-3 text-sm font-sans text-textMain">
                <span className="text-accent1 font-bold">✓</span> 24h Deployment
              </li>
              <li className="flex items-center gap-3 text-sm font-sans text-textMuted opacity-50">
                <span className="text-textMuted">✕</span> Custom Dashboard
              </li>
            </ul>
          </div>
          <button className="w-full py-4 rounded-xl border border-white/10 font-heading font-bold text-sm text-textMain hover:bg-white/5 hover:border-white/20 transition-all">Get Started</button>
        </motion.div>

        {/* Standard Plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-card/60 backdrop-blur-md p-10 rounded-[2.5rem] border-2 border-accent1/30 flex flex-col relative md:scale-105 shadow-[0_0_60px_rgba(102,252,241,0.1)] hover:shadow-[0_0_80px_rgba(102,252,241,0.2)] transition-shadow duration-500 pb-12 z-10">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent1 text-background px-4 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Requested</div>
          <div className="mb-8 mt-2">
            <h4 className="font-mono text-sm uppercase tracking-widest text-accent1 mb-2">Standard</h4>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-heading font-extrabold text-accent1">₹9,999</span>
              <span className="text-textMuted text-sm">/project</span>
            </div>
          </div>
          <div className="space-y-4 mb-10 flex-grow">
            <p className="font-sans text-sm text-textMuted mb-6">Full-stack dynamic applications with custom backend logic.</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm font-sans text-textMain">
                <span className="w-5 h-5 rounded-full bg-accent1/20 flex items-center justify-center text-accent1 text-xs font-bold">✓</span> Multi-page React App
              </li>
              <li className="flex items-center gap-3 text-sm font-sans text-textMain">
                <span className="w-5 h-5 rounded-full bg-accent1/20 flex items-center justify-center text-accent1 text-xs font-bold">✓</span> API Integration
              </li>
              <li className="flex items-center gap-3 text-sm font-sans text-textMain">
                <span className="w-5 h-5 rounded-full bg-accent1/20 flex items-center justify-center text-accent1 text-xs font-bold">✓</span> Database Management
              </li>
              <li className="flex items-center gap-3 text-sm font-sans text-textMain">
                <span className="w-5 h-5 rounded-full bg-accent1/20 flex items-center justify-center text-accent1 text-xs font-bold">✓</span> Admin Dashboard
              </li>
            </ul>
          </div>
          <button className="w-full py-4 rounded-xl bg-gradient-to-r from-accent1 to-accent2 font-heading font-bold text-background text-sm hover:scale-105 transition-transform shadow-lg shadow-accent1/25">Get Started</button>
        </motion.div>

        {/* Premium Plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-card/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5 flex flex-col hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500 pb-12 shadow-lg">
          <div className="mb-8">
            <h4 className="font-mono text-sm uppercase tracking-widest text-accentPurple mb-2">Premium</h4>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-heading font-bold text-textMain">₹24,999<span className="text-2xl text-accentPurple">+</span></span>
            </div>
          </div>
          <div className="space-y-4 mb-10 flex-grow">
            <p className="font-sans text-sm text-textMuted mb-6">Enterprise solutions for complex, high-traffic systems.</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm font-sans text-textMain">
                <span className="text-accentPurple font-bold">⚡</span> Custom SaaS Architecture
              </li>
              <li className="flex items-center gap-3 text-sm font-sans text-textMain">
                <span className="text-accentPurple font-bold">⚡</span> AI/ML Integration
              </li>
              <li className="flex items-center gap-3 text-sm font-sans text-textMain">
                <span className="text-accentPurple font-bold">⚡</span> Dedicated Support
              </li>
              <li className="flex items-center gap-3 text-sm font-sans text-textMain">
                <span className="text-accentPurple font-bold">⚡</span> CI/CD Automation
              </li>
            </ul>
          </div>
          <button className="w-full py-4 rounded-xl border border-accentPurple/30 text-accentPurple font-heading font-bold text-sm hover:bg-accentPurple/10 hover:border-accentPurple/50 transition-colors">Contact Sales</button>
        </motion.div>
      </div>

    </section>
  );
};

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Ramkrishna Pandey",
      role: "Co-founder, ebonow",
      quote: "Reliable, efficient, and forward-thinking. ",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgW0931ac_34jnqgMIjxnSdiCJIfVtwB96-TlzmI8b7AqsNQUOWIxXiE9ArL0MaIhx0E_e9EXg2hvMBkLV6CkImrG_LbXZNjoKHqlWfB2bMdjPt8EUOIMLSFZkdKezAfroLYO0J1LYxMD3O-VxQWHi1qWnNMwOrWOoWovtcLnsoLI6dSHWJbCqfsNu8JBFv6aKbADziLeNZZsrLzCvkzDt21iKuRePCX4FGW6nOiJbvemL6nwDjHKPHSO5f-GZ8S_pzVWRKc5Gj_Vr",
      accent: "text-accent1"
    },

  ];

  return (
    <section id="testimonials" className="py-8 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 text-left">
        <div>
          <span className="font-mono text-accentPurple text-xs uppercase tracking-[0.3em] mb-4 block">Feedback Protocol</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-textMain tracking-tight">What Peers & Partners Say</h2>
        </div>
        <div className="flex gap-4">
          <button className="w-14 h-14 rounded-full bg-card/40 backdrop-blur-md border border-white/5 flex items-center justify-center hover:bg-accent1/10 transition-all group">
            <ChevronLeft className="w-6 h-6 text-textMuted group-hover:text-accent1" />
          </button>
          <button className="w-14 h-14 rounded-full bg-card/40 backdrop-blur-md border border-accent1/20 flex items-center justify-center hover:bg-accent1/10 transition-all group">
            <ChevronRight className="w-6 h-6 text-textMuted group-hover:text-accent1" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card/30 backdrop-blur-md p-10 rounded-[2rem] border border-white/5 relative group hover:bg-card/50 transition-all duration-500"
          >
            <Quote className={`absolute top-10 right-10 w-12 h-12 ${t.accent} opacity-20 group-hover:opacity-40 transition-opacity`} />
            
            <div className="flex items-center gap-5 mb-8">
              <div className="relative">
                <div className={`absolute -inset-1 bg-gradient-to-tr ${i % 2 === 0 ? 'from-accent1 to-accentPurple' : 'from-accentPurple to-accent1'} rounded-full opacity-0 group-hover:opacity-40 blur-sm transition-opacity`}></div>
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-16 h-16 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 relative"
                />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xl text-textMain">{t.name}</h4>
                <p className={`font-mono text-[10px] uppercase tracking-widest ${t.accent}`}>{t.role}</p>
              </div>
            </div>

            <p className="text-textMuted text-lg leading-relaxed font-sans italic text-left">
              "{t.quote}"
            </p>

            <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// CONTACT SECTION
const ContactSection = () => {
  return (
    <section id="contact" className="w-full border-t border-white/5 bg-neutral-950/50 backdrop-blur-xl mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row justify-between items-center gap-12">

        {/* Small Input & Submit Button */}
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <form className="relative w-full group">
            <input 
              type="text" 
              placeholder="Tell us about your project..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-xs text-textMain focus:outline-none focus:border-accent1/50 transition-all placeholder:text-textMuted/50"
            />
            <button 
              type="submit" 
              className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square bg-accent1 rounded-full flex items-center justify-center text-background hover:scale-110 transition-transform shadow-[0_0_15px_rgba(102,252,241,0.3)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 items-center">
          <a href="https://github.com/devamanin" target='_blank' className="p-3 rounded-full bg-white/5 border border-white/10 text-textMuted hover:text-accent1 hover:border-accent1/30 hover:-translate-y-1 transition-all">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/devamanin" target='_blank' className="p-3 rounded-full bg-white/5 border border-white/10 text-textMuted hover:text-accentPurple hover:border-accentPurple/30 hover:-translate-y-1 transition-all">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:devamanin@gmail.com" target='_blank' className="p-3 rounded-full bg-white/5 border border-white/10 text-textMuted hover:text-accent1 hover:border-accent1/30 hover:-translate-y-1 transition-all">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
      
      {/* Bottom Bar */}
    </section>
  );
};

export default App;
