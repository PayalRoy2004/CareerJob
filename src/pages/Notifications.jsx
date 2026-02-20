import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Briefcase, Calendar, Info, Clock, CheckCircle2 } from 'lucide-react';

const notifications = [
    { id: 1, type: 'job', title: 'New Job Alert', message: 'Google just posted a new Software Engineer role in your area.', time: '10 min ago', icon: <Briefcase />, color: '#8b5cf6' },
    { id: 2, type: 'update', title: 'Resume Viewed', message: 'Your resume was viewed by recruiting team at Tesla.', time: '2h ago', icon: <CheckCircle2 />, color: '#10b981' },
    { id: 3, type: 'reminder', title: 'Mock Test Reminder', message: 'Don\'t forget to complete your daily DSA challenge.', time: '5h ago', icon: <Clock />, color: '#f59e0b' },
    { id: 4, type: 'job', title: 'New Job Alert', message: 'Microsoft has updated their STEP Internship openings.', time: '1d ago', icon: <Briefcase />, color: '#8b5cf6' },
    { id: 5, type: 'update', title: 'Feature Update', message: 'We\'ve added new interview experiences for Amazon.', time: '2d ago', icon: <Info />, color: '#06b6d4' },
];

const Notifications = () => {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '2.5rem' }}>Stay Updated</h1>
                <button className="nav-link" style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>Mark all as read</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {notifications.map((n, i) => (
                    <motion.div
                        key={n.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card"
                        style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', padding: '1.5rem' }}
                    >
                        <div style={{
                            padding: '0.75rem',
                            borderRadius: '14px',
                            background: `${n.color}15`,
                            color: n.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {n.icon}
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                                <h3 style={{ fontSize: '1.1rem' }}>{n.title}</h3>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{n.time}</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>{n.message}</p>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>View Detail</button>
                                <button className="glass-card" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', border: 'none' }}>Dismiss</button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <button className="glass-card" style={{ padding: '0.8rem 2rem', border: '1px dashed var(--border)', color: 'var(--text-secondary)' }}>
                    Load older notifications
                </button>
            </div>
        </div>
    );
};

export default Notifications;
