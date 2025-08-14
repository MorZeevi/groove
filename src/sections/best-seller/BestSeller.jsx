import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

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
gsap.registerPlugin(MorphSVGPlugin);

export default function BestSeller() {
    const [itemNum, setItemNum] = useState(0);


    
    const svgRef = useRef(null);
    const pathRef = useRef(null);
    const swiperRef = useRef(null);
    const titleRef = useRef(null);

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
            shape: "M207.874 327c-44.383 0-44.383-53.263-88.766-53.263C68.024 273.737 0 258.961 0 207.862c0-44.381 53.248-44.381 53.248-88.761C53.248 68.039 68.024 0 119.126 0c44.384 0 44.384 53.264 88.766 53.264C258.958 53.264 327 68.039 327 119.138c0 44.382-53.267 44.382-53.267 88.762-.019 51.156-14.775 119.1-65.859 119.1Z",
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

    const popTitle = React.useCallback(() => {
        if (!titleRef.current) return;
        gsap.killTweensOf(titleRef.current);
      gsap.fromTo(
        titleRef.current,
        { scale: 0.85, y: -6, opacity: 0.8 },
        { scale: 1.1, y: 0, opacity: 1, duration: 0.35, ease: "back.out(2)" }
        );
    })

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

                <div className="item-info">
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