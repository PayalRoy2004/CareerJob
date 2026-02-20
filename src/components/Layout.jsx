import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Home, Briefcase, BookOpen, Code, 
  FileText, ClipboardCheck, MessageSquare, 
  Bell, GraduationCap 
} from 'lucide-react';

const Layout = () => {
  const menuItems = [
    { path: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { path: '/jobs', icon: <Briefcase size={20} />, label: 'Job Portal' },
    { path: '/preparation', icon: <BookOpen size={20} />, label: 'Preparation' },
    { path: '/coding', icon: <Code size={20} />, label: 'Coding Practice' },
    { path: '/mock-test', icon: <ClipboardCheck size={20} />, label: 'Mock Tests' },
    { path: '/resume', icon: <FileText size={20} />, label: 'Resume Builder' },
    { path: '/interview', icon: <MessageSquare size={20} />, label: 'Interviews' },
    { path: '/notifications', icon: <Bell size={20} />, label: 'Notifications' },
  ];

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0 1rem 2rem', borderBottom: '1px solid var(--border)', marginBottom: '1rem' }}>
          <GraduationCap className="gradient-text" size={32} style={{ stroke: 'url(#grad1)' }} />
          <svg width="0" height="0">
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#8b5cf6' }} />
              <stop offset="100%" style={{ stopColor: '#06b6d4' }} />
            </linearGradient>
          </svg>
          <h2 className="gradient-text" style={{ fontSize: '1.5rem' }}>CareerHub</h2>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path}
              className={({ isActive }) => `nav-link glass-card ${isActive ? 'active' : ''}`}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.8rem 1rem',
                border: isActive ? '1px solid var(--primary)' : '1px solid transparent',
                background: isActive ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                borderRadius: '12px'
              })}
            >
              <span style={{ color: 'inherit' }}>{item.icon}</span>
              <span style={{ fontWeight: 500 }}>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <header>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Welcome back, User!</h1>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div className="glass-card" style={{ padding: '0.5rem 1rem', borderRadius: '30px', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
              <span style={{ fontSize: '0.9rem' }}>Pro Plan</span>
            </div>
            <img 
              src="https://ui-avatars.com/api/?name=User&background=8b5cf6&color=fff" 
              alt="Avatar" 
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--primary)' }} 
            />
          </div>
        </header>
        
        <div style={{ padding: '1rem' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
