import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-void border-t border-white/5 py-12 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h4 className="font-orbitron text-cream text-lg font-bold mb-1">HM ROBOTICS</h4>
          <p className="text-latte/50 text-xs tracking-wider">
            &copy; 2025 AUTOMATION PLC. ALL RIGHTS RESERVED.
          </p>
        </div>
        
        <div className="flex items-center gap-8">
           <span className="text-bronze text-sm font-sans tracking-wide">
             ADDIS ABABA, ETHIOPIA
           </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;