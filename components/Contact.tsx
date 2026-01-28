import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Terminal, CheckCircle, AlertTriangle, Radio, Activity, ShieldCheck, Wifi } from 'lucide-react';

// --- Components ---

const PingGraph = () => {
  return (
    <div className="flex items-end gap-[2px] h-8 w-full mt-2 opacity-50">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-bronze"
          animate={{
            height: ["10%", "60%", "30%", "80%", "20%"],
          }}
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

const RadarPing = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
      <div className="w-3 h-3 bg-bronze rounded-full absolute top-0.5 left-0.5 z-10 box-shadow-[0_0_10px_#8F664E]" />
      <motion.div
        className="absolute inset-0 rounded-full border border-bronze bg-bronze/30"
        animate={{ scale: [1, 3], opacity: [1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border border-bronze bg-bronze/10"
        animate={{ scale: [1, 5], opacity: [1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
      />
    </div>
  );
};

const TerminalInput = ({
  label, value, onChange, placeholder, type = "text", required = false, error = false, multiline = false
}: {
  label: string, value: string, onChange: (val: string) => void, placeholder: string, type?: string, required?: boolean, error?: boolean, multiline?: boolean
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Typing sound simulation hook could go here (omitted for pure React simplicity)

  const baseClasses = `
        w-full bg-black/60 border text-cream p-4 font-mono text-sm tracking-wide transition-all duration-300
        focus:outline-none focus:bg-black/80
        ${error ? 'border-red-500/80 animate-pulse bg-red-950/10' : 'border-coffee/40 focus:border-bronze focus:shadow-[0_0_15px_rgba(143,102,78,0.2)]'}
    `;

  return (
    <div className="relative group">
      <label className={`block text-[10px] font-mono tracking-[0.2em] mb-2 uppercase transition-colors ${error ? 'text-red-500' : 'text-bronze/80 group-focus-within:text-bronze'}`}>
        {label} {required && '*'} {error && <span className="ml-2 text-red-400 font-bold">// ERR_MISSING_FIELD</span>}
      </label>

      <div className="relative">
        {/* Decoration corners */}
        <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors ${isFocused ? 'border-bronze' : 'border-white/10'}`} />
        <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r transition-colors ${isFocused ? 'border-bronze' : 'border-white/10'}`} />
        <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l transition-colors ${isFocused ? 'border-bronze' : 'border-white/10'}`} />
        <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors ${isFocused ? 'border-bronze' : 'border-white/10'}`} />

        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`${baseClasses} min-h-[150px] resize-none`}
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={baseClasses}
            placeholder={placeholder}
          />
        )}

        {/* Blinking Cursor Indicator (Visual flair) */}
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-4 bg-bronze pointer-events-none"
          />
        )}
      </div>
    </div>
  );
};


const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'IDLE' | 'UPLOADING' | 'SUCCESS'>('IDLE');
  const [uploadProgress, setUploadProgress] = useState(0);

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    if (!formState.name) newErrors.name = true;
    if (!formState.email) newErrors.email = true;
    if (!formState.message) newErrors.message = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Haptic visual feedback
    const btn = document.getElementById('transmit-btn');
    if (btn) {
      btn.animate([
        { transform: 'translate(1px, 1px) rotate(0deg)' },
        { transform: 'translate(-1px, -2px) rotate(-1deg)' },
        { transform: 'translate(-3px, 0px) rotate(1deg)' },
        { transform: 'translate(3px, 2px) rotate(0deg)' },
        { transform: 'translate(1px, -1px) rotate(1deg)' },
        { transform: 'translate(0, 0)' }
      ], { duration: 200 });
    }

    if (!validate()) return;

    setStatus('UPLOADING');

    // Simulate upload
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setStatus('SUCCESS'), 500);
      }
      setUploadProgress(progress);
    }, 300);
  };

  return (
    <section className="min-h-screen py-32 px-6 bg-void relative overflow-hidden flex flex-col justify-center">
      {/* Dark, Noisy Background */}
      <div className="absolute inset-0 bg-[#050505] opacity-90" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(143,102,78,0.1),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-b border-coffee/30 pb-4 flex justify-between items-end"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Radio size={16} className="text-bronze animate-pulse" />
              <span className="text-bronze/70 font-mono text-xs tracking-widest">SECURE_UPLINK_V.4.0</span>
            </div>
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-cream">
              ESTABLISH <span className="text-bronze">CONNECTION</span>
            </h1>
          </div>

          {/* Encryption Key Decorative */}
          <div className="hidden md:block text-right">
            <p className="font-mono text-[10px] text-latte/30">ENCRYPTION: RSA-4096-AES-GCM</p>
            <p className="font-mono text-[10px] text-latte/30">KEY_EXCHANGE: ECDH-P384</p>
          </div>
        </motion.div>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Main Terminal Form */}
          <div className="lg:col-span-8 bg-card/10 backdrop-blur-md border border-coffee/30 p-1 relative overflow-hidden">
            {/* Scanning Line overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bronze/5 to-transparent h-[20%] animate-[scan_4s_linear_infinite] pointer-events-none" />

            <div className="bg-void/80 p-8 md:p-12 relative h-full">
              <AnimatePresence mode="wait">
                {status === 'IDLE' && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <TerminalInput
                        label="OPERATIVE ID"
                        placeholder="ENTER_NAME"
                        value={formState.name}
                        onChange={(v) => setFormState({ ...formState, name: v })}
                        required
                        error={errors.name}
                      />
                      <TerminalInput
                        label="AFFILIATION"
                        placeholder="CORPORATE_ENTITY (OPTIONAL)"
                        value={formState.company}
                        onChange={(v) => setFormState({ ...formState, company: v })}
                      />
                    </div>

                    <TerminalInput
                      label="SECURE COMM CHANNEL"
                      placeholder="EMAIL_ADDRESS"
                      type="email"
                      value={formState.email}
                      onChange={(v) => setFormState({ ...formState, email: v })}
                      required
                      error={errors.email}
                    />

                    <TerminalInput
                      label="DATA PAYLOAD"
                      placeholder="ENCRYPTED_MESSAGE_BODY..."
                      multiline
                      value={formState.message}
                      onChange={(v) => setFormState({ ...formState, message: v })}
                      required
                      error={errors.message}
                    />

                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        id="transmit-btn"
                        className="group relative px-8 py-4 bg-bronze text-void font-orbitron font-bold tracking-[0.2em] overflow-hidden hover:bg-cream transition-colors duration-300"
                      >
                        <div className="absolute inset-0 flex items-center justify-center bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative z-10 flex items-center gap-2">
                          <Send size={18} />
                          TRANSMIT DATA
                        </span>
                      </button>
                    </div>
                  </motion.form>
                )}

                {status === 'UPLOADING' && (
                  <motion.div
                    key="uploading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full min-h-[400px] flex flex-col items-center justify-center space-y-8"
                  >
                    <div className="w-full max-w-md space-y-2">
                      <div className="flex justify-between text-xs font-mono text-bronze uppercase">
                        <span>Encrypting Data Packet...</span>
                        <span>{Math.round(uploadProgress)}%</span>
                      </div>
                      <div className="h-2 bg-coffee/20 w-full overflow-hidden">
                        <motion.div
                          className="h-full bg-bronze"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <div className="font-mono text-[10px] text-latte/40 truncate">
                        HASH: {Math.random().toString(36).substring(7)}...
                      </div>
                    </div>
                  </motion.div>
                )}

                {status === 'SUCCESS' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-green-500/5 border border-green-500/20"
                  >
                    <div className="w-24 h-24 rounded-full border-2 border-green-900 flex items-center justify-center mb-6 relative">
                      <div className="absolute inset-0 border border-green-500 rounded-full animate-ping opacity-20" />
                      <CheckCircle size={48} className="text-green-500" />
                    </div>
                    <h3 className="text-3xl font-orbitron text-white mb-2">SEQUENCE COMPLETE</h3>
                    <p className="text-green-400 font-mono text-sm tracking-wide">
                      ENCRYPTED SIGNAL RECEIVED BY HQ.
                      <br />STANDBY FOR RESPONSE.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar / Info Deck */}
          <div className="lg:col-span-4 space-y-8">

            {/* Map Module */}
            <div className="bg-black/40 border border-coffee/30 aspect-square relative overflow-hidden group">
              {/* Map Image (Stylized dark map base) */}
              <div
                className="absolute inset-0 bg-cover bg-center grayscale contrast-125 brightness-50 opacity-60"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577086664693-894553e27f56?auto=format&fit=crop&q=80&w=1000)' }}
              />
              <div className="absolute inset-0 bg-bronze/10 mix-blend-overlay" />

              {/* Map Grid Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_98%,rgba(143,102,78,0.3)_98%),linear-gradient(90deg,transparent_98%,rgba(143,102,78,0.3)_98%)] bg-[size:30px_30px]" />

              {/* Radar Ping at Location */}
              <RadarPing />

              {/* Corner UI */}
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

            {/* System Status Module */}
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

                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3 text-latte/60 hover:text-bronze transition-colors cursor-pointer group">
                    <div className="p-2 border border-coffee/30 rounded bg-void/50 group-hover:border-bronze/50 transition-colors">
                      <Mail size={16} />
                    </div>
                    <div className="flex-1">
                      <span className="block text-[10px] uppercase font-mono tracking-widest opacity-50">Secure Mail</span>
                      <span className="font-sans text-sm">hello@hmrobotics.com</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-latte/60 hover:text-bronze transition-colors cursor-pointer group">
                  <div className="p-2 border border-coffee/30 rounded bg-void/50 group-hover:border-bronze/50 transition-colors">
                    <Phone size={16} />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[10px] uppercase font-mono tracking-widest opacity-50">Voice Link</span>
                    <span className="font-sans text-sm">+251 911 234 567</span>
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