import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Users, Zap, UserCheck } from 'lucide-react';
import tcsLogo from '../assets/TCS-Icon-Logo-PNG.png';
import infosysLogo from '../assets/infosys.png';
import wiproLogo from '../assets/Wipro.png';

const StatCard = ({ icon: Icon, label, value, color, subText, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: delay || 0 }}
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
        <div style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: subText ? '0.2rem' : '0' }}>{value}</div>
        {subText && <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{subText}</div>}
    </motion.div>
);

const Home = () => {
    const user = { name: "Payal" }; // Mock user data

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
                    Welcome back, <span className="gradient-text">{user.name}</span>
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
                <StatCard icon={Target} label="Jobs Applied" value="12" color="#8b5cf6" subText="+3 this week" delay={0.1} />
                <StatCard icon={Zap} label="Mock Test Score" value="88%" color="#06b6d4" subText="Last Test: DSA Mock #4" delay={0.2} />
                <StatCard icon={Users} label="Interviews Scheduled" value="3" color="#f59e0b" subText="Next: TCS (Mar 28)" delay={0.3} />
                <StatCard icon={UserCheck} label="Profile Completion" value="85%" color="#ec4899" delay={0.4} />
                <StatCard icon={Rocket} label="Skills Mastered" value="6" color="#10b981" delay={0.5} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '1.5rem' }}>
                <div className="glass-card" style={{ minHeight: '300px' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Zap size={20} className="gradient-text" /> Upcoming Company Drives
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { company: 'TCS', logo: tcsLogo, role: 'Software Engineer', date: '24 Feb', status: 'Applications Open' },
                            { company: 'Infosys', logo: infosysLogo, role: 'Systems Engineer', date: '28 Feb', status: 'Closing Soon' },
                            { company: 'Wipro', logo: wiproLogo, role: 'Project Engineer', date: '02 Mar', status: 'Trending' }
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    {item.logo ? (
                                        <img src={item.logo} alt={item.company} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', objectFit: 'contain', padding: '4px' }} />
                                    ) : (
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1rem' }}>
                                            {item.company.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{item.company}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.role}</div>
                                    </div>
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
                    <h3 style={{ marginBottom: '1.5rem' }}>Recent Activity</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            'Applied to Infosys',
                            'Completed Mock Test',
                            'Saved Accenture job',
                            'Interview scheduled with Wipro'
                        ].map((text, i) => (
                            <div key={i} style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', marginTop: '6px' }}></div>
                                {text}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card">
                    <h3 style={{ marginBottom: '1.5rem' }}>Recent Notifications</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            'New DSA problems added!',
                            'Your resume was viewed by Cognizant',
                            'Mock Test 7 results are out',
                            'Interview experience: Accenture'
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
