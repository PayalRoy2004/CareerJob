import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Users, Zap } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass-card"
        style={{ flex: 1, minWidth: '200px' }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '10px', background: `${color}20`, color: color }}>
                <Icon size={24} />
            </div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{label}</span>
        </div>
        <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{value}</div>
    </motion.div>
);

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ padding: '1rem' }}
        >
            <section className="hero-section" style={{ borderRadius: '24px', marginBottom: '2rem' }}>
                <motion.h1
                    className="hero-title"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                >
                    Elevate Your <span className="gradient-text">Career Journey</span>
                </motion.h1>
                <p className="hero-subtitle">
                    The all-in-one platform for job hunters, coding enthusiasts, and career growthers.
                    Master your skills and land your dream job.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <button className="btn-primary">Browse Jobs <Rocket size={18} /></button>
                    <button className="glass-card" style={{ padding: '0.75rem 1.5rem', cursor: 'pointer', fontWeight: 600 }}>Mock Tests</button>
                </div>
            </section>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <StatCard icon={Target} label="Jobs Applied" value="12" color="#8b5cf6" />
                <StatCard icon={Zap} label="Mock Test Score" value="88%" color="#06b6d4" />
                <StatCard icon={Users} label="Interviews Scheduled" value="3" color="#f59e0b" />
                <StatCard icon={Rocket} label="Skills Mastered" value="6" color="#10b981" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div className="glass-card" style={{ minHeight: '300px' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Zap size={20} className="gradient-text" /> Upcoming Company Drives
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { company: 'Google', role: 'Software Engineer', date: '24 Feb', status: 'Applications Open' },
                            { company: 'Microsoft', role: 'Product Manager', date: '28 Feb', status: 'Closing Soon' },
                            { company: 'Amazon', role: 'Cloud Architect', date: '02 Mar', status: 'Trending' }
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)' }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{item.company}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.role}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.date}</div>
                                    <span className={`badge ${item.status === 'Closing Soon' ? 'badge-purple' : 'badge-cyan'}`}>{item.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card">
                    <h3 style={{ marginBottom: '1.5rem' }}>Recent Notifications</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            'New DSA problems added!',
                            'Your resume was viewed by Tesla',
                            'Mock Test 7 results are out',
                            'Interview experience: Netflix'
                        ].map((text, i) => (
                            <div key={i} style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', marginTop: '6px' }}></div>
                                {text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Home;
