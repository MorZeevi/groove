import { useState } from 'react';
import Header from '../src/sections/header/HeaderNavigation';
import Hero from './sections/hero/Hero';
import Gallery from './sections/gallery/Gallery';
import BestSeller from './sections/best-seller/BestSeller';
import Insta from './sections/insta/Insta';
import WorkWithUs from './sections/workWithUs/WorkWithUs';
import WorkWithUsMobile from './sections/workWithUsMobile/WorkWithUs';
import Locations from './sections/locations/locations';
import Footer from './sections/footer/Footer';

import { useResponsive, } from '../src/hooks/useResponsive';
import './App.css'


function App() {

  const { isMobile } = useResponsive();

  return (
    <>
    <Header />
       <Hero /> 
      <Gallery /> 
     <BestSeller />  
     <Locations />
     <Insta />
     <WorkWithUs />
     <Footer />
    </>
  )
}

export default App
