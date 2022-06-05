import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <>
      <Header isHome={true} />
      <HeroSection />
    </>
  );
};

export default Home;
