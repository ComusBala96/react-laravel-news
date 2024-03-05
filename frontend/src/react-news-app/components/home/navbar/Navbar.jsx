import React, { useState, useRef, useEffect } from "react";
import NavbarNav from "./nav/NavbarNav";
import HeaderNav from "./nav/HeaderNav";
export default function Navbar({
  sidebarMenu,
  setSidebarMenu,
  sideMenuRef,
  modeMenu,
  setModeMenu,
  modeMenuRef,
  fullScreen,
  search,
  handleSearch,
  update,
  forceUpdate,
}) {
  const [userMenu, setUserMenu] = useState(false);
  const [othersLink, setOthersLink] = useState(false);
  const userMenuRef = useRef(null);
  const otherMenuRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", hideUserMenu, true);
  }, []);
  const hideUserMenu = (e) => {
    if (!userMenuRef?.current?.contains(e.target)) {
      setUserMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", hideOthersMenu, true);
  }, []);
  const hideOthersMenu = (e) => {
    if (!otherMenuRef?.current?.contains(e.target)) {
      setOthersLink(false);
    }
  };

  return (
    <>
      <HeaderNav
        modeMenu={modeMenu}
        setModeMenu={setModeMenu}
        modeMenuRef={modeMenuRef}
        userMenuRef={userMenuRef}
        userMenu={userMenu}
        setUserMenu={setUserMenu}
        update={update}
        forceUpdate={forceUpdate}
      />
      <NavbarNav
        sidebarMenu={sidebarMenu}
        setSidebarMenu={setSidebarMenu}
        sideMenuRef={sideMenuRef}
        otherMenuRef={otherMenuRef}
        setOthersLink={setOthersLink}
        othersLink={othersLink}
        search={search}
        handleSearch={handleSearch}
      />
    </>
  );
}
