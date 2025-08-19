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

// Helps prevent iOS address-bar resize from causing "jump"
ScrollTrigger.config({ ignoreMobileResize: true });

const ComparisonSection = () => {
  const { isMobile } = useResponsive();
  const comparisonSectionRef = useRef(null);

  // refresh ST after images load to avoid layout shift
  useEffect(() => {
    const imgs = Array.from(
      comparisonSectionRef.current?.querySelectorAll('img') || []
    );
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

  useResponsiveGSAP(() => {
    const section = comparisonSectionRef.current;
    if (!section) return;

    const afterWrap = section.querySelector('.afterImage');
    const afterImg  = section.querySelector('.afterImage img');

    // reset
    gsap.set([afterWrap, afterImg], { xPercent: 0, yPercent: 0, autoAlpha: 1 });

    const pinType = ScrollTrigger.isTouch ? 'transform' : 'fixed';

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=100%',              // animate across one viewport height
        scrub: true,
        pin: true,
        pinType,
        pinSpacing: true,          // we manage spacing via section height, avoids jump
        anticipatePin: 1,
        invalidateOnRefresh: true
      },
      defaults: { ease: 'none' }
    });

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
