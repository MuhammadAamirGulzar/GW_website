import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Code, Building,  Zap, Sparkles, Activity, Search, Heart, MessageSquare, TreePine, ShoppingCart, Github, FileText, Play, X, Mail, User, Phone, AlertCircle, CheckCircle, Loader2, Send, Rocket, Monitor, Maximize, Minimize } from 'lucide-react';
import projects from './../classes/projects';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Card = ({ children, className = "", padding = "p-6", ...props }) => (
  <div className={`bg-white rounded-2xl shadow-xl border border-gray-200 ${padding} ${className}`} {...props}>
    {children}
  </div>
);

const Toast = ({ message, type = 'info', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'error':
      case 'warning': return <AlertCircle className="h-5 w-5" />;
      case 'success': return <CheckCircle className="h-5 w-5" />;
      default: return <AlertCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideIn">
      <div className={`flex items-center p-4 rounded-lg border shadow-lg max-w-md ${getToastStyles()}`}>
        <div className="flex-shrink-0 mr-3">{getIcon()}</div>
        <div className="flex-1"><p className="text-sm font-medium">{message}</p></div>
        <button onClick={onClose} className="flex-shrink-0 ml-3 hover:opacity-70 transition-opacity">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10">
            <X className="h-6 w-6" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

const VideoArchitectureModal = ({ isOpen, onClose, project }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoError, setVideoError] = useState(false);

  if (!isOpen || !project) return null;

  const hasVideo = project.videoUrl;
  const hasArchitecture = project.architectureImage;

  const getVideoEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  const isLocalVideo = hasVideo && (hasVideo.startsWith('/') || hasVideo.startsWith('./'));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ${isFullscreen ? 'max-w-7xl' : 'max-w-4xl'}`}>
        <div className="relative">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              {hasVideo ? <Play className="h-6 w-6 text-red-600" /> : <Monitor className="h-6 w-6 text-blue-600" />}
              <div>
                <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                <p className="text-sm text-gray-500">{hasVideo ? 'Project Demo Video' : 'Project Architecture'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setIsFullscreen(!isFullscreen)} className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100" title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </button>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {hasVideo ? (
              <div className="relative">
                {isLocalVideo ? (
                  <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                    <video 
                      className="w-full h-full object-contain" 
                      controls 
                      onError={() => setVideoError(true)}
                      key={project.videoUrl}
                      style={{ maxHeight: '70vh' }}
                    >
                      <source src={project.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    {videoError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90">
                        <div className="text-center text-white p-6">
                          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
                          <h4 className="font-semibold mb-2">Video Could Not Load</h4>
                          <p className="text-sm text-gray-300">Path: {project.videoUrl}</p>
                          <p className="text-xs text-gray-400 mt-2">Check if the file exists in the correct location</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                    <iframe 
                      src={getVideoEmbedUrl(project.videoUrl)} 
                      title={`${project.title} Demo Video`} 
                      className="absolute inset-0 w-full h-full" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">About this Demo</h4>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {hasArchitecture ? (
                  <div className="relative">
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                      <img src={project.architectureImage} alt={`${project.title} Architecture`} className="w-full h-auto object-contain max-h-96" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                      <div className="hidden p-12 text-center">
                        <Monitor className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Architecture diagram could not be loaded</p>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">System Architecture</h4>
                      <p className="text-blue-700 text-sm">This diagram shows the technical architecture and component interactions for {project.title}.</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Monitor className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">No Architecture Available</h4>
                    <p className="text-gray-600 mb-6">Architecture diagram for this project is not currently available.</p>
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{tech}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Key Features</h4>
                    <ul className="space-y-2">
                      {project.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactForm = ({ isOpen, onClose, projectTitle, showToast }) => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", "571e64ca-dbd3-4c41-91c3-f0b0efada5ae");
      formDataToSend.append("subject", `Project Access Request: ${projectTitle}`);
      formDataToSend.append("from_name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("reply_to", formData.email);
      formDataToSend.append("to", "hello@gradientwise.com");
      
      const messageContent = `Project Access Request Details:\n- Project: ${projectTitle}\n- Name: ${formData.name}\n- Email: ${formData.email}\n- Company: ${formData.company || 'Not provided'}\n- Phone: ${formData.phone || 'Not provided'}\n\nMessage:\n${formData.message || 'No additional message provided'}`.trim();
      
      formDataToSend.append("message", messageContent);
      formDataToSend.append("redirect", "false");

      await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Accept": "application/json" }, body: formDataToSend });

      showToast('Thank you for your interest! We will contact you soon with access details.', 'success');
      onClose();
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
    } catch (err) {
      showToast('Thank you for your interest! We will contact you soon with access details.', 'success');
      onClose();
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-2xl"><Code className="h-8 w-8 text-blue-600" /></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Project Access</h2>
          <p className="text-gray-600 mb-2">Interested in <strong>{projectTitle}</strong>?</p>
          <p className="text-sm text-gray-500">Fill out this form and we'll get back to you with access details.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input type="text" name="name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" placeholder="Enter your full name" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" placeholder="Enter your email" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company/Organization</label>
            <div className="relative">
              <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input type="text" name="company" value={formData.company} onChange={handleChange} disabled={isSubmitting} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" placeholder="Enter your company name" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={isSubmitting} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" placeholder="Enter your phone number" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} disabled={isSubmitting} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed" placeholder="Tell us about your interest in this project or specific access requirements..." />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium flex items-center justify-center">
              {isSubmitting ? (<><Loader2 className="animate-spin h-4 w-4 mr-2" />Sending Request...</>) : (<><Send className="h-4 w-4 mr-2" />Submit Request</>)}
            </button>
            <button type="button" onClick={onClose} disabled={isSubmitting} className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium">Cancel</button>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700"><CheckCircle className="h-4 w-4 inline mr-1" />We typically respond to access requests within 24-48 hours.</p>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const ProjectsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mousePosition] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [contactModal, setContactModal] = useState({ isOpen: false, projectTitle: '' });
  const [videoModal, setVideoModal] = useState({ isOpen: false, project: null });
  const [toast, setToast] = useState({ message: '', type: 'info', isVisible: false });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    if (location.state?.filterCategory) {
      setActiveCategory(location.state.filterCategory);
    }
    if (location.state?.searchProject) {
      setSearchTerm(location.state.searchProject);
      setActiveCategory('all');
    }
    if (location.state?.filterCategory || location.state?.searchProject) {
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  useEffect(() => {
    if (location.state && location.state.selectedCategory) {
      setActiveCategory(location.state.selectedCategory);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast({ ...toast, isVisible: false });
  };

  const openContactForm = (projectTitle) => {
    setContactModal({ isOpen: true, projectTitle });
  };

  const closeContactForm = () => {
    setContactModal({ isOpen: false, projectTitle: '' });
  };

  const openVideoModal = (project) => {
    setVideoModal({ isOpen: true, project });
  };

  const closeVideoModal = () => {
    setVideoModal({ isOpen: false, project: null });
  };

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'Smart Media', name: 'Smart Media' },
    { id: 'eHealth', name: 'eHealth' },
    { id: 'eBusiness', name: 'eBusiness' },
    { id: 'eDocuments', name: 'eDocuments' },
    { id: 'Smart City', name: 'Smart City' },
    { id: 'Agro Tech', name: 'Agro Tech' }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    const hasLinkA = a.githubUrl || a.videoUrl || a.paperUrl;
    const hasLinkB = b.githubUrl || b.videoUrl || b.paperUrl;
    if (hasLinkA && !hasLinkB) return -1;
    if (!hasLinkA && hasLinkB) return 1;
    return 0;
  });

  const projectCounts = categories.reduce((acc, category) => {
    if (category.id !== 'all') {
      acc[category.id] = projects.filter(p => p.category === category.id).length;
    }
    return acc;
  }, {});

  const handleLinkClick = (url, project, linkType) => {
  if (linkType === 'Video Demo') {
    if (project.videoUrl || project.architectureImage) {
      openVideoModal(project);
    } else {
      showToast('Demo Not Available - No video or architecture diagram available for this project.', 'warning');
    }
  } else if (url) {
    window.open(url, '_blank');
  } else {
    if (linkType === 'GitHub Repository') {
      openContactForm(`${project.title} - ${linkType}`);
    } else if (linkType === 'Research Paper') {
      showToast('Paper Not Available - Research paper is currently not published or accessible.', 'warning');
    }
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={hideToast} />
      <ContactForm isOpen={contactModal.isOpen} onClose={closeContactForm} projectTitle={contactModal.projectTitle} showToast={showToast} />
      <VideoArchitectureModal isOpen={videoModal.isOpen} onClose={closeVideoModal} project={videoModal.project} />

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
        <div className="absolute inset-0 opacity-30 transition-all duration-1000" style={{ background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.25) 0%, transparent 65%)` }}></div>

        <div className="relative max-w-5xl mx-auto px-2 py-16 sm:px-6 lg:px-8 z-10">
          <div className="text-center space-y-8">
            <div className="relative inline-block mb-8">
              <Rocket className="h-28 w-28 text-yellow-400 mx-auto" />
              <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
              <div className="absolute -inset-4 bg-white/20 rounded-full animate-pulse blur-lg"></div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-4 relative">
              <span className="relative inline-block group">
                <span className="text-white animate-gradient-x bg-300%">Our Projects</span>
                <span className="absolute -inset-2 bg-white/20 blur-2xl animate-pulse-glow"></span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 leading-relaxed">
              Explore our innovative projects that leverage <span className="text-white font-bold animate-text-glow">Data Science</span>, <span className="text-white font-bold animate-text-glow">AI</span>, and <span className="text-white font-bold animate-text-glow">Machine Learning</span> to solve real-world problems.
            </p>
            
            {activeCategory !== 'all' && (
              <div className="mt-8">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white">
                  <span className="text-sm font-medium">Viewing:</span>
                  <span className="ml-2 text-lg font-bold">{activeCategory} Projects</span>
                  <button onClick={() => setActiveCategory('all')} className="ml-4 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-all duration-300">Clear Filter</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
              <div className="relative w-full md:w-1/2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg" placeholder="Search projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto">
                {categories.map((category) => (
                  <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${activeCategory === category.id ? 'bg-gray-900 text-white shadow-lg hover:shadow-xl' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}>
                    {category.name}
                    {category.id !== 'all' && <span className="ml-2 text-xs opacity-75">({projectCounts[category.id] || 0})</span>}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600">
                {filteredProjects.length === 0 ? 'No projects found' : `Showing ${filteredProjects.length} of ${projects.length} projects`}
                {activeCategory !== 'all' && ` in ${activeCategory}`}
                {searchTerm && (<span>{' matching '}<span className="font-semibold text-blue-600">"{searchTerm}"</span></span>)}
              </p>
              {searchTerm && (<button onClick={() => setSearchTerm('')} className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline">Clear search</button>)}
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProjects.map((project, index) => (
                <Card key={project.id} className="overflow-hidden transition-all duration-500 hover:shadow-3xl hover:-translate-y-2 group border-2 border-gray-200 hover:border-gray-400 relative flex flex-col h-full" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="mb-6">
                    <div className="flex justify-center items-center mb-6 relative">
                      <div className="relative w-52 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden border border-gray-100">
                        <img src={project.logo} alt={`${project.title} logo`} className="max-w-[100%] max-h-[100%] object-contain transition-all duration-300 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                        <div className="absolute inset-0 items-center justify-center hidden">{project.icon}</div>
                      </div>
                      <div className="absolute top-0 right-0">
                        <div className="relative">{project.icon}<div className="absolute inset-0 bg-current opacity-10 rounded-full animate-ping"></div></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1 space-y-6">
                      <div>
                        <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-xs font-bold mb-4">{project.category}</span>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">{project.title}</h3>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (<span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{tech}</span>))}
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Key Features</h4>
                        <ul className="space-y-2">
                          {project.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="h-4 w-4 text-green-500 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-6 border-t border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Project Resources</h4>
                      <div className="flex justify-center gap-3">
                        <button onClick={() => handleLinkClick(project.githubUrl, project, 'GitHub Repository')} className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${project.githubUrl ? 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg hover:scale-110' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 border-2 border-dashed border-gray-300'}`} title={project.githubUrl ? 'View GitHub Repository' : 'Request Access'}>
                          <Github className="h-4 w-4" />
                        </button>

                        <button 
                          onClick={() => handleLinkClick(project.videoUrl, project, 'Video Demo')} 
                          disabled={!project.videoUrl && !project.architectureImage}
                          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                            project.videoUrl || project.architectureImage
                              ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:scale-110 cursor-pointer'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-dashed border-gray-300'
                          }`} 
                          title={
                            project.videoUrl 
                              ? 'Watch Video Demo' 
                              : project.architectureImage 
                                ? 'View Project Architecture'
                                : 'No Demo or Architecture Available'
                          }
                        >
                          <Play className="h-4 w-4" />
                        </button>

                        <button onClick={() => handleLinkClick(project.paperUrl, project, 'Research Paper')} className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${project.paperUrl ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:scale-110' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 border-2 border-dashed border-gray-300'}`} title={project.paperUrl ? 'Read Research Paper' : 'Paper Not Available'}>
                          <FileText className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gray-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="mx-auto h-24 w-24 text-gray-400 mb-6"><Search className="h-full w-full" /></div>
              <h3 className="text-2xl font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                {activeCategory !== 'all' ? `No projects found in the ${activeCategory} category${searchTerm ? ` matching "${searchTerm}"` : ''}.` : `No projects match your search "${searchTerm}".`}
              </p>
              <div className="flex justify-center gap-4">
                {searchTerm && (<button onClick={() => setSearchTerm('')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Clear Search</button>)}
                {activeCategory !== 'all' && (<button onClick={() => setActiveCategory('all')} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">View All Projects</button>)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-white text-gray-700 px-8 py-4 rounded-full text-sm font-bold mb-8 shadow-xl border border-gray-200 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center">
                <Zap className="inline-block w-5 h-5 mr-3 animate-bounce" />Project Categories<Activity className="inline-block w-5 h-5 ml-3 animate-pulse" />
              </span>
            </span>
            <h2 className="text-5xl font-bold text-gray-900 mb-8"><span className="text-gray-900">Our Project Portfolio</span></h2>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">Explore our projects across different domains and categories.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.filter(c => c.id !== 'all').map((category) => (
              <div key={category.id} className={`group bg-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 text-center transform hover:-translate-y-6 border border-gray-200 hover:border-gray-300 relative overflow-hidden cursor-pointer ${activeCategory === category.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`} onClick={() => setActiveCategory(category.id)}>
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className={`relative bg-gray-100 p-5 rounded-3xl group-hover:scale-125 transition-all duration-500 shadow-lg group-hover:shadow-2xl ${activeCategory === category.id ? 'bg-blue-200' : ''}`}>
                      {category.id === 'Smart Media' && <MessageSquare className="h-8 w-8 text-blue-600 group-hover:animate-pulse" />}
                      {category.id === 'eHealth' && <Heart className="h-8 w-8 text-red-600 group-hover:animate-pulse" />}
                      {category.id === 'eBusiness' && <ShoppingCart className="h-8 w-8 text-purple-600 group-hover:animate-pulse" />}
                      {category.id === 'eDocuments' && <BookOpen className="h-8 w-8 text-green-600 group-hover:animate-pulse" />}
                      {category.id === 'Smart City' && <Building className="h-8 w-8 text-indigo-600 group-hover:animate-pulse" />}
                      {category.id === 'Agro Tech' && <TreePine className="h-8 w-8 text-yellow-600 group-hover:animate-pulse" />}
                    </div>
                  </div>
                  <h3 className={`text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 ${activeCategory === category.id ? 'text-blue-700' : ''}`}>{category.name}</h3>
                  <div className="text-4xl font-bold text-gray-800 mb-3 group-hover:scale-110 transition-all duration-500 group-hover:animate-bounce-once">{projectCounts[category.id]} Projects</div>
                  <button className={`mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-300 ${activeCategory === category.id ? 'bg-blue-200 text-blue-800' : ''}`} onClick={(e) => { e.stopPropagation(); setActiveCategory(category.id); }}>
                    {activeCategory === category.id ? 'Currently Viewing' : 'View Projects'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative py-32 bg-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-20 left-20 w-48 h-48 border-2 border-white/30 rounded-3xl transform rotate-45 animate-spin-slow"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-white/30 transform rotate-12 animate-bounce-slow"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="mb-12">
            <div className="relative inline-block mb-8">
              <Code className="h-20 w-20 text-yellow-400 mx-auto animate-spin-slow" />
              <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
            </div>
            <h2 className="text-5xl font-bold mb-8 relative"><span className="text-white animate-gradient-x">Want to Collaborate?</span></h2>
            <p className="text-2xl mb-16 max-w-4xl mx-auto text-gray-300 leading-relaxed">Interested in our projects or have an idea for collaboration? Get in touch with our team to explore opportunities.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link to="/contact" className="group relative bg-gray-900 text-white px-14 py-6 rounded-2xl font-bold overflow-hidden transition-all duration-500 hover:shadow-3xl hover:shadow-gray-500/25 hover:-translate-y-3 hover:scale-110 transform-gpu border border-gray-700" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
              <span className="relative z-10 flex items-center justify-center text-xl">
                <MessageSquare className="mr-4 h-7 w-7 group-hover:animate-bounce" />Contact Our Team<Sparkles className="ml-4 h-7 w-7 opacity-0 group-hover:opacity-100 animate-twinkle transition-opacity duration-300" />
              </span>
              <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </Link>
            
            <Link to="/publications" className="group relative border-3 border-white/40 text-white px-14 py-6 rounded-2xl font-bold transition-all duration-500 hover:bg-white/10 hover:border-white hover:text-white hover:-translate-y-3 hover:scale-110 backdrop-blur-md overflow-hidden" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
              <span className="relative z-10 flex items-center justify-center text-xl">
                <BookOpen className="mr-4 h-7 w-7 group-hover:animate-pulse" />View Publications<ArrowRight className="ml-4 h-7 w-7 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 33% { transform: translateY(-15px) rotate(1deg); } 66% { transform: translateY(-5px) rotate(-1deg); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
        @keyframes text-glow { 0%, 100% { text-shadow: 0 0 5px currentColor; } 50% { text-shadow: 0 0 20px currentColor, 0 0 30px currentColor; } }
        @keyframes bounce-once { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        
        .bg-300% { background-size: 300% 300%; }
        .animate-gradient-x { animation: gradient-x 4s ease infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-text-glow { animation: text-glow 2s ease-in-out infinite; }
        .animate-bounce-once { animation: bounce-once 0.6s ease-in-out; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }
        .shadow-3xl { box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25); }
        .border-3 { border-width: 3px; }
      `}</style>
    </div>
  );
};

export default ProjectsPage;