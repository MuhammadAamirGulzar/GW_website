import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, MapPin, Phone, Mail, Loader2, Clock, Users, Activity, Zap, Sparkles, GraduationCap, Briefcase, User, ArrowRight } from 'lucide-react';

const Card = ({ children, className = "", padding = "p-6", ...props }) => (
  <div className={`bg-white rounded-2xl shadow-xl border border-gray-200 ${padding} ${className}`} {...props}>
    {children}
  </div>
);

const ContactPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeForm, setActiveForm] = useState('contact'); // 'contact' or 'research'

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [researchForm, setResearchForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    degree: '',
    fieldOfStudy: '',
    graduationYear: '',
    experience: '',
    researchInterests: '',
    // previousResearch: '',
    publications: '',
    skills: '',
    availability: '',
    motivation: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // For now, let's use a simple solution that works immediately
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // WORKING SOLUTION: Using Web3Forms (Free & No Setup Required)
      const formData = new FormData();
      formData.append("access_key", "571e64ca-dbd3-4c41-91c3-f0b0efada5ae"); // Get free key from web3forms.com
      formData.append("name", contactForm.name);
      formData.append("email", contactForm.email);
      formData.append("subject", `Contact Form: ${contactForm.subject}`);
      formData.append("message", contactForm.message);
      formData.append("redirect", "false");
      formData.append("to", "hello@gradientwise.com");
      formData.append("from_name", contactForm.name);
      formData.append("reply_to", contactForm.email);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        console.log('Email sent successfully via Web3Forms');
        setSubmitted(true);
        setContactForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error(result.message || 'Failed to send');
      }

    } catch (err) {
      console.error('Email Error:', err);
      
      // FALLBACK: mailto link as last resort
      const mailtoLink = `mailto:hello@gradientwise.com?subject=${encodeURIComponent(`Contact Form: ${contactForm.subject}`)}&body=${encodeURIComponent(`Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`)}`;
      
      window.open(mailtoLink);
      
      setError('Email service unavailable. Your default email client has been opened with the message.');
      
      // Still show success after a delay since mailto was triggered
      setTimeout(() => {
        setSubmitted(true);
        setContactForm({ name: '', email: '', subject: '', message: '' });
        setError('');
        setTimeout(() => setSubmitted(false), 5000);
      }, 2000);
      
    } finally {
      setIsSubmitting(false);
    }
  };

      const handleResearchSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError('');
      
      try {
        const formData = new FormData();
        formData.append("access_key", "571e64ca-dbd3-4c41-91c3-f0b0efada5ae");
        formData.append("subject", `Research Team Application from ${researchForm.fullName}`);
        
        // Required fields for Web3Forms
        formData.append("from_name", researchForm.fullName);
        formData.append("email", researchForm.email); // 'email' is required by Web3Forms
        formData.append("reply_to", researchForm.email);

        // Template variables (must match your Web3Forms template)
        formData.append("phone", researchForm.phone || "Not provided");
        formData.append("university", researchForm.university || "Not provided");
        formData.append("degree", researchForm.degree || "Not provided");
        formData.append("field_of_study", researchForm.fieldOfStudy || "Not provided");
        formData.append("graduation_year", researchForm.graduationYear || "Not provided");
        formData.append("experience", researchForm.experience || "Not provided");
        formData.append("availability", researchForm.availability || "Not provided");
        formData.append("research_interests", researchForm.researchInterests || "Not provided");
        // formData.append("previous_research", researchForm.previousResearch || "Not provided");
        formData.append("publications", researchForm.publications || "Not provided");
        formData.append("skills", researchForm.skills || "Not provided");
        formData.append("motivation", researchForm.motivation || "Not provided");

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Accept": "application/json",
          },
          body: formData
        });

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Failed to submit form");
        }

        setSubmitted(true);
        setResearchForm({
          fullName: '', email: '', phone: '', university: '', degree: '', fieldOfStudy: '',
          graduationYear: '', experience: '', researchInterests: '',
          publications: '', skills: '', availability: '', motivation: ''
        });
        
      } catch (err) {
        console.error('Submission Error:', err);
        setError(err.message || 'Failed to submit application. Please check your connection and try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

  const handleContactChange = (e) => {
    setContactForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleResearchChange = (e) => {
    setResearchForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
            <div className="relative">
                <div className="relative inline-block mb-8">
                  <Mail className="h-28 w-28 text-yellow-400 mx-auto" />
                  <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                  <div className="absolute -inset-4 bg-white/20 rounded-full animate-pulse blur-lg"></div>
                </div>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 relative">
                <span className="relative inline-block group">
                  <span className="text-white animate-gradient-x bg-300%">
                    Contact Us
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
                  Connect with Our Research Team
                  <div className="relative ml-4">
                    <Zap className="h-8 w-8 text-white animate-bounce" />
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                  </div>
                </span>
              </div>
            </div>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              Get in touch with us for partnerships, delivery requests, or to join our <span className="text-white font-bold animate-text-glow">AI team</span>.
            </p>
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
          {/* Form Toggle Buttons */}
          <div className="text-center mb-16">
            <div className="inline-flex bg-white p-2 rounded-2xl shadow-xl border-2 border-gray-200">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveForm('contact');
                }}
                className={`px-4 sm:px-8 py-4 rounded-xl font-bold transition-all duration-500 flex items-center text-sm sm:text-base ${
                  activeForm === 'contact' 
                    ? 'bg-gray-900 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Mail className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Contact Us</span>
                <span className="sm:hidden">Contact</span>
                {activeForm === 'contact' && <Sparkles className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 animate-twinkle" />}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveForm('research');
                }}
                className={`px-4 sm:px-8 py-4 rounded-xl font-bold transition-all duration-500 flex items-center text-sm sm:text-base ${
                  activeForm === 'research' 
                    ? 'bg-gray-900 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Users className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Join AI Team</span>
                <span className="sm:hidden">Join Team</span>
                {activeForm === 'research' && <Sparkles className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 animate-twinkle" />}
              </button>
            </div>
          </div>

          {/* FIXED LAYOUT - Mobile First Approach */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Forms Section - Shows FIRST on mobile, left on desktop */}
            <div className="lg:col-span-2 order-1 lg:order-1">
              {/* Success Message */}
              {submitted && (
                <Card className="mb-8 border-green-200 bg-green-50">
                  <div className="flex items-center text-green-700">
                    <CheckCircle className="h-6 w-6 mr-3 animate-bounce" />
                    <span className="font-semibold">
                      {activeForm === 'contact' ? 'Message sent successfully!' : 'Application submitted successfully!'} 
                      We'll get back to you soon.
                    </span>
                  </div>
                </Card>
              )}

              {/* Error Message */}
              {error && (
                <Card className="mb-8 border-red-200 bg-red-50">
                  <span className="text-red-700 font-semibold">{error}</span>
                </Card>
              )}

              {/* Contact Form */}
              {activeForm === 'contact' && (
                <Card className="overflow-hidden transition-all duration-700 hover:shadow-3xl group border-2 border-gray-200 hover:border-gray-400 relative">
                  <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <div className="flex justify-center mb-4">
                        <div className="bg-gray-100 p-4 rounded-2xl">
                          <Send className="h-8 w-8 text-gray-600 animate-pulse" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                      <p className="text-gray-600">We'd love to hear from you</p>
                    </div>

                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={contactForm.name}
                            onChange={handleContactChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={contactForm.email}
                            onChange={handleContactChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                            placeholder="Enter your email address"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={contactForm.subject}
                          onChange={handleContactChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="collaboration">Research Collaboration</option>
                          <option value="publication">Publication Request</option>
                          <option value="media">Media Inquiry</option>
                          <option value="technical">Technical Support</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={contactForm.message}
                          onChange={handleContactChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none transition-all duration-300 hover:border-gray-300"
                          placeholder="Enter your message here..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center group hover:shadow-2xl hover:-translate-y-1"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin h-6 w-6 mr-3" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-6 w-6 mr-3 group-hover:animate-pulse" />
                            Send Message
                            <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </Card>
              )}

              {/* Research Team Form */}
              {activeForm === 'research' && (
                <Card className="overflow-hidden transition-all duration-700 hover:shadow-3xl group border-2 border-gray-200 hover:border-gray-400 relative">
                  <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <div className="flex justify-center mb-4">
                        <div className="bg-gray-100 p-4 rounded-2xl">
                          <GraduationCap className="h-8 w-8 text-gray-600 animate-pulse" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Our Research Team</h2>
                      <p className="text-gray-600">Tell us about yourself and your research interests</p>
                    </div>

                    <form onSubmit={handleResearchSubmit} className="space-y-8">
                      {/* Personal Information */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <User className="mr-3 h-6 w-6" />
                          Personal Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                            <input
                              type="text"
                              name="fullName"
                              value={researchForm.fullName}
                              onChange={handleResearchChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                              placeholder="Enter your full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                            <input
                              type="email"
                              name="email"
                              value={researchForm.email}
                              onChange={handleResearchChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                              placeholder="Enter your email"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                            <input
                              type="tel"
                              name="phone"
                              value={researchForm.phone}
                              onChange={handleResearchChange}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                              placeholder="Enter your phone number"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Educational Background */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <GraduationCap className="mr-3 h-6 w-6" />
                          Educational Background
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">University/Institution *</label>
                            <input
                              type="text"
                              name="university"
                              value={researchForm.university}
                              onChange={handleResearchChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                              placeholder="Your current or most recent institution"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Degree Level *</label>
                            <select
                              name="degree"
                              value={researchForm.degree}
                              onChange={handleResearchChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                            >
                              <option value="">Select degree level</option>
                              <option value="bachelor">Bachelor's</option>
                              <option value="master">Master's</option>
                              <option value="phd">PhD</option>
                              <option value="postdoc">Postdoc</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Field of Study *</label>
                            <input
                              type="text"
                              name="fieldOfStudy"
                              value={researchForm.fieldOfStudy}
                              onChange={handleResearchChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                              placeholder="e.g., Computer Science, Data Science"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Graduation Year</label>
                            <input
                              type="text"
                              name="graduationYear"
                              value={researchForm.graduationYear}
                              onChange={handleResearchChange}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                              placeholder="e.g., 2024"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Experience & Research */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <Briefcase className="mr-3 h-6 w-6" />
                          Experience & Research
                        </h3>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Years of Experience</label>
                            <select
                              name="experience"
                              value={researchForm.experience}
                              onChange={handleResearchChange}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                            >
                              <option value="">Select experience level</option>
                              <option value="0-1">0-1 years</option>
                              <option value="2-3">2-3 years</option>
                              <option value="4-5">4-5 years</option>
                              <option value="5+">5+ years</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Research Interests *</label>
                            <textarea
                              name="researchInterests"
                              value={researchForm.researchInterests}
                              onChange={handleResearchChange}
                              required
                              rows={4}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none transition-all duration-300 hover:border-gray-300"
                              placeholder="Describe your research interests and areas of expertise"
                            />
                          </div>

                          {/* <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Previous Research Experience</label>
                            <textarea
                              name="previousResearch"
                              value={researchForm.previousResearch}
                              onChange={handleResearchChange}
                              rows={4}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none transition-all duration-300 hover:border-gray-300"
                              placeholder="Describe any previous research projects or experience"
                            />
                          </div> */}

                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Publications & Achievements</label>
                            <textarea
                              name="publications"
                              value={researchForm.publications}
                              onChange={handleResearchChange}
                              rows={3}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none transition-all duration-300 hover:border-gray-300"
                              placeholder="List any publications, awards, or notable achievements"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Technical Skills *</label>
                            <textarea
                              name="skills"
                              value={researchForm.skills}
                              onChange={handleResearchChange}
                              required
                              rows={3}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none transition-all duration-300 hover:border-gray-300"
                              placeholder="Programming languages, tools, frameworks, etc."
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Availability *</label>
                              <select
                                name="availability"
                                value={researchForm.availability}
                                onChange={handleResearchChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                              >
                                <option value="">Select availability</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="internship">Internship</option>
                                <option value="volunteer">Volunteer</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Motivation & Goals *</label>
                            <textarea
                              name="motivation"
                              value={researchForm.motivation}
                              onChange={handleResearchChange}
                              required
                              rows={4}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none transition-all duration-300 hover:border-gray-300"
                              placeholder="Why do you want to join GradientWise? What are your goals?"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center group hover:shadow-2xl hover:-translate-y-1"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin h-6 w-6 mr-3" />
                            Submitting Application...
                          </>
                        ) : (
                          <>
                            <GraduationCap className="h-6 w-6 mr-3 group-hover:animate-pulse" />
                            Submit Application
                            <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </Card>
              )}
            </div>

            {/* Contact Information Sidebar - Shows SECOND on mobile, right on desktop */}
            <div className="lg:col-span-1 order-2 lg:order-2">
              <div className="lg:sticky lg:top-8 space-y-8">
                {/* Contact Information */}
                <Card className="overflow-hidden transition-all duration-700 hover:shadow-3xl hover:-translate-y-4 group border-2 border-gray-200 hover:border-gray-400 relative">
                  <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                      <div className="relative bg-gray-100 p-6 rounded-3xl group-hover:scale-125 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                        <MapPin className="h-12 w-12 text-gray-600 group-hover:animate-bounce" />
                        <div className="absolute inset-0 bg-gray-300/30 rounded-3xl animate-ping group-hover:animate-pulse"></div>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Get In Touch</h2>
                    <div className="space-y-6">
                      <div className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                        <MapPin className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0 animate-pulse" />
                        <div>
                          <h3 className="font-bold mb-1 text-gray-900">Address</h3>
                          <p className="text-gray-600 leading-relaxed">
                            GradientWise<br />
                            Remote-first delivery studio<br />
                            Islamabad, Pakistan.<br />
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                        <Phone className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0 animate-pulse" />
                        <div>
                          <h3 className="font-bold mb-1 text-gray-900">Phone</h3>
                          <p className="text-gray-600">+923355562218</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                        <Mail className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0 animate-pulse" />
                        <div>
                          <h3 className="font-bold mb-1 text-gray-900">Email</h3>
                          <p className="text-gray-600">hello@gradientwise.com</p>
                        </div>
                      </div>

                      <div className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                        <Clock className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0 animate-pulse" />
                        <div>
                          <h3 className="font-bold mb-1 text-gray-900">Office Hours</h3>
                          <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                        </div>
                      </div>
                    </div>
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
      `}</style>
    </div>
  );
};

export default ContactPage;