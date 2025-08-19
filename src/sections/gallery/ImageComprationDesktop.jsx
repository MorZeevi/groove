// ComparisonSection.jsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useResponsive, useResponsiveGSAP } from '../../hooks/useResponsive';
import beforeSocks from '../../assets/image/before.png';
import afterSocks from '../../assets/image/after.png';
import beforeSocksMobile from '../../assets/image/before-socks-mobile.png';
import afterSocksMobile from '../../assets/image/after-socks-mobile.png';
import './ComparisonSection.css';

gsap.registerPlugin(ScrollTrigger);

const ComparisonSection = () => {
  const { isMobile } = useResponsive();
  const comparisonSectionRef = useRef(null);

  useResponsiveGSAP(({ /* isDesktop, isTablet, isMobile */ }) => {
    const section = comparisonSectionRef.current;
    if (!section) return;

    const afterWrap = section.querySelector('.afterImage');
    const afterImg  = section.querySelector('.afterImage img');

    // reset to a known state before building the timeline (important when resizing)
    gsap.set([afterWrap, afterImg], { xPercent: 0, yPercent: 0, autoAlpha: 1 });

    // If your page uses a transformed scroller on mobile, force transform pinning:
    // const pinType = ScrollTrigger.isTouch ? 'transform' : 'fixed';

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'center center',
        end: 'bottom top',
        scrub: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      },
      defaults: { ease: 'none' }
    });

    tl.fromTo(afterWrap, { yPercent: -100 }, { yPercent: 0 })
      .fromTo(afterImg,  { yPercent:  100 }, { yPercent: 0 }, 0);

    // cleanup only this section's trigger/timeline
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, { scope: comparisonSectionRef });

  // keep responsive assets, animation is identical
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