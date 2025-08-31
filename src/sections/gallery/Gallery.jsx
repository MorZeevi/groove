import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Gallery.css';

// Import your images here
import img1 from '../../assets/image/gallery/img_1.png';
import img2 from '../../assets/image/gallery/img_2.png';
import img3 from '../../assets/image/gallery/img_3.png';
import img4 from '../../assets/image/gallery/img_4.png';
import img5 from '../../assets/image/gallery/img_5.png';

import { useResponsive, useResponsiveGSAP } from '../../hooks/useResponsive';
import { SplitText } from 'gsap/SplitText';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Gallery() {
  const galleryRef = useRef(null);

  const containerRef = useRef(null);
  const {isMobile} =useResponsive();

  useResponsiveGSAP(({isDesktop, isTablet, isMobile}) => {
    const container = containerRef.current;

    // Gallery title animation
    const galleryTitle = new SplitText(".galley-des", {
      type: "chars",
    });

    // Title animation timeline
    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: () => `top bottom-=${Math.round(innerHeight * 0.3)}`, 
        toggleActions: "play none none reverse",
      }
    });

    titleTl.fromTo(galleryTitle.chars, {     
      autoAlpha: 0,
      scale: 0,
      transformOrigin: "center center",    
    }, {
      duration: 0.8,
      scale: 1,          
      autoAlpha: 1,    
      stagger: 0.05,   
      ease: "back.out(1.7)",
    });

    // Gallery skew effect
    const images = galleryRef.current?.querySelectorAll('img');
    if (images) {
      let skewSetter = gsap.quickTo(images, "skewY");
      let clamp = gsap.utils.clamp(-2, 2);
      let currentVelocity = 0;
      let scrollTimeout;

      ScrollTrigger.create({
        trigger: galleryRef.current,
        start: "top bottom", 
        end: "bottom top",     
        onUpdate: (self) => {
          currentVelocity = self.getVelocity();
          skewSetter(clamp(currentVelocity / 50));
          
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            skewSetter(0);
          }, 50);
        },
        onLeave: () => {
          skewSetter(0);
        },
        onEnterBack: () => {
          skewSetter(clamp(currentVelocity / -50));
        },
        onLeaveBack: () => {
          skewSetter(0);
        }
      });
    }


      // ---- Titles + Descriptions per card (title first, then desc lines) ----
    const cards = gsap.utils.toArray('.gallery-text');

    // keep refs for cleanup
    const splitKeep = [];
    const triggerKeep = [];

    cards.forEach((card) => {
      const titleEl = card.querySelector('.gallery-title');
      const descEls = card.querySelectorAll('.gallery-desc');
      if (!titleEl) return;

      // timeline per card
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'bottom top',
          toggleActions: 'play none none reverse'
        }
      });
      triggerKeep.push(tl.scrollTrigger);

      // --- TITLE entrance (gentle, luxury) ---
      const titleSplit = new SplitText(titleEl, { type: 'chars' });
      splitKeep.push(titleSplit);

      tl.fromTo(
        titleSplit.chars,
        { opacity: 0, y: 6, scale: 0.985, filter: 'blur(4px)' },
        {
          opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
          duration: 0.9,
          ease: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
          stagger: { each: 0.025, from: 'center' }
        }
      ).to(titleEl, {
        letterSpacing: '0.01em',
        duration: 0.8,
        ease: 'power1.out'
      }, '0.1-<');

      // --- DESCRIPTIONS: masked line reveal after title ---
      descEls.forEach((p) => {
        p.classList.add('split');

        const splitDesc = SplitText.create(p, {
          type: 'words,lines',
          linesClass: 'line',
          autoSplit: true,
          mask: 'lines',
          onSplit: (self) => {
            // line-by-line slide-up
            const lineTween = gsap.from(self.lines, {
              duration: 0.4,
              yPercent: 100,
              opacity: 0,
              stagger: 0.1,
              ease: 'expo.out'
            });
            // add AFTER the title animation
            tl.add(lineTween, '0.3-<');
            return lineTween;
          }
        });

        splitKeep.push(splitDesc);
      });
    });

    // --- Cleanup (replaces your previous captions cleanup) ---
    return () => {
      // kill per-card triggers
      triggerKeep.forEach(t => t && t.kill());
      // revert all SplitText instances
      splitKeep.forEach(s => s && s.revert && s.revert());
      // (Optional) if you want to keep other ScrollTriggers, remove the next line:
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: containerRef });

  return (

      <div id="about-socks" ref={containerRef} style={{ position: 'relative', minHeight: '220vh' }}>
        <h2 className="galley-des">
<div> למה אנחנו כל כך </div>
<div> אוהבים את הגרביים שלנו</div>
        </h2>
        
        <div className="gallery-container">
  <section ref={galleryRef} className={`my-gallery ${isMobile ? '' : 'layout-grid'}`}>
  <div className="gallery-item">
    <img data-speed="0.8" src={img1} alt="socks-img" />
    <div className="gallery-text">
      <div className="gallery-title title-1">נוחות מקסימלית</div>
      <p className="gallery-desc">הגרביים עשויות מבדים רכים ונושמים השומרים על הרגל נעימה ויבשה לאורך כל היום.</p>
      <p className="gallery-desc">התפרים הדקים והגזרה המדויקת מונעים חיכוך ומעניקים תחושת נוחות שאין שנייה לה.</p>
    </div>
  </div>

  <div className="gallery-item">
    <img data-speed="0.9" src={img2} alt="socks-img" />
    <div className="gallery-text sticker-yellow">
      <div className="gallery-title title-2">מעוצבות ע״י מעצבים מקומיים</div>
      <p className="gallery-desc">כל זוג גרביים נושא עיצוב ייחודי שנוצר על ידי מעצבים ישראלים מוכשרים.</p>
      <p className="gallery-desc">כך אתם נהנים גם מסטייל מקורי וגם מתמיכה בעשייה מקומית.</p>
    </div>
  </div>

  <div className="gallery-item">
    <img data-speed="1" src={img3} alt="socks-img" />
    <div className="gallery-text">
      <div className="gallery-title title-3">משדרגות כל לוק</div>
      <p className="gallery-desc">בין אם זה ג'ינס פשוט או חליפה מחויטת – הגרביים מוסיפות טאץ' צבעוני ומדליק.</p>
      <p className="gallery-desc">הן הפרט הקטן שעושה את כל ההבדל ומבליט את האישיות שלך.</p>
    </div>
  </div>

  <div className="gallery-item">
    <img data-speed="1.1" src={img4} alt="socks-img" />
    <div className="gallery-text">
      <div className="gallery-title title-4">איכות פרימיום</div>
      <p className="gallery-desc">עשויות מחומרים עמידים ואיכותיים, הגרביים שומרות על הצבעים והצורה גם אחרי כביסות רבות.</p>
      <p className="gallery-desc">כל פריט עובר בקרת איכות קפדנית כדי להבטיח מוצר שיישאר איתך לאורך זמן.</p>
    </div>
  </div>

  <div className="gallery-item">
    <img data-speed="0.9" src={img5} alt="socks-img" />
    <div className="gallery-text">
      <div className="gallery-title title-5">המתנה המושלמת</div>
      <p className="gallery-desc">גרביים מעוצבות הן שילוב של שימושיות והפתעה צבעונית – מתנה שתמיד כיף לקבל.</p>
      <p className="gallery-desc">הן מתאימות לכל גיל ואירוע, ומעלות חיוך עוד לפני שפותחים את האריזה.</p>
    </div>
  </div>
</section>

        </div>
      </div>

  );
}