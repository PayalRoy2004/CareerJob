import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, User, Calendar, Quote, Star } from 'lucide-react';

const experiences = [
    {
        id: 1,
        student: "Amit Sharma",
        company: "Amazon",
        role: "SDE-1",
        date: "Jan 2024",
        difficulty: "Hard",
        content: "The interview had 3 rounds. Round 1 was DSA (Graph problems), Round 2 was System Design (LLD), and Round 3 was Bar Raiser.",
        questions: ["Explain Dijkstra's algorithm", "Design a parking lot", "Leadership principles questions"]
    },
    {
        id: 2,
        student: "Priya Patel",
        company: "TCS",
        role: "Ninja",
        date: "Dec 2023",
        difficulty: "Medium",
        content: "Focused on basics of Java and SQL. HR round was very friendly.",
        questions: ["What is OOPS?", "Explain JOINs in SQL", "Why TCS?"]
    },
    {
        id: 3,
        student: "Rahul Verma",
        company: "Google",
        role: "STEP Intern",
        date: "Feb 2024",
        difficulty: "Hard",
        content: "Heavy focus on problem solving and edge cases. No theory questions, just code.",
        questions: ["Find Kth largest element", "Implement a custom LRU Cache"]
    }
];

const InterviewExperience = () => {
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                    <h1 className="gradient-text" style={{ fontSize: '2.5rem' }}>Interview Secrets</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Learn from those who have already conquered the process.</p>
                </div>
                <button className="btn-primary">Share Your Experience</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {experiences.map((exp) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="glass-card"
                        style={{ padding: '2rem' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User color="white" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem' }}>{exp.student}</h3>
                                    <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Quote size={12} /> {exp.company}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={12} /> {exp.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span className={`badge ${exp.difficulty === 'Hard' ? 'badge-purple' : 'badge-cyan'}`}>{exp.difficulty}</span>
                                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '2px' }}>
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill={s <= 4 ? "var(--accent)" : "none"} color="var(--accent)" />)}
                                </div>
                            </div>
                        </div>

                        <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>{exp.content}</p>

                        <div className="glass-card" style={{ background: 'rgba(0,0,0,0.2)', border: 'none' }}>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MessageSquare size={16} /> Key Questions Asked:
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {exp.questions.map((q, i) => (
                                    <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.6rem' }}>
                                        <span style={{ color: 'var(--secondary)' }}>•</span> {q}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default InterviewExperience;
