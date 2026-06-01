import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, ExternalLink, Users, FileText, ChevronDown, ChevronRight, Sparkles, Activity, Brain, Zap, Database, Search, Filter, TrendingUp } from 'lucide-react';
import journalsList from './../classes/journalsData';
import conferenecesList from './../classes/conferencesData';
import workshopsList from './../classes/workshopsData';
import bookchaptersList from './../classes/bookchaptersData';

const Card = ({ children, className = "", padding = "p-6", ...props }) => (
  <div className={`bg-white rounded-2xl shadow-xl border border-gray-200 ${padding} ${className}`} {...props}>
    {children}
  </div>
);

const Publications = () => {
  const [activeTab, setActiveTab] = useState('journals');
  const [expandedYears, setExpandedYears] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabData = {
    journals: { data: journalsList, icon: BookOpen, title: 'Journal Publications', color: 'cyan', shortTitle: 'Journals', badge: 'Q1/SCI' },
    conferences: { data: conferenecesList, icon: Users, title: 'Conference Papers', color: 'green', shortTitle: 'Conferences', badge: 'Peer-Reviewed' },
    workshops: { data: workshopsList, icon: Activity, title: 'Workshop Papers', color: 'purple', shortTitle: 'Workshops', badge: 'International' },
    bookchapters: { data: bookchaptersList, icon: FileText, title: 'Book Chapters', color: 'orange', shortTitle: 'Chapters', badge: 'Invited' }
  };

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleYear = (year) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  const getTotalPublications = (data) => {
    return data.reduce((total, yearData) => total + yearData.yearWork.length, 0);
  };

  const filterPublications = (data) => {
    if (!searchTerm) return data;
    return data.map(yearData => ({
      ...yearData,
      yearWork: yearData.yearWork.filter(work => 
        work.data.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(yearData => yearData.yearWork.length > 0);
  };

  const getColorClasses = (color) => {
    const colorMap = {
      gray: { bg: 'bg-slate-700', hover: 'hover:bg-slate-600', text: 'text-slate-600', border: 'border-slate-200' },
      cyan: { bg: 'bg-cyan-500', hover: 'hover:bg-cyan-600', text: 'text-cyan-600', border: 'border-cyan-200' },
      blue: { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-500', hover: 'hover:bg-green-600', text: 'text-green-600', border: 'border-green-200' },
      purple: { bg: 'bg-purple-500', hover: 'hover:bg-purple-600', text: 'text-purple-600', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-500', hover: 'hover:bg-orange-600', text: 'text-orange-600', border: 'border-orange-200' }
    };
    return colorMap[color] || colorMap.gray;
  };

  const currentData = tabData[activeTab];
  const filteredData = filterPublications(currentData.data);
  const colors = getColorClasses(currentData.color);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden min-h-screen flex items-center">
        {/* Particle network */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {[...Array(20)].map((_, i) => (
            <circle key={i} cx={`${(i * 17 + 5) % 100}%`} cy={`${(i * 23 + 10) % 100}%`} r="1.5" fill="#22d3ee" />
          ))}
          {[...Array(10)].map((_, i) => (
            <line key={`l${i}`} x1={`${(i * 17 + 5) % 100}%`} y1={`${(i * 23 + 10) % 100}%`} x2={`${((i + 3) * 17 + 5) % 100}%`} y2={`${((i + 3) * 23 + 10) % 100}%`} stroke="#22d3ee" strokeWidth="0.5" />
          ))}
        </svg>

        {/* Dynamic background gradient based on mouse position */}
                <div 
                    className="absolute inset-0 opacity-30 transition-all duration-1000"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.25) 0%, transparent 65%)`
                    }}
                ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
                    <div className="relative inline-block mb-8">
                      <BookOpen className="h-28 w-28 text-yellow-400 mx-auto" />
                      <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                      <div className="absolute -inset-4 bg-white/20 rounded-full animate-pulse blur-lg"></div>
                    </div>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 text-white animate-gradient-x">
              Research Publications
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed px-4">
              Explore our comprehensive collection of research publications spanning 
              <span className="text-white font-bold animate-text-glow"> journals</span>,
              <span className="text-white font-bold animate-text-glow"> conferences</span>,
              <span className="text-white font-bold animate-text-glow"> workshops</span> and
              <span className="text-white font-bold animate-text-glow"> book chapters</span>.
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 animate-bounce-gentle" style={{left: 'calc(50% - 1rem)'}}>
          <div className="relative w-8 h-14 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-2 h-4 bg-white rounded-full mt-3 animate-scroll"></div>
            <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white py-6 sm:py-8 shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search publications by title, author, or keywords..."
              className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-300 rounded-2xl focus:border-gray-600 focus:ring-4 focus:ring-gray-200 transition-all duration-300 text-base sm:text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Filter className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Responsive Navigation Tabs */}
      <div className="bg-white shadow-lg sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          
          {/* Mobile Dropdown (only for very small screens) */}
          <div className="block sm:hidden py-3">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-slate-700 text-white rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all duration-300"
              >
                <div className="flex items-center">
                  {React.createElement(currentData.icon, { className: "h-4 w-4 mr-2" })}
                  <span>{currentData.shortTitle}</span>
                  <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold">
                    {getTotalPublications(currentData.data)}
                  </span>
                </div>
                <ChevronDown className={`h-4 w-4 transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                  {Object.entries(tabData).map(([key, tab]) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setActiveTab(key);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 ${
                          isActive 
                            ? 'bg-slate-700 text-white' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-3" />
                        <span className="flex-1">{tab.shortTitle}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          isActive ? 'bg-white/20' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {getTotalPublications(tab.data)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Desktop and Tablet Navigation (hidden on mobile) */}
          <div className="hidden sm:block">
            <div className="relative">
              {/* Fade indicators for scroll on large screens */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden lg:block"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden lg:block"></div>
              
              {/* Tabs container */}
              <div className="overflow-x-auto scrollbar-hide py-4">
                <div className="flex space-x-2 lg:space-x-4 justify-start lg:justify-center min-w-max px-2">
                  {Object.entries(tabData).map(([key, tab]) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === key;
                    const tabColors = getColorClasses(tab.color);
                    
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`group relative flex items-center px-4 py-3 lg:px-6 lg:py-3 rounded-xl font-semibold transition-all duration-500 hover:scale-105 whitespace-nowrap text-sm lg:text-base flex-shrink-0 ${
                          isActive 
                            ? `${tabColors.bg} text-white shadow-xl transform scale-105` 
                            : `text-gray-600 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 border-2 ${tabColors.border}`
                        }`}
                      >
                        {/* Icon with animation */}
                        <div className="relative mr-2 lg:mr-3">
                          <Icon className={`h-4 w-4 lg:h-5 lg:w-5 ${isActive ? 'animate-pulse' : 'group-hover:animate-bounce'}`} />
                          {isActive && <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>}
                        </div>
                        
                        {/* Title - responsive */}
                        <span className="hidden md:inline">{tab.title}</span>
                        <span className="md:hidden">{tab.shortTitle}</span>
                        
                        {/* Publication count badge */}
                        <div className="ml-2 lg:ml-3 px-2 py-1 bg-white/20 rounded-full text-xs lg:text-sm font-bold">
                          {getTotalPublications(tab.data)}
                        </div>
                        
                        {/* Active indicator overlay */}
                        {isActive && (
                          <>
                            <div className="absolute inset-0 bg-white/10 rounded-xl animate-pulse pointer-events-none"></div>
                            <div className="absolute -inset-1 bg-slate-400/20 rounded-2xl blur-md opacity-75 animate-pulse"></div>
                          </>
                        )}
                        
                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom styles for hiding scrollbar and responsive behavior */}
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
            scroll-behavior: smooth;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          /* Enhanced mobile select styling */
          select::-ms-expand {
            display: none;
          }
          
          /* Enhanced focus states for accessibility */
          button:focus-visible {
            outline: 2px solid #3B82F6;
            outline-offset: 2px;
          }
        `}</style>
      </div>

      {/* Publications Content */}
      <div className="py-8 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-16">
            <Card className="text-center group hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 border-2 hover:border-gray-400">
              <div className="relative">
                <TrendingUp className="h-8 w-8 sm:h-12 sm:w-12 text-gray-600 mx-auto mb-4 group-hover:animate-bounce" />
                <div className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">{getTotalPublications(filteredData)}</div>
                <div className="text-gray-600 font-semibold">Total Publications</div>
              </div>
            </Card>

            <Card className="text-center group hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 border-2 hover:border-gray-400">
              <div className="relative">
                <Calendar className="h-8 w-8 sm:h-12 sm:w-12 text-gray-600 mx-auto mb-4 group-hover:animate-pulse" />
                <div className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">{filteredData.length}</div>
                <div className="text-gray-600 font-semibold">Active Years</div>
              </div>
            </Card>
          </div>

          {/* Publications List */}
          <div className="space-y-6 sm:space-y-8">
            {filteredData.map((yearData, yearIndex) => (
              <Card 
                key={yearData.year} 
                className="overflow-hidden transition-all duration-700 hover:shadow-3xl border-2 border-gray-200 hover:border-gray-400 group"
                padding="p-0"
              >
                {/* Year Header */}
                <div 
                  className={`bg-gradient-to-r ${{                    cyan: 'from-cyan-500 to-cyan-600 group-hover:from-cyan-400 group-hover:to-cyan-500',                    blue: 'from-blue-600 to-blue-700 group-hover:from-blue-500 group-hover:to-blue-600',
                    green: 'from-green-600 to-green-700 group-hover:from-green-500 group-hover:to-green-600',
                    purple: 'from-purple-600 to-purple-700 group-hover:from-purple-500 group-hover:to-purple-600',
                    orange: 'from-orange-500 to-orange-600 group-hover:from-orange-400 group-hover:to-orange-500',
                  }[currentData.color] || 'from-slate-700 to-slate-800 group-hover:from-slate-600 group-hover:to-slate-700'} text-white p-4 sm:p-8 cursor-pointer transition-all duration-500 relative overflow-hidden`}
                  onClick={() => toggleYear(yearData.year)}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-6">
                      <div className="relative">
                        <Calendar className="h-8 w-8 sm:h-12 sm:w-12 text-white animate-pulse" />
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-4xl font-bold">{yearData.year}</h2>
                        <p className="text-sm sm:text-xl text-gray-200">{yearData.yearWork.length} publications</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <div className="px-3 py-2 sm:px-6 sm:py-3 bg-white/20 rounded-full backdrop-blur-md">
                        <span className="text-sm sm:text-lg font-bold">{yearData.yearWork.length}</span>
                      </div>
                      {expandedYears[yearData.year] ? 
                        <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8 transition-transform duration-300 group-hover:scale-125" /> : 
                        <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8 transition-transform duration-300 group-hover:scale-125" />
                      }
                    </div>
                  </div>
                  
                  {/* Floating elements in header */}
                  <div className="absolute top-4 right-16 sm:right-20 opacity-30">
                    <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 animate-twinkle" />
                  </div>
                </div>

                {/* Publications List */}
                {expandedYears[yearData.year] && (
                  <div className="p-4 sm:p-8 bg-gray-50">
                    <div className="space-y-4 sm:space-y-6">
                      {yearData.yearWork.map((work, workIndex) => (
                        <div 
                          key={workIndex} 
                          className="bg-white p-4 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-gray-400 group/item relative overflow-hidden hover:-translate-y-2"
                        >
                          <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                          <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1 sm:pr-6 mb-4 sm:mb-0">
                              <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="relative mt-2 flex-shrink-0">
                                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 group-hover/item:animate-pulse" />
                                  <div className="absolute inset-0 bg-gray-300/30 rounded-full opacity-0 group-hover/item:opacity-100 animate-ping transition-opacity duration-500"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start gap-3 mb-1">
                                    <span className={`flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${{ cyan: 'bg-cyan-100 text-cyan-700', blue: 'bg-blue-100 text-blue-700', green: 'bg-green-100 text-green-700', purple: 'bg-purple-100 text-purple-700', orange: 'bg-orange-100 text-orange-700' }[currentData.color] || 'bg-gray-100 text-gray-700'}`}>{currentData.badge}</span>
                                  </div>
                                  <p className="text-base sm:text-lg text-gray-800 leading-relaxed group-hover/item:text-gray-900 transition-colors duration-300">
                                    {work.data}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            {work.pdflink && (
                              <div className="flex justify-center sm:justify-end">
                                <a
                                  href={work.pdflink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`group/btn inline-flex items-center px-4 py-3 sm:px-8 sm:py-4 ${colors.bg} text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative text-sm sm:text-base`}
                                >
                                  <div className="absolute inset-0 bg-slate-600 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></div>
                                  <span className="relative z-10 flex items-center">
                                    <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 group-hover/btn:animate-bounce" />
                                    DOI
                                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 ml-2 sm:ml-3 opacity-0 group-hover/btn:opacity-100 animate-twinkle transition-opacity duration-300" />
                                  </span>
                                  <div className="absolute -inset-1 bg-slate-500/50 opacity-0 group-hover/btn:opacity-75 blur-lg transition-opacity duration-500"></div>
                                </a>
                              </div>
                            )}
                          </div>
                          
                          {/* Decorative elements */}
                          <div className="absolute top-4 right-4 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500">
                            <Brain className="h-4 w-4 sm:h-6 sm:w-6 text-gray-400 animate-pulse" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {filteredData.length === 0 && searchTerm && (
            <Card className="text-center py-12 sm:py-20">
              <Database className="h-16 w-16 sm:h-20 sm:w-20 text-gray-400 mx-auto mb-6 sm:mb-8 animate-pulse" />
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-600 mb-4">No publications found</h3>
              <p className="text-lg sm:text-xl text-gray-500 mb-6 sm:mb-8">Try adjusting your search terms or browse all publications</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-gray-800 text-white font-bold rounded-2xl hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              >
                Clear Search
              </button>
            </Card>
          )}
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
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.6); }
          50% { text-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce-once {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes scroll {
          0% { opacity: 0; transform: translateY(0px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(20px); }
        }
        
        .bg-300% { background-size: 300% 300%; }
        .animate-gradient-x { animation: gradient-x 4s ease infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-text-glow { animation: text-glow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-scroll { animation: scroll 2s ease-in-out infinite; }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Publications;