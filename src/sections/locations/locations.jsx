import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';


import IsraelMap from '../../assets/svg/Israel-map';
import './locations.css';
import storeImg1 from '../../assets/image/store_1.png';
import storeImg2 from '../../assets/image/store_2.png';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin);

export default function Locations() {
    const locationWrapperRef = useRef();
    const mapRef = useRef();
    const img1Ref = useRef();
    const img2Ref = useRef();
    const img1ContainerRef = useRef();
    const img2ContainerRef = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.location-title',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
            }
        });

        // Get elements
        const paths = mapRef.current?.querySelectorAll('path') || [];
        const circles = mapRef.current?.querySelectorAll('circle') || [];
        const texts = mapRef.current?.querySelectorAll('text') || [];

        // Set initial states for SVG elements
        if (paths.length > 0) {
            gsap.set(paths, {
                strokeDasharray: function(index, target) {
                    return target.getTotalLength();
                },
                strokeDashoffset: function(index, target) {
                    return target.getTotalLength();
                }
            });
        }

        if (circles.length > 0) {
            gsap.set(circles, {
                scale: 0,
                opacity: 0,
                transformOrigin: "center center"
            });
        }

        if (texts.length > 0) {
            gsap.set(texts, {
                scale: 0,
                opacity: 0,
                transformOrigin: "center center"
            });
        }

        // Set initial states for images
        gsap.set([img1Ref.current, img2Ref.current], {
            scale: 1.2,
            opacity: 1
        });

        const locationTitle = new SplitText(".location-title", {
            type: "words, chars",
        });

        // Title animation
   tl.fromTo(locationTitle.chars, {
  autoAlpha: 0,
  scale: 0,
  transformOrigin: "center center",
}, {
  duration: 0.35,       // was 0.5
  scale: 1,
  autoAlpha: 1,
  stagger: 0.02,        // was 0.05
  ease: "back.out(1.4)" // slightly less overshoot = feels snappier
});

// MAP PATHS (shorter + start earlier)
if (paths.length > 0) {
  tl.to(paths, {
    strokeDashoffset: 0,
    duration: 0.25,     // was 0.4
    ease: "power2.inOut",
    stagger: 0.06       // was 0.1
  }, "-=0.25");         // was "-=1" (start closer to title end)
}

// MAP CIRCLES (shorter + tighter stagger + overlap)
if (circles.length > 0) {
  tl.to(circles, {
    scale: 1,
    opacity: 1,
    duration: 0.2,      // was 0.3
    ease: "back.out(1.5)",
    stagger: 0.1        // was 0.2
  }, "-=0.2");
}

// MAP TEXTS (shorter + overlap)
if (texts.length > 0) {
  tl.to(texts, {
    scale: 1,
    opacity: 1,
    duration: 0.2,      // was 0.3
    ease: "back.out(1.5)",
    stagger: 0.08       // was 0.2
  }, "-=0.15");
}

// IMAGE 1 (shorter)
tl.fromTo(img1ContainerRef.current, {
  clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
}, {
  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  duration: 0.35,       // was 0.5
  ease: "power2.inOut",
}, "-=0.35")
.to(img1Ref.current, {
  scale: 1,
  duration: 0,
  ease: "power2.out",
}, "-=0.6");

// IMAGE 2 (shorter + overlap more)
tl.fromTo(img2ContainerRef.current, {
  clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
}, {
  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  duration: 0.35,       // was 0.5
  ease: "power2.inOut",
}, "-=0.35")
.to(img2Ref.current, {
  scale: 1,
  duration: 0.15,       // was 0.2
  ease: "power2.out",
}, "<")
.fromTo(".store-text", {
  autoAlpha: 0,
  y: 24,                // was 30
}, {
  autoAlpha: 1,
  y: 0,
  duration: 0.35,       // was 0.5
  ease: "power2.out",
}, "-=0.35");

// DESCRIPTION POP (shorter pops)
tl.fromTo(".location-description", {
  autoAlpha: 0,
  scale: 0,
  transformOrigin: "center center",
}, {
  autoAlpha: 1,
  scale: 1,
  duration: 0.35,       // was 0.6
  ease: "power2.out",
}, "-=0.25")
.to(".location-description", {
  rotation: 15,
  duration: 0.1,        // was 0.15
  ease: "power2.inOut",
  yoyo: true,
  repeat: 1,
}, ">")
.to(".location-description", {
  scale: 1.04,          // was 1.05
  duration: 0.14,       // was 0.2
  ease: "power2.out",
  yoyo: true,
  repeat: 1,
}, "<");


    }, { scope: locationWrapperRef.current });

    return (
        <div ref={locationWrapperRef} id="location" className="locations-wrapper layout-grid">
            <h2 className="location-title">בואו לגרוב איתנו <br/>
            בחנות הקרובה לביתכם</h2>
            
            <div 
                data-text="בקרו אותו באחת מהחנויות המגניבות שלנו ותהנו מזוג גרביים חדשים!" 
                className="location-description sticker-text sticker-yellow"
            >
                בקרו אותו באחת מהחנויות המגניבות שלנו ותהנו מזוג גרביים חדשים!
            </div>
            
            <div className="map-wrapper">
                <IsraelMap ref={mapRef}/>
            </div>
            
            <div ref={img1ContainerRef} className="img-reveal-container" id="store-img-container-1">
                <img ref={img1Ref} id="store-img-1" src={storeImg1} alt="Store 1" />
            </div>
            
            <div ref={img2ContainerRef} className="img-reveal-container" id="store-img-container-2">
                <img ref={img2Ref} id="store-img-2" src={storeImg2} alt="Store 2" />
            </div>
            
            <div className="store-text">
                <span id="number-three">3</span>
                <span>חנויות מלאות בכיף <br/> יש בישראל</span>
            </div>
        </div>
    );
}