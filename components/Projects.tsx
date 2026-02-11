import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight, Cpu, Activity, Zap, HardDrive,
  Database, Shield, Radio, Crosshair, Terminal,
  MapPin, Clock, Server, Eye, X
} from 'lucide-react';
import { supabase } from '../lib/supabase';

// --- Types ---
interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  sector: string;
  image: string;
  size: string;
  coordinates: string;
  power: string;
  uptime: string;
  description: string;
  stats: { label: string; value: string; icon_name: string }[];
}

const iconMap: Record<string, React.ElementType> = {
  Zap, Activity, Cpu, HardDrive, Clock, MapPin, Shield, Radio, Database, Server
};

const sectors = ["All", "Industrial", "Defense", "Research", "Medical"];

// --- Helper Components ---

const GlitchText = ({ text }: { text: string }) => {
  return (
    <div className="relative group inline-block">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -ml-0.5 translate-x-[2px] text-red-500 opacity-0 group-hover:opacity-70 animate-pulse">{text}</span>
      <span className="absolute top-0 left-0 -ml-0.5 -translate-x-[2px] text-blue-500 opacity-0 group-hover:opacity-70 animate-pulse delay-75">{text}</span>
    </div>
  );
};

const DataFlicker = ({ label, value }: { label: string, value: string }) => (
  <div className="flex items-center gap-2 font-mono text-[10px] text-bronze/80">
    <span className="opacity-60">{label}:</span>
    <motion.span
      animate={{ opacity: [1, 0.5, 1, 0.8, 0.3, 1] }}
      transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 0.2, 0.5, 0.55, 1] }}
    >
      {value}
    </motion.span>
  </div>
);

// --- Main Components ---

const FilterSidebar = ({ activeSector, setSector }: { activeSector: string, setSector: (s: string) => void }) => (
  <div className="hidden lg:flex flex-col gap-6 w-64 shrink-0 sticky top-32 h-fit border-r border-coffee/20 pr-8">
    <div className="mb-4">
      <h3 className="font-orbitron text-bronze text-sm mb-1">ARCHIVE ACCESS</h3>
      <div className="h-[1px] w-full bg-bronze/30 mb-1" />
      <div className="h-[1px] w-2/3 bg-bronze/30" />
    </div>

    <div className="flex flex-col gap-2">
      {sectors.map((sector) => (
        <button
          key={sector}
          onClick={() => setSector(sector)}
          className={`group flex items-center justify-between p-3 text-left font-mono text-xs transition-all duration-300 border border-transparent
                  ${activeSector === sector
              ? 'bg-coffee/20 border-bronze text-cream'
              : 'text-latte/50 hover:text-bronze hover:bg-void/50'
            }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-1.5 h-1.5 rounded-sm transition-colors ${activeSector === sector ? 'bg-bronze animate-pulse' : 'bg-coffee/30'}`} />
            <span className="uppercase tracking-widest">{sector}</span>
          </div>
          {activeSector === sector && <Terminal size={12} className="text-bronze" />}
        </button>
      ))}
    </div>

    {/* Decorative CLI Stats */}
    <div className="mt-12 space-y-4 opacity-40">
      <div className="font-mono text-[10px] text-latte">
        <p>MEM: 48TB / 128TB</p>
        <div className="w-full h-1 bg-coffee/30 mt-1">
          <div className="w-[40%] h-full bg-bronze" />
        </div>
      </div>
      <div className="font-mono text-[10px] text-latte">
        <p>ENCRYPTION: AES-4096</p>
        <p className="mt-1">STATUS: SECURE</p>
      </div>
    </div>
  </div>
);

const ProjectCard: React.FC<{ project: Project, onClick: () => void }> = ({ project, onClick }) => {
  const size = project.size || 'medium';
  const gridClasses: Record<string, string> = {
    'large': 'md:col-span-2 md:row-span-2',
    'medium': 'md:col-span-1 md:row-span-1',
    'tall': 'md:col-span-1 md:row-span-2',
    'wide': 'md:col-span-2 md:row-span-1'
  };

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      onClick={onClick}
      className={`group relative bg-card cursor-pointer overflow-hidden border border-coffee/10 hover:border-bronze/50 transition-colors duration-500 ${gridClasses[size] || 'col-span-1'}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${project.image})` }}
        >
          <div className="absolute inset-0 bg-void/30 group-hover:bg-void/0 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
        </motion.div>
      </div>

      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1">
        <DataFlicker label="POS" value={project.coordinates} />
        <DataFlicker label="PWR" value={project.power} />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 z-20">
        <div className="flex justify-between items-end mb-2">
          <div>
            <span className="font-mono text-[10px] text-bronze tracking-widest uppercase mb-1 block">
              [{project.sector}] :: {project.id}
            </span>
            <h3 className="font-orbitron text-2xl font-bold text-cream group-hover:text-bronze transition-colors">
              <GlitchText text={project.title} />
            </h3>
          </div>
          <motion.div
            className="p-2 border border-bronze/30 bg-void/50 text-bronze opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(143,102,78,0.2)" }}
          >
            <ArrowUpRight size={18} />
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,11,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
    </motion.div>
  );
};

const ExpandModal = ({ project, onClose }: { project: Project, onClose: () => void }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-void/90 backdrop-blur-md"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      layoutId={`project-${project.id}`}
      className="w-full max-w-6xl h-full md:h-[80vh] bg-card border border-bronze/30 relative overflow-hidden flex flex-col md:flex-row shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 bg-void/80 text-bronze hover:text-white border border-bronze/30"
      >
        <X size={24} />
      </button>

      <div className="w-full md:w-2/3 h-1/2 md:h-full relative group">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void/80 to-transparent md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-l from-card via-card/20 to-transparent hidden md:block" />
        <div className="absolute bottom-8 left-8">
          <h1 className="font-orbitron text-5xl md:text-7xl text-white/10 font-bold select-none">
            {project.id}
          </h1>
        </div>
      </div>

      <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col bg-card overflow-y-auto relative border-l border-bronze/20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="px-2 py-1 border border-bronze/50 text-bronze text-[10px] font-mono tracking-widest uppercase">
              {project.sector}
            </div>
            <div className="px-2 py-1 border border-coffee/30 text-latte/50 text-[10px] font-mono tracking-widest uppercase">
              {project.category}
            </div>
          </div>
          <h2 className="font-orbitron text-3xl md:text-4xl text-cream font-bold mb-2">
            {project.title}
          </h2>
          <p className="font-mono text-bronze text-sm mb-6">{project.client}</p>
          <p className="text-latte/80 leading-relaxed mb-8">
            {project.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 border border-coffee/20 bg-void/30">
            <div className="text-[10px] text-latte/40 uppercase mb-1">COORDINATES</div>
            <div className="font-mono text-bronze text-xs">{project.coordinates}</div>
          </div>
          <div className="p-4 border border-coffee/20 bg-void/30">
            <div className="text-[10px] text-latte/40 uppercase mb-1">UPTIME</div>
            <div className="font-mono text-green-500/80 text-xs">{project.uptime}</div>
          </div>
          {project.stats?.map((stat, i) => {
            const IconComp = iconMap[stat.icon_name] || Activity;
            return (
              <div key={i} className="p-4 border border-coffee/20 bg-void/30">
                <div className="flex items-center gap-2 text-[10px] text-latte/40 uppercase mb-1">
                  <IconComp size={10} /> {stat.label}
                </div>
                <div className="font-orbitron text-cream text-lg">{stat.value}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-auto pt-8 border-t border-coffee/20">
          <button className="w-full py-4 bg-bronze/10 border border-bronze/50 text-bronze hover:bg-bronze hover:text-void transition-colors font-orbitron font-bold tracking-widest text-sm flex items-center justify-center gap-2 group">
            ACCESS FULL LOGS
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedSector, setSelectedSector] = useState("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index');

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(p =>
    selectedSector === "All" || p.sector === selectedSector
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center font-mono">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block text-bronze mb-4"
          >
            <Database size={48} />
          </motion.div>
          <div className="text-bronze tracking-[0.3em] animate-pulse uppercase text-sm font-bold">
            ACCESSING_ARCHIVE_DATA...
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 bg-void relative overflow-x-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#8F664E_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto max-w-[1600px] flex flex-col lg:flex-row gap-0 lg:gap-12">
        <div className="lg:hidden mb-8 overflow-x-auto pb-4 scrollbar-hide flex gap-4">
          {sectors.map(sector => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`shrink-0 px-4 py-2 border ${selectedSector === sector ? 'border-bronze text-bronze bg-bronze/10' : 'border-coffee/30 text-latte/50'} font-mono text-xs uppercase tracking-widest whitespace-nowrap`}
            >
              {sector}
            </button>
          ))}
        </div>

        <FilterSidebar activeSector={selectedSector} setSector={setSelectedSector} />

        <div className="flex-1">
          <div className="mb-12 flex items-baseline justify-between border-b border-coffee/20 pb-4">
            <h2 className="font-orbitron text-4xl text-cream font-bold">
              PROJECT ARCHIVE <span className="text-bronze text-lg animate-pulse">_</span>
            </h2>
            <span className="font-mono text-xs text-latte/40 hidden md:inline-block">
              SHOWING {filteredProjects.length} RECORDS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[300px]">
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setActiveProject(project)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <ExpandModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;