import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ExternalLink, Play, Users, ArrowRight, Newspaper, Tag, BookOpen, Sparkles, Activity, Zap, Monitor, Globe, ChevronRight } from 'lucide-react';
import Data from './../classes/Candidate';

const Card = ({ children, className = "", padding = "p-6", ...props }) => (
  <div className={`bg-white rounded-2xl shadow-xl border border-gray-200 ${padding} ${className}`} {...props}>
    {children}
  </div>
);

const NewsAndEvents = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-slate-800 text-white overflow-hidden min-h-screen flex items-center">
        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-2xl transform rotate-45 animate-spin-slow backdrop-blur-sm"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/15 rounded-full animate-bounce-slow backdrop-blur-sm"></div>
          <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-white/20 rounded-lg animate-pulse backdrop-blur-sm"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-white/10 rounded-full transform rotate-12 animate-float backdrop-blur-sm"></div>
        </div>
        {/* Dynamic background gradient based on mouse position */}
                <div 
                    className="absolute inset-0 opacity-30 transition-all duration-1000"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, transparent 70%)`
                    }}
                ></div>

        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <div className="relative">
                <div className="relative inline-block mb-8">
                  <Newspaper className="h-28 w-28 text-yellow-400 mx-auto" />
                  <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                  <div className="absolute -inset-4 bg-white/20 rounded-full animate-pulse blur-lg"></div>
                </div>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 relative">
                <span className="relative inline-block group">
                  <span className="text-white animate-gradient-x bg-300%">
                    News & Events
                  </span>
                  <span className="absolute -inset-2 bg-white/20 blur-2xl animate-pulse-glow"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer transform -skew-x-12"></span>
                </span>
              </h1>
              <div className="text-xl md:text-2xl font-light text-gray-300 tracking-wide">
                <span className="inline-flex items-center animate-fade-in-up">
                  <div className="relative mr-4">
                    <Activity className="h-8 w-8 text-white animate-pulse" />
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                  </div>
                  Stay Updated with Latest Research Developments
                  <div className="relative ml-4">
                    <Zap className="h-8 w-8 text-white animate-bounce" />
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                  </div>
                </span>
              </div>
            </div>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              Discover the latest breakthroughs, achievements, and upcoming events from the <span className="text-white font-bold animate-text-glow">DataInsight Lab</span> research community.
            </p>
          </div>
        </div>
        <div className="absolute bottom-1 animate-bounce-gentle" style={{left: 'calc(50% - 1.25rem)'}}>
          <div className="relative w-8 h-14 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-2 h-4 bg-white rounded-full mt-3 animate-scroll"></div>
            <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* News and Events Column */}
            <div className="lg:col-span-2 space-y-10">
              <div className="text-center lg:text-left mb-12">
                <span className="inline-block bg-white text-gray-700 px-8 py-4 rounded-full text-sm font-bold mb-6 shadow-xl border border-gray-200 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center">
                    <Calendar className="inline-block w-5 h-5 mr-3 animate-pulse" />
                    Latest Updates
                    <Sparkles className="inline-block w-5 h-5 ml-3 animate-twinkle" />
                  </span>
                </span>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Developments</h2>
                <div className="w-24 h-2 bg-gray-800 lg:mx-0 mx-auto rounded-full shadow-lg"></div>
              </div>

              <div className="space-y-8">
                {Data.map((post, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden transition-all duration-700 hover:shadow-3xl hover:-translate-y-4 hover:rotate-1 group border-2 border-gray-200 hover:border-gray-400 relative"
                    padding="p-0"
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="p-8 lg:p-10 relative z-10">
                      <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="order-2 lg:order-1 flex-1 min-w-0">
                      {/* Category Tag */}
                      <div className="mb-6">
                        <span className="inline-flex items-center bg-gray-100 text-gray-700 px-6 py-3 rounded-full text-sm font-bold shadow-lg border border-gray-200 group-hover:scale-105 transition-transform duration-300">
                          <Tag className="w-4 h-4 mr-2 animate-spin-slow" />
                          Research Update
                          <Activity className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300" />
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-gray-900 group-hover:text-gray-700 transition-all duration-500 group-hover:scale-105 transform origin-left">
                        {post.heading}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                        {post.info}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-4">
                        {post.webLink && post.webLink !== '' && (
                          <a
                            href={post.webLink}
                            target="_blank"
                            rel="noreferrer"
                            className="group/btn relative text-gray-700 font-bold hover:text-gray-900 flex items-center transition-all duration-500 hover:translate-x-2 bg-gray-50 hover:bg-gray-100 px-6 py-3 rounded-full shadow-lg hover:shadow-xl overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gray-200 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                            <span className="relative z-10 flex items-center">
                              <ExternalLink className="mr-3 h-5 w-5 group-hover/btn:animate-bounce" />
                              Find Out More
                              <ArrowRight className="ml-3 h-5 w-5 transition-all duration-300 group-hover/btn:translate-x-2 group-hover/btn:scale-110" />
                            </span>
                          </a>
                        )}

                        {post.videoLink && post.videoLink !== '' && (
                          <a
                            href={post.videoLink}
                            target="_blank"
                            rel="noreferrer"
                            className="group/btn relative bg-gray-900 text-white px-6 py-3 rounded-full font-bold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gray-500/25 hover:-translate-y-1 hover:scale-105 transform-gpu border border-gray-800"
                          >
                            <span className="relative z-10 flex items-center">
                              <Play className="mr-3 h-5 w-5 group-hover/btn:animate-pulse" />
                              Watch Video
                              <Sparkles className="ml-3 h-5 w-5 opacity-0 group-hover/btn:opacity-100 animate-twinkle transition-opacity duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-500"></div>
                            <div className="absolute -inset-1 bg-gray-600/50 opacity-0 group-hover/btn:opacity-75 blur-lg transition-opacity duration-500"></div>
                          </a>
                        )}
                      </div>
                        </div>

                        {/* Side Image (Herman's photo for his PhD post, placeholder for others) */}
                        <div className="order-1 lg:order-2 w-full lg:w-64 xl:w-72 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 aspect-[4/3] lg:aspect-[4/3] relative shadow-md">
                          {post.heading === 'Herman Wandabwa has sucessfully completed his PhD' ? (
                            <img
                              src="/backup-images/Herman_wanabanda.jpg"
                              alt="Herman Wandabwa"
                              className="w-full h-full object-contain object-top bg-white"
                              loading="lazy"
                            />
                          ) : post.heading && post.heading.startsWith('Recieved NRPU 2022') ? (
                            <img
                              src="/backup-images/hec-logo.png"
                              alt="HEC Logo"
                              className="w-full h-full object-contain object-center bg-white"
                              loading="lazy"
                            />
                          ) : post.heading === 'Successfully Organised IWDS 2020' ? (
                            <img
                              src="/backup-images/8th_international_workshop_image.png"
                              alt="8th International Workshop on Data Science (IWDS 2020)"
                              className="w-full h-full object-contain object-center bg-white"
                              loading="lazy"
                            />
                          ) : post.pic ? (
                            <img
                              src={post.pic}
                              alt={post.heading}
                              className="w-full h-full object-contain object-center bg-white"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                              Image
                            </div>
                          )}
                          <div className="absolute inset-0 pointer-events-none ring-1 ring-black/5"></div>
                        </div>
                      </div>

                      {/* Background decoration */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>

                    {/* Enhanced hover effect overlay */}
                    <div className="absolute inset-0 bg-gray-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-20 border-b-20 border-l-transparent border-b-gray-300/20 group-hover:border-b-gray-400/40 transition-colors duration-500"></div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Team Section */}
                <Card className="overflow-hidden transition-all duration-700 hover:shadow-3xl hover:-translate-y-4 group border-2 border-gray-200 hover:border-gray-400 relative">
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="relative bg-gray-100 p-6 rounded-3xl group-hover:scale-125 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                        <Users className="h-12 w-12 text-gray-600 group-hover:animate-bounce" />
                        <div className="absolute inset-0 bg-gray-300/30 rounded-3xl animate-ping group-hover:animate-pulse"></div>
                        <div className="absolute -inset-2 bg-gray-400/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-gray-700 transition-colors duration-500 text-center">
                      Our Team
                    </h3>
                    <p className="text-gray-600 mb-8 leading-relaxed text-center">
                      Learn about the areas of research and methodologies used by the Data Science Research Group.
                    </p>

                    {/* Button */}
                    <Link
                      to="/our-people"
                      className="group/btn relative w-full bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gray-500/25 hover:-translate-y-2 hover:scale-105 transform-gpu border border-gray-800 flex items-center justify-center"
                    >
                      <span className="relative z-10 flex items-center">
                        <BookOpen className="mr-3 h-5 w-5 group-hover/btn:animate-pulse" />
                        Find Out More
                        <ChevronRight className="ml-3 h-5 w-5 transition-all duration-300 group-hover/btn:translate-x-2 group-hover/btn:scale-110" />
                      </span>
                      <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-500"></div>
                      <div className="absolute -inset-1 bg-gray-600/50 opacity-0 group-hover/btn:opacity-75 blur-lg transition-opacity duration-500"></div>
                    </Link>
                  </div>

                  {/* Sparkle effects */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Sparkles className="h-6 w-6 text-gray-400 animate-twinkle" />
                  </div>

                  {/* Enhanced hover effect overlay */}
                  <div className="absolute inset-0 bg-gray-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                </Card>

                {/* Quick Links */}
                <Card className="overflow-hidden transition-all duration-700 hover:shadow-3xl hover:-translate-y-4 group border-2 border-gray-200 hover:border-gray-400 relative">
                  <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-6 text-gray-900 group-hover:text-gray-700 transition-colors duration-500 flex items-center">
                      <Globe className="mr-3 h-6 w-6 animate-spin-slow" />
                      Quick Links
                    </h3>
                    
                    <div className="space-y-3">
                      {[
                        { name: 'Research Areas', link: '/research' },
                        { name: 'Publications', link: '/publications' },
                        { name: 'Projects', link: '/projects' },
                        { name: 'Contact Us', link: '/contact' }
                      ].map((item, index) => (
                        <Link
                          key={index}
                          to={item.link}
                          className="group/link flex items-center p-3 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:translate-x-2"
                        >
                          <Monitor className="h-4 w-4 text-gray-500 mr-3 group-hover/link:animate-pulse" />
                          <span className="text-gray-700 group-hover/link:text-gray-900 font-medium">
                            {item.name}
                          </span>
                          <ArrowRight className="h-4 w-4 text-gray-400 ml-auto opacity-0 group-hover/link:opacity-100 transition-all duration-300 group-hover/link:translate-x-1" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Activity className="h-6 w-6 text-gray-400 animate-pulse" />
                  </div>
                </Card>
              </div>
            </div>
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
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        .border-l-20 {
          border-left-width: 20px;
        }
        .border-b-20 {
          border-bottom-width: 20px;
        }
      `}</style>
    </div>
  );
};

export default NewsAndEvents;