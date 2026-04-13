import React, { useEffect, useState, useRef, useCallback } from 'react';
import ChatWidget from './components/ChatWidget';
import NewsCarousel from './components/NewsCarousel';
import HighlightsCarousel from './components/HighlightsCarousel';
import './index.css';
import namasteIcon from './assets/namaste.png';
import japan1 from './assets/ai_images_why_japan/japan_1.png';
import japan2 from './assets/ai_images_why_japan/japan_2.png';
import japan3 from './assets/ai_images_why_japan/japan_3.png';
import japan4 from './assets/ai_images_why_japan/japan_4.png';
import japan5 from './assets/ai_images_why_japan/japan_5.png';
import japan6 from './assets/ai_images_why_japan/japan_6.png';
import japan7 from './assets/ai_images_why_japan/japan_7.png';
import japan8 from './assets/ai_images_why_japan/japan_8.png';

const Counter = ({ target, duration = 800, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    const end = parseFloat(target.replace(/,/g, ''));
    if (isNaN(end)) return setCount(target);

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(progress * end);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  const formatNumber = (num) => {
    if (typeof num === 'string') return num;
    if (target.includes('.')) return num.toFixed(1);
    return Math.floor(num).toLocaleString();
  };

  return <span ref={countRef}>{formatNumber(count)}{suffix}</span>;
};

const featureSlides = [
  {
    title: "Why Indian Parents Are Choosing Japan?",
    text: "World's Safest Environment\nDisciplined & Secure for All\nMore Affordable Than the West\nIndian Food & Lifestyle Support\nGlobal Career Opportunities\nStrong International Reputation",
    image: "/images/why-parents.png"
  },
  {
    title: "Why More Indian Students Are Choosing Japan?",
    text: "World-Class Safety & Standards\nAffordable Living & Tuition\nPart-Time Work Permissions\nGlobal Career Opportunities\nLanguage-Driven Success\nModern Cities & Infrastructure\nIndian Food & Global Culture",
    image: "/images/why-japan.jpg"
  },
  {
    title: "Why Indian Students Choose Japan University of Economics?",
    text: "Affordable Tuition & Scholarships\nEnglish-Friendly Programs\nCareer & Internship Support\nModern City Campuses\nSafe & Global Environment\nHousing & Work Assistance",
    image: "/images/why-jue.jpg"
  },
  {
    title: "Worried About Career & Placement?",
    text: "Internship Opportunities During Study\nComprehensive Job-Hunting Support\nResume & Interview Preparation\nPersonalized Career Guidance\nConnect with Top Japanese Companies\nDedicated International Placement",
    image: "/images/career-jue.jpg"
  },
  {
    title: "Worried About Japanese Language?",
    text: "English-Friendly Classes Available\nIntegrated University Language Lessons\nLearn While Studying Your Degree\nDaily Life & Part-Time Job Support\nJLPT Preparation Assistance\nBoost Your Global Career Opportunities",
    image: "/images/language-jue.jpg"
  },
  {
    title: "Worried About Accommodation?",
    text: "University Accommodation Support\nSafe & Affordable Housing Options\nSeparate Dorms for Boys & Girls\nConvenient Locations Near Campus\nFree Shuttle Bus Access Available\nSecure International Environment",
    image: "/images/accommodation-jue.jpg"
  },
  {
    title: "Scholarships & Financial Support",
    text: "International Student Scholarships\nTuition Fee Reduction Options\nExpert Application Guidance\nCompetitive Global Affordability",
    image: "/images/scholarship-jue.jpg"
  },
  {
    title: "Worried About Visa & Documents?",
    text: "Student Visa Application Guidance\nComplete Documentation Support\nStep-by-Step Assistance\nUniversity-Issued Certificates\nDedicated Visa Compliance Team",
    image: "/images/visa-jue.png"
  },
  {
    title: "Worried About Arrival in Japan?",
    text: "Flight Booking & Travel Advice\nAirport Pickup Support Information\nPost-Arrival Settling-In Assistance\nResidence Registration Help\nBank Account Setup Support",
    image: "/images/travel-jue.png"
  }
];

const FeatureSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animState, setAnimState] = useState('idle');
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const slideNext = useCallback(() => {
    setAnimState('exit');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % featureSlides.length);
      setAnimState('enter');
      setTimeout(() => setAnimState('idle'), 50);
    }, 500);
  }, []);

  const slidePrev = useCallback(() => {
    setAnimState('exit');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + featureSlides.length) % featureSlides.length);
      setAnimState('enter');
      setTimeout(() => setAnimState('idle'), 50);
    }, 500);
  }, []);

  useEffect(() => {
    const timer = setInterval(slideNext, 6000);
    return () => clearInterval(timer);
  }, [slideNext]);

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStart.current - touchEnd.current > 70) {
      slideNext();
    }
    if (touchStart.current - touchEnd.current < -70) {
      slidePrev();
    }
  };

  const slide = featureSlides[currentIndex];
  const animClass = animState === 'exit' ? 'slide-exit' : animState === 'enter' ? 'slide-enter' : 'slide-idle';

  return (
    <div
      className="feature-slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`feature-slider-box ${animClass}`}>
        <div className="feature-slider-text">
          <h2>{slide.title}</h2>
          <div className="feature-slider-content">
            {slide.text.includes('\n') ? (
              <ul className="feature-list">
                {slide.text.split('\n').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{slide.text}</p>
            )}
          </div>
        </div>
        <div className="feature-slider-image">
          <img src={slide.image} alt={slide.title} />
        </div>
      </div>
    </div>
  );
};

const highlightData = [
  {
    title: "STATIO Shibuya",
    desc: "Modern student lounge and creative space in the heart of Tokyo's trendiest district.",
    image: "/images/why-japan.jpg",
    tag: "TOKYO"
  },
  {
    title: "Blue Rose Project",
    desc: "Student-led public relations project promoting JUE energy through dance and performance.",
    image: "/images/jue-students.jpg",
    tag: "CULTURE"
  },
  {
    title: "International Library",
    desc: "Multilingual research facilities and collaborative study zones for global scholars.",
    image: "/images/why-jue.jpg",
    tag: "ACADEMICS"
  },
  {
    title: "Fukuoka Campus",
    desc: "Our main campus surrounded by nature, offering a serene environment for focused learning.",
    image: "/images/scholarship-jue.jpg",
    tag: "FUKUOKA"
  },
  {
    title: "Kobe Sannomiya",
    desc: "Urban campus in the vibrant port city of Kobe with access to Japan's business network.",
    image: "/images/career-jue.jpg",
    tag: "KOBE"
  }
];

const HighlightCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const timerRef = useRef(null);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const startAutoPlay = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection('next');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % highlightData.length);
        setIsAnimating(false);
      }, 400);
    }, 4500);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(timerRef.current);
  }, [startAutoPlay]);

  const goNext = useCallback(() => {
    if (isAnimating) return;
    setDirection('next');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % highlightData.length);
      setIsAnimating(false);
      startAutoPlay();
    }, 400);
  }, [isAnimating, startAutoPlay]);

  const goPrev = useCallback(() => {
    if (isAnimating) return;
    setDirection('prev');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + highlightData.length) % highlightData.length);
      setIsAnimating(false);
      startAutoPlay();
    }, 400);
  }, [isAnimating, startAutoPlay]);

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStart.current - touchEnd.current;
    if (diff > 50) goNext();
    if (diff < -50) goPrev();
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const idx = (currentIndex + i + highlightData.length) % highlightData.length;
      cards.push({ ...highlightData[idx], position: i, idx });
    }
    return cards;
  };

  const animClass = isAnimating
    ? direction === 'next' ? 'carousel-slide-out-left' : 'carousel-slide-out-right'
    : direction === 'next' ? 'carousel-slide-in-right' : 'carousel-slide-in-left';

  return (
    <div
      className="highlight-carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-track">
        {getVisibleCards().map((card) => (
          <div
            key={card.idx}
            className={`carousel-card ${card.position === 0 ? 'card-active' : 'card-side'} ${card.position === 0 ? animClass : ''}`}
          >
            <div className="card-image-wrapper">
              <img src={card.image} alt={card.title} />
              <div className="card-overlay" />
            </div>
            <div className="card-content">
              <span className="card-tag">{card.tag}</span>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const heroSliderImages = [
  '/images/football_play.jpeg',
  '/images/hero.png',
  // '/images/graduate00.jpg',
  '/images/LearningProgression01.jpg',
  // '/images/support04.jpg',
  // '/images/Undergraduate00.jpg',
  // '/images/why-jue.jpg'
];

const heroSubtitles = [
  "Vibrant sports and club activities",
  "JUE supports Indian students who want to study in Japan and build their careers through affordable tuition fees, scholarships, admission guidance, and career support.",
  "Special Scholarships for Indian Students",
  "Affordable Tuition Fees & Career Support in Japan",
  "Study with Experienced Professors and Students from 20+ Nationalities",
  "Rose cafe and modern campus facilities",
  "English friendly programs"
];

const programDetails = {
  "Department of Economics": "Learn to analyze complex markets, understand economic policies, and navigate the global financial landscape. Our economics program at JUE focuses on practical applications and international trade dynamics.",
  "Department of Management": "Master the art of leadership and organizational strategy. This course provides a deep dive into corporate efficiency, team building, and strategic decision-making for future global business leaders.",
  "Department of Commerce": "Explore the essentials of international trade, marketing, and accounting. We equip you with the technical skills and market insights necessary for success in the competitive global commercial sector.",
  "Department of Management Law": "Understand the intersection of business and legal frameworks. This unique program covers corporate governance, commercial law, and regulatory compliance essential for modern industrial management.",
  "Health & Sports Management": "Turn your passion for athletics into a career. Our program combines business acumen with specialized knowledge in sports facility operations, health promotion, and wellness industry management."
};

const journeySteps = [
  { title: "Apply Online", sub: "Submit application securely", color: "blue", align: "text-pos-top", t: 0.05 },
  { title: "Free Counseling", sub: "Personal guidance from our team", color: "blue", align: "text-pos-right", t: 0.20 },
  { title: "Document Check", sub: "Academic records are reviewed", color: "blue", align: "text-pos-left", t: 0.33 },
  { title: "Online Interview", sub: "Interaction with university", color: "blue", align: "text-pos-right", t: 0.46 },
  { title: "Receive Admission", sub: "Get official offer letter", color: "green", align: "text-pos-left", t: 0.58 },
  { title: "Connect with Students", sub: "Interact with current students", color: "blue", align: "text-pos-right", t: 0.70 },
  { title: "Visa & COE Support", sub: "Complete your visa process", color: "blue", align: "text-pos-left", t: 0.82 },
  { title: "Fly to Japan", sub: "Begin journey with confidence", color: "green", align: "text-pos-bottom", t: 0.95 }
];

const faqsList = [
  { q: "How do I apply?", a: "Submit your application securely through our online admission portal with the required documents." },
  { q: "How can I apply for a scholarship?", a: "Eligible international students can apply for JUE's special scholarships during the standard admission pipeline." },
  { q: "How do I apply for a visa?", a: "JUE provides comprehensive COE support and guides you through every step of the Japanese student visa process." },
  { q: "Are there vegetarian/halal food options?", a: "Yes, our cafeteria and local urban campuses are surrounded by diverse dining options, and we provide guidance for students with specific dietary needs." },
  { q: "What is the safety level in Japan?", a: "Japan is consistently ranked as one of the safest countries globally. Students can safely travel and live even late at night." },
  { q: "Can I work part-time while studying?", a: "International students are generally allowed to work up to 28 hours per week with a permit, offering great opportunities for cultural immersion." }
];

const specialSupportSteps = [
  { id: "visa", title: "Support for Visa and Admission", img: "/images/visa-jue.png" },
  { id: "english", title: "English Friendly Programs", img: "/images/language-jue.jpg" },
  { id: "cities", title: "Study in Japan's Top Cities", img: "/images/fukuokacampus02.jpg" },
  { id: "meals", title: "Indian Meals Available", img: "/images/cafe00.jpg" },
  { id: "accommodation", title: "Comfortable Accommodation", img: "/images/accommodation-jue.jpg" },
  { id: "clubs", title: "Club And Activities", img: "/images/clubs03.jpg" },
  { id: "safe", title: "Safe Environment", img: "/images/jue-students.jpg" }
];

const supportSlides = {
  "visa": [
    { title: "Direct CoE Guidance", text: "Our International Office provides expert support in securing your Certificate of Eligibility, the first step for your Japanese student visa.", img: "/images/visa-1.png" },
    { title: "Document Preparation", text: "We assist Indian students with all financial and academic documentation required by the Japanese Immigration Services Agency.", img: "/images/visa-2.png" },
    { title: "Online Briefings", text: "Participate in mandatory pre-departure sessions where we explain the visa interview process and arrival logistics.", img: "/images/visa-3.png" },
    { title: "Embassy Support", text: "Get localized advice on visiting the Japanese Embassy in New Delhi or Consulates in Mumbai, Chennai, and Kolkata.", img: "/images/visa-4.png" },
    { title: "Arrival Logistics", text: "From CoE to Residence Card, JUE ensures your legal status in Japan is managed professionally from day one.", img: "/images/visa-5.png" }
  ],
  "english": [
    { title: "Global Classrooms", text: "Join diverse classes where core economics and management subjects are taught entirely in English by international faculty.", img: "/images/english-1.png" },
    { title: "Interactive Seminars", text: "Participate in small-group discussions and case studies conducted in English to build your global business vocabulary.", img: "/images/english-2.png" },
    { title: "Digital Resources", text: "Access a wide range of English-language journals, textbooks, and online research databases through the JUE library system.", img: "/images/english-3.png" },
    { title: "Expert Tutoring", text: "Work closely with bilingual professors who understand the needs of international students and provide academic guidance in English.", img: "/images/english-4.png" },
    { title: "Global Degree Path", text: "Graduate with a degree recognized worldwide, opening doors to careers in Japan, India, and beyond.", img: "/images/english-5.png" }
  ],
  "cities": [
    { title: "Tokyo: Global Hub", text: "Experience the heartbeat of Japan in Shibuya, Tokyo. Study at the center of world-class technology, fashion, and business.", img: "/images/cities-1.png" },
    { title: "Fukuoka: Asian Gateway", text: "Our main campus in Dazaifu, Fukuoka, offers a warm climate, lower living costs, and a high-quality international lifestyle.", img: "/images/cities-2.png" },
    { title: "Kobe: Business Port", text: "Study in the historical port city of Kobe, known for its international atmosphere and vibrant Sannomiya business district.", img: "/images/cities-3.png" },
    { title: "Modern Campus Life", text: "All JUE campuses feature state-of-the-art facilities, from glass-walled study lounges to high-tech computer labs.", img: "/images/cities-4.png" },
    { title: "Connected Japan", text: "Travel easily between Tokyo, Kobe, and Fukuoka using Japan's efficient Shinkansen bullet train network.", img: "/images/cities-5.png" }
  ],
  "meals": [
    { title: "Authentic Indian Thalis", text: "Savor the taste of home with traditional thalis featuring dal, paneer, and fresh vegetables prepared with authentic spices.", img: "/images/meals-1.png" },
    { title: "Cross-Cultural Dining", text: "Our cafeterias are social hubs where Indian and Japanese students share meals and build lifelong cross-cultural friendships.", img: "/images/meals-2.png" },
    { title: "Vegetarian Excellence", text: "JUE prioritizes dietary needs, offering a wide range of high-quality vegetarian and vegan meal options every day.", img: "/images/cafe00.jpg" },
    { title: "Healthy Campus Food", text: "All meals are prepared in hygienic, modern facilities with a focus on nutritional balance and student wellness.", img: "/images/cafe00.jpg" },
    { title: "Global Flavors", text: "Beyond Indian and Japanese cuisine, our dining halls offer variety to cater to students from over 20 different countries.", img: "/images/cafe00.jpg" }
  ],
  "accommodation": [
    { title: "Modern Dormitories", text: "Safe, clean, and fully furnished student residences are located within walking distance of all our campuses.", img: "/images/accommodation-jue.jpg" },
    { title: "Comfortable Rooms", text: "Each student room is equipped with high-speed internet, a study desk, and climate control for a productive living environment.", img: "/images/accommodation.png" },
    { title: "Shared Life", text: "Kitchen and lounge areas provide spaces to cook Indian meals together and bond with fellow international students.", img: "/images/accommodation01.jpg" },
    { title: "Secure Housing", text: "JUE housing features electronic keycard access and 24/7 on-call staff to ensure your safety and peace of mind.", img: "/images/fukuokacampus03.jpg" },
    { title: "Serene Surroundings", text: "Many of our residences are surrounded by green spaces and traditional Japanese gardens, offering a peaceful retreat after classes.", img: "/images/garden03.jpg" }
  ],
  "clubs": [
    { title: "Traditional Arts", text: "Join clubs for Kendo, Tea Ceremony, or Calligraphy to deeply immerse yourself in Japan's rich cultural heritage.", img: "/images/clubs03.jpg" },
    { title: "Sports & Fitness", text: "From soccer to basketball, our athletic clubs help you stay active and make friends through team-based competition.", img: "/images/clubs06.jpg" },
    { title: "Business Societies", text: "Participate in student-led organizations that focus on entrepreneurship, marketing, and global economic trends.", img: "/images/clubs08.jpg" },
    { title: "Global Networking", text: "The International Student Union hosts regular mixers, cultural festivals, and networking events for all JUE students.", img: "/images/clubs10.jpg" },
    { title: "Modern Facilities", text: "JUE provides high-quality gyms and courts for all student clubs to practice and host friendly matches.", img: "/images/basketball.png" }
  ],
  "safe": [
    { title: "Smiling Community", text: "Japan is one of the world's safest nations, and JUE provides a welcoming, high-trust environment for every student.", img: "/images/jue-students.jpg" },
    { title: "Secure Campuses", text: "Our campuses are well-lit and feature comprehensive security teams, ensuring a safe learning environment at any hour.", img: "/images/jue-open.jpg" },
    { title: "Health & Wellness", text: "Access on-campus medical checkups and counseling services to support your physical and emotional well-being throughout your studies.", img: "/images/support04.jpg" },
    { title: "Parental Peace of Mind", text: "We maintain regular contact with families and provide a secure support system so parents in India can feel confident.", img: "/images/why-parents.png" },
    { title: "Always Connected", text: "JUE's emergency support network and community mentors are available 24/7 to assist international students with any situation.", img: "/images/community.png" }
  ]
};

const programImages = {
  "Department of Economics": "/images/Undergraduate00.jpg",
  "Department of Management": "/images/fukuokacampus02.jpg",
  "Department of Commerce": "/images/Internship06.jpg",
  "Department of Management Law": "/images/LearningProgression01.jpg",
  "Health & Sports Management": "/images/jue-students.jpg"
};

const JapanChoiceCarousel = () => {
  const images = [
    { title: "World-Class Safety", img: japan1 },
    { title: "Stunning Natural Seasons", img: japan2 },
    { title: "Cutting-Edge Technology", img: japan3 },
    { title: "Traditional Culture", img: japan4 },
    { title: "Authentic Culinary Delights", img: japan5 },
    { title: "24/7 Convenience", img: japan6 },
    { title: "Leading Education & Research", img: japan7 },
    { title: "Vibrant City Life", img: japan8 },
  ];

  const [idx, setIdx] = React.useState(0);
  const touchStartX = React.useRef(null);

  const prevSlide = () => {
    setIdx(prev => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setIdx(prev => (prev + 1) % images.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(diff) < 50) return;

    if (diff > 0) nextSlide();
    else prevSlide();
  };

  return (
    <section 
      className="japan-choice-section reveal"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <h2 className="japan-choice-title">
        <span className="light-blue">Why Choosing</span> <span className="navy-blue">JAPAN is the Right Choice</span>
      </h2>
      <div className="japan-carousel-container">
        <div 
          className="japan-carousel-track" 
          style={{ 
            transform: `translateX(calc(-${idx * 80}%))` 
          }}
        >
          {images.map((item, i) => (
            <div 
              key={item.title} 
              className={`japan-carousel-item ${i === idx ? 'curr' : (i < idx ? 'prev' : 'next')}`}
            >
              <div className="japan-img-box">
                <img src={item.img} alt={item.title} />
              </div>
              <p className="japan-img-caption">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseSection = () => {
  const chooseItems = [
    { title: "Affordable Tuition & Scholarships", img: "/images/why-parents.png" },
    { title: "English-Friendly Programs", img: "/images/why-japan.jpg" },
    { title: "Career & Internship Support", img: "/images/career-jue.jpg" },
    { title: "Modern City Campuses", img: "/images/why-jue.jpg" },
    { title: "Safe & Global Environment", img: "/images/jue-students.jpg" },
    { title: "Housing & Work Assistance", img: "/images/accommodation-jue.jpg" },
  ];

  return (
    <section className="why-choose-jue reveal">
      <div className="why-choose-header">
        <h2 className="why-choose-line1">Why Choose</h2>
        <h2 className="why-choose-line2">Japan University of Economics(JUE)</h2>
      </div>
      <div className="why-choose-grid">
        {chooseItems.map((item, idx) => (
          <div key={idx} className="choose-card">
            <div className="choose-img-box">
              <img src={item.img} alt={item.title} />
            </div>
            <p className="choose-caption">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const JourneySection = () => {
  const [isActive, setIsActive] = useState(false);
  const sectionRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Strict trigger: must be intersecting and we must have scrolled past the initial fold
      if (entry.isIntersecting && window.scrollY > 100) {
        setIsActive(true);
      }
    }, { threshold: 0.5 }); 

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isActive && animRef.current && animRef.current.beginElement) {
      animRef.current.beginElement();
    }
  }, [isActive]);

  // S-Curve Bezier Path
  const pathData = "M 20 85 C 80 85, 20 15, 80 15";

  // helper to get precise coordinates along cubic bezier for any t between 0 and 1
  const getBezierPoint = (t, p0, p1, p2, p3) => {
    const mt = 1 - t;
    return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
  };

  return (
    <section className="journey-wrapper reveal" id="journey" ref={sectionRef}>
      <div className="journey-header">
        <h2>Your Journey from India to Japan</h2>
      </div>
      <div className="journey-container">
        {/* Maps */}
        <img src="/images/india_map-removebg-preview.png" alt="India" className="map-india" />
        <img src="/images/japan_map-removebg-preview.png" alt="Japan" className="map-japan" />

        <svg className="journey-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Animated Dotted Line */}
          <path 
            id="flight-path"
            d={pathData} 
            fill="none" 
            stroke="#003B6F" 
            strokeWidth="0.4" 
            strokeDasharray="1.5, 1.5" 
            vectorEffect="non-scaling-stroke"
          />
          {/* Fixed Horizontal SVG Airplane animating over exact path - Stopping at end & Bigger size */}
          <image 
            href="/images/airplane-removebg-preview.png" 
            width="20" 
            height="20" 
            x="-10" 
            y="-10" 
            transform="rotate(30)"
            style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.5s ease-in' }}
          >
             <animateMotion 
               ref={animRef}
               dur="12s" 
               repeatCount="1" 
               fill="freeze" 
               path={pathData} 
               begin="indefinite"
             />
          </image>
        </svg>

        {/* Dynamic Markers mathematically guaranteed to fall perfectly on the SVG cubic bezier path */}
        {journeySteps.map((step, idx) => {
           const x = getBezierPoint(step.t, 20, 80, 20, 80);
           const y = getBezierPoint(step.t, 85, 85, 15, 15);
           const dotColor = step.color === 'green' ? '#2ecc71' : '#3498db';

            return (
              <div 
                key={idx} 
                className="journey-marker" 
                style={{ 
                  left: `${x}%`, 
                  top: `${y}%`, 
                  borderColor: dotColor
                }}
              >
                <div 
                  className={`step-text-container ${step.align} ${isActive ? 'fade-in-on-pass' : ''}`}
                  style={{ 
                    animationDelay: `${step.t * 12}s`, // Adjusted to match 12s airplane duration
                    opacity: 0 // Start hidden
                  }}
                >
                  <div className="step-title" style={{ color: dotColor }}>{step.title}</div>
                  <div className="step-sub">{step.sub}</div>
                </div>
              </div>
            );
        })}
      </div>
    </section>
  );
};

const statsSets = [
  [
    { title: "Top Ranked University", value: "Study in Japan's Top Cities: Tokyo, Kobe or Fukuoka" },
    { title: "Ranked 2nd in Japan", value: "3,000+ Students from over 20 Countries" },
    { title: "English Friendly Classes", value: "Japanese Language Support Included in Programs" },
    { title: "50+ Years of Excellence", value: "Trusted University for Global Careers" }
  ],
  [
    { title: "World-Class Faculty", value: "EXPERIENCED PROFESSORS: Industry & Academic Experts" },
    { title: "Safe & Inclusive Campus", value: "GLOBAL STUDENT COMMUNITY: 20+ Countries" },
    { title: "Affordable Fee & Scholarship", value: "Special Grants & Support for Indian Students" },
    { title: "Global Alumni Network", value: "ALUMNI CONNECTIONS: Worldwide Community" }
  ]
];

const App = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showStories, setShowStories] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [selectedSupport, setSelectedSupport] = useState("visa");
  const [activeSupportSlide, setActiveSupportSlide] = useState(0);
  const [slideAnim, setSlideAnim] = useState('active');
  const [isJapanHovered, setIsJapanHovered] = useState(false);

  useEffect(() => {
    setActiveSupportSlide(0);
  }, [selectedSupport]);

  const nextSupportSlide = () => {
    setSlideAnim('exit');
    setTimeout(() => {
      const slides = supportSlides[selectedSupport];
      setActiveSupportSlide((prev) => (prev + 1) % slides.length);
      setSlideAnim('active');
    }, 300);
  };

  const prevSupportSlide = () => {
    setSlideAnim('exit');
    setTimeout(() => {
      const slides = supportSlides[selectedSupport];
      setActiveSupportSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setSlideAnim('active');
    }, 300);
  };
  
  const [statSetIndex, setStatSetIndex] = useState(0);
  const [statAnim, setStatAnim] = useState('active');
  const [isStatsPaused, setIsStatsPaused] = useState(false);

  useEffect(() => {
    if (isStatsPaused) return;

    const statsTimer = setInterval(() => {
      setStatAnim('slide-out');
      setTimeout(() => {
        setStatSetIndex(prev => (prev + 1) % statsSets.length);
        setStatAnim('slide-in');
        setTimeout(() => {
          setStatAnim('active');
        }, 100); 
      }, 500); 
    }, 4000); // 4 seconds interval

    return () => clearInterval(statsTimer);
  }, [isStatsPaused]);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroSliderImages.length);
    }, 4000); // 4 seconds transition
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Small delay to ensure layout is stable before observing
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.1 }); // More responsive for general reveals

      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      return () => observer.disconnect();
    }, 500); // 500ms delay to ensure page is settled

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      {/* Sticky Apply Button */}
      <button className="sticky-apply-btn">APPLY NOW</button>

      {/* Main Navigation Bar [NEW] */}
      <header className="main-nav-bar">
        <div className="nav-container">
          <div className="nav-logo">JUE</div>
          <nav className="nav-menu">
            <a href="#home">HOME</a>
            <a href="#admission">ADMISSION</a>
            <a href="#courses">COURSES</a>
            <a href="#campus">CAMPUS LIFE</a>
          </nav>
        </div>
      </header>
 
      {/* Hero Tagline Strip [NEW] */}
      <div className="hero-tagline-strip">
        Dreaming of studying in Japan is now easier and more affordable with Japan University of Economics (JUE).
      </div>

      {/* Hero Section */}
      <section className="hero" id="home">
        {/* Sliding background images */}
        {heroSliderImages.map((img, idx) => (
          <div
            key={idx}
            className={`hero-image-bg ${idx === heroIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        {/* Directional gradient overlay */}
        <div className="hero-overlay" />


        {/* Main Body */}
        <div className="hero-body">
          {/* Top text */}
          <div className="hero-text">
            <p className="hero-eyebrow">Thinking of<br />studying abroad?</p>
            <h2 className="hero-headline">
              Then Why Not<br />
              Choose<br />
              <span 
                className={`hero-japan-accent ${isJapanHovered ? 'is-hovered' : ''}`}
                onPointerEnter={() => setIsJapanHovered(true)}
                onPointerLeave={() => setIsJapanHovered(false)}
              >
                Japan
              </span>
            </h2>
          </div>

          {/* Bottom badges */}
          <div className="hero-badges">
            <span className="hero-badge-white">Special Support for Indian Students</span>
            <span className="hero-badge-gold">Avail FREE Counselling</span>
          </div>
        </div>
      </section>

      {/* White Strip removed to reduce vertical space */}

      {/* Indian Welcome Section [NEW] */}
      <section className="indian-welcome reveal">
        <h2 className="welcome-title">We welcome students from India <img src={namasteIcon} alt="Namaste" className="namaste-icon" /></h2>
        <div className="welcome-container">
          <div className="welcome-text-container">
            <p className="welcome-text-bold">
              For over 60 years since 1956, the Tsuzuki Education Group has been developing individual expertise in the academic context and are willing to provide unlimited support in education.
            </p>
            <p className="welcome-text-normal">
              We are now one of the biggest educational corporations in Japan, having established six universities, twelve junior colleges and vocational schools, three high schools, a junior high school, and four kindergartens and nursery schools.
            </p>
          </div>
        </div>
      </section>

      {/* Navy Stats Section [NEW] */}
      <section 
        className="navy-stats reveal"
        onMouseEnter={() => setIsStatsPaused(true)}
        onMouseLeave={() => setIsStatsPaused(false)}
        onTouchStart={() => setIsStatsPaused(true)}
        onTouchEnd={() => setIsStatsPaused(false)}
      >
        <div className="stats-grid">
          {statsSets[statSetIndex].map((stat, index) => (
            <div className="stats-block" key={index}>
              <div className="block-inner">
                <div className={`stats-slider-wrapper ${statAnim}`}>
                  <h3 className="block-title">{stat.title}</h3>
                  <div className="stat-detail">
                    
                    <span className="stat-value">{stat.value}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Welcome JUE Section [NEW] */}
      <section className="welcome-jue reveal">
        <h2 className="welcome-jue-title">Welcome to Japan University of Economics <br className="mobile-only" /> (JUE)</h2>
        <div className="video-section">
          <div className="video-container">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/tB1vYUFAn5I?autoplay=1&mute=1&loop=1&playlist=tB1vYUFAn5I"
              title="JUE University Life"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* News & Press Release — Swipe Carousel */}
      <section className="news-press-section reveal">
        <div className="section-container">
          <NewsCarousel title="News & Press Release" />
        </div>
      </section>

      {/* Highlights — Swipe Carousel */}
      <section className="highlights-jue-section reveal">
        <div className="section-container">
          <HighlightsCarousel title="Highlights" />
        </div>
      </section>

      {/* New Journey Section Implementation */}
      <JourneySection />

      {/* Why Choose JUE Section [NEW] */}
      <WhyChooseSection />

      {/* Why Choosing Japan Carousel Section [NEW] */}
      <JapanChoiceCarousel />

      {/* Programs We Offer — Accordion Style [NEW] */}
      <section className="programs-accordion-section reveal" id="programs">
        <div className="accordion-wrapper">
          {/* Main Title Strip */}
          <div className="accordion-header-strip">
            <h2 className="accordion-main-title">PROGRAMS WE OFFER</h2>
          </div>

          <div className="accordion-items">
            {Object.keys(programDetails).map((prog) => (
              <div 
                key={prog} 
                className={`accordion-item ${selectedProgram === prog ? 'expanded' : ''}`}
              >
                <div 
                  className="accordion-stripe" 
                  onClick={() => setSelectedProgram(selectedProgram === prog ? null : prog)}
                >
                  <span className="stripe-title">{prog}</span>
                  <span className="stripe-icon">{selectedProgram === prog ? '−' : '+'}</span>
                </div>
                
                <div className="accordion-content">
                  <div className="content-inner">
                    <p className="program-desc">{programDetails[prog]}</p>
                    <button 
                      className="learn-more-btn"
                      onClick={() => window.open('#', '_blank')}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Row Header [REFINED] */}
      <section className="community-cta reveal" style={{ position: 'relative', overflow: 'visible' }}>
        <h2 className="community-home-text">
          <span className="white-text">Your concerns</span> <span className="green-highlight">NOW SOLVED</span>
          <span className="animated-emoji">🤔</span>
        </h2>
      </section>

      {/* Why JUE / Why Japan Slider */}
      <section className="reveal" id="features">
        <FeatureSlider />
      </section>

      {/* Special Support for Indian Students Section [RELOCATED] */}
      <section className="special-support-section reveal">
        <h2 className="special-support-title">Special Support for Indian Students</h2>
        <div className="support-grid">
          {specialSupportSteps.map((step, idx) => (
            <div 
              key={idx} 
              className={`support-card ${selectedSupport === step.id ? 'active-card-support' : ''}`}
              onClick={() => setSelectedSupport(step.id)}
            >
              <div className="support-img-box">
                <img src={step.img} alt={step.title} />
              </div>
              <div className="support-info-box">
                <p>{step.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Support Detail Section [UPGRADED INTERACTIVE SUB-CAROUSEL] */}
      <section className="about-program-section reveal active" style={{ padding: '0 20px' }}>
        <div className="about-program-container">
          <div className="about-program-slider sub-carousel-container">
            {/* Arrows flanking the image for sub-slide navigation */}
            <div className="support-detail-layout">
              <div className="image-carousel-unit">
                <button className="sub-arrow left" onClick={prevSupportSlide}>‹</button>
                <div className={`about-program-image sub-image ${slideAnim}`}>
                  <img src={supportSlides[selectedSupport][activeSupportSlide].img} alt="Support" />
                </div>
                <button className="sub-arrow right" onClick={nextSupportSlide}>›</button>
              </div>
              
              <div className={`about-program-info sub-info ${slideAnim}`}>
                <h2 className="about-program-title">{supportSlides[selectedSupport][activeSupportSlide].title}</h2>
                <div className="about-program-underline"></div>
                <p className="about-program-text">
                  {supportSlides[selectedSupport][activeSupportSlide].text}
                </p>
                <div className="slide-dots">
                   {supportSlides[selectedSupport].map((_, i) => (
                     <span key={i} className={`slide-dot ${i === activeSupportSlide ? 'active' : ''}`}></span>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Alumni Inspiration Section [NEW] */}
      <section className="alumni-inspiration-section reveal" id="mentors">
        <div className="alumni-content">
          <h2 className="alumni-title">Be inspired by our students and alumni</h2>
          <p className="alumni-subtitle">
            Discover how Education In JAPAN can give you unique opportunities for personal<br className="desktop-break" /> growth and career success.
          </p>
          <button 
            className="alumni-btn" 
            onClick={() => {
              setShowStories(true);
              setTimeout(() => document.getElementById('success').scrollIntoView({ behavior: 'smooth' }), 100);
            }}
          >
            Read Student Stories
          </button>
        </div>
      </section>
      


      {/* Success Stories Section [NEW] */}
      <section className="success-stories" id="success">
        {showStories && (
          <>
            <div className="success-row reveal active">
              <div className="success-img-box">
                 <img src="/images/jue-students.jpg" alt="Student Presentation" />
              </div>
              <div className="success-pill">
                <strong>Kim Seong-min (South Korea) - Professional Athlete</strong><br />
                "JUE's disciplined environment at the Fukuoka campus was essential in preparing me for the rigors of the Kiwoom Heroes and my journey into professional sports."
              </div>
            </div>

            <div className="success-row reverse reveal active">
              <div className="success-img-box">
                 <img src="/images/Undergraduate00.jpg" alt="Student Life" />
              </div>
              <div className="success-pill">
                <strong>Garkavenko Hanna (Ukraine) - Japanese Industry</strong><br />
                "The dedicated career support programs at JUE offered me a lifeline. I am proud to have secured a career here in Japan thanks to their guidance."
              </div>
            </div>

            <div className="success-row reveal active">
              <div className="success-img-box">
                 <img src="/images/fukuokacampus02.jpg" alt="Alumni Founder" />
              </div>
              <div className="success-pill">
                <strong>Kang Rae-soo (South Korea) - CEO & Founder</strong><br />
                "Founding QuickConnect Co., Ltd. was possible because of the market insights and networking opportunities JUE provided during my Economics degree."
              </div>
            </div>
          </>
        )}
      </section>
      {/* Join Our WhatsApp Community CTA Section [NEW] */}
      <section className="whatsapp-cta-section reveal">
        <div className="whatsapp-cta-banner">
          <div className="whatsapp-cta-text">
            Join Our whatsapp Community for <span className="whatsapp-green">UPDATES</span>
          </div>
          <a href="https://chat.whatsapp.com/your-group-link" target="_blank" rel="noopener noreferrer" className="whatsapp-join-btn">
            JOIN NOW
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq reveal" id="faq">
        <div className="faq-header-strip">
          <h2>FAQs</h2>
        </div>
        <div className="faq-container-navy">
          <div className="faq-list">
            {faqsList.map((faq, idx) => (
              <div 
                key={idx} 
                className="faq-item-container" 
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              >
                <div className="faq-item">{faq.q}</div>
                {openFaqIndex === idx && (
                  <div className="faq-answer-static">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Now CTA */}
      <section className="apply-cta reveal">
        <h2>Ready to Begin Your Journey?</h2>
        <p>Join the next generation of global leaders at Japan University of Economics.</p>
        <button className="apply-btn">APPLY FOR ADMISSIONS</button>
      </section>

      {/* Institutional Redesigned Footer [MODIFIED/ENHANCED] */}
      <footer className="enhanced-footer" id="inquiry">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Campus Locations</h4>
            <ul>
              <li><strong>Fukuoka</strong>: Dazaifu City, Gojo</li>
              <li><strong>Tokyo Shibuya</strong>: Sakuragaoka-cho</li>
              <li><strong>Kobe Sannomiya</strong>: Kumoidori, Chuo-ku</li>
              <li><a href="https://www.jue.ac.jp/access/" target="_blank">Access Map & Directions</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Admissions</h4>
            <ul>
              <li><a href="https://www.jue.ac.jp/for_applicant/" target="_blank">Enrollment Info</a></li>
              <li><a href="https://www.jue.ac.jp/en/ADMISSION/Scholarship.html" target="_blank">Scholarships</a></li>
              <li><a href="https://www.jue.ac.jp/group/" target="_blank">Tsuzuki Education Group</a></li>
              <li><a href="https://www.jue.ac.jp/sitemap/" target="_blank">Site Map</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Student Support</h4>
            <ul>
              <li><a href="https://www.jue.ac.jp/en/CAMPUSLIFE/Student_Support.html" target="_blank">International Center</a></li>
              <li><a href="https://www.jue.ac.jp/privacy/" target="_blank">Privacy Policy</a></li>
              <li><a href="https://www.jue.ac.jp/inquiry/" target="_blank">General Inquiry</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Connect With Us</h4>
            <div className="social-icons">
              <a href="https://www.jue.ac.jp/facebook/" target="_blank" className="social-icon">FB</a>
              <a href="https://www.jue.ac.jp/twitter/" target="_blank" className="social-icon">TW</a>
              <a href="https://www.jue.ac.jp/line/" target="_blank" className="social-icon">LN</a>
              <a href="https://www.jue.ac.jp/instagram/" target="_blank" className="social-icon">IG</a>
            </div>
            <p style={{ fontSize: '0.8rem', marginTop: '20px', opacity: 0.6 }}>
              Institutional Knowledge Base for Global Students.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Japan University of Economics. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Chat Advisor */}
      <ChatWidget />
    </div>
  );
};

export default App;