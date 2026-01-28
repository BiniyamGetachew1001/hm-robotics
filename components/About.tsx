import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section className="min-h-screen py-32 px-6 bg-void relative overflow-hidden flex flex-col justify-center">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-card to-transparent opacity-20 pointer-events-none" />

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 max-w-7xl">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 z-10"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-bronze" />
            <span className="text-bronze font-orbitron text-sm tracking-[0.2em] uppercase">
              Our Purpose
            </span>
          </div>
          
          <h2 className="font-orbitron text-5xl md:text-7xl font-black text-cream leading-tight mb-8">
            SERVING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cream to-bronze">
              HUMANITY.
            </span>
          </h2>
          
          <p className="text-latte text-lg md:text-xl leading-relaxed max-w-xl border-l-2 border-coffee pl-6 mb-8">
            We bridge the gap between cold metal and human intent. Our machines don't just work; they collaborate, adapt, and evolve alongside their human counterparts.
          </p>

          <p className="text-latte/60 text-sm leading-relaxed max-w-xl pl-6">
            Founded in Addis Ababa, HM Robotics stands at the forefront of the African automation renaissance. We believe that technology should serve as an extension of human potential, not a replacement.
          </p>

          <div className="mt-12">
            <button className="group relative px-8 py-3 bg-transparent border border-cream text-cream font-orbitron text-sm uppercase tracking-widest overflow-hidden">
              <span className="relative z-10 group-hover:text-void transition-colors duration-300">
                Read Our Manifesto
              </span>
              <div className="absolute inset-0 bg-cream transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          </div>
        </motion.div>

        {/* Visual Content - Abstract representation of 'Humanity meets Tech' */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 relative h-[500px] w-full flex items-center justify-center"
        >
          {/* Abstract Geometric Composition */}
          <div className="relative w-full h-full max-w-md mx-auto">
             <div className="absolute inset-0 border border-coffee/30 rounded-full animate-[spin_10s_linear_infinite]" />
             <div className="absolute inset-4 border border-bronze/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
             <div className="absolute inset-1/4 bg-card/50 backdrop-blur-sm rounded-full border border-cream/10 shadow-[0_0_50px_rgba(143,102,78,0.2)] flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-tr from-bronze to-cream rounded-full opacity-80 blur-xl animate-pulse-slow" />
             </div>
             
             {/* Floating Elements */}
             <div className="absolute top-1/4 right-0 w-24 h-24 border-t border-r border-cream opacity-50" />
             <div className="absolute bottom-1/4 left-0 w-24 h-24 border-b border-l border-cream opacity-50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;