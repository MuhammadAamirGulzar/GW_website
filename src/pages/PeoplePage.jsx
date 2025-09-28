import React, { useState, useMemo , useEffect} from 'react';
import { Users, BookOpen, ExternalLink, ChevronDown, ChevronUp, Globe, MapPin, GraduationCap, Star, Award, Building2, User, Mail, ArrowRight, Sparkles, Activity, Brain, Code, Zap, Database, Server, Search, Linkedin, Twitter } from 'lucide-react';
import {Link } from 'react-router-dom';
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
  const peopleData = {
    director: {
      id: 'asif-naeem',
      name: 'Professor M. Asif Naeem',
      title: 'Founder and Director',
      role: 'Founder and Director',
      category: 'Faculty',
      area: 'Data Science, Big Data Management, Data Mining and Machine Learning',
      bio: 'Professor Muhammad Asif Naeem is founder and director of Data Insight Lab at National University FAST, Islamabad. He is also founder of Data Science Research Group (DSRG) at Auckland University of Technology, New Zealand. His research interests include Data Science, Big Data Management, Data Mining and Machine Learning, Active Databases and Data Warehousing. He has published over 100+ research papers in top-tier conferences and journals.',
      shortBio: 'Leading researcher in machine learning and data analytics with over 15 years of experience. Specializes in deep learning applications for...',
      fullBio: 'Professor Muhammad Asif Naeem is founder and director of Data Insight Lab at National University FAST, Islamabad. He is also founder of Data Science Research Group (DSRG) at Auckland University of Technology, New Zealand. His research interests include Data Science, Big Data Management, Data Mining and Machine Learning, Active Databases and Data Warehousing. He has published over 100+ research papers in top-tier conferences and journals.',
      image: '/backup-images/AsifNaeem.jpeg',
      website: 'http://isb.nu.edu.pk/asif/',
      researchAreas: ['Machine Learning', 'Data Analytics', 'AI in Healthcare']
    },
    internationalCollaborators: [
      {
        id: 'dave-parry',
        name: 'Professor Dave Parry',
        title: 'Head of IT, Media and Communications',
        role: 'International Collaborator',
        category: 'Research Staff',
        area: 'Ontologies, Fuzzy Logic, Health Informatics',
        bio: 'Professor Dave Parry PhD, is head of the IT, Media and Communications discipline at Murdoch University, Perth. His research interests include Ontologies and fuzzy logic, Health informatics and computer-based Activity detection in the context of health, wellness and procedural error. He is particularly interested in how machine-learning and knowledge-based approaches can be used to make a difference in clinical outcomes',
        shortBio: 'Head of IT, Media and Communications discipline at Murdoch University, Perth. Expert in ontologies and fuzzy logic...',
        fullBio: 'Professor Dave Parry PhD, is head of the IT, Media and Communications discipline at Murdoch University, Perth. His research interests include Ontologies and fuzzy logic, Health informatics and computer-based Activity detection in the context of health, wellness and procedural error. He is particularly interested in how machine-learning and knowledge-based approaches can be used to make a difference in clinical outcomes',
        image: '/backup-images/DaveDerry.png',
        linkedin: 'https://www.linkedin.com/in/david-parry-he-him-7700b011/?originalSubdomain=nz',
        researchAreas: ['Health Informatics', 'Fuzzy Logic', 'Machine Learning']
      },
      {
        id: 'farhaan-mirza',
        name: 'Dr Farhaan Mirza',
        title: 'Director of Data Science Research Group',
        role: 'International Collaborator',
        category: 'Research Staff',
        area: 'IoT, Mobile Apps, Web Technologies, Big Data',
        bio: 'Dr Farhaan Mirza is director of Data Science Research Group (DSRG) at Auckland University of Technology. He is senior lecturer in the department of IT & Software Engineering at Auckland University of Technology. Farhaan\'s passion is to use Internet of things (IoT), mobile apps, web technologies along with big data to develop applications for public sector development, specifically towards domains of healthcare, transportation, education, and telecommunications',
        shortBio: 'Director of Data Science Research Group at Auckland University of Technology. Expert in IoT and mobile applications...',
        fullBio: 'Dr Farhaan Mirza is director of Data Science Research Group (DSRG) at Auckland University of Technology. He is senior lecturer in the department of IT & Software Engineering at Auckland University of Technology. Farhaan\'s passion is to use Internet of things (IoT), mobile apps, web technologies along with big data to develop applications for public sector development, specifically towards domains of healthcare, transportation, education, and telecommunications',
        image: '/backup-images/FarhaanMirza.png',
        website: 'https://academics.aut.ac.nz/farhaan.mirza/about',
        researchAreas: ['IoT', 'Mobile Applications', 'Big Data']
      },
      {
        id: 'roopak-sinha',
        name: 'Dr Roopak Sinha',
        title: 'Head of Computer Science and Software Engineering',
        role: 'International Collaborator',
        category: 'Research Staff',
        area: 'IoT, Edge Computing, Cyber-Physical Systems',
        bio: 'Dr Roopak Sinha (Ph.D. \'09, MCE \'16, BE (Hons) \'03, SFHEA \'17) is the Head of the Department of Computer Science and Software Engineering at Auckland University of Technology, New Zealand. Roopak\'s primary research interest is \'Systematic, Standards-First Design of Complex, Next-Generation Software\' applied to domains like Internet-of-Things, Edge Computing, Cyber-Physical Systems, Big-Data, Home and Industrial Automation, and Intelligent Transportation Systems.',
        shortBio: 'Head of Computer Science and Software Engineering at Auckland University of Technology. Expert in cyber-physical systems...',
        fullBio: 'Dr Roopak Sinha (Ph.D. \'09, MCE \'16, BE (Hons) \'03, SFHEA \'17) is the Head of the Department of Computer Science and Software Engineering at Auckland University of Technology, New Zealand. Roopak\'s primary research interest is \'Systematic, Standards-First Design of Complex, Next-Generation Software\' applied to domains like Internet-of-Things, Edge Computing, Cyber-Physical Systems, Big-Data, Home and Industrial Automation, and Intelligent Transportation Systems.',
        image: '/backup-images/RoopakSinha.png',
        website: 'https://academics.aut.ac.nz/roopak.sinha',
        researchAreas: ['Cyber-Physical Systems', 'Edge Computing', 'IoT']
      },
      {
        id: 'gerald-weber',
        name: 'Dr Gerald Weber',
        title: 'Senior Lecturer',
        role: 'International Collaborator',
        category: 'Research Staff',
        area: 'Database Systems, Form-Oriented Analysis',
        bio: 'Dr Gerald Weber is Senior Lecturer in the Department of Computer Science at The University of Auckland. He joined The University of Auckland in 2003. Gerald holds a PhD from the FU Berlin. He is information director of the Proceedings of the VLDB Endowment, and he has been program chair of several conferences. He is co-author of the book "Form-Oriented Analysis", and of over 40 peer-reviewed publications.',
        shortBio: 'Senior Lecturer at University of Auckland. Co-author of "Form-Oriented Analysis" with 40+ peer-reviewed publications...',
        fullBio: 'Dr Gerald Weber is Senior Lecturer in the Department of Computer Science at The University of Auckland. He joined The University of Auckland in 2003. Gerald holds a PhD from the FU Berlin. He is information director of the Proceedings of the VLDB Endowment, and he has been program chair of several conferences. He is co-author of the book "Form-Oriented Analysis", and of over 40 peer-reviewed publications.',
        image: '/backup-images/Gerald.png',
        website: 'https://unidirectory.auckland.ac.nz/profile/g-weber',
        researchAreas: ['Database Systems', 'Information Systems', 'Data Management']
      }
    ],
    localCollaborators: [
      {
        id: 'ali-tahir',
        name: 'Dr Ali Tahir',
        title: 'Assistant Professor',
        role: 'Local Collaborator',
        category: 'Research Staff',
        area: 'Geoinformatics, Geo-visualisation, Web GIS',
        bio: 'Dr Ali did his PhD in Geoinformatics from the School of Computer Science and Informatics at University College Dublin, Ireland. His research activities include implicit feedback analysis, Geo-visualisation, and Web GIS. Currently he is serving as an Assistant Professor at IGIS-NUST and also heading GIS Mobility Lab as part of NUST Interdisciplinary Cluster for Higher Education (NICHE).',
        shortBio: 'Assistant Professor at IGIS-NUST, heading GIS Mobility Lab. Expert in geoinformatics and web GIS...',
        fullBio: 'Dr Ali did his PhD in Geoinformatics from the School of Computer Science and Informatics at University College Dublin, Ireland. His research activities include implicit feedback analysis, Geo-visualisation, and Web GIS. Currently he is serving as an Assistant Professor at IGIS-NUST and also heading GIS Mobility Lab as part of NUST Interdisciplinary Cluster for Higher Education (NICHE).',
        image: '/backup-images/Ali.jpg',
        website: 'https://igis.nust.edu.pk/faculty/muhammad-ali-tahir/',
        researchAreas: ['Geoinformatics', 'Web GIS', 'Geo-visualization']
      },

            {
        "id": "amir-gulzar",
        "name": "Amir Gulzar",
        "title": "Lecturer and Machine Learning Engineer ",
        "role": "Industry Collaborator",
        "category": "Faculty",
        "area": "Machine Learning, Data Engineering, Generative AI",
        "bio": "Amir Gulzar holds a Master's in Computer Science and has expertise in machine learning, data engineering, analytics, and Generative AI. He has accumulated over one and a half years of teaching experience and is currently working as a Machine Learning Engineer at Skyline Systems in Islamabad. Amir is also an Instructor at FAST-NUCES Islamabad, where he contributes his academic and industry knowledge to bridge theory and practice. His professional journey is characterized by a strong commitment to excellence, a collaborative mindset, and an ever-growing curiosity to explore the transformative power of technology.",
        "shortBio": "Machine Learning Engineer at Skyline Systems, former Instructor at FAST-NUCES Islamabad. Expert in machine learning, data engineering, and Generative AI.",
        "fullBio": "Amir Gulzar holds a Master's in Computer Science and has expertise in machine learning, data engineering, analytics, and Generative AI. With over one and a half years of teaching experience, he has served as an Instructor at FAST-NUCES Islamabad from Jan 2022 to Jul 2023. Currently, he works as a Machine Learning Engineer at Skyline Systems Islamabad from Aug 2023 to Jan 2024. Amir's academic and industry experience enables him to effectively combine theoretical knowledge with practical application in the tech industry. He is passionate about making significant contributions to innovative and technology-driven environments.",
        "image": "/backup-images/Amir_Gulzar.jpg",
        "website": "https://www.linkedin.com/in/m-aamir-gulzar/",
        "researchAreas": ["Machine Learning", "Data Engineering", "Generative AI"]
      },
      {
        id: 'omer-gilani',
        name: 'Dr Syed Omer Gilani',
        title: 'Associate Professor and Head of Biomedical Engineering',
        role: 'Local Collaborator',
        category: 'Research Staff',
        area: 'Computer Vision, Medical Signal Analysis, Machine Learning',
        bio: 'Dr. Gilani is a tenured Associate Professor and Head of the Department at Biomedical Engineering and Sciences in NUST. He has generated over 4 MPKR in consultancy and has research funding of over 10 MPKR, including one HEC NRPU project. He has published over 100 research papers, 4 book chapters, and 1 US patent and has H-index of 18. His research interests include computer vision, medical signal and image analysis, machine learning, computer graphics, control systems, and electronics.',
        shortBio: 'Associate Professor and Head of Biomedical Engineering at NUST. Expert in computer vision and medical signal analysis...',
        fullBio: 'Dr. Gilani is a tenured Associate Professor and Head of the Department at Biomedical Engineering and Sciences in NUST. He has generated over 4 MPKR in consultancy and has research funding of over 10 MPKR, including one HEC NRPU project. He has published over 100 research papers, 4 book chapters, and 1 US patent and has H-index of 18. His research interests include computer vision, medical signal and image analysis, machine learning, computer graphics, control systems, and electronics.',
        image: '/backup-images/Omer.jpg',
        website: 'https://smme.nust.edu.pk/faculty/syed-omer-gilani/',
        researchAreas: ['Computer Vision', 'Medical Image Analysis', 'Machine Learning']
      }
    ],
    internationalStudents: [
      {
        id: 'benjamin-denham',
        name: 'Benjamin Denham',
        title: 'PhD Candidate',
        role: 'International Student',
        category: 'Graduate Students',
        area: 'Machine Learning, Natural Language Processing',
        bio: 'Benjamin is a PhD candidate at the AUT undertaking industry-based research into machine learning methods that leverage domain expertise to compensate for imperfect training datasets. His research interests include natural language processing, interpretable models, weak supervision, and machine learning with small or otherwise limited datasets. Benjamin\'s background is in software engineering, with 10 years of industry experience in web application development.',
        shortBio: 'PhD candidate at AUT researching machine learning methods that leverage domain expertise. 10 years of software engineering experience...',
        fullBio: 'Benjamin is a PhD candidate at the AUT undertaking industry-based research into machine learning methods that leverage domain expertise to compensate for imperfect training datasets. His research interests include natural language processing, interpretable models, weak supervision, and machine learning with small or otherwise limited datasets. Benjamin\'s background is in software engineering, with 10 years of industry experience in web application development.',
        image: '/backup-images/Bejamin.png',
        researchAreas: ['Natural Language Processing', 'Interpretable Models', 'Weak Supervision']
      },
      {
        id: 'waruni-hewage',
        name: 'Waruni Hewage',
        title: 'PhD Student',
        role: 'International Student',
        category: 'Graduate Students',
        area: 'Privacy-Preserving Data Analytics',
        bio: 'Waruni Hewage is a PhD student at the Auckland University of Technology. She is working on topic "Balancing the accuracy of data and people\'s right to privacy" under the supervision of Associate Professor Roopak Sinha, Professor Edmund Lai and Professor Muhammad Asif Naeem. The primary goal of her research is to generate a framework to optimise the trade-off between privacy and accuracy to help users achieve good accuracy while maintaining the privacy of the data.',
        shortBio: 'PhD student at Auckland University of Technology working on balancing data accuracy and privacy rights...',
        fullBio: 'Waruni Hewage is a PhD student at the Auckland University of Technology. She is working on topic "Balancing the accuracy of data and people\'s right to privacy" under the supervision of Associate Professor Roopak Sinha, Professor Edmund Lai and Professor Muhammad Asif Naeem. The primary goal of her research is to generate a framework to optimise the trade-off between privacy and accuracy to help users achieve good accuracy while maintaining the privacy of the data.',
        image: '/backup-images/Waruni.png',
        researchAreas: ['Privacy-Preserving Analytics', 'Data Accuracy', 'Privacy Frameworks']
      },
      {
        id: 'darsha-jayamini',
        name: 'Darsha Jayamini',
        title: 'PhD Student',
        role: 'International Student',
        category: 'Graduate Students',
        area: 'Computer Science Research',
        bio: 'Darsha Jayamini is a PhD student at the Auckland University of Technology, New Zealand. She earned her bachelor\'s degree specialized in Computer Science with a first class from the University of Kelaniya, Sri Lanka. She is also working as a Lecturer (Probationary) in the Department of Software Engineering, Faculty of Computing ad Technology, University of Kelaniya, Sri Lanka. Becoming an outstanding researcher and academic is her goal.',
        shortBio: 'PhD student at Auckland University of Technology and Lecturer at University of Kelaniya, Sri Lanka...',
        fullBio: 'Darsha Jayamini is a PhD student at the Auckland University of Technology, New Zealand. She earned her bachelor\'s degree specialized in Computer Science with a first class from the University of Kelaniya, Sri Lanka. She is also working as a Lecturer (Probationary) in the Department of Software Engineering, Faculty of Computing ad Technology, University of Kelaniya, Sri Lanka. Becoming an outstanding researcher and academic is her goal.',
        image: '/backup-images/Darsha.png',
        researchAreas: ['Software Engineering', 'Computer Science', 'Academic Research']
      },
      {
        id: 'rashi-bhalla',
        name: 'Rashi Bhalla',
        title: 'PhD Student',
        role: 'International Student',
        category: 'Graduate Students',
        area: 'Distributed Data Stream Mining, Data Mining',
        bio: 'Rashi is a PhD student at the Auckland University of Technology, New Zealand. She is specializing in distributed data stream mining and is working towards building a prediction model for Asthma. Her interests are in Data Mining and Machine Learning.',
        shortBio: 'PhD student at Auckland University of Technology specializing in distributed data stream mining for asthma prediction...',
        fullBio: 'Rashi is a PhD student at the Auckland University of Technology, New Zealand. She is specializing in distributed data stream mining and is working towards building a prediction model for Asthma. Her interests are in Data Mining and Machine Learning.',
        image: '/backup-images/Rashi.png',
        researchAreas: ['Data Stream Mining', 'Medical Prediction Models', 'Machine Learning']
      }
    ],
    localStudents: [
      {
        id: 'waheed-ashraf',
        name: 'Waheed Ashraf',
        title: 'PhD Scholar',
        role: 'Local Student',
        category: 'Graduate Students',
        area: 'Data Mining, Machine Learning, Computer Vision',
        bio: 'Muhammad Waheed Ashraf is a PhD scholar at National University of Computer and Emerging Sciences (NUCES), Islamabad. He has worked as Research Assistant on a project "Deep Basket Analysis" where he developed his expertise in the areas of Data Mining, Machine Learning, and Computer vision. He has good expertise and understanding of domain knowledge required in this project.',
        shortBio: 'PhD scholar at NUCES-FAST with expertise in data mining, machine learning, and computer vision...',
        fullBio: 'Muhammad Waheed Ashraf is a PhD scholar at National University of Computer and Emerging Sciences (NUCES), Islamabad. He has worked as Research Assistant on a project "Deep Basket Analysis" where he developed his expertise in the areas of Data Mining, Machine Learning, and Computer vision. He has good expertise and understanding of domain knowledge required in this project.',
        image: '/backup-images/Waheed.png',
        researchAreas: ['Data Mining', 'Computer Vision', 'Deep Learning']
      }
    ]
  };

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
      <div className="relative bg-slate-800 text-white overflow-hidden min-h-screen flex items-center">
  {/* Animated floating elements */}
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
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, transparent 70%)`,
        }}
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
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-full text-xs font-bold mb-6 shadow-sm border border-gray-200">
              <span className="flex items-center">
                <Award className="inline-block w-4 h-4 mr-2 text-gray-600" />
                Leadership
              </span>
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Lab Director</h2>
            <div className="w-24 h-1 bg-gray-800 mx-auto rounded-full"></div>
          </div>

          <div className="flex justify-center">
            <div className="max-w-md w-full">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300 text-center transform hover:-translate-y-1">
                {/* Image Section */}
                <div className="relative pt-6 px-6">
                  <div className="relative mx-auto w-48 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={peopleData.director.image}
                      alt={peopleData.director.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/fallback.png'; // fallback image if needed
                      }}
                    />
                  </div>
                </div>


                {/* Content Section */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {peopleData.director.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {peopleData.director.title}
                    </p>
                  </div>

                  {/* Research Areas */}
                  <div className="mb-4">
                    <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                      {peopleData.director.researchAreas.slice(0, 3).map((area, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium border border-gray-200 hover:bg-gray-200 transition-all duration-200"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {expandedBios[peopleData.director.id] ? peopleData.director.fullBio : peopleData.director.shortBio}
                    </p>
                    <button
                      onClick={() => toggleBio(peopleData.director.id)}
                      className="mt-2 text-gray-700 hover:text-gray-900 font-medium text-xs flex items-center justify-center transition-colors duration-200 mx-auto"
                    >
                      {expandedBios[peopleData.director.id] ? (
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

                  {/* Website Link */}
                  <div className="pt-4 border-t border-gray-100">
                    <a
                      href={peopleData.director.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium text-sm transition-all duration-200"
                    >
                      <Globe className="h-4 w-4 mr-1" />
                      Visit Website
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
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

            {/* Explore Research button */}
            <Link
              to="/research"
              className="group relative border-2 border-white/40 text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:bg-white/10 hover:border-white hover:text-white hover:-translate-y-1 backdrop-blur-md overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                <BookOpen className="mr-3 h-5 w-5 group-hover:animate-pulse" />
                Explore Research
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