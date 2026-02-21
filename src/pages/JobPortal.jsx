import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, IndianRupee, Clock, Building2, Filter, Bookmark, Loader2, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import tcsLogo from '../assets/TCS-Icon-Logo-PNG.png';
import infosysLogo from '../assets/infosys.png';
import wiproLogo from '../assets/wipro.png';
import accentureLogo from '../assets/OIP.png';
import cognizantLogo from '../assets/cognizant.png';
import capgeminiLogo from '../assets/Capgemini.png';
import ltimindtreeLogo from '../assets/ltimindtree.png';

const initialJobs = [
    { id: 1, title: 'Software Engineer', company: 'TCS', location: 'Mumbai, MH', salary: '₹4L - ₹8L', type: 'Full-time', mode: 'Onsite', experience: 'Entry-level', posted: '2d ago', logo: tcsLogo, status: 'Applied', skills: ['Python', 'Spring Boot', 'SQL'] },
    { id: 2, title: 'Frontend Developer', company: 'Infosys', location: 'Bangalore, KA', salary: '₹5L - ₹10L', type: 'Full-time', mode: 'Remote', experience: 'Mid-level', posted: '1d ago', logo: infosysLogo, status: 'Shortlisted', skills: ['React', 'Angular', 'TypeScript'] },
    { id: 3, title: 'Data Scientist', company: 'Wipro', location: 'Hyderabad, TS', salary: '₹8L - ₹15L', type: 'Full-time', mode: 'Onsite', experience: 'Senior-level', posted: '5h ago', logo: wiproLogo, status: null, skills: ['Python', 'Machine Learning', 'SQL'] },
    { id: 4, title: 'UI/UX Designer', company: 'Accenture', location: 'Pune, MH', salary: '₹6L - ₹12L', type: 'Contract', mode: 'Hybrid', experience: 'Mid-level', posted: '3d ago', logo: accentureLogo, status: 'Rejected', skills: ['Figma', 'Adobe XD', 'Prototyping'] },
    { id: 5, title: 'Backend Engineer', company: 'Cognizant', location: 'Chennai, TN', salary: '₹7L - ₹14L', type: 'Full-time', mode: 'Remote', experience: 'Senior-level', posted: '1w ago', logo: cognizantLogo, status: 'Under Review', skills: ['Node.js', 'Python', 'AWS'] },
    { id: 6, title: 'Intern, Software Engineering', company: 'Capgemini', location: 'Noida, UP', salary: '₹3L - ₹5L', type: 'Internship', mode: 'Hybrid', experience: 'Entry-level', posted: '2w ago', logo: capgeminiLogo, status: 'Selected', skills: ['C++', 'Java', 'Algorithms'] },
    { id: 7, title: 'DevOps Engineer', company: 'LTIMindtree', location: 'Bangalore, KA', salary: '₹10L - ₹18L', type: 'Full-time', mode: 'Onsite', experience: 'Senior-level', posted: '1m ago', logo: ltimindtreeLogo, status: null, skills: ['Python', 'SQL', 'AWS'] },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Applied': return '#8b5cf6';
        case 'Under Review': return '#f59e0b';
        case 'Shortlisted': return '#0ea5e9';
        case 'Rejected': return '#ef4444';
        case 'Selected': return '#10b981';
        default: return 'transparent';
    }
};

const JobPortal = () => {
    const [jobs, setJobs] = useState(initialJobs);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ location: '', type: '', mode: '', experience: '', salary: '' });
    const [savedJobs, setSavedJobs] = useState(() => {
        const saved = localStorage.getItem('savedJobs');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    }, [savedJobs]);
    const [loadingJobId, setLoadingJobId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const jobsPerPage = 4;

    const handleApply = (id) => {
        setLoadingJobId(id);
        setTimeout(() => {
            setJobs(jobs.map(j => j.id === id ? { ...j, status: 'Applied' } : j));
            setLoadingJobId(null);
        }, 1500);
    };

    const toggleSave = (id) => {
        if (savedJobs.includes(id)) {
            setSavedJobs(savedJobs.filter(savedId => savedId !== id));
        } else {
            setSavedJobs([...savedJobs, id]);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setCurrentPage(1);
    };

    const filteredJobs = jobs.filter(job => {
        const searchLower = searchTerm.toLowerCase();
        const matchSearch = job.title.toLowerCase().includes(searchLower) ||
            job.company.toLowerCase().includes(searchLower) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchLower));
        const matchLocation = filters.location ? job.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
        const matchType = filters.type ? job.type === filters.type : true;
        const matchMode = filters.mode ? job.mode === filters.mode : true;
        const matchExp = filters.experience ? job.experience === filters.experience : true;

        let matchSalary = true;
        if (filters.salary) {
            const salaryMatch = job.salary.match(/₹(\d+)L/);
            const jobSalary = salaryMatch ? parseInt(salaryMatch[1]) : 0;
            if (filters.salary === '0-5') matchSalary = jobSalary <= 5;
            else if (filters.salary === '5-10') matchSalary = jobSalary > 5 && jobSalary <= 10;
            else if (filters.salary === '10-15') matchSalary = jobSalary > 10 && jobSalary <= 15;
            else if (filters.salary === '15+') matchSalary = jobSalary > 15;
        }

        return matchSearch && matchLocation && matchType && matchMode && matchExp && matchSalary;
    });

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ padding: '1rem' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '2rem' }}>Explore Opportunities</h1>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                        <Search size={18} color="var(--text-secondary)" />
                        <input
                            placeholder="Search jobs, companies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '250px' }}
                        />
                    </div>
                    <button onClick={() => setShowFilters(!showFilters)} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', cursor: 'pointer', color: 'white' }}>
                        <Filter size={18} color={showFilters ? 'var(--primary)' : 'white'} /> Filters
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden', marginBottom: '2rem' }}
                    >
                        <div className="glass-card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', padding: '1rem' }}>
                            <input name="location" placeholder="City or State..." value={filters.location} onChange={handleFilterChange} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '0.5rem', borderRadius: '8px', color: 'white', outline: 'none' }} />

                            <select name="type" value={filters.type} onChange={handleFilterChange} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '0.5rem', borderRadius: '8px', color: 'white', outline: 'none', appearance: 'none' }}>
                                <option value="" style={{ color: 'black' }}>All Job Types</option>
                                <option value="Full-time" style={{ color: 'black' }}>Full-time</option>
                                <option value="Internship" style={{ color: 'black' }}>Internship</option>
                                <option value="Contract" style={{ color: 'black' }}>Contract</option>
                            </select>

                            <select name="mode" value={filters.mode} onChange={handleFilterChange} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '0.5rem', borderRadius: '8px', color: 'white', outline: 'none', appearance: 'none' }}>
                                <option value="" style={{ color: 'black' }}>All Work Modes</option>
                                <option value="Remote" style={{ color: 'black' }}>Remote</option>
                                <option value="Hybrid" style={{ color: 'black' }}>Hybrid</option>
                                <option value="Onsite" style={{ color: 'black' }}>Onsite</option>
                            </select>

                            <select name="experience" value={filters.experience} onChange={handleFilterChange} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '0.5rem', borderRadius: '8px', color: 'white', outline: 'none', appearance: 'none' }}>
                                <option value="" style={{ color: 'black' }}>Any Experience</option>
                                <option value="Entry-level" style={{ color: 'black' }}>Entry-level</option>
                                <option value="Mid-level" style={{ color: 'black' }}>Mid-level</option>
                                <option value="Senior-level" style={{ color: 'black' }}>Senior-level</option>
                            </select>

                            <select name="salary" value={filters.salary} onChange={handleFilterChange} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '0.5rem', borderRadius: '8px', color: 'white', outline: 'none', appearance: 'none' }}>
                                <option value="" style={{ color: 'black' }}>Any Salary</option>
                                <option value="0-5" style={{ color: 'black' }}>Up to ₹5L</option>
                                <option value="5-10" style={{ color: 'black' }}>₹5L - ₹10L</option>
                                <option value="10-15" style={{ color: 'black' }}>₹10L - ₹15L</option>
                                <option value="15+" style={{ color: 'black' }}>₹15L+</option>
                            </select>

                            <button onClick={() => setFilters({ location: '', type: '', mode: '', experience: '', salary: '' })} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Clear</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {currentJobs.length === 0 ? (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'white' }}>No jobs found</h3>
                        <p>Try adjusting filters</p>
                    </div>
                ) : (currentJobs.map((job) => (
                    <motion.div
                        key={job.id}
                        whileHover={{ scale: 1.02 }}
                        className="glass-card"
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', position: 'relative' }}
                    >
                        <button
                            onClick={() => toggleSave(job.id)}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', cursor: 'pointer', color: savedJobs.includes(job.id) ? 'var(--primary)' : 'var(--text-secondary)', padding: '0.2rem' }}
                        >
                            <Bookmark size={20} fill={savedJobs.includes(job.id) ? 'currentColor' : 'none'} />
                        </button>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {job.logo ? (
                                    <img src={job.logo} alt={job.company} style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'white', objectFit: 'contain', padding: '4px' }} />
                                ) : (
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                        {job.company.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', paddingRight: '2.5rem' }}>{job.title}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        <Building2 size={14} /> {job.company}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <span className="badge badge-purple">{job.type}</span>
                            <span className="badge badge-cyan">{job.mode}</span>
                            {job.status && (
                                <span className="badge" style={{ background: `${getStatusColor(job.status)}20`, color: getStatusColor(job.status), border: `1px solid ${getStatusColor(job.status)}40` }}>
                                    {job.status}
                                </span>
                            )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <MapPin size={14} /> {job.location}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <IndianRupee size={14} /> {job.salary}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Clock size={14} /> {job.posted}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Info size={14} /> {job.experience}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {job.skills.map((skill, i) => (
                                <span key={i} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0' }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button className="glass-card" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer', background: 'rgba(255,255,255,0.02)' }}>View Details</button>
                            <button
                                onClick={() => handleApply(job.id)}
                                disabled={!!job.status || loadingJobId === job.id}
                                className={job.status ? "glass-card" : "btn-primary"}
                                style={{
                                    padding: '0.5rem 1.25rem',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    opacity: job.status ? 0.9 : 1,
                                    cursor: job.status ? 'not-allowed' : 'pointer',
                                    ...(job.status === 'Applied' ? { background: '#10b981', color: 'white', borderColor: '#10b981' } : {})
                                }}
                            >
                                {loadingJobId === job.id && <Loader2 size={16} className="animate-spin" />}
                                {job.status ? 'Applied' : 'Apply Now'}
                            </button>
                        </div>
                    </motion.div>
                )))}
            </div>

            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="glass-card"
                        style={{ padding: '0.5rem', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={currentPage === page ? "btn-primary" : "glass-card"}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    padding: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    borderRadius: '8px',
                                    border: currentPage === page ? 'none' : '1px solid var(--border)'
                                }}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="glass-card"
                        style={{ padding: '0.5rem', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default JobPortal;
