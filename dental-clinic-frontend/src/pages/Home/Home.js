import React from 'react';
import NavbarComponent from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import StatsBar from '../../components/StatsBar/StatsBar';
import Services from '../../components/Services/Services';
import EmergencyCTA from '../../components/EmergencyCTA/EmergencyCTA';
import Testimonials from '../../components/Testimonials/Testimonials';
import Contact from '../../components/Contact/Contact';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <>
      <NavbarComponent />
      <Hero />
      <StatsBar />
      <Services />
      <EmergencyCTA />
      <Testimonials />
      <Contact />
      <Footer/>
    </>
  );
};

export default Home;