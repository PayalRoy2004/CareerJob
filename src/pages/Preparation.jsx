import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Code, UserCheck, ExternalLink, ArrowRight, CheckSquare, Square, Target, Search, X } from 'lucide-react';

const initialSubjects = [
    {
        id: 'aptitude',
        title: 'Aptitude & Reasoning',
        icon: <Brain size={24} />,
        color: '#8b5cf6',
        topics: [
            {
                name: 'Quantitative Aptitude',
                difficulty: 'Medium',
                subTopics: [
                    { name: 'Profit & Loss', completed: true },
                    { name: 'Time & Work', completed: false },
                    { name: 'Speed & Distance', completed: false },
                    { name: 'Geometry', completed: true }
                ]
            },
            {
                name: 'Logical Reasoning',
                difficulty: 'Hard',
                subTopics: [
                    { name: 'Syllogism', completed: true },
                    { name: 'Blood Relations', completed: false },
                    { name: 'Seating Arrangement', completed: false }
                ]
            },
            {
                name: 'Verbal Ability',
                difficulty: 'Easy',
                subTopics: [
                    { name: 'Reading Comprehension', completed: true },
                    { name: 'Grammar', completed: true },
                    { name: 'Vocabulary', completed: false }
                ]
            }
        ]
    },
    {
        id: 'dsa',
        title: 'Data Structures',
        icon: <Code size={24} />,
        color: '#06b6d4',
        topics: [
            {
                name: 'Linear Data Structures',
                difficulty: 'Easy',
                subTopics: [
                    { name: 'Arrays', completed: true },
                    { name: 'Linked Lists', completed: true },
                    { name: 'Stacks', completed: false },
                    { name: 'Queues', completed: false }
                ]
            },
            {
                name: 'Non-Linear Data Structures',
                difficulty: 'Medium',
                subTopics: [
                    { name: 'Trees (BST, AVL)', completed: false },
                    { name: 'Graphs', completed: false },
                    { name: 'Heaps', completed: false }
                ]
            },
            {
                name: 'Advanced Topics',
                difficulty: 'Hard',
                subTopics: [
                    { name: 'Dynamic Programming', completed: false },
                    { name: 'Greedy Algorithms', completed: false },
                    { name: 'Segment Trees', completed: false }
                ]
            }
        ]
    },
    {
        id: 'technical',
        title: 'Technical Core',
        icon: <BookOpen size={24} />,
        color: '#f59e0b',
        topics: [
            {
                name: 'Operating Systems',
                difficulty: 'Medium',
                subTopics: [
                    { name: 'Memory Management', completed: false },
                    { name: 'Scheduling', completed: false },
                    { name: 'Deadlocks', completed: false }
                ]
            },
            {
                name: 'DBMS',
                difficulty: 'Medium',
                subTopics: [
                    { name: 'SQL Queries', completed: false },
                    { name: 'Normalization', completed: false },
                    { name: 'Transactions', completed: false }
                ]
            },
            {
                name: 'Networking',
                difficulty: 'Hard',
                subTopics: [
                    { name: 'TCP/IP', completed: false },
                    { name: 'OSI Layers', completed: false },
                    { name: 'HTTP/HTTPS Protocols', completed: false }
                ]
            }
        ]
    },
    {
        id: 'hr',
        title: 'HR & Behavioral',
        icon: <UserCheck size={24} />,
        color: '#10b981',
        topics: [
            {
                name: 'Common Questions',
                difficulty: 'Easy',
                subTopics: [
                    { name: '"Tell me about yourself"', completed: true },
                    { name: '"Why this company?"', completed: true }
                ]
            },
            {
                name: 'Situation Based',
                difficulty: 'Medium',
                subTopics: [
                    { name: 'STAR Method', completed: true },
                    { name: 'Conflict Resolution', completed: false },
                    { name: 'Teamwork', completed: true }
                ]
            },
            {
                name: 'Resume Review',
                difficulty: 'Easy',
                subTopics: [
                    { name: 'Project explanation', completed: false },
                    { name: 'Hobby discussion', completed: false }
                ]
            }
        ]
    }
];

const Preparation = () => {
    const [subjectsData, setSubjectsData] = useState(initialSubjects);
    const [activeSubjectId, setActiveSubjectId] = useState(initialSubjects[0].id);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    const activeSubject = subjectsData.find(s => s.id === activeSubjectId);

    const toggleSubTopic = (topicIndex, subTopicIndex) => {
        setSubjectsData(prev => {
            const newData = [...prev];
            const sIndex = newData.findIndex(s => s.id === activeSubjectId);
            const subject = { ...newData[sIndex] };
            const topics = [...subject.topics];
            const topic = { ...topics[topicIndex] };
            const subTopics = [...topic.subTopics];
            const subTopic = { ...subTopics[subTopicIndex] };

            subTopic.completed = !subTopic.completed;
            subTopics[subTopicIndex] = subTopic;
            topic.subTopics = subTopics;
            topics[topicIndex] = topic;
            subject.topics = topics;
            newData[sIndex] = subject;
            return newData;
        });
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return '#10b981'; // Green
            case 'Medium': return '#f59e0b'; // Yellow/Amber
            case 'Hard': return '#ef4444'; // Red
            default: return 'var(--text-secondary)';
        }
    };

    const calculateSubjectProgress = (subject) => {
        let total = 0;
        let complete = 0;
        subject.topics.forEach(t => {
            t.subTopics.forEach(st => {
                total++;
                if (st.completed) complete++;
            });
        });
        if (total === 0) return 0;
        return Math.round((complete / total) * 100);
    };

    const filteredTopics = activeSubject.topics.filter(t => {
        if (!debouncedQuery) return true;
        const query = debouncedQuery.toLowerCase();
        if (t.name.toLowerCase().includes(query)) return true;
        if (t.subTopics.some(st => st.name.toLowerCase().includes(query))) return true;
        return false;
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h1 className="gradient-text" style={{ fontSize: '2.5rem' }}>Preparation Vault</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Master everything you need for the recruitment season.</p>
            </header>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '2rem' }}>
                {subjectsData.map(s => {
                    const subjectProgress = calculateSubjectProgress(s);
                    return (
                        <button
                            key={s.id}
                            onClick={() => {
                                setActiveSubjectId(s.id);
                                setSearchQuery('');
                                setDebouncedQuery('');
                            }}
                            className="glass-card"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                padding: '0.8rem 1.5rem',
                                background: activeSubject.id === s.id ? `${s.color}15` : 'transparent',
                                border: `1px solid ${activeSubject.id === s.id ? s.color : 'var(--border)'}`,
                                borderRadius: '12px',
                                color: activeSubject.id === s.id ? s.color : 'var(--text-secondary)',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: activeSubject.id === s.id ? `0 4px 20px ${s.color}20` : 'none',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                                {React.cloneElement(s.icon, { size: 20 })}
                            </div>
                            <span style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                {s.title}
                            </span>

                            {/* Background Progress Form */}
                            <div style={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                height: '3px',
                                width: `${subjectProgress}%`,
                                backgroundColor: s.color,
                                transition: 'width 0.3s ease',
                                zIndex: 0
                            }} />
                        </button>
                    )
                })}
            </div>

            <div className="glass-card" style={{ padding: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ color: activeSubject.color }}>{activeSubject.icon}</div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.2rem' }}>{activeSubject.title} Study Material</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '150px', height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${calculateSubjectProgress(activeSubject)}%`, background: activeSubject.color, transition: 'width 0.5s ease' }} />
                            </div>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{calculateSubjectProgress(activeSubject)}% completed</span>
                        </div>
                    </div>
                    <div style={{ position: 'relative', width: '250px' }}>
                        <input
                            type="text"
                            placeholder="Search topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.8rem 2.5rem 0.8rem 2.5rem',
                                borderRadius: '8px',
                                border: '1px solid var(--border)',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: 'var(--text-primary)',
                                outline: 'none',
                                transition: 'border-color 0.3s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = activeSubject.color}
                            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                        />
                        <Search size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)' }} />
                        {searchQuery && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setDebouncedQuery('');
                                }}
                                style={{
                                    position: 'absolute',
                                    right: '0.5rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0.3rem'
                                }}
                            >
                                <X size={16} color="var(--text-secondary)" />
                            </button>
                        )}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {filteredTopics.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
                            <Search size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>No topics found</h3>
                            <p>Try adjusting your search query.</p>
                        </div>
                    ) : (
                        filteredTopics.map((t, i) => {
                            // Find original topic index
                            const originalTopicIndex = activeSubject.topics.findIndex(origT => origT.name === t.name);

                            return (
                                <motion.div
                                    key={originalTopicIndex}
                                    className="glass-card"
                                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        background: 'rgba(255,255,255,0.02)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1rem'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                                <h4 style={{ color: activeSubject.color, fontSize: '1.2rem' }}>{t.name}</h4>
                                                <span style={{
                                                    fontSize: '0.75rem',
                                                    padding: '0.2rem 0.6rem',
                                                    borderRadius: '20px',
                                                    border: `1px solid ${getDifficultyColor(t.difficulty)}40`,
                                                    color: getDifficultyColor(t.difficulty),
                                                    fontWeight: 600,
                                                    background: `${getDifficultyColor(t.difficulty)}10`
                                                }}>
                                                    {t.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                            <motion.button
                                                initial="initial"
                                                whileHover="hover"
                                                whileTap="tap"
                                                className="btn-primary"
                                                style={{
                                                    background: `linear-gradient(135deg, ${activeSubject.color}, ${activeSubject.color}dd)`,
                                                    border: 'none',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '8px',
                                                    fontSize: '0.9rem',
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                    fontWeight: 600,
                                                    boxShadow: `0 4px 15px ${activeSubject.color}40`,
                                                    transition: 'box-shadow 0.3s ease'
                                                }}
                                            >
                                                View Notes
                                                <motion.div variants={{ initial: { x: 0 }, hover: { x: 5 }, tap: { x: 0 } }}>
                                                    <ArrowRight size={16} />
                                                </motion.div>
                                            </motion.button>

                                            <motion.button
                                                initial="initial"
                                                whileHover="hover"
                                                whileTap="tap"
                                                style={{
                                                    background: 'transparent',
                                                    border: `1px solid ${activeSubject.color}50`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.5rem',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '8px',
                                                    fontSize: '0.9rem',
                                                    color: activeSubject.color,
                                                    cursor: 'pointer',
                                                    fontWeight: 600,
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = `${activeSubject.color}15`;
                                                    e.currentTarget.style.borderColor = activeSubject.color;
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'transparent';
                                                    e.currentTarget.style.borderColor = `${activeSubject.color}50`;
                                                }}
                                            >
                                                <Target size={16} />
                                                Take Mock Test
                                            </motion.button>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {t.subTopics.filter(st => {
                                            if (!debouncedQuery) return true;
                                            const query = debouncedQuery.toLowerCase();
                                            if (t.name.toLowerCase().includes(query)) return true;
                                            return st.name.toLowerCase().includes(query);
                                        }).map((st, j) => {
                                            const originalSubTopicIndex = t.subTopics.findIndex(origSt => origSt.name === st.name);
                                            return (
                                                <div
                                                    key={originalSubTopicIndex}
                                                    onClick={() => toggleSubTopic(originalTopicIndex, originalSubTopicIndex)}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.8rem',
                                                        padding: '0.5rem',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        transition: 'background 0.2s',
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                    {st.completed ? (
                                                        <CheckSquare size={18} color={activeSubject.color} />
                                                    ) : (
                                                        <Square size={18} color="var(--text-secondary)" />
                                                    )}
                                                    <span style={{
                                                        color: st.completed ? 'var(--text-secondary)' : 'var(--text-primary)',
                                                        textDecoration: st.completed ? 'line-through' : 'none',
                                                        fontSize: '0.95rem',
                                                        transition: 'all 0.2s'
                                                    }}>
                                                        {st.name}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
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
