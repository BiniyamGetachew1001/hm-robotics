import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Database, Plus, Edit2, Trash2, LogOut,
    Save, X, Check, Loader2, Image as ImageIcon, Box, Activity
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useSupabaseCrud } from '../hooks/useSupabaseCrud';

const sectors = ["Industrial", "Defense", "Research", "Medical"];

const AdminDashboard = () => {
    const [tab, setTab] = useState<'projects' | 'services'>('projects');
    const { items, loading, error, fetchData, createRecord, updateRecord, deleteRecord } = useSupabaseCrud<any>(tab);
    
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [tab, fetchData]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem('hm_admin_session');
        navigate('/admin');
    };

    const handleDelete = async (id: string | number) => {
        if (!window.confirm('Wipe record from database? This cannot be undone.')) return;
        await deleteRecord('id', id);
    };

    const [jsonInput, setJsonInput] = useState('');

    useEffect(() => {
        if (editingItem && tab === 'projects') {
            setJsonInput(JSON.stringify(editingItem.stats || [], null, 2));
        }
    }, [editingItem, tab]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const { id, ...rest } = editingItem;
            let payload = { ...rest };

            if (tab === 'projects') {
                try {
                    payload.stats = JSON.parse(jsonInput); // Assuming stats maps to 'Tech Stack'
                } catch (err) {
                    alert("INVALID_JSON: Please check your tech stack formatting.");
                    setIsSaving(false);
                    return;
                }
            }

            const exists = items.some(i => i.id === id);
            
            let res;
            if (exists) {
                res = await updateRecord('id', id, payload);
            } else {
                if (tab === 'projects') payload.id = id;
                res = await createRecord(payload);
            }

            if (res.error) {
                alert(`DB_ERROR: ${res.error}`);
            } else {
                setEditingItem(null);
            }
        } catch (err: any) {
            console.error("System Error:", err);
            alert(`SYSTEM_ERROR: ${err.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <section className="min-h-screen pt-32 pb-20 px-6 bg-[#050505] relative flex flex-col items-center">
            <div className="container mx-auto max-w-7xl relative z-10">

                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-coffee/20 pb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-bronze/10 border border-bronze/30">
                            <LayoutDashboard className="text-bronze" size={24} />
                        </div>
                        <div>
                            <h1 className="font-orbitron font-bold text-3xl text-cream tracking-wider uppercase">COMMAND_CENTER</h1>
                            <p className="font-mono text-[10px] text-latte/40 uppercase tracking-widest mt-1">Status: Authorized // Uplink Active</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setTab('projects')}
                            className={`px-6 py-2 font-mono text-xs uppercase tracking-widest border transition-all ${tab === 'projects' ? 'bg-bronze text-black border-bronze' : 'border-coffee/30 text-latte/50 hover:border-bronze/50'}`}
                        >
                            Projects
                        </button>
                        <button
                            onClick={() => setTab('services')}
                            className={`px-6 py-2 font-mono text-xs uppercase tracking-widest border transition-all ${tab === 'services' ? 'bg-bronze text-black border-bronze' : 'border-coffee/30 text-latte/50 hover:border-bronze/50'}`}
                        >
                            Services
                        </button>
                        <button
                            onClick={handleSignOut}
                            className="p-2 border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors"
                            title="LOG_OUT"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-8">

                    {/* List Controls */}
                    <div className="flex justify-between items-center bg-card/10 border border-coffee/20 p-4">
                        <div className="flex items-center gap-3 font-mono text-xs text-latte/60">
                            <Database size={14} className="text-bronze" />
                            RECORDCOUNT: {items.length}
                        </div>
                        <button
                            onClick={() => setEditingItem(tab === 'projects' ? { id: '', title: '', client: '', category: '', sector: 'Industrial', image: '', size: 'medium', coordinates: '', power: '', uptime: '', description: '', stats: [] } : { title: '', description: '', icon: 'Cog', features: [] })}
                            className="flex items-center gap-2 bg-bronze hover:bg-cream text-black font-orbitron font-bold text-[10px] px-4 py-2 tracking-widest transition-colors"
                        >
                            <Plus size={14} />
                            NEW_RECORD
                        </button>
                    </div>

                    {/* Data List */}
                    {loading ? (
                        <div className="h-64 flex flex-col items-center justify-center gap-4 border border-coffee/10 bg-card/5">
                            <Loader2 className="text-bronze animate-spin" size={32} />
                            <span className="font-mono text-[10px] text-bronze uppercase animate-pulse">Querying_Database...</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    className="bg-card/20 border border-coffee/30 p-6 flex flex-col hover:border-bronze/50 transition-colors group"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="font-mono text-[10px] text-bronze/70">{tab === 'projects' ? item.id : 'MOD-' + item.id.slice(0, 4)}</div>
                                        <div className="flex gap-2">
                                            <button onClick={() => setEditingItem(item)} className="p-2 border border-coffee/30 text-latte/40 hover:text-bronze hover:border-bronze transition-colors">
                                                <Edit2 size={14} />
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="p-2 border border-coffee/30 text-latte/40 hover:text-red-500 hover:border-red-500 transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="font-orbitron font-bold text-cream text-lg mb-2">{item.title}</h3>
                                    <p className="text-latte/50 text-[10px] line-clamp-2 mb-4 font-sans">{item.description}</p>
                                    <div className="mt-auto pt-4 border-t border-coffee/20 flex justify-between items-center font-mono text-[9px] text-latte/30">
                                        <span>TRACKED_SINCE: {new Date(item.created_at).toLocaleDateString()}</span>
                                        <span className="text-bronze">{tab === 'projects' ? item.sector : 'ACTIVE'}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for Editing/Creation */}
            <AnimatePresence>
                {editingItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-void/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="w-full max-w-4xl bg-card border border-bronze p-8 max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-8 border-b border-coffee/20 pb-4">
                                <h2 className="font-orbitron font-bold text-xl text-cream uppercase">RECORD_CONFIGURATION</h2>
                                <button onClick={() => setEditingItem(null)} className="text-latte/40 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {tab === 'projects' && (
                                        <div>
                                            <label className="block text-[10px] font-mono text-bronze uppercase mb-2">PROJECT_ID (e.g., PRJ-01)</label>
                                            <input
                                                type="text"
                                                value={editingItem.id}
                                                onChange={(e) => setEditingItem({ ...editingItem, id: e.target.value })}
                                                disabled={!!items.find(i => i.id === editingItem.id)}
                                                className="w-full bg-black/60 border border-coffee/40 text-cream p-3 font-mono text-sm focus:border-bronze outline-none"
                                            />
                                        </div>
                                    )}
                                    <div className={tab === 'services' ? 'md:col-span-2' : ''}>
                                        <label className="block text-[10px] font-mono text-bronze uppercase mb-2">RECORD_TITLE</label>
                                        <input
                                            type="text"
                                            value={editingItem.title}
                                            onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                                            className="w-full bg-black/60 border border-coffee/40 text-cream p-3 font-mono text-sm focus:border-bronze outline-none"
                                            required
                                        />
                                    </div>

                                    {tab === 'projects' && (
                                        <>
                                            <div>
                                                <label className="block text-[10px] font-mono text-bronze uppercase mb-2">CLIENT_ENTITY</label>
                                                <input type="text" value={editingItem.client} onChange={(e) => setEditingItem({ ...editingItem, client: e.target.value })} className="w-full bg-black/60 border border-coffee/40 text-white p-3 font-mono text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-mono text-bronze uppercase mb-2">SECTOR_ID</label>
                                                <select value={editingItem.sector} onChange={(e) => setEditingItem({ ...editingItem, sector: e.target.value })} className="w-full bg-black/60 border border-coffee/40 text-white p-3 font-mono text-sm uppercase">
                                                    {sectors.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] font-mono text-bronze uppercase mb-2">IMAGE URL (Source)</label>
                                                <input type="url" value={editingItem.image} onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })} className="w-full bg-black/60 border border-coffee/40 text-white p-3 font-mono text-sm focus:border-bronze outline-none" required />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] font-mono text-bronze uppercase mb-2">TECH STACK / STATS (JSON Format)</label>
                                                <div className="mb-2 text-latte/50 text-xs font-sans">
                                                    Format items like: <code>[{`{"label": "Language", "value": "Python", "icon": "Code"}`}]</code>
                                                </div>
                                                <textarea
                                                    value={jsonInput}
                                                    onChange={(e) => setJsonInput(e.target.value)}
                                                    className="w-full bg-black/60 border border-coffee/40 text-white p-3 font-mono text-xs min-h-[100px] focus:border-bronze outline-none"
                                                />
                                            </div>
                                        </>
                                    )}

                                    {tab === 'services' && (
                                        <>
                                            <div>
                                                <label className="block text-[10px] font-mono text-bronze uppercase mb-2">SYMBOL_IDENTIFIER (Icon)</label>
                                                <select value={editingItem.icon} onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })} className="w-full bg-black/60 border border-coffee/40 text-white p-3 font-mono text-sm">
                                                    {['Cog', 'BrainCircuit', 'Factory', 'ShieldCheck', 'Cpu'].map(i => <option key={i} value={i}>{i}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-mono text-bronze uppercase mb-2">SYSTEM_PRIORITY (Order)</label>
                                                <input type="number" value={editingItem.order_index} onChange={(e) => setEditingItem({ ...editingItem, order_index: parseInt(e.target.value) })} className="w-full bg-black/60 border border-coffee/40 text-white p-3 font-mono text-sm" />
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-mono text-bronze uppercase mb-2">FUNCTIONAL_DESCRIPTION</label>
                                    <textarea
                                        value={editingItem.description}
                                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                        className="w-full bg-black/60 border border-coffee/40 text-cream p-4 font-mono text-sm min-h-[120px] focus:border-bronze outline-none resize-none"
                                        required
                                    />
                                </div>

                                <div className="flex justify-end gap-4 mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setEditingItem(null)}
                                        className="px-8 py-3 border border-coffee/40 text-latte/50 hover:text-white transition-colors uppercase font-orbitron text-[10px] tracking-widest"
                                    >
                                        ABORT
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="px-8 py-3 bg-bronze text-black hover:bg-cream transition-all font-orbitron font-bold text-[10px] tracking-widest flex items-center gap-2"
                                    >
                                        {isSaving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                                        COMMIT_TO_LEDGER
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default AdminDashboard;
