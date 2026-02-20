import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Hash, Zap, ChevronRight, Terminal, BookText } from 'lucide-react';

const problems = [
    { id: 1, title: 'Two Sum', category: 'Array', difficulty: 'Easy', slug: 'two-sum', description: 'Find two indices such that their values add up to target.', sampleInput: 'nums = [2,7,11,15], target = 9', sampleOutput: '[0,1]' },
    { id: 2, title: 'Valid Parentheses', category: 'Stack', difficulty: 'Easy', slug: 'valid-parentheses', description: 'Determine if the input string has valid parentheses.', sampleInput: 's = "()[]{}"', sampleOutput: 'true' },
    { id: 3, title: 'Longest Palindromic Substring', category: 'String', difficulty: 'Medium', slug: 'longest-palindrome', description: 'Find the longest palindromic substring in s.', sampleInput: 's = "babad"', sampleOutput: '"bab"' },
    { id: 4, title: 'Merge K Sorted Lists', category: 'Linked List', difficulty: 'Hard', slug: 'merge-k-lists', description: 'Merge k sorted linked lists and return it as one sorted list.', sampleInput: '[[1,4,5],[1,3,4],[2,6]]', sampleOutput: '[1,1,2,3,4,4,5,6]' },
];

const CodingPractice = () => {
    const [selected, setSelected] = useState(null);

    const getDifficultyColor = (d) => {
        if (d === 'Easy') return '#10b981';
        if (d === 'Medium') return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '2rem', transition: 'all 0.5s ease' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Master Data Structures</h1>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    {['All', 'Array', 'String', 'Stack', 'Linked List'].map(cat => (
                        <button key={cat} className="glass-card" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>{cat}</button>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {problems.map(p => (
                        <motion.div
                            key={p.id}
                            onClick={() => setSelected(p)}
                            className="glass-card"
                            style={{
                                cursor: 'pointer',
                                border: selected?.id === p.id ? '1px solid var(--primary)' : '1px solid var(--border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>#{p.id}</div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem' }}>{p.title}</h4>
                                    <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                                        <span style={{ color: getDifficultyColor(p.difficulty) }}>{p.difficulty}</span>
                                        <span style={{ color: 'var(--text-secondary)' }}>|</span>
                                        <span style={{ color: 'var(--secondary)' }}>{p.category}</span>
                                    </div>
                                </div>
                            </div>
                            <ChevronRight size={20} color="var(--text-secondary)" />
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="glass-card"
                        style={{ position: 'sticky', top: '20px', height: 'fit-content' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem' }}>{selected.title}</h2>
                            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>Close</button>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                                <BookText size={18} /> Description
                            </div>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{selected.description}</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--secondary)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', marginBottom: '0.8rem', fontSize: '0.9rem', fontWeight: 600 }}>
                                    <Terminal size={16} /> Sample Input:
                                </div>
                                <code style={{ color: '#fff' }}>{selected.sampleInput}</code>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', margin: '1rem 0 0.8rem', fontSize: '0.9rem', fontWeight: 600 }}>
                                    <Zap size={16} /> Sample Output:
                                </div>
                                <code style={{ color: '#10b981' }}>{selected.sampleOutput}</code>
                            </div>
                        </div>

                        <button className="btn-primary" style={{ width: '100%', marginTop: '2rem', justifyContent: 'center' }}>
                            Solve Problem <Code2 size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CodingPractice;
