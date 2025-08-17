import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

// const Navigation = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   // Remove unused ref or implement its functionality
//   // const navItemsRef = useRef([]);

//   useEffect(() => {
//     const checkDevice = () => {
//       setIsMobile(window.innerWidth <= 991);
//     };

//     checkDevice();
//     window.addEventListener('resize', checkDevice);
//     return () => window.removeEventListener('resize', checkDevice);
//   }, []);

//   useEffect(() => {
//     if (isOpen && isMobile) {
//       document.body.classList.add('menu-open');
//     } else {
//       document.body.classList.remove('menu-open');
//     }

//     return () => {
//       document.body.classList.remove('menu-open');
//     };
//   }, [isOpen, isMobile]);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleNavClick = () => {
//     if (isMobile) {
//       setIsOpen(false);
//     }
//   };

//   const navItems = ['Home', 'About', 'Product', 'Sale', 'Contact'];

//   return (
//     <div className={`navigation-header ${isOpen ? 'menu-open' : ''}`}>
//       <nav className="navigation-area">
//         <div className="container-xl">
//           <div className="flex-bunch">
//             <div className="header-main">
//               <a href="#" className="nav-brand">
//                 Logo
//               </a>
              
//               <div className="br-toggle">
//                 <button 
//                   className="btn-access" 
//                   onClick={toggleMenu}
//                   aria-label="Toggle navigation menu"
//                   aria-expanded={isOpen}
//                 >
//                   <div className={`hamburger-line line-1 ${isOpen ? 'open' : ''}`}></div>
//                   <div className={`hamburger-line line-2 ${isOpen ? 'open' : ''}`}></div>
//                   <div className={`hamburger-line line-3 ${isOpen ? 'open' : ''}`}></div>
//                 </button>
//               </div>
//             </div>
            
//             <div className="navigation-inner-items">
//               <ul className="navbar-parent">
//                 {navItems.map((item, index) => (
//                   <li
//                     key={item}
//                     className={`child-${['one', 'two', 'three', 'four', 'five'][index]} nav-items`}
//                   >
//                     <a 
//                       href={`#${item.toLowerCase()}`}
//                       onClick={handleNavClick}
//                     >
//                       {item}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navigation; // ✅ Fixed export name

export default function Header() {

  return (<div className="header-navigation-wrapper">
    blblblblbl
  </div>)
}