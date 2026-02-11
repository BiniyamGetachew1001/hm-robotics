import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Terminal, CheckCircle, Activity, ChevronDown, Check, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

// --- Shared Components ---

const PingGraph = () => {
  return (
    <div className="flex items-end gap-[2px] h-8 w-full mt-2 opacity-50">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-bronze"
          animate={{ height: ["10%", "60%", "30%", "80%", "20%"] }}
          transition={{
            duration: Math.random() * 1.5 + 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const RadarPing = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
    <div className="w-3 h-3 bg-bronze rounded-full absolute top-0.5 left-0.5 z-10 box-shadow-[0_0_10px_#8F664E]" />
    <motion.div className="absolute inset-0 rounded-full border border-bronze bg-bronze/30" animate={{ scale: [1, 3], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
  </div>
);

const SelectionNode: React.FC<{ label: string, selected: boolean, onClick: () => void }> = ({ label, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 text-[10px] font-mono uppercase tracking-wide border transition-all duration-300 ${selected ? 'bg-bronze text-black border-bronze shadow-[0_0_15px_rgba(143,102,78,0.4)]' : 'bg-[#0f0f0f] text-latte/60 border-coffee/40 hover:border-bronze hover:text-bronze'}`}
  >
    {label}
  </button>
);

const PowerSwitch: React.FC<{ options: string[], selected: string, onChange: (val: string) => void }> = ({ options, selected, onChange }) => (
  <div className="flex items-center gap-1 bg-black/40 border border-coffee/30 p-1 rounded-sm w-fit">
    {options.map((opt) => (
      <button
        key={opt}
        type="button"
        onClick={() => onChange(opt)}
        className={`relative px-6 py-2 text-[10px] font-mono transition-all duration-300 ${selected === opt ? 'text-bronze' : 'text-latte/30 hover:text-latte/60'}`}
      >
        {opt}
        {selected === opt && <motion.div layoutId="power-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-bronze" />}
      </button>
    ))}
  </div>
);

const MatrixInput: React.FC<{ label: string, value: string, onChange: (v: string) => void, placeholder: string, id: string, required?: boolean }> = ({ label, value, onChange, placeholder, id, required }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative group">
      <div className="flex justify-between items-center mb-2">
        <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-bronze/80">{label}</label>
        <span className="text-[8px] font-mono text-coffee/50">{id}</span>
      </div>
      <div className={`relative bg-black/80 border transition-all duration-300 min-h-[120px] p-4 ${isFocused ? 'border-bronze' : 'border-coffee/30'}`}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full h-full bg-transparent border-none outline-none font-mono text-bronze placeholder-coffee/40 text-sm resize-none"
          spellCheck={false}
          required={required}
        />
      </div>
    </div>
  );
};

const ReferralDropdown: React.FC<{ value: string, onChange: (v: string) => void, options: string[] }> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <label className="block text-[10px] font-mono tracking-[0.2em] mb-2 uppercase text-bronze/80">SOURCE_REFERRAL_ID</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black/60 border border-coffee/40 text-left p-3 flex justify-between items-center text-sm font-mono text-cream hover:border-bronze transition-colors"
      >
        {value || <span className="text-coffee/50">SELECT_SOURCE...</span>}
        <ChevronDown size={14} className={`text-bronze transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 w-full bg-black border border-coffee/40 z-50 mt-1 max-h-48 overflow-y-auto">
            {options.map(opt => (
              <button key={opt} type="button" onClick={() => { onChange(opt); setIsOpen(false); }} className="w-full text-left p-3 hover:bg-bronze/10 text-xs font-mono text-latte hover:text-bronze transition-colors border-b border-white/5 last:border-0">{opt}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    interests: [] as string[],
    skillLevel: 'INTERMEDIATE',
    learningGoals: '',
    motivation: '',
    referral: ''
  });

  const [status, setStatus] = useState<'IDLE' | 'UPLOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const interestOptions = ["ROBOTICS", "AI/ML", "IOT_SYSTEMS", "AUTOMATION", "SOFTWARE_DEV", "MECH_DESIGN", "CONTROL_SYS"];
  const skillOptions = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
  const referralSources = ["LINKEDIN_NETWORK", "INDUSTRY_EVENT", "ACADEMIC_PAPER", "SEARCH_PROTOCOL", "OTHER"];

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) ? prev.interests.filter(i => i !== interest) : [...prev.interests, interest]
    }));
  };

  const sendTelegramNotification = async (data: any) => {
    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    if (!token || !chatId) return;

    const message = `
🚀 *NEW OPERATIVE INITIALIZATION*
👤 *Name:* ${data.name}
🛠 *Interests:* ${data.interests.join(', ')}
📊 *Skill Level:* ${data.skill_level}
🎯 *Goals:* ${data.learning_goals}
💡 *Motivation:* ${data.motivation}
🔗 *Referral:* ${data.referral}
        `;

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' })
      });
    } catch (e) {
      console.error('Telegram notification failed', e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('UPLOADING');
    setUploadProgress(20);

    try {
      // 1. Supabase Uplink
      const { error: dbError } = await supabase.from('contact_submissions').insert([{
        name: formData.name,
        interests: formData.interests,
        skill_level: formData.skillLevel,
        learning_goals: formData.learningGoals,
        motivation: formData.motivation,
        referral: formData.referral
      }]);

      if (dbError) throw dbError;
      setUploadProgress(60);

      // 2. Telegram Uplink
      await sendTelegramNotification({
        ...formData,
        skill_level: formData.skillLevel,
        learning_goals: formData.learningGoals
      });
      setUploadProgress(100);

      // 3. Email Simulation (Optional placeholder)
      // console.log("Simulating Email Uplink to admin...");

      setTimeout(() => setStatus('SUCCESS'), 500);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || 'Transmission Interrupted');
      setStatus('ERROR');
    }
  };

  return (
    <section className="min-h-screen py-32 px-6 bg-void relative flex flex-col justify-center">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="container mx-auto h-full border-x border-bronze/10 grid grid-cols-12">
          {[...Array(11)].map((_, i) => <div key={i} className="border-r border-bronze/10 h-full" />)}
        </div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="mb-12 border-b border-coffee/30 pb-4">
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-bronze/70 tracking-widest uppercase">
            <Terminal size={14} /> RECRUITMENT_UPLINK_SYSTEM
          </div>
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-cream">OPERATIVE <span className="text-bronze">INITIALIZATION</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 bg-card/10 backdrop-blur-md border border-coffee/30 p-8 md:p-12">
            <AnimatePresence mode="wait">
              {status === 'IDLE' && (
                <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-12">
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest mb-4 uppercase text-bronze/80">IDENTITY_DESIGNATION</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full md:w-1/2 bg-black/60 border border-coffee/40 text-cream p-3 font-mono text-sm focus:border-bronze outline-none" placeholder="ENTER_NAME" required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest mb-4 uppercase text-bronze/80">PREFERENCE_NODES</label>
                    <div className="flex flex-wrap gap-3">
                      {interestOptions.map(tag => <SelectionNode key={tag} label={tag} selected={formData.interests.includes(tag)} onClick={() => toggleInterest(tag)} />)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest mb-4 uppercase text-bronze/80">TECHNICAL_LEVEL</label>
                    <PowerSwitch options={skillOptions} selected={formData.skillLevel} onChange={(v) => setFormData({ ...formData, skillLevel: v })} />
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <MatrixInput id="DTA-01" label="OBJECTIVE_STRING" value={formData.learningGoals} onChange={(v) => setFormData({ ...formData, learningGoals: v })} placeholder="ENTER_OBJECTIVES" required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <MatrixInput id="DTA-02" label="MOTIVATION_DATA" value={formData.motivation} onChange={(v) => setFormData({ ...formData, motivation: v })} placeholder="ENTER_MOTIVATION" />
                      <ReferralDropdown value={formData.referral} onChange={(v) => setFormData({ ...formData, referral: v })} options={referralSources} />
                    </div>
                  </div>
                  <div className="pt-8 border-t border-coffee/20 flex justify-end">
                    <button type="submit" className="bg-bronze hover:bg-cream text-black font-orbitron font-bold text-xs px-10 py-5 tracking-widest flex items-center gap-3 transition-colors">
                      <Send size={18} /> TRANSMIT_DATA_PACKET
                    </button>
                  </div>
                </motion.form>
              )}

              {status === 'UPLOADING' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[400px] flex flex-col items-center justify-center space-y-6">
                  <Loader2 className="animate-spin text-bronze" size={48} />
                  <div className="w-full max-w-xs">
                    <div className="flex justify-between font-mono text-[10px] text-bronze mb-2"><span>UPLOADING...</span><span>{uploadProgress}%</span></div>
                    <div className="h-1 bg-coffee/20 w-full"><motion.div className="h-full bg-bronze" initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} /></div>
                  </div>
                </motion.div>
              )}

              {status === 'SUCCESS' && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-[400px] flex flex-col items-center justify-center text-center p-12 border border-green-500/20 bg-green-500/5">
                  <CheckCircle size={64} className="text-green-500 mb-6" />
                  <h3 className="text-2xl font-orbitron text-white mb-2 uppercase">TRANSMISSION_SUCCESSFUL</h3>
                  <p className="font-mono text-green-500/60 text-xs">DATA_LOGGED_IN_CORE_ARCHIVE</p>
                  <button onClick={() => setStatus('IDLE')} className="mt-8 text-bronze font-mono text-[10px] hover:text-white underline">NEW_TRANSMISSION</button>
                </motion.div>
              )}

              {status === 'ERROR' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[400px] flex flex-col items-center justify-center text-center p-12 border border-red-500/20 bg-red-500/5">
                  <AlertCircle size={64} className="text-red-500 mb-6" />
                  <h3 className="text-2xl font-orbitron text-white mb-2 uppercase">UPLINK_FAILURE</h3>
                  <p className="font-mono text-red-500/60 text-xs">{errorMessage}</p>
                  <button onClick={() => setStatus('IDLE')} className="mt-8 px-6 py-2 border border-red-500 text-red-500 font-mono text-[10px] uppercase">RETRY_INITIALIZATION</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-card/20 border border-coffee/30 p-8">
              <div className="flex justify-between items-center mb-8">
                <span className="font-mono text-xs text-bronze tracking-widest flex items-center gap-2"><Activity size={14} /> SYSTEM_HEALTH</span>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-[10px] text-green-500 font-mono">ACTIVE</span></div>
              </div>
              <div className="space-y-6">
                <div><div className="flex justify-between text-[10px] font-mono text-latte/40 mb-1"><span>UPLINK_STABILITY</span><span>99.9%</span></div><PingGraph /></div>
                <div className="pt-6 border-t border-coffee/20 space-y-4 font-mono text-[10px] text-latte/60">
                  <div className="flex items-center gap-3"><Mail size={14} className="text-bronze" /> admin@hmrobotics.tech</div>
                  <div className="flex items-center gap-3"><MapPin size={14} className="text-bronze" /> SECTOR_03 // ADDIS_ABABA</div>
                </div>
              </div>
            </div>
            <div className="bg-black/60 border border-coffee/30 h-48 relative overflow-hidden flex items-center justify-center">
              <RadarPing />
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(143,102,78,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;