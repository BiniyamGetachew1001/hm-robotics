import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cog, BrainCircuit, Factory, ArrowRight, ShieldCheck, Cpu, Database } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const iconMap: Record<string, React.ElementType> = {
  Cog, BrainCircuit, Factory, ShieldCheck, Cpu
};

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index');

      if (!error && data) {
        setServices(data);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

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
            SCANNING_ACTIVE_MODULES...
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="services" className="min-h-screen py-32 px-6 bg-void relative overflow-hidden">
      {/* Background HUD elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(143,102,78,0.05),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 border-r border-t border-coffee/10 pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="mb-20 border-l-4 border-bronze pl-8"
        >
          <span className="font-mono text-bronze uppercase tracking-[0.3em] text-xs">// CORE_PILLARS</span>
          <h2 className="font-orbitron text-5xl md:text-7xl font-bold text-cream mt-2">
            ACTIVE <span className="text-bronze">MODULES</span>
          </h2>
        </motion.div>

        {/* Horizontal Scroll Deck */}
        <div className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Cog;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="min-w-[300px] md:min-w-[450px] bg-card/20 backdrop-blur-xl border border-coffee/30 p-8 md:p-12 snap-center group relative overflow-hidden"
              >
                {/* Visual Flair: Blueprint Overlay */}
                <div className="absolute top-0 right-0 opacity-5 group-hover:opacity-10 transition-opacity">
                  <IconComponent size={200} strokeWidth={0.5} />
                </div>

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-void border border-bronze/30 flex items-center justify-center mb-8 group-hover:border-bronze transition-colors">
                    <IconComponent size={32} className="text-bronze group-hover:scale-110 transition-transform" />
                  </div>

                  <h3 className="font-orbitron text-2xl font-bold text-cream mb-6 tracking-wide uppercase">
                    {service.title}
                  </h3>

                  <p className="text-latte/60 text-sm md:text-base leading-relaxed mb-8 font-sans">
                    {service.description}
                  </p>

                  <ul className="space-y-4 mb-10">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 font-mono text-xs text-latte group-hover:text-cream transition-colors">
                        <div className="w-1 h-1 bg-bronze" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Scanning Hover Effect */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-bronze/10 overflow-hidden">
                    <motion.div
                      className="w-1/3 h-full bg-bronze"
                      animate={{ x: ["-100%", "300%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tactical Footer CTA */}
        <div className="mt-20 flex flex-col items-center">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-coffee/30 to-transparent mb-8" />
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-transparent border border-bronze text-bronze font-orbitron font-bold tracking-[0.2em] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-bronze/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              INITIALIZE CONTACT_PROTOCOL
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;