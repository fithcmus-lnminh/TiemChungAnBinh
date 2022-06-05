import React from "react";
import {
  MobileIcon,
  Nav,
  NavbarContainer,
  NavBtn,
  NavBtnLink,
  NavItem,
  NavLinks,
  NavLogo,
  NavMenu,
} from "./NavbarElement";
import { FaBars } from "react-icons/fa";

const Navbar = (props) => {
  const { toggle, isHome } = props;
  return (
    <Nav isHome={isHome}>
      <NavbarContainer>
        <NavLogo to="/">AN BÌNH</NavLogo>
        <MobileIcon onClick={toggle}>
          <FaBars />
        </MobileIcon>
        <NavMenu>
          <NavItem>
            <NavLinks to="/signup-vaccination">Đăng ký tiêm</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="/buy-vaccine">Mua vắc xin</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="/checkout">Thanh toán</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="/signup-freeday">Đăng ký lịch rảnh</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="/contact">Liên hệ</NavLinks>
          </NavItem>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/login">Đăng nhập</NavBtnLink>
        </NavBtn>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
