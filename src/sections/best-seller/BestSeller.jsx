import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

import './BestSeller.css';

// import required modules
import { EffectCoverflow, Navigation } from 'swiper/modules';

const images = import.meta.glob('../../assets/image/pizza/*.png', { eager: true });
import arrow from '../../assets/image/arrow.png';

// Register the plugin
gsap.registerPlugin(MorphSVGPlugin, SplitText, ScrollTrigger);

export default function BestSeller() {
    const [itemNum, setItemNum] = useState(0);

    
    
    const svgRef = useRef(null);
    const pathRef = useRef(null);
    const swiperRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    

    const pizzaSocksArr = [
        {
            id: 1,
            title: 'גלקטיק',
            description: 'הגרבי פיצה הגלקטיים שלנו לוקחים אותך למסע בין כוכבים עם עיצוב שמיימי מרהיב. צבעים עמוקים ונגיעות של זוהר.',
            shape: "M165 286.668C40.201 390.958-60.957 289.799 43.333 165-60.957 40.201 40.2-60.957 165 43.333 289.775-60.957 390.958 40.2 286.668 165 390.958 289.704 289.775 390.958 165 286.668Z",
            image: images['../../assets/image/pizza/1.png']?.default
        },
        {
            id: 2,
            title: 'צבי הנינג׳ה',
            description: 'גרביי צבי הנינגה מחזירים אותך לרחובות ניו יורק, שם הגיבורים הירוקים ניזונים מפיצה חמה באמצע משימה',
            shape: "M221.629 263.021c49.819 85.306-166.057 85.306-116.238 0-92.286 85.306-126.718 50.835-41.412-41.392-85.305 49.819-85.305-166.057 0-116.238-85.305-92.286-50.835-126.718 41.412-41.412-49.819-85.305 166.057-85.305 116.238 0 92.286-85.305 126.698-50.835 41.392 41.412 85.306-49.819 85.306 166.057 0 116.238 85.306 92.266 50.894 126.698-41.392 41.392Z",
            image: images['../../assets/image/pizza/2.png']?.default
        },
        {
            id: 3,
            title: 'פיקניק',
            description: 'עיצוב משובץ בהשראת מפות שולחן של פיצריות קלאסיות. חמימות ונוסטלגיה בכל צעד',
            shape: "M47.888 47.888C31.5 64.276 25.581 87.17 30.132 108.257 12.003 119.95 0 140.323 0 163.5c0 23.176 12.003 43.55 30.132 55.243-4.551 21.087 1.368 43.98 17.756 60.369 16.389 16.388 39.282 22.307 60.369 17.757C119.95 314.997 140.323 327 163.5 327c23.176 0 43.55-12.003 55.243-30.131 21.087 4.55 43.98-1.369 60.369-17.757 16.388-16.389 22.307-39.282 17.757-60.369C314.997 207.05 327 186.676 327 163.5c0-23.177-12.003-43.55-30.131-55.243 4.55-21.087-1.369-43.98-17.757-60.369-16.389-16.388-39.282-22.307-60.369-17.756C207.05 12.003 186.676 0 163.5 0c-23.177 0-43.55 12.003-55.243 30.132C87.17 25.58 64.277 31.5 47.888 47.888Z",
            image: images['../../assets/image/pizza/3.png']?.default
        },
        {
            id: 4,
            title: 'קלאסית',
            description: 'עיצוב צבעוני עם משולשי גבינה מותכת ורוטב עגבניות עשיר, בדיוק כמו פיצה חמה שיצאה מהתנור',
            shape: "M228.895 228.89C359.702 359.703 -32.7018 359.703 98.1054 228.89C-32.7018 359.703 -32.7018 -32.6986 98.1054 98.0959C-32.7018 -32.6986 359.702 -32.6986 228.895 98.0959C359.702 -32.6986 359.702 359.703 228.895 228.89Z",
            image: images['../../assets/image/pizza/4.png']?.default
        },
           {
            id: 5,
            title: 'קלאסית',
            description: 'עיצוב צבעוני עם משולשי גבינה מותכת ורוטב עגבניות עשיר, בדיוק כמו פיצה חמה שיצאה מהתנור',
            shape: "M270.134 313.833C270.788 321.084 252.66 330.329 246.957 325.801C197.848 286.828 129.194 286.818 80.0744 325.77C74.3689 330.294 56.2207 321.035 56.8723 313.784C59.8682 280.44 46.5608 267.132 13.2165 270.128C5.96383 270.78 -3.29459 252.63 1.23019 246.925C40.182 197.808 40.1712 129.162 1.1982 80.0565C-3.32824 74.3533 5.9153 56.2242 13.1671 56.8772C46.5477 59.8831 59.8699 46.5771 56.8723 13.2166C56.2206 5.964 74.3689 -3.29453 80.0744 1.23009C129.194 40.1828 197.848 40.1721 246.957 1.19811C252.66 -3.32814 270.788 5.91544 270.134 13.1672C267.125 46.5631 280.444 59.884 313.832 56.8773C321.084 56.2243 330.328 74.352 325.802 80.0555C286.838 129.161 286.827 197.81 325.771 246.925C330.295 252.632 321.036 270.78 313.783 270.128C280.431 267.132 267.127 280.455 270.134 313.833Z",
            image: images['../../assets/image/pizza/4.png']?.default
        }, 

           {
            id: 6,
            title: 'קלאסית',
            description: 'עיצוב צבעוני עם משולשי גבינה מותכת ורוטב עגבניות עשיר, בדיוק כמו פיצה חמה שיצאה מהתנור',
            shape: "M163.49 327V301.558C80.2103 301.558 0 246.774 0 163.5H25.4234C25.4234 80.2259 80.2103 0 163.49 0V25.4426C246.769 25.4426 327 80.2259 327 163.5H301.577C301.577 246.774 246.769 327 163.49 327Z",
            image: images['../../assets/image/pizza/4.png']?.default
        }
    ];
    

    // Get current item based on itemNum with proper cycling
    const getCurrentItem = () => {
        const index = ((itemNum % pizzaSocksArr.length) + pizzaSocksArr.length) % pizzaSocksArr.length;
        return pizzaSocksArr[index];
    };

    useEffect(() => {
        if (pathRef.current) {
            const currentItem = getCurrentItem();
            
            gsap.to(pathRef.current, {
                morphSVG: currentItem.shape,
                duration: 1,
                ease: "power2.inOut"
            });
        }
    }, [itemNum]);


// title pop (keep yours)
const popTitle = React.useCallback(() => {
  if (!titleRef.current) return;
  gsap.killTweensOf(titleRef.current);
  gsap.fromTo(
    titleRef.current,
    { scale: 0.85, y: -6, opacity: 0.8 },
    { scale: 1.1, y: 0, opacity: 1, duration: 0.35, ease: "back.out(2)" }
  );
}, []);

// run after slide content (itemNum) updated
React.useLayoutEffect(() => {
  if (!descriptionRef.current) return;
  gsap.killTweensOf(descriptionRef.current);


  const split = new SplitText(descriptionRef.current, { type: "words" });
  
gsap.fromTo(
  split.words,
  { 
    autoAlpha: 0, 
    yPercent: 50,      // start below
    transformOrigin: "center center" 
  },
  { 
    autoAlpha: 1, 
    yPercent: 0,        // settle in place
    duration: 0.3,      // make it a bit longer for smoothness
    ease: "power3.out", // softer easing than back.out
    stagger: 0.02       // small gap between words
  })
}, [itemNum]);

    const handleNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
             popTitle();
            swiperRef.current.swiper.slideNext();
        }
    };

    const handlePrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            popTitle();
            swiperRef.current.swiper.slidePrev();
        }
    };

    const handleSlideChange = (swiper) => {
        
        setItemNum(swiper.realIndex);
         popTitle();
    };

    const currentItem = getCurrentItem();

    useGSAP(() => {
        const splitTitle = new SplitText("#pizza-title", {
            type: "words, chars",
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.best-container',
                start: 'top 80%',
                //  end: "bottom 20%",    
                toggleActions: "play none none reverse", 
            }
        });
        
        tl.fromTo(splitTitle.chars, {
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
    })


    return (
        <div className="best-container">
            <div className="content-wrapper layout-grid">
                <h2 id="pizza-title">חדש! גרבי פיצה</h2>
                
                <button id="prev-arrow" onClick={handlePrev}>
                    <img src={arrow} alt="prev-arrow"/>
                </button>

                <div className="shape-wrapper">
                    <svg 
                        ref={svgRef}
                        fill="none" 
                        viewBox="0 0 330 330"
                    >
                        <defs>
                            <clipPath id="clip">
                                <path fill="#fff" d="M0 0h330v330H0z"/>
                            </clipPath>
                        </defs>
                        <g clipPath="url(#clip)">
                            <path 
                                ref={pathRef}
                                fill="#ffff" 
                                d={pizzaSocksArr[0].shape} 
                            />
                        </g>
                    </svg>
                </div>

                <div
                    className="socks-title sticker-text sticker-yellow"
                    data-text={currentItem.title}
                    ref={titleRef}
                >
                    {currentItem.title}
                </div>

                {/* Swiper with 3 visible slides */}
                <div className="item-image">
                    <Swiper
                        ref={swiperRef}
                        grabCursor={true}
                        effect={'creative'}
                        centeredSlides={true}
                        slidesPerView={2}
                        initialSlide={3}
                        loop={true}
                        navigation={{
                            nextEl: '#next-arrow',
                            prevEl: '#prev-arrow',
                        }}
                        modules={[EffectCoverflow]}
                        onSlideChange={handleSlideChange}
                        className="mySwiper2"
                        speed={600}
                          breakpoints={{
                                0:   { slidesPerView: 1.3, spaceBetween: 16 },
                                640: { slidesPerView: 2,   spaceBetween: 20 },
                                1024:{ slidesPerView: 3,   spaceBetween: 24 },
                            }}
                                coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 150,
                                modifier: 1,
                                slideShadows: false,
                            }}
   
                    >
                        {pizzaSocksArr.map((item, index) => (
                            <SwiperSlide key={item.id}>
                                <div className="slide-content">
                                    <img 
                                        src={item.image} 
                                        alt={item.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                         
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="item-info" ref={descriptionRef}>
                    <p>{currentItem.description}</p>
                </div>
                
                <button id="next-arrow" onClick={handleNext}>
                    <img src={arrow} alt="arrow-next"/>
                </button>
            </div>
            
            {/* Pagination dots */}
            <div className="pagination">
                {pizzaSocksArr.map((_, index) => (
                    <span 
                        key={index}
                        className={`dot ${index === itemNum ? 'active' : ''}`}
                        onClick={() => {
                       if (swiperRef.current && swiperRef.current.swiper) {
-     
+         // use slideToLoop to target the closest looped slide
+         swiperRef.current.swiper.slideToLoop(index);
        }
                        }}
                    />
                ))}
            </div>
        </div>
    )
}