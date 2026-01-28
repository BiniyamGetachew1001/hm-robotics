import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled || isMobileMenuOpen
          ? 'bg-void/80 backdrop-blur-md border-bronze/20 py-4'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-2 h-2 bg-cream rounded-full animate-pulse-slow group-hover:bg-bronze transition-colors"></div>
          <span className="font-orbitron text-xl md:text-2xl font-bold text-cream tracking-widest group-hover:text-white transition-colors">
            HM ROBOTICS
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors tracking-wide uppercase relative ${
                isActive(link.path) ? 'text-cream' : 'text-latte/70 hover:text-cream'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-bronze" />
              )}
            </Link>
          ))}
          <Link to="/contact">
            <button className={`px-6 py-2 border border-bronze text-sm font-orbitron tracking-wider hover:bg-bronze hover:text-void transition-all duration-300 rounded-sm ${isActive('/contact') ? 'bg-bronze text-void' : 'text-cream'}`}>
              CONTACT
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-cream"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-void/95 backdrop-blur-xl border-b border-bronze/20 p-6 flex flex-col gap-4 shadow-2xl h-screen">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-2xl font-orbitron font-medium ${
                isActive(link.path) ? 'text-cream' : 'text-latte/70'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
             <button className="w-full py-4 border border-bronze text-cream font-orbitron hover:bg-bronze hover:text-void transition-all mt-4 text-lg">
              CONTACT
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;