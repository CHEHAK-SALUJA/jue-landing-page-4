import { useRef, useEffect } from 'react';

import highlight1 from '../assets/ai_images/highlight_1.png';
import highlight2 from '../assets/ai_images/highlight_2.png';
import highlight3 from '../assets/ai_images/highlight_3.png';
import highlight4 from '../assets/ai_images/highlight_4.png';
import highlight5 from '../assets/ai_images/highlight_5.png';
import highlight6 from '../assets/ai_images/highlight_6.png';

const defaultHighlights = [
  { img: highlight1, date: '2026.04.10', text: 'Innovative Robotics Lab: Leading the Future of Japanese Engineering.' },
  { img: highlight2, date: '2026.04.10', text: 'Vibrant Campus Life: Discovering the Hearts and Minds of Global Students.' },
  { img: highlight3, date: '2026.04.10', text: 'Prime Minister\'s Commendation for Distinguished Service in Greenery Promotion.' },
  { img: highlight4, date: '2026.04.10', text: 'Academic Excellence: Students collaborating in our modern, bright library space.' },
  { img: highlight5, date: '2026.04.10', text: 'Cultural Inclusion: International food festival celebrating our diverse student body.' },
  { img: highlight6, date: '2026.04.10', text: 'Career Success: Students connecting with top global recruiters at our annual fair.' },
];

export default function HighlightsCarousel({ title = 'Highlights', items = defaultHighlights }) {
  const trackRef = useRef(null);
  const touchStartX = useRef(null);
  const isTeleporting = useRef(false);

  // Triple items for infinite loop effect
  const infiniteItems = [...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      // Start in middle
      const setWidth = track.scrollWidth / 3;
      track.scrollLeft = setWidth;
    }
  }, [items.length]);

  const handleScroll = () => {
    if (isTeleporting.current) return;
    const track = trackRef.current;
    if (!track) return;

    const setWidth = track.scrollWidth / 3;
    if (track.scrollLeft < setWidth * 0.5) {
      isTeleporting.current = true;
      track.scrollLeft += setWidth;
      setTimeout(() => { isTeleporting.current = false; }, 50);
    } else if (track.scrollLeft > setWidth * 1.5) {
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

  return (
    <div className="news-carousel-wrapper">
      <h2 className="news-title">{title}</h2>
      <div
        ref={trackRef}
        className="news-snap-track"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onScroll={handleScroll}
      >
        {infiniteItems.map((item, i) => (
          <div className="news-snap-card news-card" key={i}>
            <div className="news-card__image">
              <img src={item.img} alt={`highlight ${i + 1}`} draggable={false} />
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
