import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

import ResumeBuilder from './pages/ResumeBuilder';

import JobPortal from './pages/JobPortal';

import MockTest from './pages/MockTest';

import InterviewExperience from './pages/InterviewExperience';

import CodingPractice from './pages/CodingPractice';

import Preparation from './pages/Preparation';

import Notifications from './pages/Notifications';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="jobs" element={<JobPortal />} />
        <Route path="preparation" element={<Preparation />} />
        <Route path="coding" element={<CodingPractice />} />
        <Route path="mock-test" element={<MockTest />} />
        <Route path="resume" element={<ResumeBuilder />} />
        <Route path="interview" element={<InterviewExperience />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
};

export default App;
