// THE BEST PRACTICE APPROACH

// 1. hooks/useResponsiveGSAP.js - Use GSAP's matchMedia (BEST for animations)
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const BREAKPOINTS = {
    desktop: "(min-width: 1024px)",
    tablet: "(min-width: 768px) and (max-width: 1023px)",
    mobile: "(max-width: 767px)"
};

// THIS IS THE BEST PRACTICE FOR GSAP ANIMATIONS
export const useResponsiveGSAP = (animations, config = {}) => {
    useGSAP(() => {
        // GSAP's matchMedia is SYNCHRONOUS and designed for animations
        const mm = gsap.matchMedia();
        
        mm.add(BREAKPOINTS, (context) => {
            const { desktop, tablet, mobile } = context.conditions;
            
            // These values are ALWAYS correct immediately
            return animations({
                isDesktop: desktop,
                isTablet: tablet,
                isMobile: mobile,
                mm: mm
            });
        });
        
        // GSAP handles cleanup and re-running automatically
        return () => mm.revert();
    }, config);
};

// 2. hooks/useResponsive.js - For non-GSAP uses
import { useState, useEffect } from 'react';

// Share the same breakpoints
export { BREAKPOINTS };

const getScreenType = () => {
    if (typeof window === 'undefined') {
        return { isDesktop: false, isTablet: false, isMobile: false };
    }
    
    return {
        isDesktop: window.matchMedia(BREAKPOINTS.desktop).matches,
        isTablet: window.matchMedia(BREAKPOINTS.tablet).matches,
        isMobile: window.matchMedia(BREAKPOINTS.mobile).matches
    };
};

export const useResponsive = () => {
    const [screenType, setScreenType] = useState(getScreenType);

    useEffect(() => {
        const currentType = getScreenType();
        setScreenType(currentType);

        const mediaQueries = {
            desktop: window.matchMedia(BREAKPOINTS.desktop),
            tablet: window.matchMedia(BREAKPOINTS.tablet),
            mobile: window.matchMedia(BREAKPOINTS.mobile)
        };

        const checkMediaQueries = () => {
            setScreenType({
                isDesktop: mediaQueries.desktop.matches,
                isTablet: mediaQueries.tablet.matches,
                isMobile: mediaQueries.mobile.matches
            });
        };

        const listeners = [];
        Object.entries(mediaQueries).forEach(([key, mq]) => {
            const listener = () => checkMediaQueries();
            mq.addEventListener('change', listener);
            listeners.push({ mq, listener });
        });

        return () => {
            listeners.forEach(({ mq, listener }) => {
                mq.removeEventListener('change', listener);
            });
        };
    }, []);

    return screenType;
};