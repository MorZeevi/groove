import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { useResponsive, useResponsiveGSAP } from '../../hooks/useResponsive';

import recordImg from '../../assets/image/record.png';
import heroImg from '../../assets/image/hero-img.png';

import './Hero.css'

// Register plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() { 
    const hero = useRef(); 
    const recordRef = useRef();
    const spanRef = useRef();
    const contentWrapperRef = useRef();
    const heroImgRef = useRef();



    useResponsiveGSAP(({ isDesktop, isMobile }) => {
  
        
     // Hide hero image initially
        gsap.set(heroImgRef.current, {
            opacity: 0,
            scale: 0.8,
        });


        const splitText = new SplitText("#title-h1", {
            type: "words, chars",
        });

        const subTitleSplit = new SplitText(".subtitle-hero", {
            type: "lines, words"
        })

        const lastWord = splitText.words[splitText.words.length - 1];
        

        gsap.set(".CTA-btn", { autoAlpha: 0, y: 24, willChange: "transform, opacity" });

        const tl = gsap.timeline();

        tl.fromTo(splitText.chars, {     
            autoAlpha: 0,
            scale: 0,
            transformOrigin: "center center",    
        }, {
            duration: 0.8,
            scale: 1,          
            autoAlpha: 1,    
            stagger: 0.05,   
            ease: "back.out(1.7)",
        })
        if (isDesktop) {
            tl.to(lastWord, {
            x: isMobile ? -70 : -100,
            duration: 0.8,
            ease: "power2.out",
        }, "+=0.3")
        }
        
        tl.fromTo(recordRef.current, {
            y: -400,
            opacity: 0,
            scale: 0.3,
            rotation: 360,
        }, {
            y: 0,
            opacity: 1,             
            scale: 1,                 
            rotation: 0,        
            duration: 1.2,            
            ease: "bounce.out",
        }, "-=0.6") 
        if (isDesktop) {
            tl.to(contentWrapperRef.current, {
            x: '-50vw',
            y: 0,
            duration: 1.5,
            ease: "power2.inOut",
        }, "+=0.5")
        } // PHASE 2: Move content wrapper to the right side
        // 🎵 PHASE 3: Hero image reveal from right
tl.fromTo(heroImgRef.current, {
    x: "100%",
    opacity: 0,
    scale: 0.8,
}, {
    x: "0%",
    opacity: 1,
    scale: 1,
    duration: 1.4,
    ease: "power3.out",
}, "-=1").from(subTitleSplit.lines, {
 duration: 0.6,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
}).fromTo(".CTA-btn",
  { autoAlpha: 0, y: 24 },                 // start slightly below + hidden
  { autoAlpha: 1, y: 0, duration: 0.6, ease: "expo.out" },
  ">+0.1"                                  // after subtitle finishes
).to(".CTA-btn", {
  yPercent: 50,                           // slide out (down) by its own height
  duration: 0.6,
  ease: "expo.in",
  // clearProps: "transform"    // optional: remove inline transform after
}, "-=0.5");  

if (isMobile) {
    tl.to(".CTA-btn", {
  yPercent: 2,             // gentle up/down movement
  duration: 3,              // slower for smooth floating
  ease: "power1.inOut",     // soft easing
  repeat: -1,               // infinite loop
  yoyo: true})    
}





 // Pin range – אחד לכולם
const pinST = ScrollTrigger.create({
  trigger: hero.current,
  start: "top top",
  end: "+=40%",   // נסה 80–120% לפי הטעם
  pin: true,
  anticipatePin: 1, // מפחית "קפיצה" בתחילת ה-pin
});

// שאילתה לפי scope
const q = gsap.utils.selector(hero);

// תוכן שמאלה
gsap.fromTo(
  q(".hero-img"),
  { xPercent: 0, rotation: 0 },
  {
  xPercent: 70,
      rotation: 30,
    ease: "none",
    scrollTrigger: {
      trigger: hero.current,
      start: "top top",
      end: pinST.end,       // אותו טווח כמו ה-pin
      scrub: 0.2            // או true
    }
  }
);

// תמונה ימינה
// תוכן שמאלה
gsap.fromTo(
  q(".hero-content"),
  { xPercent: 0, rotation: 0 },
  {
//   xPercent: -70,
      rotation: -30,
    ease: "none",
    scrollTrigger: {
      trigger: hero.current,
      start: "top top",
      end: pinST.end,       // אותו טווח כמו ה-pin
      scrub: 0.2            // או true
    }
  }
);


// אחרי טעינת תמונות/פונטים – לרענן:
window.addEventListener("load", () => ScrollTrigger.refresh());
    }, { scope: hero });
    
    return (<>
        <div className="hero-container" ref={hero}>
            <div className="hero-content-wrapper box layout-grid" ref={contentWrapperRef}>
                <div className="hero-content">
                    <h1 id="title-h1">
                        <div>
                        <span>לגרוב גרביים</span>
                        </div>
                       <div className="second-line-title">
                        <span ref={spanRef}>מלאות</span>
                        <span> בגרוב</span>
                        </div>
                    </h1>
                    
                    <div 
                    id="record-wrapper"
                        ref={recordRef}
                    >
                        <img 
                            src={recordImg} 
                            alt="Record" 
                            style={{ 
                                width: '100%',
                                height: '100%',
                                // display: 'block'
                            }}
                        />
                    </div>

                            <div className="subtitle-hero">
                    גרביים מגניבות, איכותיות במגוון צבעים וצורות. <br />
                    איכות פרימיום, ללא ניצול ו100% כותנה אורגנית.
                </div>
                
                <button className="CTA-btn">
                    לגרבי הפיצה החדשות שלנו!
                </button>
                </div>
            </div>
            
            <div className="box hero-img" ref={heroImgRef}>
                <img src={heroImg} alt="Hero-image-pepole-on-bike" /> 
            </div>
        </div>
         
      
    </>)
}