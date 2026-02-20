import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, CheckCircle, XCircle, ChevronRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

const MockTest = () => {
    const [testStarted, setTestStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const questions = [
        { q: "What is the time complexity of searching in a Binary Search Tree (average case)?", options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"], right: 1 },
        { q: "Which data structure uses LIFO principle?", options: ["Queue", "Linked List", "Stack", "Heap"], right: 2 },
        { q: "Which company developed React?", options: ["Google", "Facebook", "Microsoft", "Twitter"], right: 1 },
        { q: "Standard port for HTTP?", options: ["80", "443", "22", "8080"], right: 0 }
    ];

    useEffect(() => {
        let timer;
        if (testStarted && timeLeft > 0 && !showResults) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0) {
            setShowResults(true);
        }
        return () => clearInterval(timer);
    }, [testStarted, timeLeft, showResults]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleFinish = () => {
        setShowResults(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    if (!testStarted) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <Award size={64} className="gradient-text" style={{ marginBottom: '1.5rem' }} />
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready for a <span className="gradient-text">Mock Test?</span></h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Test your skills with our timer-based simulation. You have 10 minutes to complete 10 questions.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
                    <div className="glass-card"><h3>Aptitude</h3><p>Quantitative & Logical</p></div>
                    <div className="glass-card" style={{ borderColor: 'var(--primary)' }}><h3>Technical</h3><p>DSA & CS Core</p></div>
                    <div className="glass-card"><h3>HR Round</h3><p>Behavioral Mock</p></div>
                </div>
                <button className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }} onClick={() => setTestStarted(true)}>
                    Start Technical MCQ Test
                </button>
            </div>
        );
    }

    if (showResults) {
        const score = Object.keys(answers).filter(key => answers[key] === questions[key].right).length;
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '3rem' }}>
                <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Test Analysis</h2>
                    <div style={{ fontSize: '4rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>
                        {score}/{questions.length}
                    </div>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                        {score === questions.length ? "Perfect! You're ready." : "Good effort! Keep practicing."}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                        {questions.map((q, i) => (
                            <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                {answers[i] === q.right ? <CheckCircle color="#10b981" /> : <XCircle color="#ef4444" />}
                                <div>{q.q}</div>
                            </div>
                        ))}
                    </div>
                    <button className="btn-primary" style={{ marginTop: '2rem', width: '100%' }} onClick={() => window.location.reload()}>Try Another Set</button>
                </div>
            </motion.div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ position: 'sticky', top: '70px', background: 'var(--background)', zIndex: 50, marginBottom: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <h2 style={{ fontSize: '1.1rem' }}>Question {currentQuestion + 1} of {questions.length}</h2>
                <div style={{ color: 'var(--accent)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Timer size={18} /> {formatTime(timeLeft)}
                </div>
            </header>

            <div className="glass-card" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem' }}>{questions[currentQuestion].q}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {questions[currentQuestion].options.map((opt, i) => (
                        <button
                            key={i}
                            className="glass-card"
                            style={{
                                textAlign: 'left',
                                border: answers[currentQuestion] === i ? '1px solid var(--primary)' : '1px solid var(--border)',
                                background: answers[currentQuestion] === i ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                                cursor: 'pointer'
                            }}
                            onClick={() => setAnswers({ ...answers, [currentQuestion]: i })}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                    className="glass-card"
                    disabled={currentQuestion === 0}
                    onClick={() => setCurrentQuestion(prev => prev - 1)}
                    style={{ opacity: currentQuestion === 0 ? 0.5 : 1 }}
                >
                    Previous
                </button>
                {currentQuestion === questions.length - 1 ? (
                    <button className="btn-primary" onClick={handleFinish}>Finish Test</button>
                ) : (
                    <button className="btn-primary" onClick={() => setCurrentQuestion(prev => prev + 1)}>
                        Next Question <ChevronRight size={18} />
                    </button>
                )}
            </div>
        </div >
    );
};

export default MockTest;
