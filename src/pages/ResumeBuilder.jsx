import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, Plus, Trash2, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const ResumeBuilder = () => {
    const [data, setData] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 890',
        location: 'New York, USA',
        summary: 'Aspiring software engineer with a passion for building scalable web applications.',
        experience: [{ company: 'Tech Inc', role: 'Intern', year: '2023', details: 'Worked on React projects.' }],
        education: [{ school: 'University of Tech', degree: 'B.Tech CS', year: '2020-2024' }],
        skills: ['React', 'Node.js', 'Python']
    });

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        contentRef: componentRef,
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const addItem = (field) => {
        const newItem = field === 'experience'
            ? { company: '', role: '', year: '', details: '' }
            : { school: '', degree: '', year: '' };
        setData({ ...data, [field]: [...data[field], newItem] });
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Editor Side */}
            <div className="glass-card" style={{ height: 'calc(100vh - 150px)', overflowY: 'auto' }}>
                <h2 className="gradient-text" style={{ marginBottom: '1.5rem' }}>Personal Info</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                    <input className="glass-card" style={{ background: 'rgba(0,0,0,0.2)' }} name="name" value={data.name} onChange={handleChange} placeholder="Full Name" />
                    <input className="glass-card" style={{ background: 'rgba(0,0,0,0.2)' }} name="email" value={data.email} onChange={handleChange} placeholder="Email" />
                    <textarea className="glass-card" style={{ background: 'rgba(0,0,0,0.2)', minHeight: '100px' }} name="summary" value={data.summary} onChange={handleChange} placeholder="Professional Summary" />
                </div>

                <h2 className="gradient-text" style={{ marginBottom: '1.5rem' }}>Experience</h2>
                {data.experience.map((exp, i) => (
                    <div key={i} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px' }}>
                        <input className="glass-card" style={{ background: 'transparent', marginBottom: '0.5rem' }} value={exp.company} onChange={(e) => {
                            const newExp = [...data.experience];
                            newExp[i].company = e.target.value;
                            setData({ ...data, experience: newExp });
                        }} placeholder="Company" />
                        <input className="glass-card" style={{ background: 'transparent' }} value={exp.role} onChange={(e) => {
                            const newExp = [...data.experience];
                            newExp[i].role = e.target.value;
                            setData({ ...data, experience: newExp });
                        }} placeholder="Role" />
                    </div>
                ))}
                <button onClick={() => addItem('experience')} className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Plus size={16} /> Add Experience
                </button>
            </div>

            {/* Preview Side */}
            <div style={{ position: 'sticky', top: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                    <button onClick={handlePrint} className="btn-primary">
                        Download PDF <Download size={18} />
                    </button>
                </div>

                <div ref={componentRef} style={{
                    background: 'white',
                    color: '#1e293b',
                    padding: '40px',
                    minHeight: '800px',
                    borderRadius: '8px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    fontFamily: "'Inter', sans-serif"
                }}>
                    <h1 style={{ color: '#8b5cf6', fontSize: '2.5rem', margin: 0 }}>{data.name}</h1>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#64748b', marginBottom: '20px' }}>
                        <span>{data.email}</span> | <span>{data.phone}</span> | <span>{data.location}</span>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ borderBottom: '2px solid #8b5cf6', paddingBottom: '5px' }}>Summary</h3>
                        <p style={{ fontSize: '0.95rem' }}>{data.summary}</p>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ borderBottom: '2px solid #8b5cf6', paddingBottom: '5px' }}>Experience</h3>
                        {data.experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                                    <span>{exp.role} @ {exp.company}</span>
                                    <span>{exp.year}</span>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: '#475569' }}>{exp.details}</p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h3 style={{ borderBottom: '2px solid #8b5cf6', paddingBottom: '5px' }}>Skills</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {data.skills.map((skill, i) => (
                                <span key={i} style={{ padding: '4px 12px', background: '#f1f5f9', borderRadius: '4px', fontSize: '0.85rem' }}>{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;
