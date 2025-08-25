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
import img6 from '../../assets/image/gallery/img_6.png';
import recordImg from '../../assets/image/record.png';

import { useResponsive, useResponsiveGSAP } from '../../hooks/useResponsive';
import { SplitText } from 'gsap/SplitText';
import ImageComprationDesktop from './ImageComprationDesktop';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Gallery() {
  const galleryRef = useRef(null);
  const comparisonSectionRef = useRef(null);
  const containerRef = useRef(null);

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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
    
  }, { scope: containerRef });

  return (
    <>
      <div id="about-socks" ref={containerRef} style={{ position: 'relative', minHeight: '220vh' }}>
        <h2 className="galley-des">
          <div>מזהירים מראש</div>
          <div>התמונות האלה עלולים לגרום לכם לרצות עוז זוג</div>
        </h2>
        
        <div className="gallery-container">
          <section ref={galleryRef} className="my-gallery layout-grid">
            <img 
              data-speed="0.8" 
              src={img1} 
              alt="socks-img" 
            />
            <img 
              data-speed="0.9" 
              src={img2} 
              alt="socks-img" 
            />
            <img 
              data-speed="1" 
              src={img3} 
              alt="socks-img" 
            />
            <img 
              data-speed="1.1" 
              src={img4} 
              alt="socks-img" 
            />
            <img 
              data-speed="0.9" 
              src={img5} 
              alt="socks-img" 
            />
            <img 
              data-speed="1" 
              src={img6} 
              alt="socks-img" 
            />
          </section>
        </div>
      </div>

      <ImageComprationDesktop /> 
    </>
  );
}