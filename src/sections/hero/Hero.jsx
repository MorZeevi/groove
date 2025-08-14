import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

import recordImg from '../../assets/image/record.png';
import heroImg from '../../assets/image/hero-img.png';

import './Hero.css'

// Register plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() { 
    const hero = useRef(); 
    const recordRef = useRef();
    const spanRef = useRef();

    useGSAP(() => {
        const splitText = new SplitText("#title-h1", {
            type: "words, chars",
        });

        const lastWord = splitText.words[splitText.words.length - 1];
        
        gsap.set(splitText.chars, {
            scale: 0,
            autoAlpha: 0,
            transformOrigin: "center center",
        });

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
        .to(lastWord, {
            x: -100,
            duration: 0.8,
            ease: "power2.out",
        }, "+=0.3")
        .fromTo(recordRef.current, {
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



 // Pin range – אחד לכולם
const pinST = ScrollTrigger.create({
  trigger: hero.current,
  start: "top top",
  end: "+=60%",   // נסה 80–120% לפי הטעם
  pin: true,
  anticipatePin: 1 // מפחית "קפיצה" בתחילת ה-pin
});

// שאילתה לפי scope
const q = gsap.utils.selector(hero);

// תוכן שמאלה
gsap.fromTo(
  q(".hero-content"),
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
gsap.fromTo(
  q(".hero-img"),
  { xPercent: 0, rotation: 0 },
  {
  xPercent: -70,
      rotation: -30,
    ease: "none",
    scrollTrigger: {
      trigger: hero.current,
      start: "top top",
      end: pinST.end,
      scrub: 0.2
    }
  }
);

// אחרי טעינת תמונות/פונטים – לרענן:
window.addEventListener("load", () => ScrollTrigger.refresh());
    }, { scope: hero });
    
    return (<>
        <div className="hero-container" ref={hero}>
            <div className="hero-content-wrapper box layout-grid">
                <div className="hero-content">
                    <h1 id="title-h1">
                        <span>לגרוב גרביים</span>
                       <br />
                        <span ref={spanRef}>מלאות</span>
                        <span> בגרוב</span>
                    </h1>
                    
                    <div 
                        ref={recordRef}
                        style={{ 
                            position: 'absolute',
                            top: '46%',
                            right: '37%', 
                            width: '110px',
                            height: '110px',
                        }}
                    >
                        <img 
                            src={recordImg} 
                            alt="Record" 
                            style={{ 
                                width: '100%',
                                height: '100%',
                                display: 'block'
                            }}
                        />
                    </div>

                            <div>
                    גרביים מגניבות, איכותיות במגוון צבעים וצורות. <br />
                    איכות פרימיום, ללא ניצול ו100% כותנה אורגנית.
                </div>
                
                <button className="CTA-btn button-yellow">
                    לגרבי הפיצה החדשות שלנו!
                </button>
                </div>
            </div>
            
            <div className="box hero-img">
                <img src={heroImg} alt="Hero-image-pepole-on-bike" /> 
            </div>
        </div>
         
      
    </>)
}