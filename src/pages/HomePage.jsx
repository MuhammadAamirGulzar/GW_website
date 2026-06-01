import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Users, BookOpen, Cpu, Database, Brain, Code, Server, Shield, GitBranch, Zap, Monitor, HardDrive, Sparkles, Activity } from 'lucide-react';
import { FaDollarSign } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import projects from './../classes/projects'; 
import CandidateData from './../classes/Candidate'; 

// Process projects data to create research areas
const processResearchAreas = (projectsData) => {
  const categoryImages = {
    'Smart Media': '/backup-images/socialmedia.jpg',
    'eHealth': '/backup-images/ehealth.jpg',
    'Ebusiness': '/backup-images/smartbusiness.jpg',
    'eDocuments': '/backup-images/edocument.jpg',
    'Smart City': '/backup-images/cityplanning.jpg',
    'Agro Tech': '/backup-images/agri.jpg'
  };

  const categoryDescriptions = {
    'Smart Media': 'Advanced social media analytics, fake news detection, and content moderation systems for safer digital communities.',
    'eHealth': 'AI-powered healthcare solutions including disease prediction, medical imaging analysis, and diagnostic assistance systems.',
    'Ebusiness': 'Intelligent business solutions featuring visual search, customer analytics, and automated sales systems.',
    'eDocuments': 'Document analysis and processing systems using NLP for intelligent categorization and information extraction.',
    'Smart City': 'Smart city solutions including forensic intelligence and crime pattern analysis for urban safety.',
    'Agro tech': 'IoT and AI-powered agricultural technology for smart farming, crop monitoring, and agricultural automation systems.'
  };

  // Create mapping for old names to new names
  const categoryMapping = {
    'Social Network': 'Smart Media',
    'Smart Business': 'Ebusiness', 
    'Smart Home': 'Agro Tech'
  };

  // Group projects by category and count them
  const categoryStats = projectsData.reduce((acc, project) => {
    const originalCategory = project.category;
    const category = categoryMapping[originalCategory] || originalCategory;
    
    if (!acc[category]) {
      acc[category] = {
        projects: 0,
        publications: 0
      };
    }
    acc[category].projects += 1;
    // Estimate publications based on whether project has paperUrl
    if (project.paperUrl) {
      acc[category].publications += 1;
    }
    return acc;
  }, {});

  // Convert to research areas format
  return Object.entries(categoryStats).map(([category, stats], index) => ({
    id: index + 1,
    title: category === 'eHealth' ? 'eHealth & Medical AI' : 
           category === 'Ebusiness' ? 'eBusiness' :
           category === 'Smart Media' ? 'Smart Media' :
           category === 'eDocuments' ? 'eDocuments' :
           category === 'Smart City' ? 'Smart City' :
           category === 'Agro Tech' ? 'Agro Tech' : category,
    originalCategory: category, // Keep original category for filtering
    description: categoryDescriptions[category] || `Advanced research and development in ${category} technologies.`,
    projects: stats.projects,
    publications: Math.max(stats.publications, Math.floor(stats.projects * 1.5)), // Ensure reasonable publication count
    image: categoryImages[category] || 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }));
};

// Process candidate data for news
const processNewsData = (candidateData) => {
  return candidateData.map((item, index) => ({
    id: index + 1,
    title: item.heading,
    content: item.info.substring(0, 200) + (item.info.length > 200 ? '...' : ''),
    date: index === 0 ? "2024-07-15" : 
          index === 1 ? "2024-07-10" : 
          index === 2 ? "2024-07-05" :
          index === 3 ? "2024-06-30" :
          "2024-06-25", // Generate dates for news items
    type: item.heading.includes('NRPU') ? 'Funding' :
          item.heading.includes('ICDM') ? 'Research' :
          item.heading.includes('published') ? 'Publication' :
          item.heading.includes('PhD') ? 'Achievement' :
          item.heading.includes('IWDS') ? 'Event' : 'News',
    imageURL: item.pic || 
              (item.heading.includes('NRPU') ? 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' :
               item.heading.includes('ICDM') ? 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' :
               item.heading.includes('published') ? 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' :
               item.heading.includes('PhD') ? 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' :
               'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
    webLink: item.webLink,
    videoLink: item.videoLink
  }));
};

// Create data objects
const realData = {
  research: processResearchAreas(projects),
  news: processNewsData(CandidateData)
};

// Calculate real stats from projects data
const realStats = {
  totalProjects: projects.length,
  totalPublications: projects.filter(p => p.paperUrl).length + 150, // Add base publications
  totalResearchers: 25, // Keep as provided
  totalFunding: "$15M+" // Keep as provided
};

const Card = ({ children, className = "", padding = "p-6", ...props }) => (
  <div className={`bg-white rounded-2xl shadow-xl border border-gray-200 ${padding} ${className}`} {...props}>
    {children}
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentResearchSlide, setCurrentResearchSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isResearchHovering, setIsResearchHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Typing animation
  const typingWords = useMemo(() => ['Machine Learning', 'Data Mining', 'Computer Vision', 'Internet of Things', 'Social Analytics'], []);
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Scroll reveal
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const featuredNews = realData.news.slice(0, 3);
  const researchAreas = realData.research;

  // Category color map for research area cards
  const categoryColors = {
    'Smart Media': { topBorder: 'border-t-4 border-t-pink-500', iconBg: 'group-hover:bg-pink-50', iconText: 'group-hover:text-pink-600', accentBar: 'from-pink-400 to-pink-600', cardBg: 'group-hover:bg-pink-50/30' },
    'eHealth':     { topBorder: 'border-t-4 border-t-purple-500', iconBg: 'group-hover:bg-purple-50', iconText: 'group-hover:text-purple-600', accentBar: 'from-purple-400 to-purple-600', cardBg: 'group-hover:bg-purple-50/30' },
    'Ebusiness':   { topBorder: 'border-t-4 border-t-blue-500', iconBg: 'group-hover:bg-blue-50', iconText: 'group-hover:text-blue-600', accentBar: 'from-blue-400 to-blue-600', cardBg: 'group-hover:bg-blue-50/30' },
    'eDocuments':  { topBorder: 'border-t-4 border-t-indigo-500', iconBg: 'group-hover:bg-indigo-50', iconText: 'group-hover:text-indigo-600', accentBar: 'from-indigo-400 to-indigo-600', cardBg: 'group-hover:bg-indigo-50/30' },
    'Smart City':  { topBorder: 'border-t-4 border-t-orange-500', iconBg: 'group-hover:bg-orange-50', iconText: 'group-hover:text-orange-600', accentBar: 'from-orange-400 to-orange-600', cardBg: 'group-hover:bg-orange-50/30' },
    'Agro Tech':   { topBorder: 'border-t-4 border-t-green-500', iconBg: 'group-hover:bg-green-50', iconText: 'group-hover:text-green-600', accentBar: 'from-green-400 to-green-600', cardBg: 'group-hover:bg-green-50/30' },
  };
  const defaultCatColor = { topBorder: 'border-t-4 border-t-cyan-500', iconBg: 'group-hover:bg-cyan-50', iconText: 'group-hover:text-cyan-600', accentBar: 'from-cyan-400 to-cyan-600', cardBg: 'group-hover:bg-cyan-50/30' };

  // Calculate cards per view based on screen size
  const getCardsPerView = () => {
    if (viewportWidth < 640) return 1; // mobile
    if (viewportWidth < 1024) return 2; // tablet
    return 3; // desktop
  };

  const cardsPerView = getCardsPerView();
  const maxSlide = Math.max(0, researchAreas.length - cardsPerView);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovering) {
        setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredNews.length, isHovering]);

  useEffect(() => {
    const researchTimer = setInterval(() => {
      if (!isResearchHovering) {
        setCurrentResearchSlide((prev) => {
          return prev >= maxSlide ? 0 : prev + 1; // Reset to 0 when reaching the end
        });
      }
    }, 4000);
    return () => clearInterval(researchTimer);
  }, [maxSlide, isResearchHovering]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentWord = typingWords[typingIndex];
    const speed = isDeleting ? 45 : 95;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTypingIndex((prev) => (prev + 1) % typingWords.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, typingIndex, typingWords]);

  // Scroll reveal for stats section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.15 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredNews.length) % featuredNews.length);
  };

  const nextResearchSlide = () => {
    setCurrentResearchSlide((prev) => {
      return prev >= maxSlide ? 0 : prev + 1; // Reset to 0 instead of staying at max
    });
  };

  const prevResearchSlide = () => {
    setCurrentResearchSlide((prev) => (prev - 1 + researchAreas.length) % researchAreas.length);
  };

  // Function to handle "View Projects" click with specific category
  const handleViewProjects = (categoryName) => {
    // Navigate to projects page with state containing the category
    navigate('/projects', { state: { selectedCategory: categoryName } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Simplified Colors */}
    <div className="relative bg-slate-800 text-white overflow-hidden min-h-screen flex items-center pt-16">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-2xl transform rotate-45 animate-spin-slow backdrop-blur-sm"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/15 rounded-full animate-bounce-slow backdrop-blur-sm"></div>
          <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-white/20 rounded-lg animate-pulse backdrop-blur-sm"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-white/10 rounded-full transform rotate-12 animate-float backdrop-blur-sm"></div>
        </div>
 

      {/* Dynamic background gradient based on mouse position */}
      <div
        className="absolute inset-0 opacity-30 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.25) 0%, transparent 65%)`,
        }}
      ></div>

      {/* Particle network dots */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        {[...Array(20)].map((_, i) => (
          <circle
            key={i}
            cx={`${(i * 17 + 5) % 100}%`}
            cy={`${(i * 23 + 10) % 100}%`}
            r="1.5"
            fill="#22d3ee"
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <line
            key={`l${i}`}
            x1={`${(i * 17 + 5) % 100}%`} y1={`${(i * 23 + 10) % 100}%`}
            x2={`${((i + 3) * 17 + 5) % 100}%`} y2={`${((i + 3) * 23 + 10) % 100}%`}
            stroke="#22d3ee" strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* Main Content */}
      <div className="relative max-w-5xl mx-auto px-2 py-16 sm:px-6 lg:px-8 z-10">
        <div className="text-center space-y-8">
          {/* Title */}
          <div className="relative animate-fade-in-up">
            {/* University badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-gray-200 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full mb-6 tracking-wide">
              <Database className="h-3.5 w-3.5 text-cyan-400" />
              National University of Computer & Emerging Sciences · Islamabad
            </div>

            {/* Main heading — lab name */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 font-display tracking-tight relative">
              <span className="relative inline-block">
                <span className="text-white">
                  GradientWise
                </span>
                <span className="absolute -inset-3 bg-cyan-400/15 blur-3xl rounded-full pointer-events-none"></span>
              </span>
            </h1>

            {/* Typing animation line */}
            <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-cyan-300 mb-6 min-h-[2.5rem] flex items-center justify-center gap-2">
              <span className="text-gray-300">Specializing in</span>
              <span className="relative">
                <span>{displayText}</span>
                <span className="inline-block w-0.5 h-6 sm:h-7 bg-cyan-400 ml-0.5 align-middle animate-pulse"></span>
              </span>
            </div>

            {/* Quote */}
            <p className="text-sm sm:text-base italic text-gray-400 max-w-2xl mx-auto leading-relaxed border-l-2 border-cyan-500/40 pl-4 text-left sm:text-center sm:border-l-0 sm:pl-0">
              "The Goal is to turn Data into Information, and Information into Insight."
            </p>
          </div>

          <p
            className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-300 leading-relaxed animate-fade-in-up px-4"
            style={{ animationDelay: "0.5s" }}
          >
            We combine deep research rigor with production-grade engineering to deliver scalable AI systems — from prototype to deployment.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center p-4 sm:p-8 animate-fade-in-up"
            style={{ animationDelay: "1s" }}
          >
            <Link
              to="/solutions"
              className="group relative bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/40 hover:-translate-y-2 hover:scale-105 transform-gpu border border-cyan-400/50"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Database className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                Explore Solutions
                <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
              </span>
              <div className="absolute inset-0 bg-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <div className="absolute -inset-1 bg-cyan-400/40 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
            </Link>

            <Link
              to="/publications"
              className="group relative border-3 border-white/40 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold transition-all duration-500 hover:bg-white/15 hover:border-white hover:text-white hover:-translate-y-2 hover:scale-105 backdrop-blur-md overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                <BookOpen className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-bounce" />
                View Publications
                <Sparkles className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 opacity-0 group-hover:opacity-100 animate-twinkle transition-opacity duration-300" />
              </span>
              <div className="absolute inset-0 bg-white/15 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-2xl"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Scrolling indicator */}
      <div
        className="absolute bottom-1 animate-bounce-gentle"
        style={{ left: "calc(50% - 1.25rem)" }}
      >
        <div className="relative w-8 h-14 border-3 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-2 h-4 bg-white rounded-full mt-3 animate-scroll"></div>
          <div className="absolute inset-0 bg-white/15 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>

      {/* Stats Section - Updated with Real Data */}
      <div ref={statsRef} className="bg-white py-16 sm:py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className={`group bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 text-center transform hover:-translate-y-6 hover:rotate-1 border border-gray-200 hover:border-t-cyan-400 hover:border-t-4 relative overflow-hidden reveal ${statsVisible ? 'is-visible' : ''}`}>
              {/* Cyan top accent on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-3xl"></div>
              <div className="absolute inset-0 bg-cyan-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-6 sm:mb-8">
                  <div className="relative bg-gray-100 group-hover:bg-cyan-50 p-4 sm:p-6 rounded-3xl group-hover:scale-125 transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:shadow-cyan-100">
                    <Server className="h-8 w-8 sm:h-10 sm:w-10 text-gray-600 group-hover:text-cyan-600 transition-colors duration-300" />
                    <div className="absolute -inset-2 bg-gray-400/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 group-hover:scale-110 transition-all duration-500 group-hover:animate-bounce-once">{realStats.totalProjects}+</div>
                <div className="text-gray-600 uppercase text-xs sm:text-sm font-bold tracking-wider">Active Projects</div>
              </div>
              {/* Sparkle effects */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
              </div>
            </div>

            {/* Publications card */}
            <div className={`group bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 text-center transform hover:-translate-y-6 hover:-rotate-1 border border-gray-200 relative overflow-hidden reveal ${statsVisible ? 'is-visible' : ''}`} style={{transitionDelay: '0.1s'}}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 to-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-3xl"></div>
              <div className="absolute inset-0 bg-violet-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-6 sm:mb-8">
                  <div className="relative bg-gray-100 group-hover:bg-violet-50 p-4 sm:p-6 rounded-3xl group-hover:scale-125 transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:shadow-violet-100">
                    <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-gray-600 group-hover:text-violet-600 transition-colors duration-300" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 group-hover:scale-110 transition-all duration-500">{realStats.totalPublications}+</div>
                <div className="text-gray-600 uppercase text-xs sm:text-sm font-bold tracking-wider">Research Papers</div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-violet-400" />
              </div>
            </div>

            {/* Researchers card */}
            <div className={`group bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 text-center transform hover:-translate-y-6 hover:rotate-1 border border-gray-200 relative overflow-hidden reveal ${statsVisible ? 'is-visible' : ''}`} style={{transitionDelay: '0.2s'}}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-3xl"></div>
              <div className="absolute inset-0 bg-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-6 sm:mb-8">
                  <div className="relative bg-gray-100 group-hover:bg-emerald-50 p-4 sm:p-6 rounded-3xl group-hover:scale-125 transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:shadow-emerald-100">
                    <Users className="h-8 w-8 sm:h-10 sm:w-10 text-gray-600 group-hover:text-emerald-600 transition-colors duration-300" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 group-hover:scale-110 transition-all duration-500">{realStats.totalResearchers}+</div>
                <div className="text-gray-600 uppercase text-xs sm:text-sm font-bold tracking-wider">PhD Researchers</div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
              </div>
            </div>

            {/* Funding card */}
            <div className={`group bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 text-center transform hover:-translate-y-6 hover:-rotate-1 border border-gray-200 relative overflow-hidden reveal ${statsVisible ? 'is-visible' : ''}`} style={{transitionDelay: '0.3s'}}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-3xl"></div>
              <div className="absolute inset-0 bg-amber-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-6 sm:mb-8">
                  <div className="relative bg-gray-100 group-hover:bg-amber-50 p-4 sm:p-6 rounded-3xl group-hover:scale-125 transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:shadow-amber-100">
                    <FaDollarSign className="h-8 w-8 sm:h-10 sm:w-10 text-gray-600 group-hover:text-amber-600 transition-colors duration-300" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 group-hover:scale-110 transition-all duration-500">{realStats.totalFunding}</div>
                <div className="text-gray-600 uppercase text-xs sm:text-sm font-bold tracking-wider">Research Funding</div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Database className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Research with Mobile Responsive Slider */}
      <div className="py-16 sm:py-24 md:py-32 bg-gray-50 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="inline-block bg-white text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8 shadow-xl border border-gray-200 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center">
                <Cpu className="inline-block w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 animate-spin-slow" />
                Computing Excellence
                <Sparkles className="inline-block w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 animate-twinkle" />
              </span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 relative">
              <span className="text-gray-900">
                Featured Research Areas
              </span>
            </h2>
            <div className="w-20 sm:w-24 md:w-32 h-1.5 sm:h-2 bg-gray-800 mx-auto rounded-full shadow-lg"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-6 sm:mt-8 md:mt-10 max-w-3xl mx-auto leading-relaxed px-4">
              Discover our cutting-edge research initiatives that are revolutionizing the computing landscape
            </p>
          </div>
          
          {/* Mobile Responsive Research Areas Slider */}
          <div
            className="relative w-full"
            onMouseEnter={() => setIsResearchHovering(true)}
            onMouseLeave={() => setIsResearchHovering(false)}
          >
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ 
                  transform: `translateX(-${Math.min(currentResearchSlide, maxSlide) * (100 / cardsPerView)}%)` 
                }}
              >
                {researchAreas.map((area, index) => {
                  const catColor = categoryColors[area.originalCategory] || defaultCatColor;
                  return (
                  <div 
                    key={area.id} 
                    className={`${
                      cardsPerView === 1 ? 'w-full' : 
                      cardsPerView === 2 ? 'w-1/2' : 'w-1/3'
                    } flex-shrink-0 px-2 sm:px-3 md:px-5`}
                  >
                    <Card 
                      className={`overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-4 sm:hover:-translate-y-6 group border-2 border-gray-200 relative h-full ${catColor.topBorder}`}
                      padding="p-0"
                    >
                      {/* Category accent bar on hover */}
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${catColor.accentBar} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                      <div className={`absolute inset-0 opacity-0 ${catColor.cardBg} transition-opacity duration-500`}></div>
                      
                      <div className="relative overflow-hidden">
                        <img 
                          src={area.image} 
                          alt={area.title} 
                          className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transition-all duration-1000 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-end p-4 sm:p-6 md:p-8">
                          <button
                            onClick={() => handleViewProjects(area.originalCategory)}
                            className="text-white font-bold hover:text-gray-200 flex items-center transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 bg-white/10 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-white/20 text-sm sm:text-base"
                          >
                            <Monitor className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                            View Projects 
                            <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-2" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-6 sm:p-8 md:p-10 relative z-10">
                        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 group-hover:text-gray-700 transition-colors duration-300">{area.title}</h3>
                        <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base line-clamp-3">{area.description}</p>
                        <div className="flex justify-between text-xs sm:text-sm text-gray-500 border-t-2 border-gray-100 pt-4 sm:pt-6">
                          <span className="flex items-center font-semibold">
                            <GitBranch className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" /> {area.projects} Projects
                          </span>
                          <span className="flex items-center font-semibold">
                            <HardDrive className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" /> {area.publications} Papers
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                  );
                })}
              </div>
            </div>

            {/* Research Slider Navigation - Hidden on mobile, visible on larger screens */}
            <button
              onClick={prevResearchSlide}
              className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white rounded-full p-4 md:p-5 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-125 hover:-translate-x-8 z-10 border-2 border-gray-200 hover:border-gray-400 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8 text-gray-600 hover:text-gray-800 transition-colors duration-300 relative z-10 group-hover:animate-bounce" />
            </button>
            <button
              onClick={nextResearchSlide}
              className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white rounded-full p-4 md:p-5 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-125 hover:translate-x-8 z-10 border-2 border-gray-200 hover:border-gray-400 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8 text-gray-600 hover:text-gray-800 transition-colors duration-300 relative z-10 group-hover:animate-bounce" />
            </button>
            
            {/* Mobile Navigation Buttons */}
            <div className="sm:hidden flex justify-center gap-4 mt-6">
              <button
                onClick={prevResearchSlide}
                className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-gray-400"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={nextResearchSlide}
                className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-gray-400"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            {/* Research Slider Indicators */}
            <div className="flex justify-center mt-12 sm:mt-16 space-x-2 sm:space-x-4">
              {Array.from({ length: maxSlide + 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentResearchSlide(index)}
                  className={`h-3 sm:h-4 rounded-full transition-all duration-500 hover:scale-125 ${
                    index === currentResearchSlide 
                      ? 'bg-gray-800 w-8 sm:w-12 shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400 w-3 sm:w-4 hover:w-6 sm:hover:w-8'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12 sm:mt-16 md:mt-20">
            <Link
              to="/solutions"
              className="group inline-flex items-center px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-gray-900 text-white font-bold rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-110 relative overflow-hidden border border-gray-800"
            >
              <div className="absolute inset-0 bg-gray-800 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              <span className="relative z-10 flex items-center text-sm sm:text-base md:text-lg">
                <Shield className="mr-3 sm:mr-4 h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-spin" />
                View All Solutions
                <ArrowRight className="ml-3 sm:ml-4 h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300 group-hover:translate-x-3 group-hover:scale-125" />
              </span>
              <div className="absolute -inset-1 bg-gray-600/50 opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-500"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* News Carousel - Mobile Responsive */}
      <div className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="inline-block bg-gray-100 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8 shadow-xl border border-gray-200 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center">
                <Brain className="inline-block w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 animate-pulse" />
                Latest Developments
                <Activity className="inline-block w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 animate-bounce" />
              </span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">News & Breakthroughs</h2>
            <div className="w-20 sm:w-24 md:w-32 h-1.5 sm:h-2 bg-gray-800 mx-auto rounded-full shadow-lg"></div>
          </div>

          <div
            className="relative w-full"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-3xl border-2 border-gray-200">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredNews.map((item) => (
                  <div key={item.id} className="w-full flex-shrink-0 min-w-full">
                    <Card className="mx-3 sm:mx-4 md:mx-6 overflow-hidden border-2 border-gray-200 hover:border-gray-400 transition-all duration-500 hover:shadow-3xl group" padding="p-0">
                      <div className="p-6 sm:p-8 md:p-12 relative">
                        <span className="inline-flex items-center bg-gray-100 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6 shadow-lg border border-gray-200 group-hover:scale-105 transition-transform duration-300">
                          <Code className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin-slow" />
                          {item.type}
                          <Zap className="w-3 h-3 sm:w-4 sm:h-4 ml-2 opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300" />
                        </span>

                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 hover:text-gray-700 transition-colors duration-500 group-hover:scale-105 transform origin-left">
                          {item.title}
                        </h3>

                        <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                          {new Date(item.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>

                        <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base md:text-lg">
                          {item.content}
                        </p>

                        {/* Buttons with reserved space - Mobile responsive */}
                        <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row min-h-[56px]">
                          {item.webLink && (
                            <a
                              href={item.webLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn relative text-gray-700 font-bold hover:text-gray-900 flex items-center justify-center sm:justify-start transition-all duration-500 hover:translate-x-4 bg-gray-50 hover:bg-gray-100 px-4 sm:px-6 py-3 rounded-full shadow-lg hover:shadow-xl overflow-hidden text-sm sm:text-base"
                            >
                              <div className="absolute inset-0 bg-gray-200 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                              <span className="relative z-10 flex items-center">
                                <Monitor className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 group-hover/btn:animate-bounce" />
                                Learn More
                                <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 group-hover/btn:translate-x-2 group-hover/btn:scale-110" />
                              </span>
                            </a>
                          )}

                          {item.videoLink && (
                            <a
                              href={item.videoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn relative text-gray-700 font-bold hover:text-gray-900 flex items-center justify-center sm:justify-start transition-all duration-500 hover:translate-x-4 bg-slate-50 hover:bg-slate-100 px-4 sm:px-6 py-3 rounded-full shadow-lg hover:shadow-xl overflow-hidden text-sm sm:text-base"
                            >
                              <div className="absolute inset-0 bg-slate-200 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                              <span className="relative z-10 flex items-center">
                                <Activity className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 group-hover/btn:animate-pulse" />
                                Watch Video
                                <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 group-hover/btn:translate-x-2 group-hover/btn:scale-110" />
                              </span>
                            </a>
                          )}
                        </div>

                        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gray-100/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Carousel Navigation - Hidden on mobile */}
            <button
              onClick={prevSlide}
              className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white rounded-full p-4 md:p-5 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-125 hover:-translate-x-8 z-10 border-2 border-gray-200 hover:border-gray-400 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8 text-gray-600 hover:text-gray-800 transition-colors duration-300 relative z-10 group-hover:animate-bounce" />
            </button>
            <button
              onClick={nextSlide}
              className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white rounded-full p-4 md:p-5 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-125 hover:translate-x-8 z-10 border-2 border-gray-200 hover:border-gray-400 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8 text-gray-600 hover:text-gray-800 transition-colors duration-300 relative z-10 group-hover:animate-bounce" />
            </button>
            
            {/* Mobile Navigation Buttons */}
            <div className="sm:hidden flex justify-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-gray-400"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-gray-400"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            {/* Enhanced Carousel Indicators */}
            <div className="flex justify-center mt-12 sm:mt-16 space-x-2 sm:space-x-4">
              {featuredNews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 sm:h-4 rounded-full transition-all duration-500 hover:scale-125 ${
                    index === currentSlide 
                      ? 'bg-gray-800 w-8 sm:w-12 shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400 w-3 sm:w-4 hover:w-6 sm:hover:w-8'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>  
      </div>

      {/* Call to Action Section - Mobile Responsive */}
      <div className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-cyan-300 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full mb-6 tracking-wide">
              <Zap className="h-3.5 w-3.5" />
              Let's Work Together
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 font-display">
              Ready to Innovate?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-12 sm:mb-16 max-w-3xl mx-auto text-gray-300 leading-relaxed px-4">
              Partner with our engineers and researchers to launch reliable AI systems faster.
            </p>
          </div>
          
          {/* Glass cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto mb-12">
            {[
              { icon: <Brain className="h-6 w-6 text-violet-400" />, label: 'Research Collaboration' },
              { icon: <Users className="h-6 w-6 text-cyan-400" />, label: 'Join the Lab' },
              { icon: <Database className="h-6 w-6 text-emerald-400" />, label: 'Data Partnerships' },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex flex-col items-center gap-2">
                  {item.icon}
                  <span className="text-sm font-medium text-gray-300">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
                to="/contact"
                className="group relative bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/40 hover:-translate-y-2 border border-cyan-400/50"
              >
                <span className="relative z-10 flex items-center justify-center text-base sm:text-lg">
                  <Users className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  Join Our Team
                </span>
                <div className="absolute inset-0 bg-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              </Link>
            <Link
                to="/team"
                className="group relative bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold transition-all duration-500 hover:bg-white/15 hover:border-white/30 hover:-translate-y-2"
              >
                <span className="relative z-10 flex items-center justify-center text-base sm:text-lg">
                  <Database className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  Explore Collaborations
                  <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:translate-x-2" />
                </span>
              </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 5px currentColor; }
          50% { text-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce-once {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes scroll {
          0% { opacity: 0; transform: translateY(0px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(20px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .bg-300% { background-size: 300% 300%; }
        .animate-gradient-x { animation: gradient-x 4s ease infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-text-glow { animation: text-glow 2s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-bounce-once { animation: bounce-once 0.6s ease-in-out; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-scroll { animation: scroll 2s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        .border-3 {
          border-width: 3px;
        }
        .border-l-[15px] {
          border-left-width: 15px;
        }
        .border-b-[15px] {
          border-bottom-width: 15px;
        }
        .border-l-[20px] {
          border-left-width: 20px;
        }
        .border-b-[20px] {
          border-bottom-width: 20px;
        }
        
        /* Mobile responsive text truncation */
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
        
        /* Ensure smooth transitions on mobile */
        @media (max-width: 640px) {
          .hover\\:scale-105:hover {
            transform: scale(1.02);
          }
          .hover\\:-translate-y-8:hover {
            transform: translateY(-0.5rem);
          }
          .group:hover .group-hover\\:scale-125 {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;