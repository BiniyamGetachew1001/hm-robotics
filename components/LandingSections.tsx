import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from 'framer-motion';
import { Scan, Database, Activity, Cpu, Globe, Zap, Server, ShieldCheck, MapPin } from 'lucide-react';
import Services from './Services'; // Re-using existing Services component

// --- SHARED UTILS ---
const SectionDivider = () => (
    <div className="w-full h-[1px] bg-coffee/20 relative overflow-hidden">
        <motion.div
            className="absolute inset-0 w-full h-full bg-bronze/50"
            initial={{ x: "-100%" }}
            whileInView={{ x: "100%" }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity, repeatDelay: 2 }}
        />
    </div>
);

// [1] NARRATIVE OVERLAY
export const NarrativeOverlay = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

    const leftX = useTransform(scrollYProgress, [0, 0.5], ["-50%", "0%"]);
    const rightX = useTransform(scrollYProgress, [0, 0.5], ["50%", "0%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <section ref={sectionRef} className="relative h-screen bg-void overflow-hidden flex items-center justify-center">
            {/* Split Screen Images */}
            <motion.div style={{ x: leftX, opacity }} className="absolute inset-y-0 left-0 w-1/2 bg-black border-r border-bronze/20 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1544256335-af215e478950?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-40 grayscale" alt="Biology" />
                <div className="absolute inset-0 bg-gradient-to-r from-void to-transparent" />
            </motion.div>

            <motion.div style={{ x: rightX, opacity }} className="absolute inset-y-0 right-0 w-1/2 bg-black border-l border-bronze/20 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-40 grayscale" alt="Machine" />
                <div className="absolute inset-0 bg-gradient-to-l from-void to-transparent" />
            </motion.div>

            {/* Central Text & Scanner */}
            <div className="relative z-10 text-center mix-blend-difference">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="font-orbitron font-bold text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 stroke-white/50 tracking-tighter"
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}
                >
                    EVOLVING<br />PRECISION
                </motion.h2>
            </div>

            {/* Scanning Beam */}
            <motion.div
                className="absolute w-full h-2 bg-bronze/50 shadow-[0_0_20px_rgba(143,102,78,0.5)] z-20"
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(143,102,78,0.05)_1px,transparent_1px)] bg-[size:10%_100%] pointer-events-none" />
        </section>
    );
};

// [2] INFINITY PROJECT MATRIX
const projects = [
    { id: "#HM-PRJ-001", name: "GIGA-WELD", status: "DEPLOYED" },
    { id: "#HM-PRJ-002", name: "NEURAL-SORT", status: "ONLINE" },
    { id: "#HM-PRJ-003", name: "TITAN-ARM", status: "ACTIVE" },
    { id: "#HM-PRJ-004", name: "SKY-SWARM", status: "MONITORING" },
    { id: "#HM-PRJ-005", name: "DEEP-CORE", status: "IDLE" },
];

export const ProjectMatrix = () => {
    return (
        <section className="relative py-24 bg-void border-y border-coffee/10 overflow-hidden">
            {/* Background Parallax Text */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full select-none pointer-events-none">
                <motion.div
                    className="font-orbitron text-[15vw] font-bold text-white/5 whitespace-nowrap"
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                    PROJECT STREAM // CLASSIFIED
                </motion.div>
            </div>

            <div className="relative z-10">
                <div className="flex overflow-hidden group">
                    <motion.div
                        className="flex gap-8 px-8"
                        animate={{ x: "-50%" }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    // Note: Framer Motion default hover pause is tricky on loop, so we use CSS group-hover logic usually or complex control. 
                    // For simplicity in this prompt, we rely on visual speed.
                    >
                        {[...projects, ...projects, ...projects, ...projects].map((p, i) => (
                            <div
                                key={i}
                                className="w-[300px] h-[180px] bg-card/40 border border-coffee/20 backdrop-blur-md p-6 flex flex-col justify-between hover:bg-bronze/10 hover:border-bronze hover:shadow-[0_0_30px_rgba(143,102,78,0.15)] transition-all duration-300 group/card shrink-0"
                            >
                                <div className="flex justify-between items-start">
                                    <span className="font-mono text-[10px] text-bronze/70">{p.id}</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        <span className="font-mono text-[8px] text-green-500/80">{p.status}</span>
                                    </div>
                                </div>
                                <h3 className="font-orbitron text-xl text-cream group-hover/card:text-white transition-colors">
                                    {p.name}
                                </h3>
                                <div className="w-full h-[1px] bg-coffee/20 group-hover/card:bg-bronze/50 transition-colors" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Overlay Gradients to hide edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-void to-transparent z-20" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-void to-transparent z-20" />
        </section>
    );
};

// [3] CORE METRICS BRIDGE
const MetricCard = ({ label, value, unit, icon: Icon }: { label: string, value: number, unit: string, icon: any }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Simple counter animation
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out quart
                const ease = 1 - Math.pow(1 - progress, 4);

                setCount(start + (end - start) * ease);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }
    }, [isInView, value]);

    return (
        <div ref={ref} className="bg-card/20 border border-coffee/20 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-bronze/5 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500" />
            <Icon size={24} className="text-bronze mb-4" />
            <div className="font-orbitron text-4xl font-bold text-cream mb-2">
                {value % 1 !== 0 ? count.toFixed(4) : Math.round(count).toLocaleString()}
                <span className="text-lg text-bronze ml-1">{unit}</span>
            </div>
            <div className="font-mono text-xs text-latte/50 tracking-widest uppercase">{label}</div>
        </div>
    );
};

export const MetricsBridge = () => {
    return (
        <section className="bg-void py-20 px-6 border-b border-coffee/10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <MetricCard label="Deployment Nodes" value={4096} unit="" icon={MapPin} />
                <MetricCard label="Neural Uptime" value={99.9982} unit="%" icon={Activity} />
                <MetricCard label="Micron Precision" value={0.005} unit="mm" icon={Scan} />
            </div>
        </section>
    );
};

// [4] NEURAL LAYERS
const layers = [
    {
        id: "L-01",
        title: "HARDWARE ACTUATION",
        subtitle: "The Physical Layer",
        desc: "High-torque servo arrays and hydraulic sublimbs capable of exertive force exceeding 50,000N.",
        visual: <Cpu size={80} className="text-bronze/20" />
    },
    {
        id: "L-02",
        title: "FIRMWARE LOGIC",
        subtitle: "The Translation Layer",
        desc: "Real-time kernel processing converting high-level intent into micro-voltage motor commands.",
        visual: <Server size={80} className="text-bronze/20" />
    },
    {
        id: "L-03",
        title: "NEURAL COGNITION",
        subtitle: "The Adaptive Layer",
        desc: "Self-optimizing reinforcement learning models that evolve efficiency patterns over deployed time.",
        visual: <Zap size={80} className="text-bronze/20" />
    }
];

export const NeuralLayers = () => {
    const [activeLayer, setActiveLayer] = useState(0);

    return (
        <section className="min-h-screen bg-void py-24 px-6 flex items-center">
            <div className="container mx-auto flex flex-col lg:flex-row gap-12">

                {/* Visualizer Side */}
                <div className="lg:w-1/2 h-[500px] bg-card/20 border border-coffee/30 relative overflow-hidden flex items-center justify-center p-12">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.5)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0.5)_75%,transparent_75%,transparent)] bg-[size:20px_20px] opacity-20" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeLayer}
                            initial={{ opacity: 0, scale: 0.9, rotate: -20 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 1.1, rotate: 20 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10"
                        >
                            {layers[activeLayer].visual}

                            {/* Decorative circling rings */}
                            <motion.div
                                className="absolute inset-0 -m-12 border border-bronze/30 rounded-full border-dashed"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute inset-0 -m-20 border border-coffee/20 rounded-full"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>
                    </AnimatePresence>

                    <div className="absolute bottom-6 left-6 font-mono text-bronze text-xs">
                        LAYER_VISUALIZATION // {layers[activeLayer].id}
                    </div>
                </div>

                {/* Accordion Side */}
                <div className="lg:w-1/2 flex flex-col justify-center">
                    <h2 className="font-orbitron text-4xl text-cream mb-12">DEEP SYSTEM <br /><span className="text-bronze">ARCHITECTURE</span></h2>

                    <div className="space-y-4">
                        {layers.map((layer, index) => (
                            <div
                                key={layer.id}
                                onClick={() => setActiveLayer(index)}
                                className={`cursor-pointer border-l-2 transition-all duration-500 pl-6 py-4 ${activeLayer === index ? 'border-bronze bg-white/5' : 'border-coffee/20 hover:border-bronze/50'}`}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className={`font-mono text-xs tracking-widest ${activeLayer === index ? 'text-bronze' : 'text-latte/40'}`}>
                                        {layer.id} // {layer.subtitle}
                                    </span>
                                    {activeLayer === index && <motion.div layoutId="active-dot" className="w-2 h-2 bg-bronze rounded-full" />}
                                </div>
                                <h3 className={`font-orbitron text-xl transition-colors ${activeLayer === index ? 'text-white' : 'text-latte/60'}`}>
                                    {layer.title}
                                </h3>
                                <AnimatePresence>
                                    {activeLayer === index && (
                                        <motion.p
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="text-latte/70 text-sm mt-4 overflow-hidden"
                                        >
                                            {layer.desc}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

// [5] GLOBAL DEPLOYMENT MAP
export const GlobalMap = () => {
    return (
        <section className="relative py-32 bg-[#050505] overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex justify-between items-end mb-16 border-b border-coffee/20 pb-4">
                    <div>
                        <h2 className="font-orbitron text-3xl md:text-5xl text-cream">ACTIVE NODES</h2>
                        <span className="font-mono text-xs text-bronze tracking-widest">GLOBAL DEPLOYMENT TRACKER</span>
                    </div>
                    <div className="text-right hidden md:block">
                        <div className="font-mono text-2xl text-cream">4,096</div>
                        <div className="font-mono text-[10px] text-latte/40 tracking-widest uppercase">Systems Online</div>
                    </div>
                </div>

                {/* Stylized Map Container */}
                <div className="relative w-full aspect-[2/1] bg-card/10 border border-coffee/20 backdrop-blur-sm rounded-lg overflow-hidden flex items-center justify-center group">
                    {/* Base Map Image (simplified world map) */}
                    <span className="opacity-10 text-9xl text-bronze font-orbitron select-none absolute inset-0 flex items-center justify-center">
                        WORLD_MAP_VYZ
                    </span>
                    {/* Using a dot grid to simulate map for now as I don't have a vector map asset */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

                    {/* Pulse Point: Addis Ababa */}
                    <div className="absolute top-[55%] left-[58%]">
                        <div className="relative">
                            <div className="w-3 h-3 bg-bronze rounded-full relative z-10 shadow-[0_0_15px_#8F664E]" />
                            <div className="absolute inset-0 bg-bronze rounded-full animate-ping opacity-75" />
                            <div className="absolute top-0 left-0 w-[1px] h-[100px] bg-gradient-to-b from-bronze to-transparent -translate-x-1/2 -translate-y-full opacity-50" />
                            <div className="absolute -top-28 -left-12 w-32 bg-black/80 border border-bronze/50 p-2 text-xs font-mono text-bronze backdrop-blur-md">
                                CORE_HQ<br />ADDIS_ABABA<br />LAT: 09.03
                            </div>
                        </div>
                    </div>

                    {/* Random Other Points */}
                    <div className="absolute top-[30%] left-[25%] opacity-50"> {/* NY */}
                        <div className="w-2 h-2 bg-cream rounded-full animate-pulse" />
                    </div>
                    <div className="absolute top-[35%] left-[48%] opacity-50"> {/* London */}
                        <div className="w-2 h-2 bg-cream rounded-full animate-pulse mx-delay-100" />
                    </div>
                    <div className="absolute top-[40%] left-[80%] opacity-50"> {/* Tokyo */}
                        <div className="w-2 h-2 bg-cream rounded-full animate-pulse mx-delay-200" />
                    </div>

                    {/* Connecting Lines (Bezier curves simulated via SVG) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-bronze/20 stroke-1 fill-none">
                        <path d="M 58% 55% Q 40% 40% 25% 30%" className="animate-[dash_3s_linear_infinite]" strokeDasharray="5" />
                        <path d="M 58% 55% Q 50% 40% 48% 35%" className="animate-[dash_3s_linear_infinite]" strokeDasharray="5" />
                        <path d="M 58% 55% Q 70% 60% 80% 40%" className="animate-[dash_3s_linear_infinite]" strokeDasharray="5" />
                    </svg>
                </div>
            </div>
        </section>
    );
};
