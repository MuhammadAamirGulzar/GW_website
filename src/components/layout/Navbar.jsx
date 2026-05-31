import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Home,
  Users,
  Briefcase,
  BookOpen,
  Newspaper,
  Mail,
  FlaskConical,
  Sparkles,
  Activity
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Solutions', path: '/solutions', icon: FlaskConical },
    { name: 'Team', path: '/team', icon: Users },
    { name: 'Portfolio', path: '/portfolio', icon: Briefcase },
    { name: 'Publications', path: '/publications', icon: BookOpen },
    { name: 'Insights', path: '/insights', icon: Newspaper },
    { name: 'Contact', path: '/contact', icon: Mail }
  ];

  const isActive = (path) => location.pathname === path;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen && 
        menuRef.current && 
        buttonRef.current && 
        !menuRef.current.contains(event.target) && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when menu is closed
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const BrandMark = ({ className = 'h-10 w-10' }) => (
    <div className={`${className} rounded-xl ${scrolled ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} flex items-center justify-center font-bold text-lg transition-colors duration-700`}>
      GW
    </div>
  );

  const handleNavClick = (path, e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    navigate(path);
  };

  const handleHomeNavigation = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    navigate('/');
  };

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.3; transform: scale(0.8); }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-twinkle {
            animation: twinkle 2s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
          .shadow-3xl {
            box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
          }
          .mobile-menu-backdrop {
            backdrop-filter: blur(8px);
          }
        `}
      </style>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50' : 'bg-slate-900/85 backdrop-blur-xl border-b border-white/10'}`}>
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex justify-between items-center h-20 max-w-screen-xl mx-auto">
            {/* Logo */}
            <div 
              className="flex items-center group min-w-0 flex-shrink-0 space-x-3 cursor-pointer" 
              onClick={handleHomeNavigation}
            >
              <div className="relative flex-shrink-0">
                <div className={`relative p-3 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 ${scrolled ? 'bg-slate-100' : 'bg-white/10'}`}>
                  <BrandMark />
                  <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="absolute -inset-1 bg-gray-400/50 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500 animate-pulse"></div>
              </div>
              <div className="flex flex-col min-w-0">
                <span className={`text-xl xl:text-2xl font-bold transition-colors duration-700 truncate ${scrolled ? 'text-gray-900 group-hover:text-gray-700' : 'text-white group-hover:text-gray-200'}`}>
                  GradientWise
                </span>
                <span className={`text-xs font-medium tracking-wider truncate transition-colors duration-700 ${scrolled ? 'text-gray-500' : 'text-gray-300'}`}>
                  Architecting Intelligent Systems
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center justify-start flex-1 pl-12">
              <div className="flex items-center space-x-1 2xl:space-x-2">
                {navItems.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={(e) => handleNavClick(item.path, e)}
                    className={`group relative flex items-center space-x-1 px-4 xl:px-5 2xl:px-6 py-3 rounded-2xl text-sm xl:text-sm font-semibold transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 whitespace-nowrap ${
                      isActive(item.path)
                        ? 'text-white bg-cyan-500 shadow-xl shadow-cyan-500/40'
                        : scrolled
                          ? 'text-gray-700 hover:text-white hover:bg-slate-700 hover:shadow-xl hover:shadow-slate-500/25'
                          : 'text-gray-200 hover:text-white hover:bg-white/15 hover:shadow-xl'
                    }`}
                  >
                    <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${isActive(item.path) ? 'bg-slate-900 opacity-100' : 'bg-gray-800 opacity-0 group-hover:opacity-100'}`}></div>
                    <div className={`absolute -inset-1 rounded-2xl blur-lg transition-opacity duration-500 ${isActive(item.path) ? 'bg-gray-600/50 opacity-75 animate-pulse' : 'bg-gray-500/50 opacity-0 group-hover:opacity-75'}`}></div>
                    <div className="relative z-10 flex items-center space-x-1">
                      <item.icon className={`h-4 w-4 xl:h-5 xl:w-5 transition-all duration-300 flex-shrink-0 -translate-x-2 ${isActive(item.path) ? 'animate-pulse' : 'group-hover:animate-bounce'}`} />
                      <span className="relative">
                        {item.name}
                        {isActive(item.path) && (
                          <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-gray-300 animate-twinkle" />
                        )}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="xl:hidden flex items-center flex-shrink-0">
              <button
                ref={buttonRef}
                type="button"
                onClick={toggleMenu}
                className={`group relative p-3 rounded-2xl transition-all duration-500 hover:text-white hover:bg-slate-700 hover:shadow-xl hover:scale-110 transform-gpu overflow-hidden ${scrolled ? 'text-gray-700' : 'text-gray-200'}`}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                <div className="absolute inset-0 bg-gray-800 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-2xl"></div>
                <div className="relative z-10">
                  {isOpen ? (
                    <X className="h-7 w-7 xl:h-8 xl:w-8 group-hover:animate-spin" />
                  ) : (
                    <Menu className="h-7 w-7 xl:h-8 xl:w-8 group-hover:animate-pulse" />
                  )}
                </div>
                <div className="absolute -inset-1 bg-gray-500/50 opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-500"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Only render when open or closing */}
        {(isOpen || isOpen === false) && (
          <div 
            ref={menuRef}
            className={`xl:hidden fixed inset-x-0 top-20 z-40 transition-all duration-500 ease-in-out transform ${
              isOpen 
                ? 'opacity-100 translate-y-0 pointer-events-auto' 
                : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
          >
            {/* Backdrop */}
            <div className={`fixed inset-0 bg-black/20 mobile-menu-backdrop transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
            
            {/* Menu Content */}
            <div className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 border-t border-gray-200/50 backdrop-blur-xl shadow-2xl">
              <div className="px-4 sm:px-6 pt-4 pb-6 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto">
                {navItems.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={(e) => handleNavClick(item.path, e)}
                    className={`group flex items-center space-x-2.5 w-full px-6 py-4 rounded-2xl font-semibold transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ${isActive(item.path) ? 'text-white bg-cyan-500 shadow-xl shadow-cyan-500/40' : 'text-gray-700 hover:text-white hover:bg-slate-700 hover:shadow-xl'}`}
                  >
                    <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${isActive(item.path) ? 'bg-cyan-600 opacity-100' : 'bg-slate-800 opacity-0 group-hover:opacity-100'}`}></div>
                    <div className={`absolute -inset-1 rounded-2xl blur-lg transition-opacity duration-500 ${isActive(item.path) ? 'bg-cyan-400/50 opacity-75 animate-pulse' : 'bg-slate-500/30 opacity-0 group-hover:opacity-75'}`}></div>
                    <div className="relative z-10 flex items-center space-x-2.5">
                      <div className={`relative p-2 rounded-xl transition-all duration-300 flex-shrink-0 -translate-x-2 ${isActive(item.path) ? 'bg-white/20 animate-pulse' : 'bg-gray-100 group-hover:bg-white/20'}`}>
                        <item.icon className={`h-6 w-6 transition-all duration-300 ${isActive(item.path) ? 'text-white animate-pulse' : 'text-gray-600 group-hover:text-white group-hover:animate-bounce'}`} />
                        {isActive(item.path) && (
                          <div className="absolute inset-0 bg-white/30 rounded-xl animate-ping"></div>
                        )}
                      </div>
                      <span className="text-lg relative flex-1 text-left">
                        {item.name}
                        {isActive(item.path) && (
                          <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-gray-300 animate-twinkle" />
                        )}
                      </span>
                      {isActive(item.path) && (
                        <Activity className="h-5 w-5 text-gray-300 animate-pulse flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;