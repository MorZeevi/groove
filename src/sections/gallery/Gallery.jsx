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
import afterSocks from '../../assets/image/after.png';
import beforeSocks from '../../assets/image/before.png';
import { useResponsiveGSAP } from '../../hooks/useResponsiveGSAP';
import { SplitText } from 'gsap/SplitText';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Gallery() {
  const galleryRef = useRef(null);
  const comparisonSectionRef = useRef(null);
  const containerRef = useRef(null);
  const textPathRef = useRef(null);
  const svgContainerRef = useRef(null);


  useResponsiveGSAP(({ isMobile, isDesktop }) => {
    // Text Path Animation with ScrollTrigger - Fixed only within container
    const textPath = textPathRef.current;
    const svgContainer = svgContainerRef.current;
    const container = containerRef.current;


        const galleryTitle = new SplitText(".galley-des", {
            type: "chars",
        });

        
    
    if (textPath && svgContainer && container) {
      // Set initial position
      gsap.set(svgContainer, {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000
      });

      // Create the main timeline for text path movement
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          end: "bottom bottom",
          scrub: 1,
          start: "top top",
          onUpdate: (self) => {
            // Keep the SVG fixed in viewport while scrolling through container
            const progress = self.progress;
            const containerRect = container.getBoundingClientRect();
            
            if (containerRect.top <= 0 && containerRect.bottom >= window.innerHeight) {
              // Container fills the viewport - keep SVG fixed
              gsap.set(svgContainer, {
                position: 'fixed',
                top: '50%',
                transform: 'translateY(-50%)'
              });
            } else if (containerRect.top > 0) {
              // Container hasn't reached top of viewport yet
              gsap.set(svgContainer, {
                position: 'absolute',
                top: 0,
                transform: 'translateY(0)'
              });
            } else if (containerRect.bottom < window.innerHeight) {
              // Container is leaving the viewport from top
              gsap.set(svgContainer, {
                position: 'absolute',
                top: 'auto',
                bottom: 0,
                transform: 'translateY(0)'
              });
            }
          },
          onLeave: () => {
            // When leaving the container, position at bottom
            gsap.set(svgContainer, {
              position: 'absolute',
              top: 'auto',
              bottom: 0,
              transform: 'translateY(0)'
            });
          },
          onEnterBack: () => {
            // When entering back from bottom
            gsap.set(svgContainer, {
              position: 'fixed',
              top: '50%',
              transform: 'translateY(-50%)'
            });
          },
          onLeaveBack: () => {
            // When leaving back to top
            gsap.set(svgContainer, {
              position: 'absolute',
              top: 0,
              transform: 'translateY(0)'
            });
          }
        }
      });

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
      // Animate the text along the path
      tl.fromTo(textPath, {
        attr: { startOffset: "200%" }
      }, {
        attr: { startOffset: "-80%" },
        ease: "none"
      });
    }

    // Gallery skew effect
    const images = galleryRef.current?.querySelectorAll('img');
    if (images) {
      let skewSetter = gsap.quickTo(images, "skewY");
      let clamp = gsap.utils.clamp(-10, 10);
      let currentVelocity = 0;
      let scrollTimeout;

      ScrollTrigger.create({
        trigger: galleryRef.current,
        start: "top bottom", 
        end: "bottom top",     
        onUpdate: (self) => {
          currentVelocity = self.getVelocity();
          skewSetter(clamp(currentVelocity / -10));
          
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            skewSetter(0);
          }, 150);
        },
        onLeave: () => {
          skewSetter(0);
        },
        onEnterBack: () => {
          skewSetter(clamp(currentVelocity / -10));
        },
        onLeaveBack: () => {
          skewSetter(0);
        }
      });
    }



    // Comparison section animation
    const comparisonSection = comparisonSectionRef.current;
    if (comparisonSection) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: comparisonSection,
          start: "center center",
          end: () => "+=" + comparisonSection.offsetWidth,
          scrub: true,
          pin: true,
          anticipatePin: 1
        },
        defaults: { ease: "none" }
      });

      tl.fromTo(
        comparisonSection.querySelector(".afterImage"), 
        { yPercent: -100, x: 0 }, 
        { yPercent: 0 }
      )
      .fromTo(
        comparisonSection.querySelector(".afterImage img"), 
        { yPercent: 100, x: 0 }, 
        { yPercent: 0 }, 
        0
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
    
  }, { scope: containerRef });

  const colors = ["var(--pink)", "var(--purple)", "var(--baby-blue)", "var(--yellow)"];
const text = 'מעוצבות על ידי מעצבים מקומיים |🧶 100% כותנה מצרית | 👃🏻 מנדפות ריח |🧘🏽‍♀️ אורתופדיות'

const parts = text.split("|").map(s => s.trim()).filter(Boolean);


  return (
    <>
      {/* Add some content before container to test the effect */}
      {/* <div style={{ height: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Scroll down to see the animated text</h1>
      </div> */}

      {/* Main Container with relative positioning */}
      <div id="about-socks" ref={containerRef} style={{ position: 'relative', minHeight: '200vh' }}>
        {/* SVG Text Path Container - will be fixed only within containerRef */}
        <div 
          ref={svgContainerRef}
          style={{
            width: '100%',
            height: '100vh',
            pointerEvents: 'none',
          }}
        >
          <svg 
            viewBox="0 0 1975.253 184.288" 
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '100vw'
            }}
          >
            <defs>
              <path 
               startOffset="200%" 
      id="textPath1" 
              d="M5.5,7.5C162.3,84.6,360.6,15.5,518.8,89.9c31.5,14.8,60.3,35,92.1,49.2,43.3,19.3,90.7,27.2,137.7,33.7,76.6,10.7,155.1,18.1,230.8,2.4,44.1-9.2,86.1-26,129.5-38,110.1-30.6,228.2-29.8,339.2-2.7,174.5,42.7,338.8,149.5,517.8,134.5"
              />
            </defs>
            
            


<text className="text-benefits" direction="rtl" unicodeBidi="plaintext">
  <textPath ref={textPathRef} href="#textPath1" dominantBaseline="baseline"  startOffset="200%" >
    {parts.map((phrase, i) => (
      <tspan key={i} style={{
          fill: colors[i % colors.length],
          textShadow: `0 0 2px ${colors[i % colors.length]}` // use same color for glow
        }}>
        {phrase + " "}
      </tspan>
    ))}
  </textPath>
</text>
          </svg>
        </div>

        <h2 className="galley-des">מה אנחנו הכי אוהבים בגרביים שלנו</h2>
        
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

        <div ref={comparisonSectionRef} className="comparisonSection">
          <div className="pairs-img">
            <img src={beforeSocks} alt="socks-with-pairs-before"/>
          </div>
          <div className="pairs-img afterImage">
            <img src={afterSocks} alt="socks-with-pairs-after"/>
          </div>
        </div>
      </div>


    </>
  );
}