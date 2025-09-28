import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ResearchPage from './pages/ResearchPage';
import PeoplePage from './pages/PeoplePage';
import ProjectsPage from './pages/ProjectsPage';
import PublicationsPage from './pages/PublicationsPage';
import NewsEventsPage from './pages/NewsEventsPage';
import ContactPage from './pages/ContactPage';
import ErrorBoundary from './components/common/ErrorBoundary';
import './styles/globals.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/people" element={<PeoplePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/publications" element={<PublicationsPage />} />
              <Route path="/news" element={<NewsEventsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;