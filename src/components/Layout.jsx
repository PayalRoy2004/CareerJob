import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  Home, Briefcase, BookOpen, Code,
  FileText, ClipboardCheck, MessageSquare,
  Bell, GraduationCap, User, Settings, LogOut, Sun, Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode !== null ? JSON.parse(savedMode) : true;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);
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

          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="glass-card"
              style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent', color: 'var(--text-primary)' }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="glass-card" style={{ padding: '0.5rem 1rem', borderRadius: '30px', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
              <span style={{ fontSize: '0.9rem' }}>Pro Plan</span>
            </div>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <img
                  src="https://ui-avatars.com/api/?name=User&background=8b5cf6&color=fff"
                  alt="Avatar"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--primary)' }}
                />
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="glass-card"
                    style={{
                      position: 'absolute',
                      top: '120%',
                      right: 0,
                      width: '200px',
                      padding: '0.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      zIndex: 50
                    }}
                  >
                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', cursor: 'pointer', textAlign: 'left', borderRadius: '8px' }}>
                      <User size={16} /> Profile
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', cursor: 'pointer', textAlign: 'left', borderRadius: '8px' }}>
                      <Settings size={16} /> Settings
                    </button>
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0.2rem 0' }} />
                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', cursor: 'pointer', textAlign: 'left', borderRadius: '8px' }}>
                      <LogOut size={16} color="#ef4444" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
