import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cog, BrainCircuit, Factory, ArrowRight, Activity, Terminal, Database, Scan } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Data ---
const services = [
  {
    id: "SVC-01",
    title: "ROBOTIC INTEGRATION",
    subtitle: "Hardware implementation",
    description: "Deployment of high-precision articulated arms and autonomous mobile units designed for sub-millimeter accuracy in hazardous or sterile environments.",
    features: ["6-Axis Assembly Arms", "Autonomous Mobile Robots", "Cobot Collaboration"],
    specs: { efficiency: "99.9%", latency: "<1ms", load: "2000kg" },
    icon: Cog
  },
  {
    id: "SVC-02",
    title: "NEURAL ARCHITECTURE",
    subtitle: "AI & Software",
    description: "Proprietary adaptive algorithms that allow systems to learn from production cycles, optimizing throughput and predicting maintenance needs before failure.",
    features: ["Computer Vision QC", "Predictive Models", "Real-time Swarm Logic"],
    specs: { ops: "50TFLOPS", training: "Real-time", accuracy: "99.99%" },
    icon: BrainCircuit
  },
  {
    id: "SVC-03",
    title: "INDUSTRIAL SCALABILITY",
    subtitle: "System Design",
    description: "End-to-end factory automation planning that integrates legacy infrastructure with next-generation protocols for seamless transition.",
    features: ["Legacy Retrofitting", "Digital Twin Sim", "IoT Sensor Grid"],
    specs: { uptime: "99.999%", nodes: "Unlimited", protocol: "Universal" },
    icon: Factory
  }
];

// --- Components ---

const BlueprintOverlay = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none opacity-20 ${className}`}>
    <motion.svg
      viewBox="0 0 400 400"
      className="w-full h-full text-bronze"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="10 10" />
      <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M200 50 L200 350 M50 200 L350 200" stroke="currentColor" strokeWidth="1" />
      <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 4" />
    </motion.svg>
  </div>
);

const AnimatedIcon = ({ Icon }: { Icon: any }) => {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center text-bronze">
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="w-full h-full"
      >
        {/* We can't easily animate generic Lucide icons with draw effect without access to their paths individually unless we use valid SVGs.
                    However, we can simulate a build up or simply pulse/rotate. 
                    Better approach for "build themselves": use a mask or scale/opacity stagger.
                    But let's stick to standard Lucide with a nice specialized animation container.
                */}
      </motion.svg>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <Icon size={64} strokeWidth={1} />
      </motion.div>
      {/* Decorative scanning rings */}
      <motion.div
        className="absolute inset-0 border border-bronze/30 rounded-full"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  )
}


const ServiceCard = ({ service }: { service: typeof services[0] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative snap-center shrink-0 w-[85vw] md:w-[60vw] lg:w-[30vw] h-[600px] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glass Panel */}
      <div className="absolute inset-0 bg-void/60 backdrop-blur-xl border border-white/10 overflow-hidden rounded-sm transition-colors duration-500 group-hover:border-bronze/50 group-hover:bg-void/80">

        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(143,102,78,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(143,102,78,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Blueprint Overlay - Rotates behind title */}
        <div className="absolute -top-20 -right-20 w-80 h-80">
          <BlueprintOverlay />
        </div>

        {/* Scanning Effect Lines */}
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-bronze to-transparent z-20 shadow-[0_0_15px_rgba(143,102,78,0.5)]"
              />
              <div className="absolute inset-0 bg-bronze/5 z-0 pointer-events-none" />
            </>
          )}
        </AnimatePresence>

        {/* Content Container */}
        <div className="relative z-10 p-8 h-full flex flex-col justify-between">

          {/* Header */}
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className="font-mono text-xs text-bronze/60 tracking-[0.2em]">{service.id}</span>
              <Scan size={16} className={`text-bronze/40 ${isHovered ? 'animate-pulse' : ''}`} />
            </div>

            <div className="mb-4">
              <AnimatedIcon Icon={service.icon} />
            </div>

            <h3 className="font-orbitron text-2xl text-cream mb-2 group-hover:text-bronze transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-sm font-mono text-latte/50 mb-0">{service.subtitle}</p>
          </div>

          {/* Body */}
          <div>
            <p className="text-latte/70 text-sm leading-relaxed mb-6 border-l-2 border-bronze/20 pl-4 group-hover:border-bronze transition-colors">
              {service.description}
            </p>

            {/* Tech Specs Grid (Reveals on Hover) */}
            <div className={`grid grid-cols-3 gap-2 mb-6 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-2'}`}>
              {Object.entries(service.specs).map(([key, val]) => (
                <div key={key} className="bg-black/40 p-2 border border-white/5">
                  <div className="text-[10px] text-bronze/70 uppercase mb-1">{key}</div>
                  <div className="font-orbitron text-xs text-cream">{val}</div>
                </div>
              ))}
            </div>

            {/* Features List */}
            <ul className="space-y-2">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-xs font-mono text-latte/60">
                  <div className="w-1 h-1 bg-bronze rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Status Bar */}
          <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-green-500 animate-pulse' : 'bg-red-900'}`} />
              <span className="text-[10px] font-mono text-latte/40 uppercase">
                {isHovered ? 'SYSTEM ONLINE' : 'STANDBY'}
              </span>
            </div>
            {isHovered && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                className="h-1 bg-bronze"
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section className="min-h-screen py-32 bg-void relative overflow-hidden flex flex-col justify-center">

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(111,78,55,0.05),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto max-w-[1920px] px-6 relative z-10">

        {/* Section Header */}
        <div className="mb-16 md:pl-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <Activity size={20} className="text-bronze animate-pulse" />
            <span className="font-mono text-bronze text-sm tracking-widest">TACTICAL OVERVIEW</span>
          </motion.div>
          <h2 className="font-orbitron text-5xl md:text-7xl text-white font-bold opacity-90">
            ACTIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-bronze to-cream">MODULES</span>
          </h2>
        </div>

        {/* Horizontal Scroll Deck */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 px-4 md:px-20 scrollbar-hide -mx-4 md:-mx-20">
          {/* Spacer for left alignment */}
          <div className="shrink-0 w-0 md:w-1" />

          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}

          {/* Spacer for right alignment */}
          <div className="shrink-0 w-8 md:w-20" />
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center mt-20"
        >
          <Link to="/contact">
            <button className="relative group bg-void/50 backdrop-blur-md border border-bronze/50 px-12 py-6 overflow-hidden">
              <div className="absolute inset-0 bg-bronze/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

              {/* Pulsing Borders */}
              <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-bronze group-hover:w-full group-hover:h-full transition-all duration-500" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-bronze group-hover:w-full group-hover:h-full transition-all duration-500" />

              <div className="flex items-center gap-4 relative z-10">
                <Terminal size={20} className="text-bronze group-hover:text-cream" />
                <span className="font-orbitron font-bold text-lg text-cream tracking-[0.2em] group-hover:text-white transition-colors">
                  INITIALIZE CONTACT
                </span>
                <ArrowRight className="text-bronze group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Neon Glow */}
              <div className="absolute inset-0 shadow-[0_0_20px_rgba(143,102,78,0.2)] group-hover:shadow-[0_0_40px_rgba(143,102,78,0.6)] transition-shadow duration-500" />
            </button>
          </Link>
          <p className="mt-4 font-mono text-xs text-latte/30">SYSTEM READY FOR NEW PARAMETERS</p>
        </motion.div>

      </div>
    </section>
  );
};

export default Services;