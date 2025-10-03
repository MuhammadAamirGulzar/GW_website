import { BookOpen,Heart, MessageSquare,  ShoppingCart, TreePine, Building,CarIcon, UserCircle,FileText } from 'lucide-react';

const projects = [
    // Priority 1: Projects with 3 links (githubUrl + videoUrl + architectureImage)
    {
      id: 1,
      title: "AI Companion",
      description: "An AI-powered companion that answers questions and engages in conversations.",
      category: "eBusiness",
      technologies: ["NLP", "ML", "Chatbots"],
      features: [
        "Engages in natural language conversations",
        "Provides the best relevant answers",
        "Learns and adapts on user interactions"
      ],
      icon: <ShoppingCart className="h-8 w-8 text-green-600" />,
      logo: "/logos/ai-companion.jpg",
      githubUrl: "https://github.com/MuhammadAamirGulzar/Funny_AI_Companion",
      videoUrl:"/videos/ai-companion.mp4",
      paperUrl: null,
      architectureImage: null
    },

    {
      id: 2,
      title: "VocalCraft-AI",
      description: "Generates editable promotional pamphlets through voice commands.",
      category: "eBusiness",
      technologies: ["Voice AI", "Text Generation", "Image Processing"],
      features: [
        "Creates editable pamphlets via voice",
        "Boosts marketing efficiency",
        "Easy and fast content generation"
      ],
      icon: <ShoppingCart className="h-8 w-8 text-green-600" />,
      logo: "/logos/vocalcraft-ai.jpg",
      githubUrl: "https://github.com/MuhammadAamirGulzar/Video_Ad_Generation",
      videoUrl: "/videos/vocalcraft.mp4",
      paperUrl: null,
      architectureImage: null
    },

    {
      id: 3,
      title: "VoxAI",
      description: "An AI-powered platform that converts voice commands into SQL queries with a modern web interface.",
      category: "eBusiness",
      technologies: ["Voice Recognition", "Text-to-SQL", "React"],
      features: [
        "Convert spoken commands to text using OpenAI Whisper",
        "Transform natural language into SQL queries",
        "Intelligent chat capabilities using local LLM models"
      ],
      icon: <ShoppingCart className="h-8 w-8 text-green-600" />,
      logo: "/logos/voxai.jpg",
      githubUrl: "https://github.com/MuhammadAamirGulzar/Voice_SQL_Bot",
      videoUrl: "/videos/voxai.mp4",
      paperUrl: null,
      architectureImage: null
    },

    {
      id: 4,
      title: "RAG Document Q&A System",
      description: "A Retrieval-Augmented Generation (RAG) system for document question answering and summarization.",
      category: "eDocuments",
      technologies: ["Streamlit", "ChromaDB", "Llama"],
      features: [
        "Ask questions about your documents and get accurate answers with source attribution",
        "Generate comprehensive summaries of uploaded documents",
        "Process PDF, DOCX, Excel (XLSX/XLS), and CSV files"
      ],
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      logo: "/logos/rag-qna.jpg",
      githubUrl: "https://github.com/MuhammadAamirGulzar/DrX_RAG_App",
      videoUrl: "/videos/documentqa.mp4",
      paperUrl: null,
      architectureImage: null
    },

    // Priority 2: Projects with 2 links
    {
      id: 5,
      title: "DiagnoSysAI",
      description: "Healthcare tool that identifies possible diseases based on symptoms and recommends relevant tests.",
      category: "eHealth",
      technologies: ["Machine Learning", "Healthcare"],
      features: [
        "Faster screening in clinics with improved results",
        "Suggestions for telehealth diagnostic procedures",
        "Reduces all types of unnecessary Medical Tests"
      ],
      icon: <Heart className="h-8 w-8 text-red-600" />,
      logo: "/logos/diagnosys-ai.jpg",
      githubUrl: null,
      videoUrl: "/videos/DiagnoSysAI.mp4",
      paperUrl: null,
      architectureImage: "/architectures/diagnosysai.png"
    },

    {
      id: 6,
      title: "Visual Search Platform",
      description: "A shopping platform that uses images instead of text for product searches, making online browsing more intuitive.",
      category: "eBusiness",
      technologies: ["Computer Vision", "Machine Learning"],
      features: [
        "Customers can upload a photo to find matching or similar products",
        "Reduces language barriers for international shoppers",
        "Creates an inclusive online retail environment"
      ],
      icon: <ShoppingCart className="h-8 w-8 text-green-600" />,
      logo: "/logos/visual-search.jpg",
      githubUrl: null,
      videoUrl: "/videos/visualsearchplatform.mp4",
      paperUrl: null,
      architectureImage:  "/architectures/visualsearchplatform.png"
    },

    {
      id: 7,
      title: "Sales Outreach Bot",
      description: "Conversational AI that engages prospects, identifies high-potential leads, handles inquiries, and books meetings.",
      category: "eBusiness",
      technologies: ["NLP", "Conversational AI"],
      features: [
        "Handles high-volume, repetitive outreach",
        "Automates the all initial sales funnel stages",
        "Increases and improves sales productivity overall"
      ],
      icon: <ShoppingCart className="h-8 w-8 text-purple-600" />,
      logo: "/logos/sales-bot.jpg",
      githubUrl: null,
      videoUrl: "/videos/salesoutreachbot.mp4",
      paperUrl: null,
      architectureImage: "/architectures/salesoutreachbot.png"
    },

    {
      id: 8,
      title: "ClickFix",
      description: "Mobile app that identifies defective items from photos and suggests suitable local repair services.",
      category: "Smart City",
      technologies: ["Computer Vision", "Location Services"],
      features: [
        "Quickly locate repair services",
        "Service providers understand problems",
        "Simplifies repair process"
      ],
      icon: <Building className="h-8 w-8 text-gray-600" />,
      logo: "/logos/clickfix.jpg",
      githubUrl: null,
      videoUrl: "/videos/ClickFix.mp4",
      paperUrl: null,
      architectureImage: "/architectures/clickfix.png"
    },

    {
      id: 9,
      title: "ImageMart",
      description: "Visual search system that finds products by image, optimizing shopping experience.",
      category: "eBusiness",
      technologies: ["Visual Search", "AI", "Computer Vision"],
      features: [
        "Optimizes shopping experience based on experience",
        "Accurate, fast product discovery",
        "Reduces scrolling time"
      ],
      icon: <ShoppingCart className="h-8 w-8 text-teal-600" />,
      logo: "/logos/imagemart.jpg",
      githubUrl: null,
      videoUrl: "/videos/ImageMart.mp4",
      paperUrl: null,
      architectureImage: "/architectures/ImageMart.jpg"
    },

    {
      id: 10,
      title: "GoDutch",
      description: "A ride-sharing application that enables multiple users to share rides, analyze traffic patterns, and optimize pickup and dropoff points with smart visualizations.",
      category: "Smart City",
      technologies: ["Pattern Mining", "Looker Studio", "Chatbots", "Smart Replies"],
      features: [
        "Multiple users can share a ride",
        "Traffic pickup and dropoff analysis",
        "Pattern mining for traffic insights",
        "Interactive visualizations using Looker Studio",
        "Smart replies and chatbot assistance",
        "Updated, user-friendly UI",
        "Testing and deployment workflow"
      ],
      icon: <CarIcon className="h-8 w-8 text-orange-600" />,
      logo: "/logos/godutch.png",
      githubUrl: null,
      videoUrl: "/videos/GoDutchDemo.mp4",
      paperUrl: null,
      architectureImage: "/architectures/godutch.png"
    },

    {
      id: 11,
      title: "Personix",
      description: "An Android application for creating realistic 3D avatars from user photos, enabling facial customization, live animation, expressive text-to-speech, and content generation such as GIFs, stickers, and videos with cloud synchronization.",
      category: "Smart Media",
      technologies: [
        "Voice Operated Character Animation (VOCA)",
        "Facenet_PyTorch",
        "Text-to-Speech (TTS)",
      ],
      features: [
        "Generate 3D avatars from user photos using advanced facial recognition",
        "Avatar customization with skin tone, hairstyles, and facial features",
        "Real-time facial animation and expression tracking",
        "Text-to-speech integration with sentiment analysis",
        "Voice customization with lip synchronization",
      ],
      icon: <UserCircle className="h-8 w-8 text-orange-600" />,
      logo: "/logos/Personix.png",
      githubUrl: null,
      videoUrl: "/videos/Personics.mp4",
      paperUrl: null,
      architectureImage: "/architectures/personics.png"
    },

    // Priority 3: Projects with 1 link
    {
      id: 12,
      title: "BiL-FaND",
      description: "Ensemble-based system detecting fake news in English and Urdu through text, data, and multimedia analysis.",
      category: "Smart Media",
      technologies: [
        "Multilingual BERT",
        "LSTM",
        "ResNet-101",
        "GRU",
        "BLEU Scoring"
      ],
      features: [
        "Textual analysis layer using Multilingual BERT achieving 87% accuracy",
        "Categorical data processing with LSTM achieving 97% accuracy",
        "Numerical data processing with LSTM achieving 94% accuracy",
        "Multimedia caption generation using ResNet-101",
        "Overall system accuracy of 92.07% in bilingual fake news detection"
      ],
      icon: <MessageSquare className="h-8 w-8 text-orange-600" />,
      logo: "/logos/bill-frind.jpg",
      githubUrl: null,
      videoUrl: null,
      paperUrl: "https://link.springer.com/article/10.1007/s13042-024-02128-0",
      architectureImage: null
    },

    {
      id: 13,
      title: "Asthma Prediction",
      description: "Early detection of worsening asthma aims to predict daily asthma related ED visits and admissions.",
      category: "eHealth",
      technologies: ["Machine Learning", "Healthcare Analytics"],
      features: [
        "Predicts adverse impact of social factors like overcrowding",
        "Helps health providers take proactive measures",
        "Improves asthma outcomes through early intervention"
      ],
      icon: <Heart className="h-8 w-8 text-red-600" />,
      logo: "/logos/asthma-prediction.jpg",
      githubUrl: null,
      videoUrl: null,
      paperUrl: "https://pubmed.ncbi.nlm.nih.gov/38739297/",
      architectureImage: null
    },

    {
      id: 14,
      title: "Smart Shopping",
      description: "Enables brick and mortar retailers to track customer interests to better compete with online retail.",
      category: "eBusiness",
      technologies: ["Computer Vision", "Behavioral Analytics"],
      features: [
        "Provides unprecedented insight into customer behavior",
        "Helps and enhance optimize sales processes",
        "Improves in-store shopping experience overall"
      ],
      icon: <ShoppingCart className="h-8 w-8 text-green-600" />,
      logo: "/logos/smart-shopping.jpg",
      githubUrl: null,
      videoUrl: null,
      paperUrl: "https://dsrc.aut.ac.nz/our-research/research-projects/smart-shopping",
      architectureImage: null
    },

    {
      id: 15,
      title: "Forensic Intelligence",
      description: "Analyzes forensic casework data to identify patterns in forensic science conducted.",
      category: "Smart City",
      technologies: ["Data Analytics", "Pattern Recognition"],
      features: [
        "Improves crime prevention",
        "Supports recovery from crime",
        "Enhances forensic effectiveness"
      ],
      icon: <Building className="h-8 w-8 text-gray-600" />,
      logo: "/logos/forensic-intel.jpg",
      githubUrl: null,
      videoUrl: null,
      paperUrl: "https://dsrc.aut.ac.nz/our-research/research-projects/forensic-intelligence",
      architectureImage: null
    },

    {
      id: 16,
      title: "User Interest Forecasting",
      description: "Identifies and predicts user interests over time using LDA, BERT, and ARIMA.",
      category: "eBusiness",
      technologies: ["Topic Modeling", "Time Series Forecasting"],
      features: [
        "Forecasts user interest using social data",
        "Topic modeling via LDA",
        "Interest-level prediction using ARIMA"
      ],
      icon: <ShoppingCart className="h-8 w-8 text-green-600" />,
      logo: "/logos/user-interest.jpg",
      githubUrl: null,
      videoUrl: null,
      paperUrl: "https://ieeexplore.ieee.org/abstract/document/9972955",
      architectureImage: null
    },

    {
      id: 17,
      title: "Saraiki Language Word Prediction",
      description: "Predicts next words in Saraiki using Word2Vec and Roberta language models.",
      category: "eDocuments",
      technologies: ["NLP", "Word Embeddings"],
      features: [
        "Supports regional language NLP",
        "Evaluates context-based word similarity",
        "Compares multiple embedding techniques"
      ],
      icon: <BookOpen className="h-8 w-8 text-yellow-600" />,
      logo: "/logos/saraiki-prediction.jpg",
      githubUrl: null,
      videoUrl: null,
      paperUrl: "https://ieeexplore.ieee.org/abstract/document/9972938",
      architectureImage: null
    },

    {
      id: 18,
      title: "Skin Lesion Classification",
      description: "Classifies skin lesions using CNNs and feature reduction with 95.8% accuracy.",
      category: "eHealth",
      technologies: ["CNN", "Skin Cancer Detection"],
      features: [
        "Handles class imbalance in skin datasets",
        "Combines DarkNet and Inception V3",
        "Feature reduction with Moth Flame Optimization"
      ],
      icon: <Heart className="h-8 w-8 text-pink-600" />,
      logo: "/logos/skin-lesion.jpg",
      githubUrl: null,
      videoUrl: null,
      paperUrl: "https://www.mdpi.com/1424-8220/22/21/8311",
      architectureImage: null
    },

    {
      id: 19,
      title: "CancerDetection",
      description: "Task-Specific Fine-Tuning via Bottleneck for Weakly-Supervised Pathology Whole Slide Image Classification.",
      category: "eHealth",
      technologies: ["PyTorch", "OpenSlide", "NVIDIA DALI", "DL"],
      features: [
        "Weakly-supervised pathology classification using variational information bottleneck.",
        "Top-k patch extraction",
        "End-to-end training pipeline for whole image classification with deep learning."
      ],
      icon: <Heart className="h-8 w-8 text-red-600" />,
      logo: "/logos/cancer-detection.jpg",
      githubUrl: "https://github.com/MuhammadAamirGulzar/CancerDetection_VIB-Pipeline",
      videoUrl: null,
      paperUrl: "https://openaccess.thecvf.com/content/CVPR2023/html/Li_Task-Specific_Fine-Tuning_via_Variational_Information_Bottleneck_for_Weakly-Supervised_Pathology_Whole_CVPR_2023_paper.html",
      architectureImage: null
    },

    {
    id: 20,
    title: "DocuSense",
    description: "An AI-powered document analysis system that automatically categorizes, tags, and extracts key information from documents for faster and more efficient retrieval. It streamlines document management, improves search accuracy, and minimizes manual effort in handling large volumes of files.",
    category: "eDocuments",
    technologies: ["NLP", "Document Analysis"],
    features: [
      "Automated document organization",
      "Intelligent search capabilities",
      "Reduces manual document handling",
      "Extracts key data fields from documents",
      "Supports multiple file formats (PDF, Word, Images)",
 
      "Provides advanced filtering and sorting options"
    ],
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      logo: "/logos/docusense.jpg",
      githubUrl: null,
      videoUrl: null,
      paperUrl: null,
      architectureImage: "/architectures/docusense.png"
    },

    {
      id: 21,
      title: "GAN Story-to-Image Generator",
      description: "Generates cover images from text stories using Layout Guided GAN.",
      category: "eDocuments",
      technologies: ["GAN", "Text-to-Image"],
      features: [
        "Creates images based on text layout",
        "Enhances storybook illustration automation",
        "Supports multiple characters in image"
      ],
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      logo: "/logos/gan-cover.jpg",
      githubUrl: null,
      videoUrl: null,
      paperUrl: "https://www.researchgate.net/publication/388649019_CoverGAN_cover_photo_generation_from_text_story_using_layout_guided_GAN",
      architectureImage: "/architectures/covergan.png"
    },

    {
      id: 22,
      title: "AI Product Video Generator Platform",
      description: "A full-stack web application that automates the creation of promotional product videos from any e-commerce product URL.",
      category: "eBusiness",
      technologies: [
        "React",
        "Zustand",
        "React Router",
        "Python",
        "BeautifulSoup",
        "Playwright",
        "Mistral LLM",
        "MoviePy",
        "Kokoro TTS"
      ],
      features: [
        "Responsive and intuitive frontend built with React, Zustand, and React Router",
        "Automated scraping of static and dynamic product data ",
        "AI-powered script generation using Mistral LLM",
        "Professional video creation with MoviePy including image transitions and avatars"
      ],
      icon: <ShoppingCart className="h-8 w-8 text-green-600" />,
      logo: "/logos/ai-product-video-generator.png",
      githubUrl: null,
      videoUrl: "/videos/aiproductgenerator.mp4",
      paperUrl: null,
      architectureImage: null
    },

    {
      id: 23,
      title: "Polyglot Interpreter",
      description: "Multilingual extractor for handwritten hotel feedback forms that automates detection and digitization of bilingual handwritten text (Urdu and English), checkboxes, and semi-structured inputs.",
      category: "eDocuments",
      technologies: [
        "Computer Vision",
        "OCR",
        "YOLO",
        "Segmentation",
        "NLP"
      ],
      features: [
        "Automates extraction of handwritten multilingual feedback forms",
        "Handles heterogeneous elements like checkboxes, radio buttons, tick boxes, and ratings",
        "Novel dataset annotations with nested bounding boxes",
        "Lightweight Urdu OCR model (600k parameters, 6MB size)",
        "Provides performance analysis and visualized insights"
      ],
      icon: <FileText className="h-8 w-8 text-green-600" />,
      logo: "/logos/polyglot.png",
      githubUrl: null,
      videoUrl: null,
      paperUrl: null,
      architectureImage: "/architectures/polyglote.png"
    },

    // Priority 4: Projects with 0 links
    {
    id: 24,
    title: "Content Filtering System",
    description: "An advanced AI-based solution that transcribes video audio to detect sensitive keywords and leverages computer vision to identify, flag, or blur explicit visuals. It enhances content moderation by providing real-time screening, ensuring a safer and more responsible online environment.",
    category: "Smart Media",
    technologies: ["NLP", "Computer Vision"],
    features: [
      "Automatic screening of user-generated content",
      "Creates safer online environment",
      "Improves content moderation efficiency",
      "Real-time detection of explicit visuals",
      "Customizable keyword and content filters",
      "Automated flagging and reporting for moderators",
      "Scalable to handle large volumes of media"
    ],
      icon: <MessageSquare className="h-8 w-8 text-orange-600" />,
      logo: "/logos/content-filtering.jpg",
      githubUrl: null,
      videoUrl: null,
      paperUrl: null,
      architectureImage: null
    },

    {
  id: 25,
  title: "Social Insights",
  description: "A data-driven platform that analyzes social media trends and user engagement patterns to deliver actionable insights. By leveraging advanced analytics and machine learning, it helps businesses understand audience behavior, optimize content strategies, and predict future engagement trends.",
  category: "Smart Media",
  technologies: ["Data Analytics", "Machine Learning"],
  features: [
    "Real-time trend analysis",
    "Audience engagement metrics",
    "Content performance and predictions against social accounts",
    "Identifies emerging topics and influencers",
    "Provides sentiment analysis on brand mentions",
  ],
      icon: <MessageSquare className="h-8 w-8 text-orange-600" />,
      logo: "/logos/social-insights.jpg",
      githubUrl: null,
      videoUrl: null,
      paperUrl: null,
      architectureImage: null
    },

    {
  id: 26,
  title: "Heart Failure Prediction",
  description: "An advanced healthcare solution that uses machine learning to analyze echocardiogram images and ECG data, enabling early detection of heart failure risks. By identifying subtle patterns often missed by manual review.",
  category: "eHealth",
  technologies: ["Machine Learning", "Medical Imaging"],
  features: [
    "Proactive and personalized treatment",
    "Earlier, more accurate diagnosis",
    "Improves patient outcomes through early intervention",
    "Integrates multimodal data (ECG, imaging, patient history)",
    "Provides risk scores for clinical decision support",
    "Facilitates remote monitoring and follow-ups",

  ],

      icon: <Heart className="h-8 w-8 text-red-600" />,
      logo: "/logos/heart-failure.jpg",
      githubUrl: null,
      videoUrl: "/videos/Ecg.mp4",
      paperUrl: null,
      architectureImage: null
    },

    {
    id: 27,
    title: "Contract Insight",
    description: "An AI-powered platform that analyzes legal contracts to extract key clauses, highlight potential risks, and provide concise summaries. By leveraging advanced NLP techniques.",
    category: "eDocuments",
    technologies: ["NLP", "Legal Tech"],
    features: [
      "Speeds up contract review process",
      "Identifies potential legal risks",
      "Summarizes key contract terms",
      "Highlights non-compliance or unusual clauses",
      "Provides clause comparison across multiple contracts",

    ],
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      logo: "/logos/contract-insight.jpg",
      githubUrl: null,
      videoUrl: null,
      paperUrl: null,
      architectureImage: null
    },

    {
      id: 28,
      title: "Similar Crimes Identifier",
      description: "Finds similarities between crimes using AI and Ontology, visualized in a knowledge graph.",
      category: "Smart City",
      technologies: ["AI", "Ontology", "Knowledge Graphs"],
      features: [
        "Visual relationships between crimes",
        "Identifies crime patterns",
        "Supports law enforcement decision"
      ],
      icon: <Building className="h-8 w-8 text-gray-600" />,
      logo: "/logos/crime-identifier.jpg",
      githubUrl: null,
      videoUrl: null,
      paperUrl: null,
      architectureImage: null
    },

    {
      id: 29,
      title: "HomeGuard",
      description: "Smart City security system that uses AI to detect unusual activity patterns and potential threats.",
      category: "Smart City",
      technologies: ["Computer Vision", "IoT"],
      features: [
        "Real-time threat detection",
        "Automated emergency alerts",
        "Energy-efficient monitoring"
      ],
      icon: <Building className="h-8 w-8 text-gray-600" />,
      logo: "/logos/homeguard.jpg",
      githubUrl: null,
      videoUrl: null,
      paperUrl: null,
      architectureImage: null
    },

    {
      id: 30,
      title: "Home Appliance Identifier",
      description: "Uses deep learning to identify faulty home appliances and suggest suitable handymen.",
      category: "Smart City",
      technologies: ["Deep Learning", "Image Classification"],
      features: [
        "Automatic identification of faulty appliances",
        "Reduces handyman search time",
        "Smart recommendation system"
      ],
      icon: <Building className="h-8 w-8 text-gray-600" />,
      logo: "/logos/home-appliance.jpg",
      githubUrl: null,
      videoUrl: null,
      paperUrl: null,
      architectureImage: null
    },

{
  id: 31,
  title: "Customer Retention via Social Media",
  description: "Predicts customer churn using Twitter data and sentiment analysis to identify early signs of dissatisfaction. By analyzing user conversations and trends on social platforms, it helps businesses take proactive steps to improve customer engagement and retention.",
  category: "Smart Media",
  technologies: ["NLP", "Social Media Analysis", "BERT"],
  features: [
    "Predicts customer churn",
    "Analyzes customer sentiment",
    "Supports retail decision-making",
    "Monitors brand reputation in real time",
    "Identifies key churn indicators and patterns",
    "Generates visual reports for engagement insights"
  ],

      icon: <MessageSquare className="h-8 w-8 text-orange-600" />,
      logo: "/logos/customer-retention.jpg",
      githubUrl: null,
      videoUrl: null,
      paperUrl: null,
      architectureImage: null
    },

    {
      id: 32,
      title: "Twitter Sentiment Analysis of Chiropractic Discourse",
      description: "A multi-method NLP pipeline for analyzing sentiment, topics, influencers, and geospatial patterns in chiropractic-related Twitter conversations from 2018–2025.",
      category: "eHealth",
      technologies: [
        "Hugging Face Transformers",
        "FLAN-T5",
        "pyLDAvis",
        "Plotly",
        "NetworkX"
      ],
      features: [
        "35K chiropractic-related tweets collected and categorized into five thematic groups",
        "Fine-tuned FLAN-T5 model for three-class sentiment classification with weighted loss for imbalance",
        "Topic modeling with LDA and interactive visualization using pyLDAvis",
        "User-hashtag bipartite network analysis to identify influencers and community clusters"
      ],
      icon: <MessageSquare className="h-8 w-8 text-green-600" />,
      logo: "/logos/twitter_sentiment_analysis_logo.jpg",
      githubUrl: null,
      videoUrl: "/videos/Twitter_Sentiments_App.mp4",
      paperUrl: null,
      architectureImage: null
    },

    {
      id: 33,
      title: "Livestock Health Monitoring Collar",
      description: "A hardware-based IoT collar device for real-time monitoring of livestock health, tracking temperature, heart rate, and movement, with centralized management via mobile and web dashboards.",
      category: "Agro Tech",
      technologies: [
        "Embedded Systems",
        "Mobile Application",
        "Web Dashboard",
        "Internet Connectivity"
      ],
      features: [
        "Collar device worn around the animal's neck with integrated sensors",
        "Real-time monitoring of temperature, heart rate, and movement/activity",
        "Automatic data transmission to mobile app for each animal",
        "Centralized admin dashboard for managing multiple animals",
        "Alerts for abnormal health indicators"
      ],
      icon: <TreePine className="h-8 w-8 text-blue-600" />,
      logo: "/logos/livestock_health_collar.png",
      githubUrl: null,
      videoUrl: null,
      paperUrl: null,
      architectureImage: null
    },

    {
      id: 34,
      title: "Voice-Enabled Livestock Marketplace",
      description: "An online marketplace for livestock and dairy products, similar to PakWheels, with integrated speech-to-text technology for fast, accessible ad posting.",
      category: "Agro Tech",
      technologies: [
        "Web Platform",
        "Speech-to-Text Model (STT)",
        "Database for Listings",
        "Internet Connectivity"
      ],
      features: [
        "Marketplace for buying and selling livestock and dairy products",
        "Voice-based ad creation using speech-to-text",
        "Automatic generation of listing content from voice input",
        "Support for traditional text-based ad posting",
        "Categorized listings for easy browsing"
      ],
      icon: <TreePine className="h-8 w-8 text-orange-600" />,
      logo: "/logos/livestock_marketplace.png",
      githubUrl: null,
      videoUrl: null,
      paperUrl: null,
      architectureImage: null
    }
];

export default projects;