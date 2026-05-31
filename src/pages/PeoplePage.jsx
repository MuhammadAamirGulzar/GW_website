import React, { useState, useMemo , useEffect} from 'react';
import { Users, BookOpen, ExternalLink, ChevronDown, ChevronUp, Globe, MapPin, GraduationCap, Star, Award, Building2, User, Mail, ArrowRight, Sparkles, Activity, Brain, Code, Zap, Database, Server, Search, Linkedin, Twitter } from 'lucide-react';
import {Link } from 'react-router-dom';
import peopleData from './../data/peopleData.json';
const PeoplePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedBios, setExpandedBios] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const toggleBio = (personId) => {
    setExpandedBios(prev => ({
      ...prev,
      [personId]: !prev[personId]
    }));
  };

  // Updated data structure with consistent fields

  // Flatten all people into a single array
  const allPeople = [
    peopleData.director,
    ...peopleData.internationalCollaborators,
    ...peopleData.localCollaborators,
    ...peopleData.internationalStudents,
    ...peopleData.localStudents
  ];

  const categories = ['All', 'Faculty', 'Research Staff', 'Graduate Students'];

  // Filter people based on search term and category
  const filteredPeople = useMemo(() => {
    let filtered = allPeople;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(person => person.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(person => {
        const name = person.name?.toLowerCase() ?? '';
        const title = person.title?.toLowerCase() ?? '';
        const area = person.area?.toLowerCase() ?? '';
        const bio = person.bio?.toLowerCase() ?? '';
        const researchAreas = person.researchAreas?.join(' ').toLowerCase() ?? '';

        return (
          name.includes(lowerSearchTerm) ||
          title.includes(lowerSearchTerm) ||
          area.includes(lowerSearchTerm) ||
          bio.includes(lowerSearchTerm) ||
          researchAreas.includes(lowerSearchTerm)
        );
      });
    }
    
    return filtered;
  }, [searchTerm, selectedCategory]);

  const PersonCard = ({ person }) => {
    const isExpanded = expandedBios[person.id];
    
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300 text-center transform hover:-translate-y-1 h-full flex flex-col">
        {/* Image Section */}
        <div className="relative pt-6 px-6">
          <div className="relative mx-auto w-32 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={person.image}
              alt={person.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.objectFit = 'contain';
                e.target.style.padding = '10px';
              }}
            />
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              person.category === 'Faculty' ? 'bg-purple-100 text-purple-800' :
              person.category === 'Research Staff' ? 'bg-green-100 text-green-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {person.category === 'Research Staff' ? person.role : person.category}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-grow flex flex-col">
          <div className="mb-3">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {person.name}
            </h3>
            <p className="text-blue-600 font-medium mb-3">
              {person.title}
            </p>
          </div>

          {/* Research Areas */}
          <div className="mb-4">
            <div className="flex flex-wrap justify-center gap-1.5 mb-3">
              {person.researchAreas.slice(0, 3).map((area, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium border border-gray-200 hover:bg-gray-200 transition-all duration-200"
                >
                  {area}
                </span>
              ))}
              {person.researchAreas.length > 3 && (
                <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
                  +{person.researchAreas.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Bio Section */}
          <div className="mb-4 flex-grow">
            <p className="text-gray-600 text-sm leading-relaxed">
              {isExpanded ? person.fullBio : person.shortBio}
            </p>
            <button
              onClick={() => toggleBio(person.id)}
              className="mt-2 text-gray-700 hover:text-gray-900 font-medium text-xs flex items-center justify-center transition-colors duration-200 mx-auto"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  Read Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
                  Read More
                </>
              )}
            </button>
          </div>

          {/* Social Links */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-center space-x-4">
              {person.email && (
                <a 
                  href={`mailto:${person.email}`} 
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  title="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              )}
              {person.linkedin && (
                <a 
                  href={person.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {person.twitter && (
                <a 
                  href={person.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  title="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {person.website && (
                <a 
                  href={person.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  title="Website"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
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
        style={{ background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.25) 0%, transparent 65%)` }}
      ></div>
  
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
    <div className="text-center space-y-8">
      <div className="relative inline-block mb-8">
        <Users className="h-28 w-28 text-yellow-400 mx-auto" />
        <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute -inset-4 bg-white/20 rounded-full animate-pulse blur-lg"></div>
      </div>
      
      <h1 className="text-6xl md:text-8xl font-bold mb-6 relative">
        <span className="relative inline-block group">
          <span className="text-white animate-gradient-x bg-300%">
            Our People
          </span>
          <span className="absolute -inset-2 bg-white/20 blur-2xl animate-pulse-glow"></span>
        </span>
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
        Meet our diverse team of world-class researchers, collaborators, and students driving innovation in 
        <span className="text-white font-bold animate-text-glow"> data science</span> and 
        <span className="text-white font-bold animate-text-glow"> computing</span>.
      </p>
    </div>
  </div>

  {/* Enhanced scrolling indicator */}
  <div className="absolute bottom-8 animate-bounce-gentle" style={{left: 'calc(50% - 1.25rem)'}}>
    <div className="relative w-8 h-14 border-3 border-white/40 rounded-full flex justify-center backdrop-blur-sm">
      <div className="w-2 h-4 bg-white rounded-full mt-3 animate-scroll"></div>
      <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
    </div>
  </div>
</div>

      {/* Director Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Subtle background glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left: Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-cyan-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide">
                <Award className="h-3.5 w-3.5" />
                Lab Director
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-2">
                {peopleData.director.name}
              </h2>
              <p className="text-cyan-400 font-semibold text-lg mb-6">{peopleData.director.title}</p>

              {/* Research area tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
                {peopleData.director.researchAreas.slice(0, 4).map((area, i) => (
                  <span key={i} className="bg-white/10 border border-white/15 text-gray-200 text-xs font-medium px-3 py-1.5 rounded-full">
                    {area}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p className="text-gray-300 leading-relaxed mb-3 max-w-2xl">
                {expandedBios[peopleData.director.id] ? peopleData.director.fullBio : peopleData.director.shortBio}
              </p>
              <button
                onClick={() => toggleBio(peopleData.director.id)}
                className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors mb-8"
              >
                {expandedBios[peopleData.director.id] ? <><ChevronUp className="h-4 w-4" />Read Less</> : <><ChevronDown className="h-4 w-4" />Read More</>}
              </button>

              {/* Stats mini bar */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                {[
                  { label: 'Publications', value: '200+' },
                  { label: 'PhD Students', value: '25+' },
                  { label: 'Years Active', value: '15+' },
                ].map((s) => (
                  <div key={s.label} className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-cyan-400">{s.value}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">{s.label}</div>
                  </div>
                ))}
              </div>

              <a
                href={peopleData.director.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                <Globe className="h-4 w-4" />
                Visit Website
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Right: Photo */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-56 h-72 sm:w-64 sm:h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden ring-4 ring-cyan-500/40 shadow-2xl shadow-cyan-500/20">
                  <img
                    src={peopleData.director.image}
                    alt={peopleData.director.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = '/fallback.png'; }}
                  />
                </div>
                {/* Decorative glow ring */}
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/10 blur-xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>  
      {/* Team Members Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Section */}
          <div className="mb-12 space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gray-700 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-gray-700 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, title, or research area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Results Counter */}
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Showing {filteredPeople.length} of {allPeople.length} team members
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>
          </div>

          {/* People Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPeople.length > 0 ? (
              filteredPeople.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))
            ) : (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <p className="text-xl text-gray-500 mb-2">No researchers found</p>
                <p className="text-gray-400">Try adjusting your search terms or category filter.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Show All People
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      {/* Statistics Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Global Impact</h2>
            <p className="text-xl text-gray-600">Building bridges across continents through research collaboration</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center transform hover:-translate-y-2 border border-gray-200 hover:border-gray-300 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="relative bg-gray-100 p-5 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-md">
                    <Globe className="h-8 w-8 text-gray-600 group-hover:animate-spin" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-3">6</div>
                <div className="text-gray-600 uppercase text-xs font-bold tracking-wider">International Collaborators</div>
              </div>
            </div>
            
            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center transform hover:-translate-y-2 border border-gray-200 hover:border-gray-300 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="relative bg-gray-100 p-5 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-md">
                    <MapPin className="h-8 w-8 text-gray-600 group-hover:animate-bounce" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-3">10</div>
                <div className="text-gray-600 uppercase text-xs font-bold tracking-wider">Local Collaborators</div>
              </div>
            </div>
            
            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center transform hover:-translate-y-2 border border-gray-200 hover:border-gray-300 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="relative bg-gray-100 p-5 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-md">
                    <GraduationCap className="h-8 w-8 text-gray-600 group-hover:animate-bounce" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-3">12</div>
                <div className="text-gray-600 uppercase text-xs font-bold tracking-wider">International Students</div>
              </div>
            </div>
            
            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center transform hover:-translate-y-2 border border-gray-200 hover:border-gray-300 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="relative bg-gray-100 p-5 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-md">
                    <Building2 className="h-8 w-8 text-gray-600 group-hover:animate-pulse" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-3">35</div>
                <div className="text-gray-600 uppercase text-xs font-bold tracking-wider">Local Students</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative py-24 bg-slate-800 text-white overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-20 left-20 w-48 h-48 border-2 border-white/30 rounded-2xl transform rotate-45 animate-spin-slow"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-white/30 transform rotate-12 animate-bounce-slow"></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 border-2 border-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          </div>
          
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="mb-12">
            <div className="relative inline-block mb-8">
              <Users className="h-16 w-16 text-yellow-400 mx-auto animate-pulse" />
            </div>
            <h2 className="text-5xl font-bold mb-8 relative">
              <span className="text-white animate-gradient-x">
                Join Our Research Community
              </span>
            </h2>
            <p className="text-xl mb-12 max-w-4xl mx-auto text-gray-300 leading-relaxed">
              Collaborate with world-class researchers and contribute to cutting-edge discoveries in data science and computing innovation.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {/* Join Our Team button */}
            <Link
              to="/contact"
              className="group relative bg-gray-900 text-white px-10 py-4 rounded-xl font-bold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/25 hover:-translate-y-1 border border-gray-700"
            >
              <span className="relative z-10 flex items-center justify-center">
                <GraduationCap className="mr-3 h-5 w-5 group-hover:animate-bounce" />
                Join Our Team
              </span>
            </Link>

            {/* Explore Solutions button */}
            <Link
              to="/solutions"
              className="group relative border-2 border-white/40 text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:bg-white/10 hover:border-white hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center">
                <BookOpen className="mr-3 h-5 w-5 group-hover:animate-pulse" />
                Explore Solutions
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
        
        .animate-gradient-x { animation: gradient-x 4s ease infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-text-glow { animation: text-glow 2s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-bounce-once { animation: bounce-once 0.6s ease-in-out; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-scroll { animation: scroll 2s ease-in-out infinite; }
        
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
};

export default PeoplePage;
