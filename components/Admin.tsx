import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Shield, Lock, ArrowRight, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Admin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // DEFAULT CREDENTIALS OVERRIDE
        if (email === 'admin@hmrobotics.tech' && password === 'admin123') {
            localStorage.setItem('hm_admin_session', 'active');
            navigate('/admin/dashboard');
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else if (data.session) {
            localStorage.setItem('hm_admin_session', 'active');
            navigate('/admin/dashboard');
        }
    };

    return (
        <section className="min-h-screen pt-32 pb-20 px-6 bg-void relative flex items-center justify-center">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(143,102,78,0.1),transparent_70%)] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-card/10 backdrop-blur-xl border border-coffee/30 p-8 relative overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center gap-3 mb-8 border-b border-coffee/20 pb-4">
                    <Shield className="text-bronze" size={24} />
                    <h1 className="font-orbitron font-bold text-xl text-cream tracking-[0.2em] uppercase">SYSTEM_ACCESS</h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-mono text-bronze uppercase tracking-widest mb-2">AUTH_IDENTIFIER</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/60 border border-coffee/40 text-cream p-3 pl-10 font-mono text-sm focus:border-bronze focus:outline-none transition-colors"
                                placeholder="ENTER_EMAIL"
                                required
                            />
                            <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee" size={16} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-mono text-bronze uppercase tracking-widest mb-2">ENCRYPTION_KEY</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/60 border border-coffee/40 text-cream p-3 pl-10 font-mono text-sm focus:border-bronze focus:outline-none transition-colors"
                                placeholder="ENTER_PASSWORD"
                                required
                            />
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee" size={16} />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-500 font-mono text-[10px] uppercase">
                            <AlertTriangle size={14} />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-bronze hover:bg-cream text-black font-orbitron font-bold tracking-[0.2em] flex items-center justify-center gap-2 group transition-all duration-300 disabled:opacity-50"
                    >
                        {loading ? 'AUTHENTICATING...' : (
                            <>
                                INITIALIZE_KEY_ENTRY
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-4 border-t border-coffee/20 text-center">
                    <span className="font-mono text-[8px] text-latte/30 uppercase tracking-[0.3em]">SECURE_UPLINK_TERMINAL_V.4.0.1</span>
                </div>
            </motion.div>
        </section>
    );
};

export default Admin;
