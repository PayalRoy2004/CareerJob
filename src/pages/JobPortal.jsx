import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Clock, Building2, Filter } from 'lucide-react';

const jobs = [
    { id: 1, title: 'Software Engineer', company: 'Google', location: 'Mountain View, CA', salary: '$120k - $180k', type: 'Full-time', posted: '2d ago', logo: 'https://logo.clearbit.com/google.com' },
    { id: 2, title: 'Frontend Developer', company: 'Vercel', location: 'Remote', salary: '$100k - $150k', type: 'Remote', posted: '1d ago', logo: 'https://logo.clearbit.com/vercel.com' },
    { id: 3, title: 'Data Scientist', company: 'Tesla', location: 'Austin, TX', salary: '$130k - $190k', type: 'Full-time', posted: '5h ago', logo: 'https://logo.clearbit.com/tesla.com' },
    { id: 4, title: 'Product Designer', company: 'Airbnb', location: 'San Francisco, CA', salary: '$110k - $160k', type: 'Contract', posted: '3d ago', logo: 'https://logo.clearbit.com/airbnb.com' },
    { id: 5, title: 'Backend Engineer', company: 'Stripe', location: 'Remote', salary: '$140k - $200k', type: 'Full-time', posted: '1w ago', logo: 'https://logo.clearbit.com/stripe.com' },
];

const JobPortal = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ padding: '1rem' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '2rem' }}>Explore Opportunities</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                        <Search size={18} color="var(--text-secondary)" />
                        <input
                            placeholder="Search jobs, companies..."
                            style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '250px' }}
                        />
                    </div>
                    <button className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', cursor: 'pointer' }}>
                        <Filter size={18} /> Filters
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {jobs.map((job) => (
                    <motion.div
                        key={job.id}
                        whileHover={{ scale: 1.02 }}
                        className="glass-card"
                        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <img src={job.logo} alt={job.company} style={{ width: '48px', height: '48px', borderRadius: '12px' }} />
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{job.title}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        <Building2 size={14} /> {job.company}
                                    </div>
                                </div>
                            </div>
                            <span className="badge badge-purple">{job.type}</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <MapPin size={14} /> {job.location}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <DollarSign size={14} /> {job.salary}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Clock size={14} /> {job.posted}
                            </div>
                        </div>

                        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0.5rem 0' }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>12 applicants</div>
                            <button className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}>Apply Now</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default JobPortal;
