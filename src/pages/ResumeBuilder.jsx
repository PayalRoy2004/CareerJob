import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ResumeBuilder = () => {
    const [data, setData] = useState({
        name: 'Payal Roy',
        email: 'payalroy2004@example.com',
        phone: '+91 9330122470',
        location: 'Kolkata, West Bengal',
        linkedin: 'linkedin.com/in/payalroy',
        github: 'github.com/payalroy',
        summary: 'Aspiring software engineer with a strong foundation in modern web technologies and a passion for building scalable, user-centric applications. Eager to solve complex problems and contribute to a dynamic engineering team.',
        education: [
            { id: 1, degree: 'B.Tech in Electronics and Communication Engineering', college: 'JIS College of Engineering', cgpa: '8.62 / 10', year: '2022 - 2026' },
            { id: 2, degree: 'Class 12 (HSC)', school: 'Kendriya Vidyalaya No. 1, Barrackpore', Percentage: '75%', year: '2021 - 2022' },
            { id: 3, degree: 'Class 10 (SSC)', school: 'Kendriya Vidyalaya No. 1, Barrackpore', Percentage: '86%', year: '2019 - 2020' }
        ],
        technicalSkills: {
            languages: 'C, Python',
            web: 'HTML, CSS, JavaScript, React',
            databases: 'MySQL',
            tools: 'Git, VS Code'
        },
        experience: [
            { id: 1, company: 'Tech Solutions Inc.', role: 'Software Engineering Intern', duration: 'May 2023 - Aug 2023', workDone: 'Developed and maintained user-facing features using React.js. Collaborated with the backend team to integrate APIs, reducing load times by 20%.', tools: 'React, Node.js, Git' }
        ],
        projects: [
            { id: 1, title: 'Career Portal Application', duration: 'Jan 2026 - Present', description: 'Built a comprehensive career portal with mock tests, resume builder, and job listings.', tools: 'React, Vite, Express, MongoDB' }
        ],
        certifications: 'AWS Certified Cloud Practitioner, Meta Front-End Developer',
        achievements: 'Winner of National Level Hackathon 2023',
        softSkills: 'Problem Solving, Team Communication, Adaptability, Time Management',
        hobbies: 'Drawing, Reading, Travelling'
    });

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `${data.name}_Resume`
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleNestedChange = (category, field, value) => {
        setData({
            ...data,
            [category]: { ...data[category], [field]: value }
        });
    };

    const handleArrayChange = (category, index, field, value) => {
        const newArray = [...data[category]];
        newArray[index] = { ...newArray[index], [field]: value };
        setData({ ...data, [category]: newArray });
    };

    const addArrayItem = (category, template) => {
        setData({
            ...data,
            [category]: [...data[category], { ...template, id: Date.now() }]
        });
    };

    const removeArrayItem = (category, id) => {
        setData({
            ...data,
            [category]: data[category].filter(item => item.id !== id)
        });
    };

    const inputStyle = { background: 'rgba(255, 255, 255, 0.9)', color: '#1e293b', fontWeight: 500, marginBottom: '0.8rem', width: '100%', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.8rem' };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* ----------------- EDITOR SIDE ----------------- */}
            <div className="glass-card" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto', padding: '2rem' }}>
                <h2 className="gradient-text" style={{ marginBottom: '1.5rem', marginTop: 0 }}>Personal Info</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                    <input style={inputStyle} name="name" value={data.name} onChange={handleChange} placeholder="Full Name" />
                    <input style={inputStyle} name="phone" value={data.phone} onChange={handleChange} placeholder="Phone Number" />
                    <input style={inputStyle} name="email" value={data.email} onChange={handleChange} placeholder="Professional Email" />
                    <input style={inputStyle} name="location" value={data.location} onChange={handleChange} placeholder="Location (City, State)" />
                    <input style={inputStyle} name="linkedin" value={data.linkedin} onChange={handleChange} placeholder="LinkedIn URL" />
                    <input style={inputStyle} name="github" value={data.github} onChange={handleChange} placeholder="GitHub URL" />
                </div>

                <h2 className="gradient-text" style={{ marginBottom: '1.5rem' }}>Professional Summary</h2>
                <textarea style={{ ...inputStyle, minHeight: '100px' }} name="summary" value={data.summary} onChange={handleChange} placeholder="Professional Summary" />

                <h2 className="gradient-text" style={{ marginBottom: '1.5rem', marginTop: '2rem' }}>Education</h2>
                {data.education.map((edu, index) => (
                    <div key={edu.id} className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', marginBottom: '1rem', position: 'relative', border: '1px solid var(--border)' }}>
                        <button onClick={() => removeArrayItem('education', edu.id)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }}><Trash2 size={16} /></button>
                        <input style={inputStyle} value={edu.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} placeholder="Degree (B.Tech / Class 12)" />
                        <input style={inputStyle} value={edu.school} onChange={(e) => handleArrayChange('education', index, 'school', e.target.value)} placeholder="College / School Name" />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <input style={{ ...inputStyle, marginBottom: 0 }} value={edu.cgpa} onChange={(e) => handleArrayChange('education', index, 'cgpa', e.target.value)} placeholder="CGPA / Percentage" />
                            <input style={{ ...inputStyle, marginBottom: 0 }} value={edu.year} onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)} placeholder="Year of Graduation" />
                        </div>
                    </div>
                ))}
                <button onClick={() => addArrayItem('education', { degree: '', school: '', cgpa: '', year: '' })} className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontWeight: 600 }}>
                    <Plus size={16} /> Add Education
                </button>

                <h2 className="gradient-text" style={{ marginBottom: '1.5rem', marginTop: '2rem' }}>Technical Skills</h2>
                <div className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)' }}>
                    <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Programming Languages</label>
                    <input style={inputStyle} value={data.technicalSkills.languages} onChange={(e) => handleNestedChange('technicalSkills', 'languages', e.target.value)} placeholder="e.g. C, Python, Java" />

                    <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Web Technologies</label>
                    <input style={inputStyle} value={data.technicalSkills.web} onChange={(e) => handleNestedChange('technicalSkills', 'web', e.target.value)} placeholder="e.g. HTML, CSS, JavaScript, React" />

                    <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Databases</label>
                    <input style={inputStyle} value={data.technicalSkills.databases} onChange={(e) => handleNestedChange('technicalSkills', 'databases', e.target.value)} placeholder="e.g. MySQL, MongoDB" />

                    <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Tools</label>
                    <input style={{ ...inputStyle, marginBottom: 0 }} value={data.technicalSkills.tools} onChange={(e) => handleNestedChange('technicalSkills', 'tools', e.target.value)} placeholder="e.g. Git, VS Code, Postman" />
                </div>

                <h2 className="gradient-text" style={{ marginBottom: '1.5rem', marginTop: '2rem' }}>Experience / Internships</h2>
                {data.experience.map((exp, index) => (
                    <div key={exp.id} className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', marginBottom: '1rem', position: 'relative', border: '1px solid var(--border)' }}>
                        <button onClick={() => removeArrayItem('experience', exp.id)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }}><Trash2 size={16} /></button>
                        <input style={inputStyle} value={exp.company} onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} placeholder="Company Name" />
                        <input style={inputStyle} value={exp.role} onChange={(e) => handleArrayChange('experience', index, 'role', e.target.value)} placeholder="Role" />
                        <input style={inputStyle} value={exp.duration} onChange={(e) => handleArrayChange('experience', index, 'duration', e.target.value)} placeholder="Duration (e.g. May - Aug 2023)" />
                        <textarea style={{ ...inputStyle, minHeight: '80px' }} value={exp.workDone} onChange={(e) => handleArrayChange('experience', index, 'workDone', e.target.value)} placeholder="Work Done (Responsibility & Achievements)" />
                        <input style={{ ...inputStyle, marginBottom: 0 }} value={exp.tools} onChange={(e) => handleArrayChange('experience', index, 'tools', e.target.value)} placeholder="Tools Used" />
                    </div>
                ))}
                <button onClick={() => addArrayItem('experience', { company: '', role: '', duration: '', workDone: '', tools: '' })} className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontWeight: 600 }}>
                    <Plus size={16} /> Add Experience
                </button>

                <h2 className="gradient-text" style={{ marginBottom: '1.5rem', marginTop: '2rem' }}>Projects</h2>
                {data.projects.map((proj, index) => (
                    <div key={proj.id} className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', marginBottom: '1rem', position: 'relative', border: '1px solid var(--border)' }}>
                        <button onClick={() => removeArrayItem('projects', proj.id)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }}><Trash2 size={16} /></button>
                        <input style={inputStyle} value={proj.title} onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)} placeholder="Project Title" />
                        <input style={inputStyle} value={proj.duration} onChange={(e) => handleArrayChange('projects', index, 'duration', e.target.value)} placeholder="Duration" />
                        <textarea style={{ ...inputStyle, minHeight: '80px' }} value={proj.description} onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)} placeholder="Project Description" />
                        <input style={{ ...inputStyle, marginBottom: 0 }} value={proj.tools} onChange={(e) => handleArrayChange('projects', index, 'tools', e.target.value)} placeholder="Tools Used" />
                    </div>
                ))}
                <button onClick={() => addArrayItem('projects', { title: '', duration: '', description: '', tools: '' })} className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontWeight: 600 }}>
                    <Plus size={16} /> Add Project
                </button>

                <h2 className="gradient-text" style={{ marginBottom: '1.5rem', marginTop: '2rem' }}>Additional Info</h2>
                <div className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)' }}>
                    <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Certifications</label>
                    <textarea style={{ ...inputStyle, minHeight: '60px' }} name="certifications" value={data.certifications} onChange={handleChange} placeholder="Comma separated list of certifications" />

                    <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Achievements</label>
                    <textarea style={{ ...inputStyle, minHeight: '60px' }} name="achievements" value={data.achievements} onChange={handleChange} placeholder="Comma separated list of achievements" />

                    <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Soft Skills</label>
                    <textarea style={{ ...inputStyle, minHeight: '60px' }} name="softSkills" value={data.softSkills} onChange={handleChange} placeholder="Comma separated soft skills" />

                    <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Hobbies</label>
                    <textarea style={{ ...inputStyle, minHeight: '60px', marginBottom: 0 }} name="hobbies" value={data.hobbies} onChange={handleChange} placeholder="Comma separated hobbies" />
                </div>
            </div>

            {/* ----------------- PREVIEW SIDE (PRINTABLE) ----------------- */}
            <div style={{ position: 'sticky', top: '20px', height: 'fit-content' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                    <button onClick={handlePrint} className="btn-primary" style={{ padding: '0.8rem 1.5rem' }}>
                        Download PDF <Download size={18} />
                    </button>
                </div>

                {/* Resume Print Container */}
                <div style={{
                    maxHeight: 'calc(100vh - 180px)',
                    overflowY: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                }}>
                    <div ref={componentRef} style={{
                        background: 'white',
                        color: '#1e293b',
                        padding: '40px 50px',
                        minHeight: '297mm', // Approximate A4 minimum height
                        fontFamily: "'Inter', sans-serif"
                    }}>

                        {/* Header Box */}
                        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                            <h1 style={{ color: '#0f172a', fontSize: '2.4rem', margin: '0 0 10px 0', fontWeight: 800 }}>{data.name}</h1>
                            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '0.9rem', color: '#475569', marginBottom: '8px' }}>
                                {data.email && <span>{data.email}</span>}
                                {data.phone && <><span>|</span><span>{data.phone}</span></>}
                                {data.location && <><span>|</span><span>{data.location}</span></>}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '0.9rem', color: '#475569' }}>
                                {data.linkedin && <span style={{ color: '#2563eb' }}>{data.linkedin}</span>}
                                {data.linkedin && data.github && <span>|</span>}
                                {data.github && <span style={{ color: '#2563eb' }}>{data.github}</span>}
                            </div>
                        </div>

                        {/* Summary */}
                        {data.summary && (
                            <div style={{ marginBottom: '20px' }}>
                                <p style={{ fontSize: '0.95rem', lineHeight: '1.5', margin: 0, color: '#334155' }}>{data.summary}</p>
                            </div>
                        )}

                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <div style={{ marginBottom: '20px' }}>
                                <h3 style={{ borderBottom: '2px solid #94a3b8', paddingBottom: '4px', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '1px', marginBottom: '12px', color: '#0f172a' }}>Education</h3>
                                {data.education.map(edu => (
                                    <div key={edu.id} style={{ marginBottom: '10px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#1e293b' }}>
                                            <span>{edu.degree}</span>
                                            <span>{edu.year}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: '0.95rem', marginTop: '2px' }}>
                                            <span>{edu.school}</span>
                                            <span>{edu.cgpa ? `CGPA/Percentage: ${edu.cgpa}` : ''}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Technical Skills */}
                        <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ borderBottom: '2px solid #94a3b8', paddingBottom: '4px', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '1px', marginBottom: '12px', color: '#0f172a' }}>Technical Skills</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.95rem', color: '#334155' }}>
                                {data.technicalSkills.languages && <div><strong style={{ color: '#0f172a', width: '160px', display: 'inline-block' }}>Programming Languages:</strong> {data.technicalSkills.languages}</div>}
                                {data.technicalSkills.web && <div><strong style={{ color: '#0f172a', width: '160px', display: 'inline-block' }}>Web Technologies:</strong> {data.technicalSkills.web}</div>}
                                {data.technicalSkills.databases && <div><strong style={{ color: '#0f172a', width: '160px', display: 'inline-block' }}>Databases:</strong> {data.technicalSkills.databases}</div>}
                                {data.technicalSkills.tools && <div><strong style={{ color: '#0f172a', width: '160px', display: 'inline-block' }}>Tools:</strong> {data.technicalSkills.tools}</div>}
                            </div>
                        </div>

                        {/* Experience */}
                        {data.experience && data.experience.length > 0 && (
                            <div style={{ marginBottom: '20px' }}>
                                <h3 style={{ borderBottom: '2px solid #94a3b8', paddingBottom: '4px', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '1px', marginBottom: '12px', color: '#0f172a' }}>Experience / Internships</h3>
                                {data.experience.map(exp => (
                                    <div key={exp.id} style={{ marginBottom: '15px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#1e293b' }}>
                                            <span>{exp.role}</span>
                                            <span>{exp.duration}</span>
                                        </div>
                                        <div style={{ fontStyle: 'italic', marginBottom: '6px', color: '#475569', fontSize: '0.95rem', marginTop: '2px' }}>{exp.company}</div>
                                        <p style={{ margin: '0 0 4px 0', fontSize: '0.95rem', lineHeight: '1.5', color: '#334155' }}>{exp.workDone}</p>
                                        {exp.tools && <p style={{ margin: '0', fontSize: '0.9rem', color: '#475569' }}><strong>Tools used:</strong> {exp.tools}</p>}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Projects */}
                        {data.projects && data.projects.length > 0 && (
                            <div style={{ marginBottom: '20px' }}>
                                <h3 style={{ borderBottom: '2px solid #94a3b8', paddingBottom: '4px', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '1px', marginBottom: '12px', color: '#0f172a' }}>Projects</h3>
                                {data.projects.map(proj => (
                                    <div key={proj.id} style={{ marginBottom: '15px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#1e293b' }}>
                                            <span>{proj.title}</span>
                                            <span>{proj.duration}</span>
                                        </div>
                                        <p style={{ margin: '4px 0', fontSize: '0.95rem', lineHeight: '1.5', color: '#334155' }}>{proj.description}</p>
                                        {proj.tools && <p style={{ margin: '0', fontSize: '0.9rem', color: '#475569' }}><strong>Tools used:</strong> {proj.tools}</p>}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Certifications & Achievements (Two columns if both exist) */}
                        <div style={{ display: 'grid', gridTemplateColumns: (data.certifications && data.achievements) ? '1fr 1fr' : '1fr', gap: '20px', marginBottom: '20px' }}>
                            {data.certifications && (
                                <div>
                                    <h3 style={{ borderBottom: '2px solid #94a3b8', paddingBottom: '4px', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '1px', marginBottom: '12px', color: '#0f172a' }}>Certifications</h3>
                                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.95rem', color: '#334155' }}>
                                        {data.certifications.split(',').map((cert, index) => cert.trim() && <li key={index} style={{ marginBottom: '4px' }}>{cert.trim()}</li>)}
                                    </ul>
                                </div>
                            )}
                            {data.achievements && (
                                <div>
                                    <h3 style={{ borderBottom: '2px solid #94a3b8', paddingBottom: '4px', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '1px', marginBottom: '12px', color: '#0f172a' }}>Achievements</h3>
                                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.95rem', color: '#334155' }}>
                                        {data.achievements.split(',').map((ach, index) => ach.trim() && <li key={index} style={{ marginBottom: '4px' }}>{ach.trim()}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Soft Skills & Hobbies */}
                        <div style={{ display: 'grid', gridTemplateColumns: (data.softSkills && data.hobbies) ? '1fr 1fr' : '1fr', gap: '20px' }}>
                            {data.softSkills && (
                                <div>
                                    <h3 style={{ borderBottom: '2px solid #94a3b8', paddingBottom: '4px', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '1px', marginBottom: '12px', color: '#0f172a' }}>Soft Skills</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {data.softSkills.split(',').map((skill, index) => skill.trim() && (
                                            <span key={index} style={{ padding: '4px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.9rem', color: '#334155' }}>
                                                {skill.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {data.hobbies && (
                                <div>
                                    <h3 style={{ borderBottom: '2px solid #94a3b8', paddingBottom: '4px', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '1px', marginBottom: '12px', color: '#0f172a' }}>Hobbies</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {data.hobbies.split(',').map((hobby, index) => hobby.trim() && (
                                            <span key={index} style={{ padding: '4px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.9rem', color: '#334155' }}>
                                                {hobby.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;
