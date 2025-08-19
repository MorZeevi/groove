import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import store1Img from '../../assets/image/store_1.png';
import store2Img from '../../assets/image/store_2.png';

import './WorkWithUsMobile.css'

export default function WorkWithUsMobile() {
    const containerRef = useRef(null);
    const hoverElementRef = useRef(null);

    return (
        <div id="work-with-us" className="layout-grid work-container-wrapper" ref={containerRef}>
            <div className="star-bg" />

            <div 
                id="job-des1" 
                data-text="שכר מעולה, תנאים טובים וגרביים מתנה כל שבוע" 
                className="sticker-text sticker-yellow"
            > 
                שכר מעולה, תנאים טובים
                וגרביים מתנה כל שבוע
            </div>

            <div 
                id="job-des2" 
                data-text="חולמת על עבודה שאפשר לשלב יחד עם התואר?"  
                className="sticker-text sticker-pink"
            > 
                חולמת על עבודה שאפשר
                לשלב יחד עם התואר?
            </div>
        
            <div className="work-with-us-wrapper" ref={hoverElementRef}>                               
                <div className="title-outline">רוצים לעבוד<br />איתנו?</div>
                <div className="yellow-layer">רוצים לעבוד<br />איתנו?</div>       
                <div className="pink-layer">רוצים לעבוד<br />איתנו?</div>             
                <div className="blue-layer">רוצים לעבוד<br />איתנו?</div>
                <div className="dark-purple-layer">רוצים לעבוד<br />איתנו?</div>
            </div>

            <div className="work-with-us-des">
                צוות צעיר, אווירה מחשמלת ותנאים מעולים 
                <br/>
                בחנות הגרביים הכי מגניבה בעיר.
            </div>     

            <img id="img-store-1" src={store1Img} alt="Store 1" />    
            <img id="img-store-2" src={store2Img} alt="Store 2" />
        </div>
    );
}