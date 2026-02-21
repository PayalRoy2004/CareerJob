import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bell, Briefcase, Calendar, Info, Clock, CheckCircle2, FileText, BellRing, Filter, Search, Trash2 } from 'lucide-react';

const initialNotifications = [
    { id: 1, type: 'job', title: 'New Job Alert', message: 'Google just posted a new Software Engineer role in your area.', time: '10 min ago', icon: <Briefcase size={20} />, color: '#8b5cf6', read: false },
    { id: 2, type: 'resume', title: 'Resume Viewed', message: 'Your resume was viewed by the recruiting team at Tesla.', time: '2h ago', icon: <FileText size={20} />, color: '#10b981', read: false },
    { id: 3, type: 'reminder', title: 'Mock Test Reminder', message: 'Don\'t forget to complete your daily DSA challenge.', time: '5h ago', icon: <Clock size={20} />, color: '#f59e0b', read: true },
    { id: 4, type: 'job', title: 'New Job Alert', message: 'Microsoft has updated their STEP Internship openings.', time: '1d ago', icon: <Briefcase size={20} />, color: '#8b5cf6', read: true },
    { id: 5, type: 'reminder', title: 'Feature Update', message: 'We\'ve added new interview experiences for Amazon.', time: '2d ago', icon: <Info size={20} />, color: '#06b6d4', read: true },
];

const Notifications = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(initialNotifications);
    const [activeTab, setActiveTab] = useState('All');

    const tabs = ['All', 'Job Alerts', 'Resume Activity', 'Reminders'];

    const getFilteredNotifications = () => {
        if (activeTab === 'All') return notifications;
        if (activeTab === 'Job Alerts') return notifications.filter(n => n.type === 'job');
        if (activeTab === 'Resume Activity') return notifications.filter(n => n.type === 'resume');
        if (activeTab === 'Reminders') return notifications.filter(n => n.type === 'reminder');
        return notifications;
    };

    const handleDismiss = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const handleNavigate = (type) => {
        if (type === 'job') navigate('/jobs');
        else if (type === 'resume') navigate('/');    // Dashboard as Analytics
        else if (type === 'reminder') navigate('/mock-test');
        else navigate('/');
    };

    const filteredData = getFilteredNotifications();

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.3rem' }}>Stay Updated</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>You have {notifications.filter(n => !n.read).length} unread notifications.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {notifications.some(n => !n.read) && (
                        <button
                            onClick={markAllRead}
                            className="glass-card"
                            style={{ fontSize: '0.9rem', color: 'var(--primary)', padding: '0.6rem 1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--primary)' }}
                        >
                            <CheckCircle2 size={16} /> Mark all as read
                        </button>
                    )}
                    {notifications.length > 0 && (
                        <button
                            onClick={clearAll}
                            className="glass-card"
                            style={{ fontSize: '0.9rem', color: '#ef4444', padding: '0.6rem 1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.05)' }}
                        >
                            <Trash2 size={16} /> Clear all
                        </button>
                    )}
                </div>
            </div>

            {/* Notification Filters / Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="glass-card"
                        style={{
                            padding: '0.6rem 1.2rem',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            background: activeTab === tab ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                            border: `1px solid ${activeTab === tab ? 'var(--primary)' : 'var(--border)'}`,
                            color: activeTab === tab ? 'var(--primary)' : 'var(--text-secondary)',
                            fontWeight: activeTab === tab ? '600' : '400',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Notifications List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <AnimatePresence>
                    {filteredData.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)', background: 'var(--card-bg)', borderRadius: '16px', border: '1px dashed var(--border)' }}
                        >
                            <BellRing size={48} style={{ opacity: 0.2, marginBottom: '1.5rem' }} />
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>All Caught Up!</h3>
                            <p>You don't have any {activeTab !== 'All' ? activeTab.toLowerCase() : 'new'} notifications right now.</p>
                        </motion.div>
                    ) : (
                        filteredData.map((n, i) => (
                            <motion.div
                                layout
                                key={n.id}
                                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.3 }}
                                className="glass-card"
                                style={{
                                    display: 'flex',
                                    gap: '1.5rem',
                                    alignItems: 'flex-start',
                                    padding: '1.5rem',
                                    borderLeft: !n.read ? `4px solid ${n.color}` : '1px solid var(--border)',
                                    background: !n.read ? `${n.color}08` : 'var(--card-bg)',
                                    transition: 'background 0.3s'
                                }}
                            >
                                <div style={{
                                    padding: '0.8rem',
                                    borderRadius: '12px',
                                    background: `${n.color}15`,
                                    color: n.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: `0 4px 15px ${n.color}20`
                                }}>
                                    {n.icon}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', alignItems: 'center' }}>
                                        <h3 style={{ fontSize: '1.1rem', color: !n.read ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                            {n.title}
                                            {!n.read && <span style={{ marginLeft: '10px', display: 'inline-block', width: '8px', height: '8px', background: n.color, borderRadius: '50%' }}></span>}
                                        </h3>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{n.time}</span>
                                    </div>
                                    <p style={{ color: !n.read ? '#cbd5e1' : 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{n.message}</p>

                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.2rem' }}>
                                        <button
                                            className="btn-primary"
                                            style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}
                                            onClick={() => handleNavigate(n.type)}
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => handleDismiss(n.id)}
                                            style={{
                                                padding: '0.5rem 1.2rem',
                                                fontSize: '0.85rem',
                                                border: '1px solid var(--border)',
                                                background: 'transparent',
                                                color: 'var(--text-secondary)',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={e => { e.target.style.background = 'rgba(239, 68, 68, 0.1)'; e.target.style.color = '#ef4444'; e.target.style.borderColor = 'rgba(239, 68, 68, 0.3)' }}
                                            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--text-secondary)'; e.target.style.borderColor = 'var(--border)' }}
                                        >
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {filteredData.length > 0 && (
                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <button className="glass-card" style={{ padding: '0.8rem 2rem', border: '1px dashed var(--border)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                        Load older notifications
                    </button>
                </div>
            )}
        </div>
    );
};

export default Notifications;
