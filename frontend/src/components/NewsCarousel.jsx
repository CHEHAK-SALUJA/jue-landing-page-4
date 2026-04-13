import { useRef, useEffect, useState } from 'react';

import news1 from '../assets/ai_images/news_1.png';
import news2 from '../assets/ai_images/news_2.png';
import news3 from '../assets/ai_images/news_3.png';
import news4 from '../assets/ai_images/news_4.png';
import news5 from '../assets/ai_images/news_5.png';
import news6 from '../assets/ai_images/news_6.png';

const defaultNews = [
  { img: news1, date: '2026.04.15', text: 'Our university has received the "2026 Prime Minister\'s Commendation for Distinguished Service in the Promotion of Greenery."' },
  { img: news2, date: '2026.04.10', text: 'JUE Students Win National Research Award for Digital Transformation in modern Economics Education.' },
  { img: news3, date: '2026.04.05', text: 'JUE Announces New Academic Partnership with Top Indian Institutions for Global Exchange Programs.' },
  { img: news4, date: '2026.03.28', text: 'Record number of students graduate at the Spring 2026 Convocation Ceremony held at Tokyo Campus.' },
  { img: news5, date: '2026.03.20', text: 'International Exchange Program welcomes 120 students from 18 nations for the Spring Semester 2026.' },
  { img: news6, date: '2026.03.15', text: 'Distinguished Professor Yamamoto delivers keynote at Global Economics Forum attended by 500+ students.' },
];

export default function NewsCarousel({ title = 'News & Press Release', items = defaultNews }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const touchStartX = useRef(null);
  const isTeleporting = useRef(false);

  // Triple the items to create an infinite scroll illusion
  const infiniteItems = [...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      // Start in the middle set of items
      const setWidth = track.scrollWidth / 3;
      track.scrollLeft = setWidth;
    }
  }, [items.length]);

  const handleScroll = () => {
    if (isTeleporting.current) return;
    const track = trackRef.current;
    if (!track) return;

    const setWidth = track.scrollWidth / 3;
    
    // If we've scrolled into the first set, teleport to the second set
    if (track.scrollLeft < setWidth * 0.5) {
      isTeleporting.current = true;
      track.scrollLeft += setWidth;
      setTimeout(() => { isTeleporting.current = false; }, 50);
    } 
    // If we've scrolled into the third set, teleport back to the second set
    else if (track.scrollLeft > setWidth * 1.5) {
      isTeleporting.current = true;
      track.scrollLeft -= setWidth;
      setTimeout(() => { isTeleporting.current = false; }, 50);
    }
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(diff) < 30) return;

    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.offsetWidth / 3;
    track.scrollBy({ left: diff > 0 ? cardWidth : -cardWidth, behavior: 'smooth' });
  };

  const handleSwap = (clickedIdx) => {
    setActiveIndex(clickedIdx);
  };

  // Items for sidebar (the next 3 after activeIndex, or wrap around)
  const getSidebarItems = () => {
    const list = [];
    for (let i = 1; i <= 3; i++) {
       const idx = (activeIndex + i) % items.length;
       list.push({ ...items[idx], originalIndex: idx });
    }
    return list;
  };

  const sidebarItems = getSidebarItems();

  return (
    <div className="news-carousel-wrapper">
      <h2 className="news-title">{title}</h2>

      {/* Mobile Swap Layout [NEW] */}
      <div className="news-mobile-split">
         <div className="news-main-card news-card">
            <div className="news-card__image main-img">
              <img src={items[activeIndex].img} alt="Main news" />
            </div>
            <div className="news-card__body">
               <p className="news-card__date">{items[activeIndex].date}</p>
               <p className="news-card__text">{items[activeIndex].text}</p>
            </div>
         </div>
         <div className="news-sidebar">
            {sidebarItems.map((item, idx) => (
              <div 
                className="news-side-card news-card" 
                key={idx}
                onClick={() => handleSwap(item.originalIndex)}
              >
                <div className="news-card__image-mini">
                   <img src={item.img} alt="Side news" />
                </div>
                <div className="news-card__body-mini">
                   <p className="news-card__date-mini">{item.date}</p>
                   <p className="news-card__text-mini">{item.text}</p>
                </div>
              </div>
            ))}
         </div>
      </div>

      {/* Desktop Snap Track — Visible only on Desktop via CSS */}
      <div
        ref={trackRef}
        className="news-snap-track desktop-only"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onScroll={handleScroll}
      >
        {infiniteItems.map((item, i) => (
          <div className="news-snap-card news-card" key={i}>
            <div className="news-card__image">
              <img src={item.img} alt={`card ${i + 1}`} draggable={false} />
            </div>
            <div className="news-card__body">
              <p className="news-card__date">{item.date}</p>
              <p className="news-card__text">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
