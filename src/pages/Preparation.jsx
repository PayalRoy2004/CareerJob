import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Code, UserCheck, ChevronDown, ExternalLink } from 'lucide-react';

const subjects = [
    {
        id: 'aptitude',
        title: 'Aptitude & Reasoning',
        icon: <Brain size={24} />,
        color: '#8b5cf6',
        topics: [
            { name: 'Quantitative Aptitude', details: 'Profit & Loss, Time & Work, Speed & Distance, Geometry' },
            { name: 'Logical Reasoning', details: 'Syllogism, Blood Relations, Seating Arrangement' },
            { name: 'Verbal Ability', details: 'Reading Comprehension, Grammar, Vocabulary' }
        ]
    },
    {
        id: 'dsa',
        title: 'Data Structures',
        icon: <Code size={24} />,
        color: '#06b6d4',
        topics: [
            { name: 'Linear Data Structures', details: 'Arrays, Linked Lists, Stacks, Queues' },
            { name: 'Non-Linear Data Structures', details: 'Trees (BST, AVL), Graphs, Heaps' },
            { name: 'Advanced Topics', details: 'Dynamic Programming, Greedy Algorithms, Segment Trees' }
        ]
    },
    {
        id: 'technical',
        title: 'Technical Core',
        icon: <BookOpen size={24} />,
        color: '#f59e0b',
        topics: [
            { name: 'Operating Systems', details: 'Memory Management, Scheduling, Deadlocks' },
            { name: 'DBMS', details: 'SQL Queries, Normalization, Transactions' },
            { name: 'Networking', details: 'TCP/IP, OSI Layers, HTTP/HTTPS Protocols' }
        ]
    },
    {
        id: 'hr',
        title: 'HR & Behavioral',
        icon: <UserCheck size={24} />,
        color: '#10b981',
        topics: [
            { name: 'Common Questions', details: '"Tell me about yourself", "Why this company?"' },
            { name: 'Situation Based', details: 'STAR Method, Conflict Resolution, Teamwork' },
            { name: 'Resume Review', details: 'Project explanation, Hobby discussion' }
        ]
    }
];

const Preparation = () => {
    const [activeSubject, setActiveSubject] = useState(subjects[0]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h1 className="gradient-text" style={{ fontSize: '2.5rem' }}>Preparation Vault</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Master everything you need for the recruitment season.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {subjects.map(s => (
                    <motion.div
                        key={s.id}
                        whileHover={{ y: -5 }}
                        onClick={() => setActiveSubject(s)}
                        className="glass-card"
                        style={{
                            cursor: 'pointer',
                            border: activeSubject.id === s.id ? `2px solid ${s.color}` : '1px solid var(--border)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.8rem',
                            padding: '1.5rem'
                        }}
                    >
                        <div style={{ color: s.color }}>{s.icon}</div>
                        <h3 style={{ fontSize: '1rem' }}>{s.title}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card" style={{ padding: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ color: activeSubject.color }}>{activeSubject.icon}</div>
                    <h2 style={{ fontSize: '1.8rem' }}>{activeSubject.title} Study Material</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {activeSubject.topics.map((t, i) => (
                        <div key={i} className="glass-card" style={{ background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ color: activeSubject.color, marginBottom: '0.3rem' }}>{t.name}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.details}</p>
                            </div>
                            <button className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600 }}>
                                View Notes <ExternalLink size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '3rem', padding: '2rem', background: `linear-gradient(135deg, ${activeSubject.color}15, transparent)`, borderRadius: '16px' }}>
                    <h3>Special Resource: Quick revision guide</h3>
                    <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>Hand-picked questions and cheat-sheets for last minute preparation.</p>
                    <button className="btn-primary" style={{ background: activeSubject.color }}>Download PDF Cheat-Sheet</button>
                </div>
            </div>
        </div>
    );
};

export default Preparation;
