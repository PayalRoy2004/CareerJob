import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Hash, Zap, ChevronRight, Terminal, BookText, Search, Target, CheckCircle } from 'lucide-react';

const problems = [
    { id: 1, title: 'Two Sum', category: 'Array', difficulty: 'Easy', slug: 'two-sum', description: 'Find two indices such that their values add up to target.', sampleInput: 'nums = [2,7,11,15], target = 9', sampleOutput: '[0,1]', completed: true },
    { id: 2, title: 'Valid Parentheses', category: 'Stack', difficulty: 'Easy', slug: 'valid-parentheses', description: 'Determine if the input string has valid parentheses.', sampleInput: 's = "()[]{}"', sampleOutput: 'true', completed: true },
    { id: 3, title: 'Longest Palindromic Substring', category: 'String', difficulty: 'Medium', slug: 'longest-palindrome', description: 'Find the longest palindromic substring in s.', sampleInput: 's = "babad"', sampleOutput: '"bab"', completed: false },
    { id: 4, title: 'Merge K Sorted Lists', category: 'Linked List', difficulty: 'Hard', slug: 'merge-k-lists', description: 'Merge k sorted linked lists and return it as one sorted list.', sampleInput: '[[1,4,5],[1,3,4],[2,6]]', sampleOutput: '[1,1,2,3,4,4,5,6]', completed: false },
    { id: 5, title: 'Maximum Subarray', category: 'Array', difficulty: 'Medium', slug: 'maximum-subarray', description: 'Find the contiguous subarray which has the largest sum.', sampleInput: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', sampleOutput: '6', completed: false },
    { id: 6, title: 'Reverse Linked List', category: 'Linked List', difficulty: 'Easy', slug: 'reverse-linked-list', description: 'Reverse a singly linked list.', sampleInput: 'head = [1,2,3,4,5]', sampleOutput: '[5,4,3,2,1]', completed: false },
    { id: 7, title: 'Word Search', category: 'String', difficulty: 'Medium', slug: 'word-search', description: 'Given a m x n grid of characters board and a string word, return true if word exists in the grid.', sampleInput: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', sampleOutput: 'true', completed: false },
    { id: 8, title: 'Trapping Rain Water', category: 'Array', difficulty: 'Hard', slug: 'trapping-rain-water', description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.', sampleInput: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', sampleOutput: '6', completed: false },
    { id: 9, title: 'Valid Anagram', category: 'String', difficulty: 'Easy', slug: 'valid-anagram', description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.', sampleInput: 's = "anagram", t = "nagaram"', sampleOutput: 'true', completed: false },
    { id: 10, title: 'Min Stack', category: 'Stack', difficulty: 'Medium', slug: 'min-stack', description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.', sampleInput: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]', sampleOutput: '[null,null,null,null,-3,null,0,-2]', completed: false },
];

const CodingPractice = () => {
    const [selected, setSelected] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const getDifficultyColor = (d) => {
        if (d === 'Easy') return '#10b981'; // Green
        if (d === 'Medium') return '#f59e0b'; // Yellow
        if (d === 'Hard') return '#ef4444'; // Red
        return '#ef4444';
    };

    const categories = ['All', 'Array', 'String', 'Stack', 'Linked List'];

    const filteredProblems = useMemo(() => {
        return problems.filter(p => {
            const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
            const query = searchQuery.toLowerCase();
            const matchesSearch = !query ||
                p.title.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query) ||
                p.difficulty.toLowerCase().includes(query);
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const solvedCount = problems.filter(p => p.completed).length;
    const totalCount = problems.length;
    const progressPercentage = Math.round((solvedCount / totalCount) * 100);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '2rem', transition: 'all 0.5s ease', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Coding Practice</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Master Data Structures & Algorithms</p>
                    </div>

                    {/* Progress Tracking */}
                    <div className="glass-card" style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '200px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Target size={18} color="var(--primary)" /> Progress
                            </span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Solved: {solvedCount} / {totalCount}</span>
                        </div>
                        <div style={{ width: '100%', height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${progressPercentage}%`, background: 'var(--primary)', transition: 'width 0.5s ease' }} />
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
                    <input
                        type="text"
                        placeholder="Search problem by Title, Tag, or Difficulty..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem 1rem 1rem 3rem',
                            borderRadius: '12px',
                            border: '1px solid var(--border)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                            transition: 'all 0.3s ease',
                            fontSize: '1rem'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.2)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'var(--border)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                    <Search size={20} color="var(--text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>

                {/* Active Filters */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className="glass-card"
                            style={{
                                padding: '0.5rem 1.2rem',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                background: activeCategory === cat ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                                border: `1px solid ${activeCategory === cat ? 'var(--primary)' : 'var(--border)'}`,
                                color: activeCategory === cat ? 'var(--primary)' : 'var(--text-secondary)',
                                fontWeight: activeCategory === cat ? 'bold' : 'normal',
                                boxShadow: activeCategory === cat ? '0 0 10px rgba(139, 92, 246, 0.3)' : 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Problem List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {filteredProblems.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
                            <Search size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>No problems found</h3>
                            <p>Try adjusting your search query or category filter.</p>
                        </div>
                    ) : (
                        filteredProblems.map((p, index) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setSelected(p)}
                                className="glass-card"
                                style={{
                                    cursor: 'pointer',
                                    border: selected?.id === p.id ? '1px solid var(--primary)' : '1px solid var(--border)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: selected?.id === p.id ? 'rgba(139, 92, 246, 0.05)' : 'var(--card-bg)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div style={{ color: p.completed ? '#10b981' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px' }}>
                                        {p.completed ? <CheckCircle size={20} /> : <span style={{ fontWeight: 600 }}>#{p.id}</span>}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', color: p.completed ? 'var(--text-secondary)' : 'var(--text-primary)', textDecoration: p.completed ? 'line-through' : 'none', transition: 'all 0.3s ease' }}>{p.title}</h4>
                                        <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.8rem', marginTop: '0.3rem', alignItems: 'center' }}>
                                            <span style={{
                                                color: getDifficultyColor(p.difficulty),
                                                background: `${getDifficultyColor(p.difficulty)}20`,
                                                padding: '0.1rem 0.5rem',
                                                borderRadius: '10px',
                                                fontWeight: 600
                                            }}>{p.difficulty}</span>
                                            <span style={{ color: 'var(--text-secondary)' }}>|</span>
                                            <span style={{ color: 'var(--secondary)' }}>{p.category}</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight size={20} color={selected?.id === p.id ? 'var(--primary)' : 'var(--text-secondary)'} />
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="glass-card"
                        style={{ position: 'sticky', top: '90px', height: 'fit-content' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{selected.title}</h2>
                                <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.9rem', alignItems: 'center' }}>
                                    <span style={{
                                        color: getDifficultyColor(selected.difficulty),
                                        background: `${getDifficultyColor(selected.difficulty)}20`,
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '12px',
                                        fontWeight: 600
                                    }}>
                                        {selected.difficulty}
                                    </span>
                                    <span style={{ color: 'var(--secondary)' }}><Hash size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '2px' }} />{selected.category}</span>
                                </div>
                            </div>
                            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '2rem', lineHeight: 1 }}>&times;</button>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '0.8rem', fontWeight: 600 }}>
                                <BookText size={18} /> Problem Description
                            </div>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>{selected.description}</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--secondary)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', marginBottom: '0.8rem', fontSize: '0.9rem', fontWeight: 600 }}>
                                    <Terminal size={16} /> Sample Input:
                                </div>
                                <code style={{ color: '#f8fafc', display: 'block', background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '6px', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{selected.sampleInput}</code>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', margin: '1.5rem 0 0.8rem', fontSize: '0.9rem', fontWeight: 600 }}>
                                    <Zap size={16} /> Sample Output:
                                </div>
                                <code style={{ color: '#10b981', display: 'block', background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '6px', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{selected.sampleOutput}</code>
                            </div>
                        </div>

                        <button className="btn-primary" style={{ width: '100%', marginTop: '2rem', justifyContent: 'center', fontSize: '1rem', padding: '1rem' }}>
                            Solve Problem <Code2 size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CodingPractice;
