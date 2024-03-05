import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/home/navbar/Navbar";
import Footer from "../components/home/Footer";
import { Outlet } from "react-router-dom";
export default function Home({ search, handleSearch, update, forceUpdate }) {
  const [sidebarMenu, setSidebarMenu] = useState(false);
  const [modeMenu, setModeMenu] = useState(false);
  const modeMenuRef = useRef(null);
  const sideMenuRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", hideSidebarMenu, true);
  }, []);
  const hideSidebarMenu = (e) => {
    if (!sideMenuRef?.current?.contains(e.target)) {
      setSidebarMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", hideModeMenu, true);
  }, []);
  const hideModeMenu = (e) => {
    if (!modeMenuRef?.current?.contains(e.target)) {
      setModeMenu(false);
    }
  };
  return (
    <>
      <Navbar
        sidebarMenu={sidebarMenu}
        setSidebarMenu={setSidebarMenu}
        sideMenuRef={sideMenuRef}
        modeMenu={modeMenu}
        setModeMenu={setModeMenu}
        modeMenuRef={modeMenuRef}
        search={search}
        handleSearch={handleSearch}
        update={update}
        forceUpdate={forceUpdate}
      />

      <Outlet />
      <Footer sidebarMenu={sidebarMenu} className="" />
    </>
  );
}
