import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Terminal, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => setIsSubmitted(true), 1500);
  };

  const inputClasses = "w-full bg-void/50 border border-coffee/30 text-cream p-4 focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze/50 transition-all placeholder-latte/20 font-mono text-sm";
  const labelClasses = "block text-bronze text-xs font-orbitron tracking-widest mb-2 uppercase";

  return (
    <section className="min-h-screen py-32 px-6 bg-void relative overflow-hidden">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(143,102,78,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(143,102,78,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
       
       {/* Decorative gradient orb */}
       <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-bronze/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 border-b border-coffee/30 pb-8"
        >
          <div className="flex items-center gap-3 mb-4">
             <Terminal size={18} className="text-bronze" />
             <span className="text-bronze font-mono text-sm tracking-widest">
                // SYSTEM INTERFACE
             </span>
          </div>
          <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-cream">
            INITIATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-bronze to-cream">TRANSMISSION</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24">
          
          {/* Left Column: Contact Form (3 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
             <div className="bg-card/20 backdrop-blur-sm border border-coffee/20 p-8 md:p-10 relative">
                {/* Decorative UI elements */}
                <div className="absolute top-0 left-0 w-20 h-[1px] bg-bronze" />
                <div className="absolute top-0 left-0 w-[1px] h-20 bg-bronze" />
                <div className="absolute bottom-0 right-0 w-20 h-[1px] bg-bronze" />
                <div className="absolute bottom-0 right-0 w-[1px] h-20 bg-bronze" />

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className={labelClasses}>Operative Name</label>
                        <input 
                          type="text" 
                          required
                          className={inputClasses}
                          placeholder="ENTER DESIGNATION"
                          value={formState.name}
                          onChange={(e) => setFormState({...formState, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Corporate ID</label>
                        <input 
                          type="text" 
                          className={inputClasses}
                          placeholder="AFFILIATION (OPTIONAL)"
                          value={formState.company}
                          onChange={(e) => setFormState({...formState, company: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClasses}>Comm Channel</label>
                      <input 
                        type="email" 
                        required
                        className={inputClasses}
                        placeholder="EMAIL_ADDRESS"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>Data Payload</label>
                      <textarea 
                        required
                        rows={6}
                        className={inputClasses}
                        placeholder="ENTER MESSAGE PARAMETERS..."
                        value={formState.message}
                        onChange={(e) => setFormState({...formState, message: e.target.value})}
                      />
                    </div>

                    <button 
                      type="submit"
                      className="group flex items-center gap-4 bg-bronze/10 border border-bronze text-bronze px-8 py-4 font-orbitron text-sm tracking-widest hover:bg-bronze hover:text-void transition-all duration-300 w-full md:w-auto cursor-pointer"
                    >
                      <Send size={18} />
                      <span>TRANSMIT DATA</span>
                    </button>
                  </form>
                ) : (
                  <div className="h-[400px] flex flex-col items-center justify-center text-center">
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }}
                      className="w-20 h-20 rounded-full border border-bronze flex items-center justify-center mb-6 text-bronze"
                    >
                      <CheckCircle size={40} />
                    </motion.div>
                    <h3 className="text-2xl font-orbitron text-cream mb-2">TRANSMISSION RECEIVED</h3>
                    <p className="text-latte/60 font-mono text-sm">Our automated systems are processing your query. Expect a response within 24 cycles.</p>
                  </div>
                )}
             </div>
          </motion.div>

          {/* Right Column: Info & Map (2 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 flex flex-col gap-12"
          >
            {/* Direct Lines */}
            <div>
              <h3 className="font-orbitron text-xl text-cream mb-6 border-l-2 border-bronze pl-4">
                DIRECT LINES
              </h3>
              <div className="space-y-6">
                <div className="group flex items-start gap-4 p-4 border border-transparent hover:border-coffee/30 hover:bg-card/20 transition-all cursor-default">
                  <div className="mt-1 p-2 bg-coffee/10 rounded-sm text-bronze">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-latte/50 uppercase tracking-widest mb-1">Inquiries</span>
                    <a href="mailto:hello@hmrobotics.com" className="text-cream font-orbitron text-lg hover:text-bronze transition-colors">
                      hello@hmrobotics.com
                    </a>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-4 border border-transparent hover:border-coffee/30 hover:bg-card/20 transition-all cursor-default">
                  <div className="mt-1 p-2 bg-coffee/10 rounded-sm text-bronze">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-latte/50 uppercase tracking-widest mb-1">Secure Line</span>
                    <a href="tel:+251911234567" className="text-cream font-orbitron text-lg hover:text-bronze transition-colors">
                      +251 911 234 567
                    </a>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-4 border border-transparent hover:border-coffee/30 hover:bg-card/20 transition-all cursor-default">
                   <div className="mt-1 p-2 bg-coffee/10 rounded-sm text-bronze">
                    <MapPin size={20} />
                  </div>
                   <div>
                    <span className="block text-[10px] font-mono text-latte/50 uppercase tracking-widest mb-1">Base of Operations</span>
                    <p className="text-cream font-sans">
                      Bole Sub City, Woreda 03<br />
                      Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Panel */}
            <div className="border border-coffee/30 bg-void p-6 relative overflow-hidden group">
               <div className="absolute inset-0 bg-bronze/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-xs text-bronze tracking-widest">SYSTEM STATUS</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-green-500 font-mono uppercase">Operational</span>
                  </div>
               </div>
               <div className="space-y-2">
                 <div className="flex justify-between text-xs text-latte/60 font-mono">
                   <span>SERVER LOAD</span>
                   <span>12%</span>
                 </div>
                 <div className="w-full h-1 bg-coffee/30">
                   <div className="w-[12%] h-full bg-bronze" />
                 </div>
                 <div className="flex justify-between text-xs text-latte/60 font-mono pt-2">
                   <span>RESPONSE TIME</span>
                   <span>45ms</span>
                 </div>
                 <div className="w-full h-1 bg-coffee/30">
                   <div className="w-[85%] h-full bg-bronze" />
                 </div>
               </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;