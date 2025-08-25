import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import store1Img from '../../assets/image/store_1.png';
import store2Img from '../../assets/image/store_2.png';
import { useResponsiveGSAP, useResponsive } from '../../hooks/useResponsive';

import './WorkWithUs.css';

gsap.registerPlugin(ScrollTrigger);

export default function WorkWithUs() {
  const containerRef = useRef(null);
  const hoverElementRef = useRef(null);
  const timelineRef = useRef(null);
  const floatRef = useRef(null);

  const {isMobile } = useResponsive();
  const mmRef = useRef(null); // for matchMedia cleanup if you switch to it later

  useResponsiveGSAP(({ isMobile }) => {
    const container = containerRef.current;
    const hoverElement = hoverElementRef.current;
    if (!container || !hoverElement) return;

    // Grab elements
    const starBg = container.querySelector('.star-bg');
    const jobDes1 = container.querySelector('#job-des1');
    const jobDes2 = container.querySelector('#job-des2');
    const imgStore1 = container.querySelector('#img-store-1');
    const imgStore2 = container.querySelector('#img-store-2');
    const yellowLayer = container.querySelector('.yellow-layer');
    const pinkLayer = container.querySelector('.pink-layer');
    const blueLayer = container.querySelector('.blue-layer');
    const darkPurpleLayer = container.querySelector('.dark-purple-layer');

    // Initial state
    gsap.set([starBg], {
      opacity: 0,
      scale: 0,
      rotation: -180,
      transformOrigin: 'center center'
    });

    gsap.set([jobDes1, jobDes2], {
      opacity: 0,
      scale: 0,
      rotation: -15,
      transformOrigin: 'center center'
    });

    gsap.set([imgStore1, imgStore2], {
      opacity: 0,
      scale: 0,
      rotation: -10,
      transformOrigin: 'center center'
    });

    gsap.set([yellowLayer, pinkLayer, blueLayer, darkPurpleLayer], {
      opacity: 0,
      scale: 0,
      transformOrigin: 'center center'
    });

    // Timeline
    const tl = gsap.timeline({ paused: true });

    tl.to([yellowLayer, pinkLayer, blueLayer, darkPurpleLayer], {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: { each: 0.08, from: 'center' },
      ease: 'elastic.out(1.2, 0.5)',
      rotation: (i) => i * 2 - 3
    })
      .to(
        starBg,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.3)'
        },
        '-=0.4'
      )
      .to(
        jobDes1,
        {
          opacity: 1,
          scale: 1,
          rotation: 5,
          duration: 0.6,
          ease: 'elastic.out(1.5, 0.6)'
        },
        '-=0.6'
      )
      .to(
        jobDes2,
        {
          opacity: 1,
          scale: 1,
          rotation: -3,
          duration: 0.6,
          ease: 'elastic.out(1.5, 0.6)'
        },
        '-=0.5'
      )
      .to(
        imgStore1,
        {
          opacity: 1,
          scale: 1,
          rotation: 2,
          duration: 0.7,
          ease: 'elastic.out(1.3, 0.4)'
        },
        '-=0.4'
      )
      .to(
        imgStore2,
        {
          opacity: 1,
          scale: 1,
          rotation: -2,
          duration: 0.7,
          ease: 'elastic.out(1.3, 0.4)'
        },
        '-=0.6'
      )
      .to(
        [jobDes1, jobDes2],
        {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: 1
        },
        '-=0.2'
      )
      .to(
        imgStore1,
        {
          rotation: 4,
          duration: 0.2,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: 1
        },
        '-=0.4'
      )
      .to(
        imgStore2,
        {
          rotation: -4,
          duration: 0.2,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: 1
        },
        '-=0.4'
      );

    timelineRef.current = tl;

    // Floating star background
    const floatAnimation = gsap.to(starBg, {
      rotation: 360,
      duration: 20,
      ease: 'none',
      repeat: -1,
      paused: true
    });
    floatRef.current = floatAnimation;

    tl.eventCallback('onStart', () => floatAnimation.play());
    tl.eventCallback('onReverseComplete', () => floatAnimation.pause());

    // ---- Desktop: hover ----
    let enterHandler, leaveHandler;
    let stInstance; // ScrollTrigger instance for mobile

    if (!isMobile) {
      enterHandler = () => {
        gsap.to(hoverElement, {
          scale: 1.02,
          duration: 0.2,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1
        });
        timelineRef.current.play();
      };

      leaveHandler = () => {
        timelineRef.current.reverse();
      };

      hoverElement.addEventListener('mouseenter', enterHandler);
      hoverElement.addEventListener('mouseleave', leaveHandler);
    }

    // ---- Mobile: scroll trigger ----
    if (isMobile) {
      // אם רוצים שיתרחש פעם אחת בלבד: toggleActions: "play none none none"
      // אם רוצים כמו hover (קדימה כשנכנס, אחורה כשחוזרים למעלה): onEnter/onLeaveBack
      stInstance = ScrollTrigger.create({
        trigger: container,
        start: 'top 70%',   // כשהסקשן מגיע ~70% מגובה החלון
        end: 'bottom top',  // עד שיוצאים מלמעלה
        onEnter: () => timelineRef.current.play(),
        onLeaveBack: () => timelineRef.current.reverse()
        // לחלופין: toggleActions: "play reverse play reverse"
      });
    }

    // Cleanup
    return () => {
      if (enterHandler) hoverElement.removeEventListener('mouseenter', enterHandler);
      if (leaveHandler) hoverElement.removeEventListener('mouseleave', leaveHandler);
      if (stInstance) stInstance.kill();

      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      if (floatRef.current) {
        floatRef.current.kill();
        floatRef.current = null;
      }
       if (stInstance) stInstance.kill();
    };
  }, []);

  return (
      <div id="work-with-us" className={`work-container-wrapper ${!isMobile ? "layout-grid" : ""}`} ref={containerRef}>
      <div className="star-bg" />

      <div
        id="job-des1"
        data-text="שכר מעולה, תנאים טובים וגרביים מתנה כל שבוע"
        className="sticker-text sticker-yellow"
      >
        שכר מעולה, תנאים טובים
        וגרביים מתנה כל שבוע
      </div>

      <div
        id="job-des2"
        data-text="חולמת על עבודה שאפשר לשלב יחד עם התואר?"
        className="sticker-text sticker-pink"
      >
        חולמת על עבודה שאפשר
        לשלב יחד עם התואר?
      </div>

      <div className="work-with-us-wrapper" ref={hoverElementRef}>
        <div className="title-outline">
          רוצים לעבוד
          <br />
          איתנו?
        </div>
        <div className="yellow-layer">
          רוצים לעבוד
          <br />
          איתנו?
        </div>
        <div className="pink-layer">
          רוצים לעבוד
          <br />
          איתנו?
        </div>
        <div className="blue-layer">
          רוצים לעבוד
          <br />
          איתנו?
        </div>
        <div className="dark-purple-layer">
          רוצים לעבוד
          <br />
          איתנו?
        </div>
      </div>

      <div className="work-with-us-des">
        צוות צעיר, אווירה מחשמלת ותנאים מעולים
        <br />
        בחנות הגרביים הכי מגניבה בעיר.
      </div>

      <img id="img-store-1" src={store1Img} alt="Store 1" />
      <img id="img-store-2" src={store2Img} alt="Store 2" />
    </div>
  );
}
