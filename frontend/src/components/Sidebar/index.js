import React from "react";
import {
  CloseIcon,
  Icon,
  SidebarBtnWrap,
  SidebarContainer,
  SidebarLink,
  SidebarMenu,
  SidebarRoute,
  SidebarWrapper,
} from "./SidebarElement";

const Sidebar = (props) => {
  const { isOpen, toggle } = props;

  return (
    <SidebarContainer isOpen={isOpen}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="/signup-vaccination" onClick={toggle}>
            Đăng ký tiêm
          </SidebarLink>
          <SidebarLink to="/buy-vaccine" onClick={toggle}>
            Mua vắc xin
          </SidebarLink>
          <SidebarLink to="/contact" onClick={toggle}>
            Liên hệ
          </SidebarLink>
        </SidebarMenu>
        <SidebarBtnWrap>
          <SidebarRoute to="/login" onClick={toggle}>
            Đăng nhập
          </SidebarRoute>
        </SidebarBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
