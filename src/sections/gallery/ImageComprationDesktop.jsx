// ComparisonSection.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useResponsive, useResponsiveGSAP } from '../../hooks/useResponsive';
import beforeSocks from '../../assets/image/before.png';
import afterSocks from '../../assets/image/after.png';
import beforeSocksMobile from '../../assets/image/before-socks-mobile.png';
import afterSocksMobile from '../../assets/image/after-socks-mobile.png';
import './ComparisonSection.css';

gsap.registerPlugin(ScrollTrigger);

// מונע קפיצות באייפון כשה־address bar משתנה
ScrollTrigger.config({ ignoreMobileResize: true });

const ComparisonSection = () => {
  const { isMobile } = useResponsive();
  const comparisonSectionRef = useRef(null);

  // רענון ScrollTrigger אחרי טעינת תמונות (מונע קפיצות/שבירות חישוב)
  useEffect(() => {
    const section = comparisonSectionRef.current;
    const imgs = Array.from(section?.querySelectorAll('img') || []);
    let loaded = 0;
    const onLoad = () => {
      loaded += 1;
      if (loaded === imgs.length) ScrollTrigger.refresh();
    };
    imgs.forEach(img => {
      if (img.complete) onLoad();
      else img.addEventListener('load', onLoad, { once: true });
    });
    return () => imgs.forEach(img => img.removeEventListener('load', onLoad));
  }, []);

  // רענון כשיש שינויי לייאאאוט/גובה מסביב (סקשנים מעל/מתחת וכד')
  useEffect(() => {
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    // לעקוב אחרי הורה וישירות אחרי ה-body כדי לתפוס שינויים גלובליים
    const section = comparisonSectionRef.current;
    if (section?.parentElement) ro.observe(section.parentElement);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);

  // רענון כאשר מצב רספונסיבי משתנה (mobile/desktop)
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [isMobile]);

  useResponsiveGSAP(() => {
    const section = comparisonSectionRef.current;
    if (!section) return;

    const afterWrap = section.querySelector('.afterImage');
    const afterImg  = section.querySelector('.afterImage img');

    // איפוס
    gsap.set([afterWrap, afterImg], { xPercent: 0, yPercent: 0, autoAlpha: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=100%',      // אנימציה לאורך גובה מסך
        scrub: 0.1,
        pin: true,
        // אל תכריח pinType; ל-GSAP יש זיהוי אוטומטי. pinReparent עוזר בספארי/iOS
        pinReparent: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // markers: true,
      },
      defaults: { ease: 'none' }
    });

    // שכבת ה-after "נכנסת" מלמעלה ומגלה את ה-before שמתחת
    tl.fromTo(afterWrap, { yPercent: -100 }, { yPercent: 0 })
      .fromTo(afterImg,  { yPercent:  100 }, { yPercent: 0 }, 0);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, { scope: comparisonSectionRef });

  const beforeSrc = isMobile && beforeSocksMobile ? beforeSocksMobile : beforeSocks;
  const afterSrc  = isMobile && afterSocksMobile  ? afterSocksMobile  : afterSocks;

  return (
    <div ref={comparisonSectionRef} className="comparisonSection">
      <div className="pairs-img beforeImage">
        <img src={beforeSrc} alt="before comparison" />
      </div>
      <div className="pairs-img afterImage">
        <img src={afterSrc} alt="after comparison" />
      </div>
    </div>
  );
};

export default ComparisonSection;
