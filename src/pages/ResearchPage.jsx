import React, { useState, useEffect } from 'react';
import { Globe, Activity,Cpu, Sparkles, Brain, Database, FileText, Building, Lightbulb, Users, ChevronRight, Monitor, Server, Smartphone, Stethoscope, ShoppingCart, TreePine } from 'lucide-react';
import serverEndPoint from './../dxdm';
import { Link, useNavigate, useLocation } from 'react-router-dom';    
import projects from './../classes/projects'; // ✅ Import real projects data

const ResearchPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState("Generative AI");
    const [currentImage, setCurrentImage] = useState("SSC_normal.png");
    const [selectedApplication, setSelectedApplication] = useState("Smart Media");
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [, setIsImageHovered] = useState(false);

    // ✅ Scroll to top on page load and route changes
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [location.pathname]);

    // Mouse tracking for dynamic effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Navigation function to redirect to projects page with category filter
    const navigateToProjects = (category) => {
        navigate('/projects', { state: { filterCategory: category } });
    };
    // Navigation function to redirect to projects page with specific project search
    const navigateToProjectWithSearch = (projectTitle) => {
        navigate('/projects', { state: { searchProject: projectTitle } });
    };
    // Core research areas (unchanged)
    const researchSpectrum = {
      "Generative AI": "Generative AI creates new content like text, images, or code by learning patterns from vast amounts of existing data. This transformative field, which has seen explosive growth with the proliferation of Big Data and the development of large language models, is now at the forefront of innovation. It enables applications ranging from automated content creation and personalized marketing to sophisticated scientific discovery and creative arts, fundamentally changing how we interact with technology and information. The core principle lies in training models.",
    "Data Mining & Machine Learning": "Data Mining and Machine Learning are concerned with finding meaningful patterns, making predictions, and extracting valuable knowledge from large and often unstructured datasets. This discipline encompasses a wide array of techniques for identifying hidden relationships, classifying data, and predicting future outcomes. It is a cornerstone of modern data-driven decision-making, with applications in fraud detection, predictive maintenance, customer behavior analysis, and the real-time processing of continuous data streams from sources like IoT devices and financial markets.",
    "Data Analytics": "Data Analytics is the systematic process of examining raw data to draw meaningful conclusions, identify trends, and inform strategic decisions. As a foundational practice for any organization aiming to optimize performance and gain a competitive edge, it involves a variety of techniques, including descriptive, diagnostic, predictive, and prescriptive analytics. This field empowers businesses to understand their past performance, uncover the 'why' behind outcomes, forecast future scenarios, and recommend optimal courses of action, turning raw data into actionable insights.",
    "NLP & Computer Vision": "NLP (Natural Language Processing) and Computer Vision are two complementary subfields of AI that deal with interpreting human-like information. NLP focuses on enabling computers to understand, interpret, and generate human language, making technologies like chatbots, sentiment analysis tools, and language translation possible. Computer Vision, on the other hand, is dedicated to helping computers 'see' and interpret visual data from images and videos, powering applications such as facial recognition, self-driving cars, and medical image analysis. Together, these fields are critical for building intelligent systems."
    };
    
    // ✅ Build real data grouping by category
    const data_insight_lab_projects = projects.reduce((acc, project) => {
        if (!acc[project.category]) {
            acc[project.category] = [];
        }
        acc[project.category].push(project.title);
        return acc;
    }, {});

    // Application areas (unchanged)
     const applicationAreas = [
        { name: "Smart Media", icon: Smartphone, color: "from-blue-600 to-blue-800", accentColor: "blue", bgColor: "bg-blue-50", hoverColor: "hover:bg-blue-100" },
        { name: "eHealth", icon: Stethoscope, color: "from-red-600 to-red-800", accentColor: "red", bgColor: "bg-red-50", hoverColor: "hover:bg-red-100" },
        { name: "eBusiness", icon: ShoppingCart, color: "from-green-600 to-green-800", accentColor: "green", bgColor: "bg-green-50", hoverColor: "hover:bg-green-100" },
        { name: "eDocuments", icon: FileText, color: "from-purple-600 to-purple-800", accentColor: "purple", bgColor: "bg-purple-50", hoverColor: "hover:bg-purple-100" },
        { name: "Smart City", icon: Building, color: "from-orange-600 to-orange-800", accentColor: "orange", bgColor: "bg-orange-50", hoverColor: "hover:bg-orange-100" },
        { name: "AgroTech", icon: TreePine, color: "from-indigo-600 to-indigo-800", accentColor: "indigo", bgColor: "bg-indigo-50", hoverColor: "hover:bg-indigo-100" }
    ];
    
    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden pt-8">
            {/* Floating background elements */}
             
            {/* Hero Section - Matching HomePage's slate-800 */}
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden z-10">
                
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Particle network */}
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              {[...Array(20)].map((_, i) => (
                <circle key={i} cx={`${(i * 17 + 5) % 100}%`} cy={`${(i * 23 + 10) % 100}%`} r="1.5" fill="#22d3ee" />
              ))}
              {[...Array(10)].map((_, i) => (
                <line key={`l${i}`} x1={`${(i * 17 + 5) % 100}%`} y1={`${(i * 23 + 10) % 100}%`} x2={`${((i + 3) * 17 + 5) % 100}%`} y2={`${((i + 3) * 23 + 10) % 100}%`} stroke="#22d3ee" strokeWidth="0.5" />
              ))}
            </svg>
            </div>
                {/* Dynamic background gradient based on mouse position */}
                <div 
                    className="absolute inset-0 opacity-30 transition-all duration-1000"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.25) 0%, transparent 65%)`
                    }}
                ></div>
                
                  <div className="relative max-w-7xl mx-auto px-4 min-h-screen flex flex-col items-center justify-center sm:px-6 lg:px-8 z-10">
                    <div className="text-center space-y-6">
                        <div className="relative inline-block mb-8">
                        <Lightbulb className="h-28 w-28 text-yellow-400 mx-auto" />
                        <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                        <div className="absolute -inset-4 bg-white/20 rounded-full animate-pulse blur-lg"></div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white tracking-tight animate-fade-in-up">
                            <span className="relative inline-block">
                                Solutions & R&D Spectrum
                                {/* Shimmer effect */}
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer transform -skew-x-12"></span>
                            </span>
                        </h1>
                        <p className="text-lg max-w-6xl mx-auto text-gray-400 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                            <span className="text-white font-bold animate-text-glow" style={{ animationDelay: '1s' }}>
                                Data science
                            </span> research focuses on{' '}
                            <span className="text-white font-bold animate-text-glow" style={{ animationDelay: '1s' }}>
                                real-time analysis
                            </span> of{' '}
                            <span className="text-white font-bold animate-text-glow" style={{ animationDelay: '1s' }}>
                                high-speed, high-volume
                            </span> data streams in diverse formats. Our lab specializes in{' '}
                            <span className="text-white font-bold animate-text-glow"> Generative AI</span>,{' '}
                            <span className="text-white font-bold animate-text-glow"> Machine Learning</span>,{' '}
                            <span className="text-white font-bold animate-text-glow"> Social Analytics</span>, and{' '}
                            <span className="text-white font-bold animate-text-glow"> NLP & Computer Vision</span>, applying these technologies to{' '}
                            <span className="text-white font-bold"> Smart Business</span>,{' '}
                            <span className="text-white font-bold"> eHealth</span>,{' '}
                            <span className="text-white font-bold"> Smart Cities</span>, and other domains. We design{' '}
                            <span className="text-white font-bold animate-text-glow"> data-driven algorithms</span> for{' '}
                            <span className="text-white font-bold animate-text-glow"> knowledge extraction</span> and{' '}
                            <span className="text-white font-bold animate-text-glow"> predictive analytics</span>.
                            </p>

                    </div>
                </div>

                <div className="absolute bottom-8 animate-bounce-gentle" style={{left: 'calc(50% - 1.25rem)'}}>
                    <div className="relative w-8 h-14 border-3 border-white/40 rounded-full flex justify-center backdrop-blur-sm">
                        <div className="w-2 h-4 bg-white rounded-full mt-3 animate-scroll"></div>
                        <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Core Research Areas - Clean white background with dynamic effects */}
            <div className="py-20 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block bg-slate-800 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10 flex items-center">
                                <Cpu className="inline-block w-4 h-4 mr-2 animate-spin-slow" />
                                Core Research Areas
                                <Sparkles className="inline-block w-4 h-4 ml-2 animate-twinkle" />
                            </span>
                        </span>
                        <h2 className="text-4xl font-bold text-slate-800 mb-6 animate-fade-in-up">Capability Foundation</h2>
                        <div className="w-24 h-1 bg-slate-800 mx-auto rounded-full shadow-lg animate-expand"></div>
                    </div>
                    
                    <div className="grid lg:grid-cols-5 gap-8 items-start">
                        {/* Left Column - Interactive Image Wheel */}
                        <div className="lg:col-span-3 flex justify-center">
                            <div className="relative">
                                <div 
                                    className="game-board relative w-[500px] h-[500px] transition-all duration-700 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 group"
                                    style={{ 
                                        backgroundImage: `url(${serverEndPoint}/backup-images/${currentImage})`, 
                                        backgroundSize: "contain", 
                                        backgroundRepeat: "no-repeat", 
                                        backgroundPosition: "center",
                                        filter: "none" // Ensure no blur or grayscale is applied
                                        // Removed grayscale filter to preserve image colors
                                    }}
                                    onMouseEnter={() => setIsImageHovered(true)}
                                    onMouseLeave={() => setIsImageHovered(false)}
                                >

                                  <div className="top absolute top-0 left-0 w-full h-1/2">
                                      {/* Top-left quadrant */}
                                      <div 
                                        className="absolute top-0 left-0 w-1/2 h-full cursor-pointer"
                                        onMouseEnter={() => {
                                          setCurrentImage("SSC_normal_tl.png");
                                          setActiveIndex("Generative AI");
                                        }} 
                                        onMouseLeave={() => {
                                          setCurrentImage("SSC_normal.png");
                                        }}
                                      />

                                      {/* Top-right quadrant */}
                                      <div 
                                        className="absolute top-0 right-0 w-1/2 h-full cursor-pointer"
                                        onMouseEnter={() => {
                                          setCurrentImage("SSC_normal_tr.png");
                                          setActiveIndex("Data Mining & Machine Learning");
                                        }} 
                                        onMouseLeave={() => {
                                          setCurrentImage("SSC_normal.png");
                                        }}
                                      />
                                    </div>

                                    <div className="bottom absolute bottom-0 left-0 w-full h-1/2">
                                      {/* Bottom-left quadrant */}
                                      <div 
                                        className="absolute bottom-0 left-0 w-1/2 h-full cursor-pointer"
                                        onMouseEnter={() => {
                                          setCurrentImage("SSC_normal_bl.png");
                                          setActiveIndex("NLP & Computer Vision");
                                        }} 
                                        onMouseLeave={() => {
                                          setCurrentImage("SSC_normal.png");
                                        }}
                                      />

                                      {/* Bottom-right quadrant */}
                                      <div 
                                        className="absolute bottom-0 right-0 w-1/2 h-full cursor-pointer"
                                        onMouseEnter={() => {
                                          setCurrentImage("SSC_normal_br.png");
                                          setActiveIndex("Data Analytics");
                                        }} 
                                        onMouseLeave={() => {
                                          setCurrentImage("SSC_normal.png");
                                        }}
                                      />
                                    </div>
                                    </div>
                                                                                    
                                
                            </div>
                        </div>
                        
                        {/* Right Column - Dynamic Research Description */}
                        <div className="lg:col-span-2 bg-gray-50 p-8 rounded-2xl shadow-xl border border-gray-200 relative overflow-hidden group hover:bg-white transition-all duration-700 hover:shadow-3xl hover:-translate-y-2">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-100/80 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            
                            {/* Floating sparkles */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <Sparkles className="h-6 w-6 text-slate-400 animate-twinkle" />
                            </div>
                            
                            <div className="relative z-10">
                                <h4 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-slate-700 transition-colors duration-500 animate-text-glow">{activeIndex}</h4>
                                <div className="h-0.5 bg-slate-700 rounded mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-500"></div>
                                <p className="text-gray-700 leading-relaxed text-base group-hover:text-gray-800 transition-colors duration-500">
                                    {researchSpectrum[activeIndex]}
                                </p>
                                <div className="h-0.5 bg-gradient-to-r from-slate-600 to-gray-400 rounded mt-4 group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-500"></div>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Areas with Projects - Enhanced dynamic theme */}
            <div className="py-20 bg-gray-50 relative">
                {/* Background pattern animation */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full animate-slide-pattern" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-16">
                        <span className="inline-block bg-white text-slate-700 border-2 border-slate-300 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-2xl relative overflow-hidden group hover:border-slate-500 transition-all duration-500">
                            <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10 flex items-center">
                                <Globe className="inline-block w-4 h-4 mr-2 animate-spin-slow" />
                                Application Areas & Projects
                                <Activity className="inline-block w-4 h-4 ml-2 animate-bounce" />
                            </span>
                        </span>
                        <h2 className="text-4xl font-bold text-slate-800 mb-6 animate-fade-in-up">Real-world Applications</h2>
                        <div className="w-24 h-1 bg-slate-700 mx-auto rounded-full shadow-lg animate-expand"></div>
                    </div>
                    
                    {/* Application Area Cards - More dynamic */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {applicationAreas.map((area, index) => {
                            const Icon = area.icon;
                            const isSelected = selectedApplication === area.name;
                            return (
                                <div 
                                    key={area.name}
                                    className={`group cursor-pointer transition-all duration-700 transform hover:-translate-y-4 hover:rotate-2 ${isSelected ? 'scale-110 z-10' : 'hover:scale-105'}`}
                                    onClick={() => setSelectedApplication(area.name)}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className={`bg-white p-8 rounded-3xl shadow-xl hover:shadow-3xl border-2 transition-all duration-700 relative overflow-hidden ${isSelected ? `border-${area.accentColor}-500 shadow-${area.accentColor}-200/50` : 'border-gray-200 hover:border-slate-400'}`}>
                                        {/* Dynamic background effects */}
                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${isSelected ? `bg-gradient-to-br from-${area.accentColor}-50 to-${area.accentColor}-100` : area.bgColor}`}></div>
                                        
                                        {/* Floating particles for selected card */}
                                        {isSelected && (
                                            <div className="absolute inset-0">
                                                {[...Array(8)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`absolute w-1 h-1 bg-${area.accentColor}-400 rounded-full animate-float`}
                                                        style={{
                                                            left: `${Math.random() * 100}%`,
                                                            top: `${Math.random() * 100}%`,
                                                            animationDelay: `${Math.random() * 2}s`
                                                        }}
                                                    ></div>
                                                ))}
                                            </div>
                                        )}
                                        
                                        <div className="relative z-10">
                                            <div className="flex items-center mb-6">
                                                <div className={`p-4 rounded-2xl bg-gradient-to-br ${area.color} shadow-lg group-hover:scale-125 transition-all duration-500 group-hover:shadow-2xl`}>
                                                    <Icon className="h-8 w-8 text-white group-hover:animate-bounce" />
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <h3 className={`text-xl font-bold transition-colors duration-500 ${isSelected ? `text-${area.accentColor}-700` : 'text-slate-800 group-hover:text-slate-700'}`}>
                                                        {area.name}
                                                    </h3>
                                                    <div className={`h-0.5 bg-gradient-to-r ${area.color} rounded mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <Server className="w-4 h-4 mr-2 text-gray-500 group-hover:animate-pulse" />
                                                    <span className={`font-semibold text-sm ${isSelected ? `text-${area.accentColor}-600` : 'text-gray-600'}`}>
                                                        {data_insight_lab_projects[area.name]?.length || 0} Projects
                                                    </span>
                                                </div>
                                                <ChevronRight className={`h-5 w-5 transition-all duration-500 ${isSelected ? 'rotate-90 text-blue-500' : 'text-gray-400 group-hover:translate-x-2 group-hover:text-slate-600'}`} />
                                            </div>
                                        </div>
                                        
                                        {/* Corner sparkle */}
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <Sparkles className="h-5 w-5 text-slate-400 animate-twinkle" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Selected Application Projects - Super dynamic */}
                    <div className="bg-white p-10 rounded-3xl shadow-3xl border-2 border-gray-200 relative overflow-hidden group hover:shadow-4xl transition-all duration-700">
                        {/* Background animation */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        {/* Selected area info */}
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className="flex items-center">
                                {(() => {
                                    const area = applicationAreas.find(a => a.name === selectedApplication);
                                    const Icon = area?.icon || Globe;
                                    return (
                                        <>
                                            <div className={`p-5 rounded-2xl bg-gradient-to-br ${area?.color || 'from-slate-400 to-slate-600'} shadow-2xl group-hover:scale-110 transition-all duration-500`}>
                                                <Icon className="h-10 w-10 text-white group-hover:animate-spin" />
                                            </div>
                                            <div className="ml-6">
                                                <h3 className="text-3xl font-bold text-slate-800 group-hover:text-slate-700 transition-colors duration-500">{selectedApplication}</h3>
                                                <p className="text-gray-600 mt-2 flex items-center">
                                                    <Monitor className="w-4 h-4 mr-2 animate-pulse" />
                                                    Current Research Projects
                                                </p>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                            
                            {/* View All Projects Button */}
                            <button
                                // onClick={() => navigateToProjectWithSearch(project)}
                                onClick={() => navigateToProjects(selectedApplication)}

                                className="group/btn relative bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-500 hover:bg-slate-700 hover:shadow-xl hover:-translate-y-1 hover:scale-105 flex items-center overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center">
                                    <Database className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                                    View All Projects
                                    <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                </span>
                                <div className="absolute inset-0 bg-slate-600 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300"></div>
                            </button>
                        </div>
                        
                        <div className="h-1 bg-gradient-to-r from-slate-600 to-blue-500 rounded mb-8 relative z-10"></div>
                        
                        {/* Projects grid with staggered animations */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                            {data_insight_lab_projects[selectedApplication]?.slice(0, 6).map((project, index) => (
                                <div 
                                    key={project} 
                                    className="group/project bg-gray-50 p-6 rounded-2xl hover:bg-white hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-slate-400 transform hover:-translate-y-2 hover:rotate-1 relative overflow-hidden cursor-pointer"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    onClick={() => navigateToProjectWithSearch(project)}
                                >
                                    {/* Project card background effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover/project:opacity-100 transition-opacity duration-500"></div>
                                    
                                    <div className="flex items-start relative z-10">
                                        <div className="bg-slate-700 p-3 rounded-xl mr-4 group-hover/project:bg-slate-600 transition-all duration-500 group-hover/project:scale-110 shadow-lg">
                                            <Lightbulb className="h-6 w-6 text-white group-hover/project:animate-pulse" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-900 mb-3 group-hover/project:text-slate-700 transition-colors duration-500 text-base">
                                                {project}
                                            </h4>
                                            <div className="h-1 bg-gray-300 rounded group-hover/project:bg-gradient-to-r group-hover/project:from-blue-500 group-hover/project:to-purple-500 transition-all duration-500"></div>
                                        </div>
                                    </div>
                                    
                                    {/* Floating sparkle */}
                                    <div className="absolute top-3 right-3 opacity-0 group-hover/project:opacity-100 transition-opacity duration-500">
                                        <Sparkles className="h-4 w-4 text-slate-400 animate-twinkle" />
                                    </div>
                                </div>
                            )) || <p className="text-gray-500 col-span-full text-center">No projects available for this area.</p>}
                            
                            {/* Show more indicator if there are more than 6 projects */}
                            {data_insight_lab_projects[selectedApplication]?.length > 6 && (
                                <div 
                                    className="md:col-span-2 lg:col-span-3 flex justify-center mt-6"
                                >
                                    <button
                                        // onClick={() => navigateToProjectWithSearch(project)}
                                        onClick={() => navigateToProjects(selectedApplication)}

                                        className="group/more bg-gradient-to-r from-slate-600 to-slate-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center">
                                            <span className="mr-3">
                                                +{data_insight_lab_projects[selectedApplication].length - 6} More Projects
                                            </span>
                                            <ChevronRight className="w-5 h-5 group-hover/more:translate-x-2 transition-transform duration-300" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-slate-500 to-slate-700 transform scale-x-0 group-hover/more:scale-x-100 transition-transform origin-left duration-300"></div>
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        <div className="h-1 bg-gradient-to-r from-slate-600 to-purple-500 rounded mt-8 relative z-10"></div>
                    </div>
                </div>
            </div>

            {/* Call to Action Section - Matching HomePage */}
            <div className="relative py-32 bg-slate-800 text-white overflow-hidden">
                {/* Enhanced background effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20">
                        <div className="absolute top-20 left-20 w-48 h-48 border-2 border-white/30 rounded-3xl transform rotate-45 animate-spin-slow"></div>
                        <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-white/30 transform rotate-12 animate-bounce-slow"></div>
                        <div className="absolute top-1/2 left-1/2 w-80 h-80 border-2 border-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                    </div>
                    
                </div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <div className="mb-12">
                        <div className="relative inline-block mb-8">
                            <Brain className="h-20 w-20 text-yellow-400 mx-auto animate-spin-slow" />
                            <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                            <div className="absolute -inset-4 bg-white/20 rounded-full animate-pulse blur-lg"></div>
                        </div>
                        <h2 className="text-6xl font-bold mb-8 relative">
                            <span className="text-white animate-gradient-x">
                                Ready to Collaborate?
                            </span>
                        </h2>
                        <p className="text-2xl mb-16 max-w-4xl mx-auto text-gray-300 leading-relaxed">
                            Collaborate with GradientWise to transform strong research ideas into production-ready intelligent systems.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-8 justify-center">
                        <button
                            onClick={() => {
                                navigateToProjects('all');
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                            className="group relative bg-slate-700 text-white px-14 py-6 rounded-2xl font-bold overflow-hidden transition-all duration-500 hover:shadow-3xl hover:shadow-slate-500/25 hover:-translate-y-3 hover:scale-110 transform-gpu border border-slate-600"
                        >
                            <span className="relative z-10 flex items-center justify-center text-xl">
                                <Database className="mr-4 h-7 w-7 group-hover:animate-bounce" />
                                Explore All Projects
                                <Sparkles className="ml-4 h-7 w-7 opacity-0 group-hover:opacity-100 animate-twinkle transition-opacity duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-slate-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                            <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-400 rounded-2xl"></div>
                            <div className="absolute -inset-2 bg-slate-600/50 opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-500"></div>
                        </button>

                        
                        <Link
                            to="/contact"
                            className="group relative border-3 border-white/40 text-white px-14 py-6 rounded-2xl font-bold transition-all duration-500 hover:bg-white/10 hover:border-white hover:text-white hover:-translate-y-3 hover:scale-110 backdrop-blur-md overflow-hidden"
                            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                            >
                            <span className="relative z-10 flex items-center justify-center text-xl">
                                <Users className="mr-4 h-7 w-7 group-hover:animate-pulse" />
                                Join Our AI Team
                                <ChevronRight className="ml-4 h-7 w-7 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2" />
                            </span>
                            <div className="absolute inset-0 bg-white/10 transform scale-0 group-hover:scale-100 transition-transform duration-400 rounded-2xl"></div>
                            <div className="absolute -inset-1 bg-white/20 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500"></div>
                            </Link>

                    </div>
                </div>
            </div>

            {/* Enhanced Custom CSS for animations */}
            <style jsx>{`
                
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
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes expand {
                    from { width: 0; }
                    to { width: 6rem; }
                }
                @keyframes expand-width {
                    from { width: 0; }
                    to { width: 100%; }
                }
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes slide-pattern {
                    0% { transform: translateX(0) translateY(0); }
                    100% { transform: translateX(60px) translateY(60px); }
                }
                
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
                .animate-shimmer { animation: shimmer 2s infinite; }
                .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
                .animate-text-glow { animation: text-glow 2s ease-in-out infinite; }
                .animate-spin-slow { animation: spin-slow 8s linear infinite; }
                .animate-spin-reverse { animation: spin-reverse 6s linear infinite; }
                .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
                .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
                .animate-expand { animation: expand 1s ease-out forwards; }
                .animate-expand-width { animation: expand-width 1.5s ease-out forwards; }
                .animate-gradient-x { animation: gradient-x 4s ease infinite; }
                .animate-slide-pattern { animation: slide-pattern 20s linear infinite; }
                
                .shadow-3xl {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
                }
                .shadow-4xl {
                    box-shadow: 0 40px 80px -12px rgba(0, 0, 0, 0.3);
                }
                .border-3 {
                    border-width: 3px;
                }
                
                .game-board {
                    position: relative;
                }
                
                .quadrant {
                    z-index: 10;
                }
                
                .quadrant:hover {
                    backdrop-filter: blur(2px);
                }
                
                /* Enhanced hover effects */
                .group:hover .animate-spin-slow {
                    animation-duration: 3s;
                }
                
                /* Responsive design improvements */
                @media (max-width: 768px) {
                    .game-board {
                        width: 300px !important;
                        height: 300px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ResearchPage;