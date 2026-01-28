import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Terminal, CheckCircle, Activity, Radio, ChevronDown, Check } from 'lucide-react';

// --- Shared Components for Layout Continuity ---

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
            times: [0, 0.2, 0.5, 0.8, 1]
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
    <motion.div className="absolute inset-0 rounded-full border border-bronze bg-bronze/10" animate={{ scale: [1, 5], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
  </div>
);

// --- New Form Components ---

// 1. Selection Node (Interests)
const SelectionNode = ({ label, selected, onClick }: { label: string, selected: boolean, onClick: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
                relative px-4 py-2 text-xs font-mono uppercase tracking-wide border transition-all duration-300
                ${selected
          ? 'bg-bronze text-black border-bronze shadow-[0_0_15px_rgba(143,102,78,0.4)]'
          : 'bg-[#0f0f0f] text-latte/60 border-coffee/40 hover:border-bronze hover:text-bronze'
        }
            `}
    >
      {label}
    </button>
  );
};

// 2. Power Switch (Skill Level)
const PowerSwitch = ({ options, selected, onChange }: { options: string[], selected: string, onChange: (val: string) => void }) => {
  return (
    <div className="flex items-center gap-1 bg-black/40 border border-coffee/30 p-1 rounded-sm w-fit">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`
                        relative px-6 py-2 text-xs font-mono transition-all duration-300
                        ${selected === opt ? 'text-bronze' : 'text-latte/30 hover:text-latte/60'}
                    `}
        >
          {opt}
          {selected === opt && (
            <motion.div
              layoutId="power-underline"
              className="absolute bottom-0 left-0 w-full h-[2px] bg-bronze shadow-[0_0_10px_#8F664E]"
            />
          )}
        </button>
      ))}
    </div>
  );
};

// 3. Data Matrix Input (Text Area)
const MatrixInput = ({ label, value, onChange, placeholder, id }: { label: string, value: string, onChange: (v: string) => void, placeholder: string, id: string }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      <div className="flex justify-between items-center mb-2">
        <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-bronze/80">{label}</label>
        <span className="text-[8px] font-mono text-coffee/50">{id}</span>
      </div>

      <div className={`
                relative bg-black/80 border transition-all duration-300 min-h-[120px] p-4
                ${isFocused ? 'border-bronze shadow-[inset_0_0_20px_rgba(143,102,78,0.1)]' : 'border-coffee/30'}
             `}>
        {/* L-Brackets */}
        <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors ${isFocused ? 'border-bronze' : 'border-coffee'}`} />
        <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r transition-colors ${isFocused ? 'border-bronze' : 'border-coffee'}`} />
        <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l transition-colors ${isFocused ? 'border-bronze' : 'border-coffee'}`} />
        <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors ${isFocused ? 'border-bronze' : 'border-coffee'}`} />

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full h-full bg-transparent border-none outline-none font-mono text-bronze placeholder-coffee/40 text-sm resize-none"
          spellCheck={false}
        />

        {/* Blinking Cursor at end logic simulated simply */}
        {isFocused && value.length > 0 && (
          <span className="animate-pulse text-bronze absolute bottom-4 right-4">_</span>
        )}
      </div>
    </div>
  );
};

// 4. Custom Dropdown
const ReferralDropdown = ({ value, onChange, options }: { value: string, onChange: (v: string) => void, options: string[] }) => {
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
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-black border border-coffee/40 z-50 mt-1 max-h-48 overflow-y-auto"
          >
            {options.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className="w-full text-left p-3 hover:bg-bronze/10 text-xs font-mono text-latte hover:text-bronze transition-colors border-b border-white/5 last:border-0"
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const Contact: React.FC = () => {
  // State
  const [formData, setFormData] = useState({
    name: '',
    interests: [] as string[],
    skillLevel: 'INTERMEDIATE',
    learningGoals: '',
    motivation: '',
    referral: ''
  });

  const [status, setStatus] = useState<'IDLE' | 'UPLOADING' | 'SUCCESS'>('IDLE');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const interestOptions = ["ROBOTICS", "AI/ML", "IOT_SYSTEMS", "AUTOMATION", "SOFTWARE_DEV", "MECH_DESIGN", "CONTROL_SYS"];
  const skillOptions = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
  const referralSources = ["LINKEDIN_NETWORK", "INDUSTRY_EVENT", "ACADEMIC_PAPER", "SEARCH_PROTOCOL", "OTHER"];

  // Handlers
  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors = { ...newErrors, name: true };
    if (formData.interests.length === 0) newErrors = { ...newErrors, interests: true };
    if (!formData.learningGoals) newErrors = { ...newErrors, learningGoals: true };
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('UPLOADING');
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setStatus('SUCCESS'), 500);
      }
      setUploadProgress(progress);
    }, 200);
  };

  return (
    <section className="min-h-screen py-32 px-6 bg-void relative flex flex-col justify-center">
      {/* Global Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="container mx-auto h-full border-x border-bronze/10 grid grid-cols-12">
          {[...Array(11)].map((_, i) => <div key={i} className="border-r border-bronze/10 h-full" />)}
        </div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-b border-coffee/30 pb-4 flex justify-between items-end"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Terminal size={16} className="text-bronze" />
              <span className="text-bronze/70 font-mono text-xs tracking-widest">RECRUITMENT_UPLINK_V.2.1</span>
            </div>
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-cream">
              OPERATIVE <span className="text-bronze">INITIALIZATION</span>
            </h1>
          </div>
        </motion.div>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* --- MAIN FORM TERMINAL (8 Cols) --- */}
          <div className="lg:col-span-8 bg-card/10 backdrop-blur-md border border-coffee/30 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bronze/5 to-transparent h-[10%] animate-[scan_6s_linear_infinite] pointer-events-none" />

            <div className="p-8 md:p-12 relative">
              <AnimatePresence mode="wait">
                {status === 'IDLE' && (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-12"
                  >
                    {/* Identity Block */}
                    <div>
                      <div className="flex justify-between items-end mb-4 border-b border-coffee/20 pb-2">
                        <h3 className="font-orbitron text-lg text-cream">IDENTITY & PREFERENCES</h3>
                        <span className="font-mono text-[10px] text-bronze/50">SEC_01</span>
                      </div>

                      <div className={`space-y-6 ${errors.name ? 'border-l-2 border-red-500 pl-4 transition-all' : ''}`}>
                        <div className="w-full md:w-1/2">
                          <label className="block text-[10px] font-mono tracking-[0.2em] mb-2 uppercase text-bronze/80">OPERATIVE_NAME {errors.name && <span className="text-red-500 ml-2">REQUIRED</span>}</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-black/60 border border-coffee/40 text-cream p-3 font-mono text-sm focus:border-bronze focus:outline-none"
                            placeholder="ENTER_FULL_DESIGNATION..."
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono tracking-[0.2em] mb-3 uppercase text-bronze/80">SYSTEM_INTEREST_TAGS {errors.interests && <span className="text-red-500 ml-2">SELECT_AT_LEAST_ONE</span>}</label>
                          <div className="flex flex-wrap gap-3">
                            {interestOptions.map(tag => (
                              <SelectionNode
                                key={tag}
                                label={tag}
                                selected={formData.interests.includes(tag)}
                                onClick={() => toggleInterest(tag)}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Skill Power Switch */}
                    <div>
                      <div className="flex justify-between items-end mb-4 border-b border-coffee/20 pb-2">
                        <h3 className="font-orbitron text-lg text-cream">TECHNICAL POTENTIAL</h3>
                        <span className="font-mono text-[10px] text-bronze/50">SEC_02</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <span className="text-xs font-mono text-latte/60 uppercase">Base Proficiency Level:</span>
                        <PowerSwitch
                          options={skillOptions}
                          selected={formData.skillLevel}
                          onChange={(v) => setFormData({ ...formData, skillLevel: v })}
                        />
                      </div>
                    </div>

                    {/* Data Matrix */}
                    <div>
                      <div className="flex justify-between items-end mb-4 border-b border-coffee/20 pb-2">
                        <h3 className="font-orbitron text-lg text-cream">DATA MATRIX</h3>
                        <span className="font-mono text-[10px] text-bronze/50">SEC_03</span>
                      </div>
                      <div className="grid grid-cols-1 gap-6">
                        <div className={errors.learningGoals ? 'border-l-2 border-red-500 pl-4' : ''}>
                          <MatrixInput
                            id="INPUT-01"
                            label="OBJECTIVE_PARAMETERS"
                            value={formData.learningGoals}
                            onChange={(v) => setFormData({ ...formData, learningGoals: v })}
                            placeholder="DEFINE LEARNING OBJECTIVES AND DESIRED SYSTEM OUTCOMES..."
                          />
                          {errors.learningGoals && <p className="text-[10px] text-red-500 font-mono mt-1">DATA_ERROR: INPUT_REQUIRED</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <MatrixInput
                            id="INPUT-02"
                            label="MOTIVATION_STRING"
                            value={formData.motivation}
                            onChange={(v) => setFormData({ ...formData, motivation: v })}
                            placeholder="INPUT DRIVING FACTORS..."
                          />
                          <div className="flex flex-col justify-end">
                            <ReferralDropdown
                              value={formData.referral}
                              onChange={(v) => setFormData({ ...formData, referral: v })}
                              options={referralSources}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="pt-6 border-t border-coffee/20 flex justify-end">
                      <button
                        type="submit"
                        className="group relative bg-bronze hover:bg-cream text-black font-orbitron font-bold text-sm px-10 py-5 tracking-widest transition-all duration-300 clip-path-polygon-[0_0,100%_0,100%_80%,90%_100%,0_100%]"
                      >
                        <div className="flex items-center gap-3">
                          <Send size={18} className="group-hover:rotate-45 transition-transform" />
                          TRANSMIT DATA PACKET
                        </div>
                      </button>
                    </div>
                  </motion.form>
                )}

                {status === 'UPLOADING' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-[400px] flex flex-col items-center justify-center space-y-4"
                  >
                    <div className="w-2/3 max-w-sm">
                      <div className="flex justify-between text-xs font-mono text-bronze mb-2">
                        <span>UPLOADING TELEMETRY...</span>
                        <span>{Math.round(uploadProgress)}%</span>
                      </div>
                      <div className="h-1 bg-coffee/20 w-full">
                        <motion.div className="h-full bg-bronze" style={{ width: `${uploadProgress}%` }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {status === 'SUCCESS' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-[400px] flex flex-col items-center justify-center text-center p-12 border border-green-500/20 bg-green-500/5"
                  >
                    <div className="mb-6 relative">
                      <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-20 animate-pulse" />
                      <CheckCircle size={64} className="text-green-500 relative z-10" />
                    </div>
                    <h3 className="text-3xl font-orbitron text-white mb-2">TRANSMISSION SUCCESSFUL</h3>
                    <p className="font-mono text-green-400 text-sm">OPERATIVE DATA LOGGED. AWAITING RECRUITMENT PROTOCOLS.</p>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

          {/* --- SIDEBAR INTELLIGENCE (4 Cols) --- */}
          <div className="lg:col-span-4 space-y-8 h-fit sticky top-32">

            {/* Reuse Existing Status Modules from previous prompt for continuity */}
            <div className="bg-black/40 border border-coffee/30 aspect-square relative overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center grayscale contrast-125 brightness-50 opacity-60"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577086664693-894553e27f56?auto=format&fit=crop&q=80&w=1000)' }}
              />
              <div className="absolute inset-0 bg-bronze/10 mix-blend-overlay" />
              <div className="absolute inset-0 bg-[linear-gradient(transparent_98%,rgba(143,102,78,0.3)_98%),linear-gradient(90deg,transparent_98%,rgba(143,102,78,0.3)_98%)] bg-[size:30px_30px]" />
              <RadarPing />
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur border border-coffee/40 p-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-bronze mt-1" />
                  <div>
                    <h4 className="font-orbitron text-cream text-lg leading-none">ADDIS ABABA</h4>
                    <p className="font-mono text-[10px] text-latte/60 mt-1">SECTOR 03 // BOLE</p>
                    <p className="font-mono text-[10px] text-bronze mt-1">09.0054° N, 38.7636° E</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card/20 border border-coffee/30 p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-xs text-bronze tracking-widest flex items-center gap-2">
                  <Activity size={14} />
                  NET_STATUS
                </span>
                <div className="flex items-center gap-2 px-2 py-1 bg-green-900/20 border border-green-900/50 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse" />
                  <span className="text-[10px] text-green-500 font-mono uppercase tracking-wide">ONLINE</span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-latte/40 mb-1">
                    <span>UPLINK_STABILITY</span>
                    <span>99.9%</span>
                  </div>
                  <PingGraph />
                </div>

                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div className="flex items-center gap-3 text-latte/60">
                    <Mail size={14} />
                    <span className="font-mono text-xs">recruitment@hmrobotics.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-latte/60">
                    <Phone size={14} />
                    <span className="font-mono text-xs">+251 911 234 567</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;