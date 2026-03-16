import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';
import { useResponsiveGSAP } from '../../hooks/useResponsive';

import recordImg from '../../assets/image/record.png';
import img1 from '../../assets/image/gallery/img_1.png';
import img2 from '../../assets/image/gallery/img_2.png';
import img3 from '../../assets/image/gallery/img_3.png';
import img4 from '../../assets/image/gallery/img_4.png';
import img5 from '../../assets/image/gallery/img_5.png';
import img6 from '../../assets/image/gallery/img_6.png';

import './newSection.css';

gsap.registerPlugin(ScrollTrigger, Observer, SplitText);

const galleryImages = [img1, img2, img3, img4, img5, img6];

export default function NewSection() {
  const sectionRef = useRef();
  const containerRef = useRef();
  const contentRef = useRef();
  const recordRef = useRef();

  useResponsiveGSAP(({ isDesktop, isMobile }) => {
    // ── Infinite scroll gallery ──
    const content = contentRef.current;
    const container = containerRef.current;
    const half = content.getBoundingClientRect().height / 2;
    const wrap = gsap.utils.wrap(-half, 0);

    let incrTick = 0;
    let interactionTimeout;

    const yTo = gsap.quickTo(content, 'y', {
      duration: 1,
      ease: 'power4',
      modifiers: {
        y: gsap.utils.unitize(wrap),
      },
    });

    const scaleTo = gsap.quickTo(container, 'scaleY', {
      duration: 0.6,
      ease: 'power4',
    });

    function handleInteraction(e) {
      if (e.event.type === 'wheel') incrTick -= e.deltaY;
      else incrTick += e.deltaY;

      if (!isMobile) {
        const valSc = 1 - gsap.utils.clamp(-0.2, 0.2, e.deltaY / 300);
        scaleTo(valSc);

        window.clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => {
          scaleTo(1);
        }, 66);
      }
    }

    const observer = Observer.create({
      target: sectionRef.current,
      type: 'wheel,pointer,touch',
      onChange: handleInteraction,
    });

    function tick(time, dt) {
      incrTick += dt / 30;
      yTo(incrTick);
    }

    gsap.ticker.add(tick);

    // ── Title animation ──
    const words = sectionRef.current.querySelectorAll('.ns-word');
    const splits = [];

    words.forEach((word) => {
      const split = new SplitText(word, { type: 'chars' });
      splits.push(split);
    });

    const allChars = splits.flatMap((s) => s.chars);

    const tl = gsap.timeline();

    tl.fromTo(
      allChars,
      {
        autoAlpha: 0,
        scale: 0,
        transformOrigin: 'center center',
      },
      {
        duration: 0.8,
        scale: 1,
        autoAlpha: 1,
        stagger: 0.05,
        ease: 'back.out(1.7)',
      }
    );

    // Record bounce-in
    tl.fromTo(
      recordRef.current,
      {
        y: -400,
        opacity: 0,
        scale: 0.3,
        rotation: 360,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'bounce.out',
      },
      '-=0.6'
    );

    // Subtitle + CTA fade-in
    tl.fromTo(
      sectionRef.current.querySelector('.ns-subtitle'),
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out' }
    ).fromTo(
      sectionRef.current.querySelector('.ns-cta'),
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out' },
      '-=0.3'
    );

    // Cleanup
    return () => {
      gsap.ticker.remove(tick);
      observer.kill();
      splits.forEach((s) => s.revert());
      window.clearTimeout(interactionTimeout);
    };
  }, { scope: sectionRef });

  return (
    <section className="new-section" ref={sectionRef}>
      <div className="ns-text-side">
        <h1 className="ns-title">
          <span className="ns-line-1">
            <span className="ns-word">לגרוב</span>
            <span className="ns-record-wrapper" ref={recordRef}>
              <img src={recordImg} alt="Record" />
            </span>
            <span className="ns-word">גרביים</span>
          </span>
          <span className="ns-line-2">
            <span className="ns-word">מלאות</span>
            <span className="ns-word">בגרוב</span>
          </span>
        </h1>
        <p className="ns-subtitle">
          גרביים מגניבות, איכותיות במגוון צבעים וצורות.
          <br />
          איכות פרימיום, ללא ניצול ו100% כותנה אורגנית.
        </p>
        <a className="ns-cta" href="#new-collection">
          לקולקציה החדשה!
        </a>
      </div>

      <div className="ns-gallery-container" ref={containerRef}>
        <div className="ns-gallery-content" ref={contentRef}>
          {/* Duplicate images for seamless loop */}
          {[...galleryImages, ...galleryImages].map((src, i) => (
            <div className="ns-media-item" key={i}>
              <img src={src} alt={`Gallery ${(i % 6) + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
