import React from 'react';
import { Database, Twitter, Linkedin, Github, Mail, MapPin, Phone, Code, Sparkles, Activity, Monitor } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden border-t-4 border-slate-700 shadow-2xl">
      {/* Background pattern for distinction */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900"></div>
      
      {/* Background effects matching homepage theme */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-16 left-8 w-24 h-24 bg-white/5 rounded-2xl transform rotate-45 animate-spin-slow backdrop-blur-sm"></div>
        <div className="absolute top-32 right-16 w-20 h-20 bg-white/8 rounded-full animate-bounce-slow backdrop-blur-sm"></div>
        <div className="absolute bottom-16 left-1/4 w-16 h-16 bg-white/10 rounded-lg animate-pulse backdrop-blur-sm"></div>
        <div className="absolute bottom-16 right-1/3 w-20 h-20 bg-white/5 rounded-full transform rotate-12 animate-float backdrop-blur-sm"></div>
        
        {/* Subtle particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/20 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12 sm:px-8 lg:px-10 z-10">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-6 group">
              <div className="relative mr-3">
                <div className="relative bg-slate-700 p-2.5 rounded-xl group-hover:bg-slate-600 transition-all duration-300 shadow-lg">
                  <Database className="h-7 w-7 text-white animate-spin-slow group-hover:animate-pulse" />
                  <div className="absolute inset-0 bg-white/10 rounded-xl animate-ping"></div>
                </div>
              </div>
              <div>
                <span className="text-xl font-bold text-white group-hover:text-gray-200 transition-colors duration-300 block">
                  DataInsight
                </span>
                <span className="text-xs text-gray-400 font-medium">Research Lab</span>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm">
              NUCES Islamabad - Advancing research in Data Science, Machine Learning, and emerging computational technologies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="group text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 relative p-2 rounded-full hover:bg-slate-700">
                <Twitter className="h-5 w-5 relative z-10 group-hover:animate-bounce" />
              </a>
              <a href="#" className="group text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 relative p-2 rounded-full hover:bg-slate-700">
                <Linkedin className="h-5 w-5 relative z-10 group-hover:animate-bounce" />
              </a>
              <a href="#" className="group text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 relative p-2 rounded-full hover:bg-slate-700">
                <Github className="h-5 w-5 relative z-10 group-hover:animate-bounce" />
              </a>
              <a href="#" className="group text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 relative p-2 rounded-full hover:bg-slate-700">
                <Mail className="h-5 w-5 relative z-10 group-hover:animate-bounce" />
              </a>
            </div>
          </div>
          
          {/* Research Areas & Links Combined */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white flex items-center">
              <Activity className="h-4 w-4 mr-2 animate-pulse" />
              Research Areas
            </h3>
            <ul className="space-y-2 mb-6">
              <li><a href="/research" className="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center">
                <span className="w-1 h-1 bg-gray-500 rounded-full mr-2 group-hover:bg-white transition-colors duration-300"></span>
                Data Mining & ML
              </a></li>
              <li><a href="/research" className="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center">
                <span className="w-1 h-1 bg-gray-500 rounded-full mr-2 group-hover:bg-white transition-colors duration-300"></span>
                Big Data Management
              </a></li>
              <li><a href="/research" className="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center">
                <span className="w-1 h-1 bg-gray-500 rounded-full mr-2 group-hover:bg-white transition-colors duration-300"></span>
                IoT & Computer Vision
              </a></li>
            </ul>
            
            <h3 className="text-lg font-bold mb-4 text-white flex items-center">
              <Monitor className="h-4 w-4 mr-2 animate-pulse" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li><a href="/publications" className="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center">
                <span className="w-1 h-1 bg-gray-500 rounded-full mr-2 group-hover:bg-white transition-colors duration-300"></span>
                Publications
              </a></li>
              <li><a href="/projects" className="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center">
                <span className="w-1 h-1 bg-gray-500 rounded-full mr-2 group-hover:bg-white transition-colors duration-300"></span>
                Active Projects
              </a></li>
              <li><a href="/people" className="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center">
                <span className="w-1 h-1 bg-gray-500 rounded-full mr-2 group-hover:bg-white transition-colors duration-300"></span>
                Research Team
              </a></li>
            </ul>
          </div>

          {/* Contact & Stats */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white flex items-center">
              <MapPin className="h-4 w-4 mr-2 animate-pulse" />
              Contact
            </h3>
            <div className="space-y-3 text-gray-300 mb-6">
              <div className="flex items-start text-sm">
                <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">NUCES Islamabad</p>
                  <p>Pakistan</p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                <p>datainsight@nu.edu.pk</p>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-4 text-white flex items-center">
              <Database className="h-4 w-4 mr-2 animate-spin-slow" />
              Impact
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-700/50 p-3 rounded-lg hover:bg-slate-700 transition-all duration-300 hover:scale-105">
                <div className="text-lg font-bold text-white">50+</div>
                <div className="text-xs text-gray-300">Projects</div>
              </div>
              <div className="bg-slate-700/50 p-3 rounded-lg hover:bg-slate-700 transition-all duration-300 hover:scale-105">
                <div className="text-lg font-bold text-white">200+</div>
                <div className="text-xs text-gray-300">Papers</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div className="flex items-center">
            <Sparkles className="h-3 w-3 mr-2 animate-twinkle" />
            <p>&copy; 2024 DataInsight Lab, NUCES Islamabad. All rights reserved.</p>
          </div>
          <div className="flex space-x-4 mt-3 md:mt-0">
            <a href="/privacy" className="hover:text-white transition-colors duration-300">Privacy</a>
            <a href="/terms" className="hover:text-white transition-colors duration-300">Terms</a>
          </div>
        </div>
      </div>

      {/* CSS animations matching homepage */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
        @keyframes bounce-once {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-bounce-once { animation: bounce-once 0.6s ease-in-out; }
      `}</style>
    </footer>
  );
};

export default Footer;