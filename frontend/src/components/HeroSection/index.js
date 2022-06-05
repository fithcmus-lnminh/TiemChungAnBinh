import React, { useState } from "react";
import {
  ArrowForward,
  ArrowRight,
  HeroBackground,
  HeroBtnWrapper,
  HeroContainer,
  HeroContent,
  HeroH1,
  HeroImg,
  HeroP,
} from "./HeroElement";
import HeroBanner from "../../assets/image/banner.jpg";
import { Button } from "../Button";

const HeroSection = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };
  return (
    <HeroContainer>
      <HeroBackground>
        <HeroImg src={HeroBanner} alt="Hero Banner" />
      </HeroBackground>
      <HeroContent>
        <HeroH1>HỆ THỐNG TIÊM CHỦNG AN BÌNH</HeroH1>
        <HeroP>Đăng ký tiêm ngay để nhận được dịch vụ tốt nhất</HeroP>
        <HeroBtnWrapper>
          <Button
            to="/signup-vaccination"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
          >
            Đăng ký ngay {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
