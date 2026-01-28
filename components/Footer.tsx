import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Linkedin, Twitter, Instagram, ArrowUp, Hexagon, CircuitBoard, Globe, Cpu } from 'lucide-react';

// --- Helper Components ---

const CircuitNode = ({ className = "" }: { className?: string }) => (
  <div className={`absolute w-2 h-2 bg-void border border-bronze/60 z-10 ${className}`} />
);

const HexagonButton = ({ Icon, href }: { Icon: React.ElementType, href: string }) => {
  return (
    <a href={href} className="group relative w-12 h-12 flex items-center justify-center">
      {/* Rotating Hexagon */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-transparent stroke-coffee/40 stroke-2 group-hover:stroke-bronze transition-colors duration-300">
          <polygon points="50 1, 95 25, 95 75, 50 99, 5 75, 5 25" />
        </svg>
      </div>
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ rotate: 0 }}
        whileHover={{ rotate: 60 }}
        transition={{ duration: 0.4 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-transparent stroke-bronze stroke-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <polygon points="50 1, 95 25, 95 75, 50 99, 5 75, 5 25" />
        </svg>
      </motion.div>

      <Icon size={18} className="text-latte/70 group-hover:text-cream relative z-10 transition-colors" />
    </a>
  );
};

const SystemLog = () => {
  return (
    <div className="w-full overflow-hidden bg-black py-2 border-t border-bronze/20 flex items-center">
      <motion.div
        className="flex whitespace-nowrap font-mono text-[10px] text-bronze/60 uppercase tracking-widest gap-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <span>{'>'} STATUS: OPTIMAL</span>
        <span>{'>'} LATENCY: 24MS</span>
        <span>{'>'} POWER: 98%</span>
        <span>{'>'} UPLINK: SECURE</span>
        <span>{'>'} LOCATION: ADDIS ABABA [CONNECTED]</span>
        <span>{'>'} TEMP: 32°C</span>
        <span>{'>'} NODES: 4,096 ACTIVE</span>
        <span>{'>'} PROTOCOL: V4.0.2</span>

        {/* Duplicate for infinite loop */}
        <span>{'>'} STATUS: OPTIMAL</span>
        <span>{'>'} LATENCY: 24MS</span>
        <span>{'>'} POWER: 98%</span>
        <span>{'>'} UPLINK: SECURE</span>
        <span>{'>'} LOCATION: ADDIS ABABA [CONNECTED]</span>
        <span>{'>'} TEMP: 32°C</span>
        <span>{'>'} NODES: 4,096 ACTIVE</span>
        <span>{'>'} PROTOCOL: V4.0.2</span>
      </motion.div>
    </div>
  );
};

const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 font-mono text-bronze/80">
      <span className="animate-pulse">●</span>
      <span>
        {time.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })}
        <span className="text-[10px] ml-1 opacity-50">LCL</span>
      </span>
    </div>
  );
}

// --- Main Footer ---

const Footer: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Parallax for the giant text
  const y = useTransform(scrollYProgress, [0.8, 1], [-100, 0]);
  const opacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 0.1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* SECTION: The Mechanical Bridge (Transition Zone) */}
      <div className="relative h-[40px] w-full bg-void overflow-visible z-[90]">
        {/* Scanning Line with Light Pulse */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-coffee/30 overflow-hidden">
          <motion.div
            className="absolute top-0 left-[-10%] w-[20%] h-full bg-bronze shadow-[0_0_20px_rgba(143,102,78,0.8)]"
            animate={{ left: ["-20%", "120%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* The Dock & Command Key Button */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-[1px] z-[99]">
          {/* The U-shape Dock Frame */}
          <div className="relative pt-1 px-1 bg-void border-b border-x border-coffee/40 rounded-b-sm shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
            {/* Connection 'Nodes' on Frame */}
            <div className="absolute top-0 left-[-2px] w-[3px] h-[3px] bg-bronze" />
            <div className="absolute top-0 right-[-2px] w-[3px] h-[3px] bg-bronze" />

            <button
              onClick={scrollToTop}
              className="group relative bg-[#0a0a0a] border border-bronze/20 px-6 py-2 md:px-8 md:py-3 font-mono text-[10px] md:text-xs tracking-widest text-bronze hover:text-white hover:border-bronze overflow-hidden w-[200px] flex items-center justify-center gap-3 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-bronze/10 opacity-0 group-hover:opacity-100 transition-opacity duration-100" />

              {/* Glitch Effect on Text */}
              <span className="relative z-10 flex items-center gap-2 group-hover:animate-pulse">
                <ArrowUp size={12} className="group-hover:-translate-y-px transition-transform" />
                INITIATE_ASCENT
              </span>

              {/* Small corner accents inside button */}
              <div className="absolute bottom-0 right-0 w-1 h-1 bg-bronze/50" />
              <div className="absolute top-0 left-0 w-1 h-1 bg-bronze/50" />
            </button>
          </div>
        </div>
      </div>

      <footer className="relative bg-[#050505] pt-24 overflow-hidden border-t border-coffee/10 z-10">

        {/* Background Kinetic Typography */}
        <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden flex items-end justify-center select-none">
          <motion.h1
            style={{ y, opacity }}
            className="text-[12vw] md:text-[15vw] leading-[0.8] font-black text-white whitespace-nowrap font-orbitron text-center tracking-tighter"
          >
            HM ROBOTICS
          </motion.h1>
        </div>

        {/* Decorative Grid Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(143,102,78,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(143,102,78,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        {/* Main Content Container */}
        <div className="container mx-auto max-w-7xl px-6 relative z-10 pb-20">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

            {/* Column 1: Identity & Nav (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full relative">
              {/* Micro-joint decoration */}
              <div className="absolute -right-12 top-0 bottom-0 w-[1px] bg-coffee/20 hidden lg:block">
                <CircuitNode className="-top-[1px] -left-[3px]" />
                <CircuitNode className="top-1/2 -left-[3px]" />
                <CircuitNode className="-bottom-[1px] -left-[3px]" />
              </div>

              <div className="mb-12">
                <div className="w-12 h-12 mb-6 text-bronze border border-bronze/30 flex items-center justify-center bg-void/50 backdrop-blur-sm">
                  <Cpu size={24} strokeWidth={1.5} />
                </div>
                <h2 className="font-orbitron text-3xl text-cream mb-4">SYSTEM<br />ACCESSED</h2>
                <p className="text-latte/50 text-sm max-w-sm leading-relaxed">
                  Pioneering the synthesis of biological intent and mechanical precision. Our neural architectures define the next epoch of industrial automation.
                </p>
              </div>

              <div className="flex gap-4">
                <HexagonButton Icon={Linkedin} href="#" />
                <HexagonButton Icon={Twitter} href="#" />
                <HexagonButton Icon={Instagram} href="#" />
              </div>
            </div>

            {/* Column 2: Sitemap (3 cols) */}
            <div className="lg:col-span-3 relative">
              {/* Micro-joint decoration */}
              <div className="absolute -right-12 top-0 bottom-0 w-[1px] bg-coffee/20 hidden lg:block">
                <CircuitNode className="top-1/4 -left-[3px]" />
                <CircuitNode className="bottom-1/4 -left-[3px]" />
              </div>

              <h3 className="font-mono text-xs text-bronze uppercase tracking-widest mb-8 flex items-center gap-2">
                <CircuitBoard size={14} /> DIRECTORY
              </h3>
              <ul className="space-y-4">
                {['HOME', 'SERVICES', 'PROJECTS', 'ABOUT_US', 'CONTACT_UPLINK'].map((item) => (
                  <li key={item}>
                    <a href="#" className="flex items-center gap-2 text-sm font-orbitron text-cream/70 hover:text-bronze transition-colors group">
                      <span className="w-1 h-1 bg-coffee group-hover:bg-bronze transition-colors" />
                      {item.replace('_', ' ')}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Regional Data (4 cols) */}
            <div className="lg:col-span-4">
              <h3 className="font-mono text-xs text-bronze uppercase tracking-widest mb-8 flex items-center gap-2">
                <Globe size={14} /> COORDINATES
              </h3>

              <div className="bg-card/10 border border-white/5 p-6 backdrop-blur-sm relative group overflow-hidden">
                <div className="absolute inset-0 bg-bronze/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-orbitron text-lg text-cream">ADDIS ABABA</h4>
                      <span className="text-[10px] font-mono text-latte/40 tracking-widest">HQ // ETHIOPIA</span>
                    </div>
                    <LiveClock />
                  </div>

                  <div className="space-y-2 text-sm text-latte/60 font-sans">
                    <p>Bole Sub City, Woreda 03</p>
                    <p>Industrial Tech Park, Bldg B4</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-900 rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    <span className="text-[10px] font-mono text-green-500/80">FACILITY OPERATIONAL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom System Log */}
        <SystemLog />
      </footer>
    </>
  );
};

export default Footer;