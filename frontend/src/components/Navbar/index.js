import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "../../redux/apiRequests/userRequest";

const Navbar = (props) => {
  const { toggle, isHome } = props;

  const { userInfo } = useSelector((state) => state.user);

  console.log(userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(signout());
    navigate("/");
  };

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
            <NavLinks
              to={userInfo ? "/buy-vaccine" : "/login?redirect=buy-vaccine"}
            >
              Mua vắc xin
            </NavLinks>
          </NavItem>

          <NavItem>
            <NavLinks
              to={
                userInfo ? "/signup-freeday" : "/login?redirect=signup-freeday"
              }
            >
              Đăng ký lịch rảnh
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="/contact">Liên hệ</NavLinks>
          </NavItem>
        </NavMenu>
        {userInfo ? (
          <div className="d-flex align-items-center justify-content-end">
            <NavDropdown
              title={`Xin chào, ${userInfo.HoTen}`}
              className="me-2"
              id="nav-dropdown"
            >
              <Link to="/profile">
                <NavDropdown.Item as="div">
                  <i className="fas fa-user me-2"></i>Hồ sơ cá nhân
                </NavDropdown.Item>
              </Link>
              <Link to="/my-bill">
                <NavDropdown.Item as="div">
                  <i className="fas fa-wallet me-2"></i>Hóa đơn của tôi
                </NavDropdown.Item>
              </Link>
              <Link to="/change-password">
                <NavDropdown.Item as="div">
                  <i className="fas fa-key me-2"></i>Đổi mật khẩu
                </NavDropdown.Item>
              </Link>
              <NavDropdown.Item onClick={logoutHandler}>
                <i className="fas fa-arrow-right-from-bracket me-2"></i>
                Đăng xuất
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        ) : (
          <NavBtn>
            <NavBtnLink to="/login">Đăng nhập</NavBtnLink>
          </NavBtn>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
