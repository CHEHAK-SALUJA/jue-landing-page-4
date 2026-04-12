import { useState, useRef } from 'react';

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

// How many cards visible at once
const VISIBLE = 3;

export default function NewsCarousel({ title = 'News & Press Release', items = defaultNews }) {
  // currentIndex = index of the leftmost visible card
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const maxIndex = items.length - VISIBLE; // can't go beyond this

  const touchStartX = useRef(null);
  const mouseStartX = useRef(null);

  const slide = (dir) => {
    if (isAnimating) return;
    const next = currentIndex + dir;
    if (next < 0 || next > maxIndex) return;
    setIsAnimating(true);
    setCurrentIndex(next);
    setTimeout(() => setIsAnimating(false), 400);
  };

  // ── Touch ──
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(diff) < 40) return;
    slide(diff > 0 ? 1 : -1); // swipe left (+1) or swipe right (-1)
  };

  // ── Mouse drag (desktop) ──
  const onMouseDown = (e) => { mouseStartX.current = e.clientX; };
  const onMouseUp = (e) => {
    if (mouseStartX.current === null) return;
    const diff = mouseStartX.current - e.clientX;
    mouseStartX.current = null;
    if (Math.abs(diff) < 40) return;
    slide(diff > 0 ? 1 : -1);
  };

  // Track width = total items × (100 / VISIBLE)%
  // Each card = (100 / VISIBLE)% of the viewport
  const cardWidthPct = 100 / VISIBLE;
  const trackTranslate = -(currentIndex * cardWidthPct);

  return (
    <div className="news-carousel-wrapper">
      <h2 className="news-title">{title}</h2>

      {/* Viewport clips overflow */}
      <div
        className="news-carousel-viewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        style={{ userSelect: 'none', cursor: 'grab' }}
      >
        {/* Track — all cards in one row */}
        <div
          className="news-carousel-track"
          style={{
            display: 'flex',
            gap: '8px',
            transform: `translateX(calc(${trackTranslate}% - ${currentIndex * 8 / VISIBLE}px))`,
            transition: isAnimating ? 'transform 0.38s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
          }}
        >
          {items.map((item, i) => (
            <div
              className="news-card"
              key={i}
              style={{ flex: `0 0 calc(${cardWidthPct}% - ${8 * (VISIBLE - 1) / VISIBLE}px)` }}
            >
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
    </div>
  );
}
