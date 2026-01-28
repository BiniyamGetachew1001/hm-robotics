import React from 'react';
import Hero from './Hero';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="relative">
      <Hero />
      
      {/* 
        Optional overlay/teaser for the Landing Page experience.
        Since the user wants the Hero to be the main focus, we keep this minimal 
        and positioned to not obstruct the robot interaction.
      */}
      <div className="absolute bottom-10 left-6 md:left-20 z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-bronze font-mono text-xs tracking-widest mb-2">
            // NEXT GEN AUTOMATION
          </p>
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-cream mb-6 leading-none">
            PRECISION <br /> 
            REIMAGINED.
          </h1>
          <div className="pointer-events-auto">
             <Link to="/projects" className="inline-flex items-center gap-2 text-latte hover:text-cream transition-colors group">
               <span className="text-sm tracking-widest uppercase border-b border-bronze pb-1">Explore Systems</span>
               <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;