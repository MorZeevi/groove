// hooks/useResponsiveGSAP.js
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const BREAKPOINTS = {
    desktop: "(min-width: 1024px)",
    tablet: "(min-width: 768px) and (max-width: 1023px)",
    mobile: "(max-width: 767px)"
}

export const useResponsiveGSAP = (animations, config = {}) => {
    useGSAP(() => {
        const mm = gsap.matchMedia();
        
        mm.add(BREAKPOINTS, (context) => {
            const { desktop, tablet, mobile } = context.conditions;
            
            animations({
                isDesktop: desktop,
                isTablet: tablet,
                isMobile: mobile,
                mm: mm
            });
        });
        
        return () => mm.revert();
    }, config); // מעביר את config של useGSAP (scope, dependencies וכו')
};