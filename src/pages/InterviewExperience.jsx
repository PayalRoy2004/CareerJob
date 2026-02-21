import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, User, Calendar, Quote, Star, Plus, Trash2, X, Tag, CheckCircle, XCircle, Clock } from 'lucide-react';

const initialExperiences = [
    {
        id: 1,
        student: "Priya Patel",
        company: "TCS",
        role: "Ninja Developer",
        date: "Dec 2025",
        difficulty: "Medium",
        status: "Offered",
        rating: 4,
        tags: ["On-Campus", "Java", "SQL"],
        content: "Focused heavily on the basics of Java, SQL, and Object-Oriented Programming. The interview consisted of an aptitude round, a technical round, and an HR round. HR was very friendly and mostly asked situational questions.",
        questions: ["What are the four pillars of OOPS?", "Explain different types of JOINs in SQL with examples", "Are you open to relocation?", "Why do you want to join TCS?"]
    },
    {
        id: 2,
        student: "Rohan Gupta",
        company: "Accenture",
        role: "Associate Software Engineer",
        date: "Jan 2026",
        difficulty: "Medium",
        status: "Offered",
        rating: 4,
        tags: ["Off-Campus", "Communication"],
        content: "The process started with a cognitive and technical assessment. The interview was a single round combining technical and HR. They focused on my final year project, basic algorithms, and communication skills.",
        questions: ["Write a program to reverse a string without using built-in functions", "Explain your role in your academic project", "Describe a situation where you worked under pressure"]
    },
    {
        id: 3,
        student: "Neha Sharma",
        company: "Infosys",
        role: "SES",
        date: "Feb 2026",
        difficulty: "Hard",
        status: "Rejected",
        rating: 5,
        tags: ["HackWithInfy", "DSA"],
        content: "Cleared the HackWithInfy coding round to get the SES interview. Technical round was entirely focused on Data Structures like Trees, Graphs, and Dynamic Programming. They also tested Database indexing concepts.",
        questions: ["Find the lowest common ancestor in a Binary Tree", "What is an index in a database and how does it work?", "Write logic for the Coin Change DP problem"]
    },
    {
        id: 4,
        student: "Vikram Singh",
        company: "Wipro",
        role: "Project Engineer",
        date: "Nov 2025",
        difficulty: "Easy",
        status: "Offered",
        rating: 3,
        tags: ["On-Campus", "Core CS"],
        content: "The selection process had an online test (Aptitude, Logical, Verbal, Coding) followed by a technical and HR interview. They mostly asked about core subjects like Operating Systems, DBMS, and Computer Networks.",
        questions: ["Difference between process and thread", "Explain the OSI model layers", "Write a SQL query to find the second highest salary"]
    },
    {
        id: 5,
        student: "Arjun Reddy",
        company: "Cognizant",
        role: "GenC Next",
        date: "Jan 2026",
        difficulty: "Medium",
        status: "Pending",
        rating: 4,
        tags: ["Off-Campus", "Cloud", "API"],
        content: "The technical round was quite comprehensive. They tested my problem-solving skills with a couple of medium-level LeetCode questions and asked a lot about REST APIs and cloud basics.",
        questions: ["Difference between PUT and POST in REST API", "Implement a queue using two stacks", "What are the benefits of using AWS/Azure?"]
    }
];

const InterviewExperience = () => {
    const [experiences, setExperiences] = useState(() => {
        const saved = localStorage.getItem('careerHub_interview_experiences');
        return saved ? JSON.parse(saved) : initialExperiences;
    });

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        difficulty: 'Medium',
        status: 'Pending',
        content: '',
        questions: [''],
        rating: 0,
        isAnonymous: false,
        tags: ''
    });

    useEffect(() => {
        localStorage.setItem('careerHub_interview_experiences', JSON.stringify(experiences));
    }, [experiences]);

    const getDifficultyStyle = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return { color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' };
            case 'Medium': return { color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' };
            case 'Hard': return { color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' };
            default: return { color: 'var(--text-secondary)' };
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Offered': return { color: '#10b981', icon: <CheckCircle size={14} /> };
            case 'Rejected': return { color: '#ef4444', icon: <XCircle size={14} /> };
            case 'Pending': return { color: '#f59e0b', icon: <Clock size={14} /> };
            default: return { color: 'var(--text-secondary)', icon: null };
        }
    };

    const handleAddQuestion = () => {
        setFormData({ ...formData, questions: [...formData.questions, ''] });
    };

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...formData.questions];
        newQuestions[index] = value;
        setFormData({ ...formData, questions: newQuestions });
    };

    const handleRemoveQuestion = (index) => {
        const newQuestions = formData.questions.filter((_, i) => i !== index);
        setFormData({ ...formData, questions: newQuestions });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.company || !formData.role || !formData.content) {
            alert("Please fill in the required fields (Company, Role, and Experience).");
            return;
        }

        const newExp = {
            id: Date.now(),
            student: formData.isAnonymous ? "Anonymous User" : "Current User",
            company: formData.company,
            role: formData.role,
            date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            difficulty: formData.difficulty,
            status: formData.status,
            rating: formData.rating || 5, // Default to 5 if no rating given
            tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : [],
            content: formData.content,
            questions: formData.questions.filter(q => q.trim() !== '') // Remove empty questions
        };

        setExperiences([newExp, ...experiences]);
        setShowForm(false);
        setFormData({ company: '', role: '', difficulty: 'Medium', status: 'Pending', content: '', questions: [''], rating: 0, isAnonymous: false, tags: '' });
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.3rem' }}>Interview Secrets</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Learn from those who have already conquered the process.</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                    onClick={() => setShowForm(true)}
                >
                    <Plus size={18} style={{ marginRight: '0.5rem' }} /> Share Your Experience
                </motion.button>
            </div>

            {/* Modal Form */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(5px)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="glass-card"
                            style={{
                                width: '100%',
                                maxWidth: '700px',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                padding: '2rem',
                                background: 'var(--background)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h2 className="gradient-text">Share Interview Detail</h2>
                                <button onClick={() => setShowForm(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Company *</label>
                                        <input required className="glass-card" style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border)' }} placeholder="e.g. Google" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Role *</label>
                                        <input required className="glass-card" style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border)' }} placeholder="e.g. Frontend Engineer" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Difficulty</label>
                                        <select className="glass-card" style={{ width: '100%', padding: '0.8rem', background: '#1e293b', color: 'white', border: '1px solid var(--border)' }} value={formData.difficulty} onChange={e => setFormData({ ...formData, difficulty: e.target.value })}>
                                            <option value="Easy">Easy</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Hard">Hard</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Status</label>
                                        <select className="glass-card" style={{ width: '100%', padding: '0.8rem', background: '#1e293b', color: 'white', border: '1px solid var(--border)' }} value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                            <option value="Pending">Pending</option>
                                            <option value="Offered">Offered</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Overall Rating</label>
                                        <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center', height: '45px' }}>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <Star
                                                    key={star}
                                                    size={22}
                                                    onClick={() => setFormData({ ...formData, rating: star })}
                                                    fill={star <= formData.rating ? "#eab308" : "none"}
                                                    color={star <= formData.rating ? "#eab308" : "var(--text-secondary)"}
                                                    style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Experience Detail *</label>
                                    <textarea required className="glass-card" style={{ width: '100%', minHeight: '120px', padding: '1rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border)' }} placeholder="Describe the interview rounds, environment, platform used, etc." value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Key Questions Asked</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        {formData.questions.map((q, index) => (
                                            <div key={index} style={{ display: 'flex', gap: '0.5rem' }}>
                                                <input className="glass-card" style={{ flex: 1, padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border)' }} placeholder={`Question ${index + 1}`} value={q} onChange={(e) => handleQuestionChange(index, e.target.value)} />
                                                {formData.questions.length > 1 && (
                                                    <button type="button" onClick={() => handleRemoveQuestion(index)} style={{ padding: '0.8rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', cursor: 'pointer' }}>
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <button type="button" onClick={handleAddQuestion} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginTop: '1rem', fontWeight: 500 }}>
                                        <Plus size={16} /> Add Another Question
                                    </button>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Tags (comma separated)</label>
                                    <input className="glass-card" style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border)' }} placeholder="e.g. Off-Campus, Referral, Frontend" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <input type="checkbox" id="anonymous" checked={formData.isAnonymous} onChange={e => setFormData({ ...formData, isAnonymous: e.target.checked })} style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                                    <label htmlFor="anonymous" style={{ color: 'var(--text-primary)', cursor: 'pointer' }}>Post as Anonymous</label>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                                    <button type="button" onClick={() => setShowForm(false)} className="glass-card" style={{ padding: '0.8rem 2rem', cursor: 'pointer' }}>Cancel</button>
                                    <button type="submit" className="btn-primary" style={{ padding: '0.8rem 3rem' }}>Publish Experience</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Display Experiences */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <AnimatePresence>
                    {experiences.map((exp) => {
                        const statusStyle = getStatusStyle(exp.status);

                        return (
                            <motion.div
                                layout
                                key={exp.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card"
                                style={{ padding: '2rem' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                                        <div style={{ width: '55px', height: '55px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <User color="white" size={24} />
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                {exp.student}
                                                {exp.student === "Anonymous User" && <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>Hidden</span>}
                                            </h3>
                                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Quote size={14} color="var(--primary)" /> <strong style={{ color: 'var(--text-primary)' }}>{exp.company}</strong></span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} /> {exp.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            {exp.status && (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', color: statusStyle.color, fontWeight: 600 }}>
                                                    {statusStyle.icon} {exp.status}
                                                </span>
                                            )}
                                            <span className="badge" style={getDifficultyStyle(exp.difficulty)}>{exp.difficulty}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '2px' }}>
                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill={s <= (exp.rating || 5) ? "#eab308" : "none"} color={s <= (exp.rating || 5) ? "#eab308" : "rgba(255,255,255,0.2)"} />)}
                                        </div>
                                    </div>
                                </div>

                                {exp.tags && exp.tags.length > 0 && (
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                        {exp.tags.map((tag, idx) => (
                                            <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '20px', color: 'var(--text-secondary)' }}>
                                                <Tag size={12} /> {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <p style={{ marginBottom: '1.5rem', lineHeight: '1.7', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{exp.content}</p>

                                {exp.questions && exp.questions.length > 0 && (
                                    <div className="glass-card" style={{ background: 'rgba(0,0,0,0.2)', border: '1px dashed var(--border)', padding: '1.5rem' }}>
                                        <h4 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <MessageSquare size={18} /> Key Questions Asked:
                                        </h4>
                                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                            {exp.questions.map((q, i) => (
                                                <li key={i} style={{ fontSize: '0.95rem', color: 'var(--text-primary)', display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                                                    <span style={{ color: 'var(--secondary)', marginTop: '2px' }}>•</span>
                                                    <span style={{ flex: 1 }}>{q}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default InterviewExperience;
