import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';
import './styles/globals.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const PeoplePage = lazy(() => import('./pages/PeoplePage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const PublicationsPage = lazy(() => import('./pages/PublicationsPage'));
const NewsEventsPage = lazy(() => import('./pages/NewsEventsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const PageLoader = () => (
  <div className="flex min-h-[50vh] items-center justify-center bg-gray-50">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-700" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/solutions" element={<ResearchPage />} />
                <Route path="/portfolio" element={<ProjectsPage />} />
                <Route path="/team" element={<PeoplePage />} />
                <Route path="/people" element={<Navigate to="/team" replace />} />
                <Route path="/publications" element={<PublicationsPage />} />
                <Route path="/insights" element={<NewsEventsPage />} />
                <Route path="/contact" element={<ContactPage />} />

                <Route path="/research" element={<Navigate to="/solutions" replace />} />
                <Route path="/projects" element={<Navigate to="/portfolio" replace />} />
                <Route path="/news" element={<Navigate to="/insights" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;