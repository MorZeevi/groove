import React, { useRef } from 'react'; // הסר useLayoutEffect
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import recordImg from '../../assets/image/record.png';

import './Hero.css'

gsap.registerPlugin(ScrollTrigger);

export default function Hero() { 
    const hero = useRef(); 
    
    // useGSAP(() => {
    //     const boxes = gsap.utils.toArray('.box');
        
    //     boxes.forEach((box, index) => {
    //         const isEven = index % 2 === 0;
            
    //         gsap.fromTo(box, 
    //         {
    //             x: 0, y: 0, rotation: 0, scale: 1
    //         },
    //         {
    //             x: isEven ? "70vw" : "-70vw",
    //             y: "-30vh", 
    //             rotation: isEven ? 25 : -25,
    //             scrollTrigger: {
    //                 trigger: box,
    //                 start: 'center bottom',
    //                 end: 'center top',
    //                 scrub: 1.5,
    //             }
    //         });
    //     });
    // }, { scope: hero });

    return (
        <div className="hero-container layout-grid" ref={hero}>
     

           <div className="box" id="hero-content">
           <img src={recordImg} alt="record-ing" />
            <div>
        לגרוב גרביים מלאות בגרוב        
            </div>
            <h3>
                .גרביים מגניבות, איכותיות במגוון צבעים וצורות
                <br />
                איכות פרימיון, ללא ניצול ו100% כותנה אורגנית
            </h3>

            <button>
                לגרבי הפיצה החדשות שלנו! 
            </button>
          </div>
         <div className="box" id="hero-img">
            Image
          </div>
            </div>
    )
}