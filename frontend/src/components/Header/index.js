import React, { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} isHome={props.isHome}/>
    </>
  );
};

export default Header;
