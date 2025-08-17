import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules'; 

// Import Swiper styles
import "./Insta.css";
import 'swiper/css';
import InstaIcon from '../../assets/svg/insta-icon';




gsap.registerPlugin(ScrollTrigger, SplitText);
// Import all 10 Instagram images
import insta1 from '../../assets/image/instgram/insta_1.png';
import insta2 from '../../assets/image/instgram/insta_2.png';
import insta3 from '../../assets/image/instgram/insta_3.png';
import insta4 from '../../assets/image/instgram/insta_4.png';
import insta5 from '../../assets/image/instgram/insta_5.png';
import insta6 from '../../assets/image/instgram/insta_6.png';
import insta7 from '../../assets/image/instgram/insta_7.png';
import insta8 from '../../assets/image/instgram/insta_8.png';
import insta9 from '../../assets/image/instgram/insta_9.png';
import insta10 from '../../assets/image/instgram/insta_10.png';

export default function InstagramSlider() {
  // Array of images with their custom styles
const slides = [
  { img: insta1, size: '22vw', top: '-25%' },   // big + high
  { img: insta2, size: '14vw', top: '65%' },    // small + low
  { img: insta3, size: '28vw', bottom: '-20%' },// very big + pushed down
  { img: insta4, size: '18vw', top: '20%' },    // medium
  { img: insta5, size: '22vw', bottom: '20%' }, // larger + far down
  { img: insta6, size: '12vw', top: '-5%' },   // tiny + way up
  { img: insta7, size: '35vw', bottom: '15%' }, // very big + mid-low
  { img: insta8, size: '16vw', top: '75%' },    // medium-small + very low
  { img: insta9, size: '25vw', top: '10%' },   // large + very high
  { img: insta10, size: '10vw', bottom: '25%' } // small + very low
];

  const instaWrapper = React.useRef();

  useGSAP(() => {
           const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.insta-wrapper',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
            }
        });

  const instaTitle = new SplitText(".insta-title", {
            type: "words, chars",
        });

        tl.fromTo(instaTitle.chars, {
            autoAlpha: 0,
            scale: 0,
            transformOrigin: "center center",
        }, {
            duration: 0.5,
            scale: 1,
            autoAlpha: 1,
            stagger: 0.05,
            ease: "back.out(1.7)",
        });

  })


  return (
    <div ref={instaWrapper} id="instush" className="insta-wrapper">
      <div className="insta-content">
        <h2 className="insta-title">כל שבוע גרביים
          <br />
          גרביים חדשות לפיד
        </h2>

        <button className="follow-us-btn white-btn">
          <div className="follow-left">עקבו אחרינו</div>
          <div className="divider" aria-hidden="true"></div>
          <div className="follow-right insta-icon-wrapper">
            <InstaIcon />
          </div>
        </button>
      </div>

      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={0}
        slidesPerView={3}
        style={{ height: '100%' }}
        speed={4000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        loop={true}
        freeMode={false}
        freeModeMomentum={false}
        allowTouchMove={false}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div 
              className="circle-image-container"
              style={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gridColumn: 1/24,
              }}
            >
              <img 
                src={slide.img} 
                alt={`Instagram ${index + 1}`}
                style={{
                  width: slide.size,
                  height: slide.size,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  position: 'absolute',
                  ...(slide.top && { top: slide.top }),
                  ...(slide.bottom && { bottom: slide.bottom }),
                  ...(!slide.top && !slide.bottom && { top: '50%', transform: 'translateY(-50%)' })
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}