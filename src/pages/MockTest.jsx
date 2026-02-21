import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Timer, CheckCircle, XCircle, ChevronRight, ChevronLeft, Award, AlertCircle, Clock, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

const testQuestions = {
    'Aptitude': [
        { q: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?", options: ["120 metres", "180 metres", "324 metres", "150 metres"], right: 3 },
        { q: "If the day before yesterday was Thursday, when will Sunday be?", options: ["Today", "Tomorrow", "Day after tomorrow", "Two days after tomorrow"], right: 1 },
        { q: "Find the odd one out: 3, 5, 11, 14, 17, 21", options: ["21", "17", "14", "3"], right: 2 },
        { q: "What is the probability of getting a sum 9 from two throws of a dice?", options: ["1/6", "1/8", "1/9", "1/12"], right: 2 }
    ],
    'Technical': [
        { q: "What is the time complexity of searching in a Binary Search Tree (average case)?", options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"], right: 1 },
        { q: "Which data structure uses LIFO principle?", options: ["Queue", "Linked List", "Stack", "Heap"], right: 2 },
        { q: "Which company developed React?", options: ["Google", "Facebook", "Microsoft", "Twitter"], right: 1 },
        { q: "Standard port for HTTP?", options: ["80", "443", "22", "8080"], right: 0 }
    ],
    'HR': [
        { q: "What should you focus on when answering 'Tell me about yourself'?", options: ["Childhood memories", "Professional achievements & relevance", "Family background", "Complaints about past jobs"], right: 1 },
        { q: "What does STAR stand for in behavioral interviews?", options: ["Situation, Task, Action, Result", "Start, Time, Action, Review", "Situation, Target, Achievement, Result", "Status, Task, Action, Result"], right: 0 },
        { q: "How should you intelligently discuss your weaknesses?", options: ["Say you have no weaknesses", "Say you work too hard", "Share a real weakness and how you are proactively improving it", "List multiple major flaws"], right: 2 },
        { q: "What is the most professional reason to give for leaving your previous job?", options: ["Didn't like the manager", "Wanted a higher salary", "Seeking new challenges and career growth", "The work was too hard"], right: 2 }
    ]
};

const MockTest = () => {
    const [testStarted, setTestStarted] = useState(false);
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [selectedTest, setSelectedTest] = useState('Technical');
    const [selectedDifficulty, setSelectedDifficulty] = useState('Beginner');
    const [questions, setQuestions] = useState([]);


    useEffect(() => {
        let timer;
        if (testStarted && timeLeft > 0 && !showResults) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0) {
            handleFinish();
        }
        return () => clearInterval(timer);
    }, [testStarted, timeLeft, showResults]);

    useEffect(() => {
        // Lock navigation & keyboard when test is active
        const handleKeyDown = (e) => {
            if (testStarted && !showResults) {
                // Prevent typical refresh/navigation keys
                if (e.key === 'F5' || (e.ctrlKey && e.key === 'r') || (e.ctrlKey && e.key === 'w') || (e.altKey && e.key === 'ArrowLeft')) {
                    e.preventDefault();
                    alert("Navigation is locked during the test!");
                }
            }
        };

        const handleBeforeUnload = (e) => {
            if (testStarted && !showResults) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [testStarted, showResults]);

    const startTestFlow = () => {
        // Shuffle questions
        const rawQs = [...testQuestions[selectedTest]];
        for (let i = rawQs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rawQs[i], rawQs[j]] = [rawQs[j], rawQs[i]];
        }
        setQuestions(rawQs);
        setTestStarted(true);
        setTimeLeft(600); // Reset timer just in case

        // Try to request fullscreen
        try {
            document.documentElement.requestFullscreen().catch((e) => console.log("Fullscreen request denied: ", e));
        } catch (e) {
            console.log("Fullscreen API not available");
        }
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleFinish = () => {
        setShowResults(true);
        try {
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(e => console.log(e));
            }
        } catch (e) { }

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
                    Test your skills with our timer-based simulation. You have 10 minutes to complete 4 questions.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
                    <div
                        className="glass-card"
                        onClick={() => setSelectedTest('Aptitude')}
                        style={{
                            cursor: 'pointer',
                            borderColor: selectedTest === 'Aptitude' ? 'var(--primary)' : 'var(--border)',
                            background: selectedTest === 'Aptitude' ? 'rgba(139, 92, 246, 0.1)' : 'var(--card-bg)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <h3>Aptitude</h3>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Quantitative & Logical</p>
                    </div>
                    <div
                        className="glass-card"
                        onClick={() => setSelectedTest('Technical')}
                        style={{
                            cursor: 'pointer',
                            borderColor: selectedTest === 'Technical' ? 'var(--primary)' : 'var(--border)',
                            background: selectedTest === 'Technical' ? 'rgba(139, 92, 246, 0.1)' : 'var(--card-bg)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <h3>Technical</h3>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>DSA & CS Core</p>
                    </div>
                    <div
                        className="glass-card"
                        onClick={() => setSelectedTest('HR')}
                        style={{
                            cursor: 'pointer',
                            borderColor: selectedTest === 'HR' ? 'var(--primary)' : 'var(--border)',
                            background: selectedTest === 'HR' ? 'rgba(139, 92, 246, 0.1)' : 'var(--card-bg)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <h3>HR Round</h3>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Behavioral Mock</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', maxWidth: '800px', margin: '0 auto 3rem', flexWrap: 'wrap' }}>
                    <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'left', flex: 1, minWidth: '250px' }}>
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
                            <FileText size={20} color="var(--primary)" /> {selectedTest} Test Info
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><span style={{ color: 'var(--primary)' }}>•</span> {testQuestions[selectedTest].length} Questions</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><span style={{ color: 'var(--primary)' }}>•</span> 10 Minutes</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><span style={{ color: 'var(--primary)' }}>•</span> Auto-submit on timeout</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><span style={{ color: 'var(--primary)' }}>•</span> No negative marking</li>
                        </ul>
                    </div>

                    <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'left', flex: 1, minWidth: '250px' }}>
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', fontSize: '1.2rem' }}>Select Difficulty</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                                <label key={level} style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', background: selectedDifficulty === level ? 'rgba(139, 92, 246, 0.1)' : 'transparent', transition: 'background 0.2s' }}>
                                    <input
                                        type="radio"
                                        name="difficulty"
                                        value={level}
                                        checked={selectedDifficulty === level}
                                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                                        style={{ accentColor: 'var(--primary)', width: '18px', height: '18px', cursor: 'pointer' }}
                                    />
                                    <span style={{ color: selectedDifficulty === level ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: selectedDifficulty === level ? 600 : 400 }}>{level}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem' }}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="glass-card"
                        style={{ padding: '1rem 2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        <ChevronLeft size={20} /> Back to Dashboard
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary"
                        style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}
                        onClick={startTestFlow}
                    >
                        Start {selectedTest} Test
                    </motion.button>
                </div>
            </div>
        );
    }

    if (showResults) {
        const score = Object.keys(answers).filter(key => answers[key] === questions[key].right).length;
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '3rem' }}>
                <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h2 style={{ marginBottom: '1rem' }}>{selectedTest} Test Analysis</h2>
                    <div style={{ fontSize: '4rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>
                        {score}/{questions.length}
                    </div>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                        {score === questions.length ? "Perfect! You're ready." : "Good effort! Keep practicing."}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                        {questions.map((q, i) => (
                            <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                <div style={{ marginTop: '0.2rem' }}>
                                    {answers[i] === q.right ? <CheckCircle color="#10b981" size={24} /> : <XCircle color="#ef4444" size={24} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ marginBottom: '0.8rem', fontWeight: 600 }}>{q.q}</div>
                                    <div style={{ fontSize: '0.9rem', color: answers[i] === q.right ? '#10b981' : '#ef4444', marginBottom: '0.3rem' }}>
                                        <span style={{ fontWeight: 600 }}>Your Answer: </span>
                                        {answers[i] !== undefined ? q.options[answers[i]] : "Not Answered"}
                                    </div>
                                    {answers[i] !== q.right && (
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                            <span style={{ color: '#10b981', fontWeight: 600 }}>Correct Answer: </span>
                                            {q.options[q.right]}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button
                            className="glass-card"
                            style={{ flex: 1, padding: '1rem' }}
                            onClick={() => navigate('/')}
                        >
                            Back to Dashboard
                        </button>
                        <button
                            className="btn-primary"
                            style={{ flex: 1, padding: '1rem' }}
                            onClick={() => window.location.reload()}
                        >
                            Try Another Set
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ position: 'sticky', top: '70px', background: 'var(--background)', zIndex: 50, padding: '1rem 0', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
                <div>
                    <span style={{ color: 'var(--primary)', fontWeight: 600, marginRight: '1rem' }}>{selectedTest} Test</span>
                    <h2 style={{ fontSize: '1.1rem', display: 'inline' }}>Question {currentQuestion + 1} of {questions.length}</h2>
                </div>
                <div style={{ color: 'var(--accent)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(245, 158, 11, 0.1)', padding: '0.3rem 0.8rem', borderRadius: '20px' }}>
                    <Timer size={18} /> {formatTime(timeLeft)}
                </div>
            </header>

            <div className="glass-card" style={{ marginBottom: '2rem', padding: '2rem' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem', lineHeight: '1.5' }}>{questions[currentQuestion].q}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {questions[currentQuestion].options.map((opt, i) => (
                        <button
                            key={i}
                            className="glass-card"
                            style={{
                                textAlign: 'left',
                                padding: '1rem 1.5rem',
                                border: answers[currentQuestion] === i ? '2px solid var(--primary)' : '1px solid var(--border)',
                                background: answers[currentQuestion] === i ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                fontSize: '1rem'
                            }}
                            onClick={() => setAnswers({ ...answers, [currentQuestion]: i })}
                            onMouseEnter={(e) => {
                                if (answers[currentQuestion] !== i) {
                                    e.currentTarget.style.borderColor = 'var(--text-secondary)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (answers[currentQuestion] !== i) {
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                }
                            }}
                        >
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                border: '1px solid',
                                borderColor: answers[currentQuestion] === i ? 'var(--primary)' : 'var(--text-secondary)',
                                marginRight: '1rem',
                                background: answers[currentQuestion] === i ? 'var(--primary)' : 'transparent',
                                color: answers[currentQuestion] === i ? 'white' : 'var(--text-secondary)',
                                fontSize: '0.8rem'
                            }}>
                                {String.fromCharCode(65 + i)}
                            </span>
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
                    style={{
                        opacity: currentQuestion === 0 ? 0.5 : 1,
                        cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                        padding: '0.8rem 1.5rem'
                    }}
                >
                    Previous
                </button>
                {currentQuestion === questions.length - 1 ? (
                    <button className="btn-primary" onClick={handleFinish} style={{ padding: '0.8rem 2rem' }}>Finish Test</button>
                ) : (
                    <button className="btn-primary" onClick={() => setCurrentQuestion(prev => prev + 1)} style={{ padding: '0.8rem 1.5rem' }}>
                        Next Question <ChevronRight size={18} />
                    </button>
                )}
            </div>
        </div >
    );
};

export default MockTest;
