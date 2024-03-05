import React, { useState } from "react";
import { AiOutlineFullscreen } from "react-icons/ai";
import { MdOutlineLanguage } from "react-icons/md";
import { BsGrid, BsArrowUpRight } from "react-icons/bs";
import LogInfo from "./modebar/loginfo/LogInfo";
import Modebar from "./modebar/Modebar";
import moment from "moment";
export default function HeaderNav({
  modeMenu,
  setModeMenu,
  modeMenuRef,
  userMenuRef,
  userMenu,
  setUserMenu,
  handleLogout,
  update,
  forceUpdate,
}) {
  const [screen, setScreen] = useState(false);
  const fullScreenMode = () => {
    let myScreen = document.documentElement;
    if (screen === false) {
      if (
        myScreen.requestFullscreen ||
        myScreen.msRequestFullscreen ||
        myScreen.mozRequestFullscreen ||
        myScreen.webkitRequestFullscreen
      ) {
        return (
          myScreen.requestFullscreen() ||
          myScreen.msRequestFullscreen() ||
          myScreen.mozRequestFullscreen() ||
          myScreen.webkitRequestFullscreen()
        );
      }
    } else {
      if (screen === true) {
        if (
          document.exitFullscreen ||
          document.msexitFullscreen ||
          document.mozexitFullscreen ||
          document.webkitexitFullscreen
        ) {
          return (
            document.exitFullscreen() ||
            document.msexitFullscreen() ||
            document.mozexitFullscreen() ||
            document.webkitexitFullscreen()
          );
        }
      }
    }
  };
  const fullScreen = () => {
    fullScreenMode();
    setScreen(!screen);
  };
  return (
    <>
      <div className="md:mx-4 ">
        <div className="flex justify-between items-center px-2 py-1 md:px-0 md:py-2">
          <h1 className="">{moment().format("MMMM, Do YYYY, h:mm A")}</h1>
          <div className="flex items-center gap-4 md:gap-10">
            <div className="flex items-center">
              <MdOutlineLanguage title="Language" className="cursor-pointer" />
              <select name="" id="">
                <option value="">En</option>
                <option value="">De</option>
                <option value="">Bn</option>
                <option value="">In</option>
              </select>
            </div>

            <AiOutlineFullscreen
              title="Full Screen"
              className="cursor-pointer"
              onClick={fullScreen}
            />
            <div className="" ref={modeMenuRef}>
              <BsGrid
                title="Mode"
                className="cursor-pointer"
                onClick={() => setModeMenu(!modeMenu)}
              />
              <Modebar
                modeMenu={modeMenu}
                setModeMenu={setModeMenu}
                modeMenuRef={modeMenuRef}
              />
            </div>
          </div>
        </div>
        <div className="h-3 bg-black"></div>
        <div className="md:grid md:grid-cols-3 md:py-6">
          <div className=" m-2 md:col-span-1">
            <div className="font-lusitana italic ">
              <div className="hidden md:inline-block md:pb-2">
                <h1 className="font-semibold md:text-base lg:text-lg">
                  Support the News App
                </h1>
                <small className="lg:text-base">
                  Lorem, ipsum, dolor, sit, amet, consectetur
                </small>
              </div>
              <button className="flex items-center space-x-1 hover:bg-gray-50 border p-1 rounded-md shadow-md">
                <span className="font-semibold text-xs md:text-base ">
                  Support Us
                </span>
                <BsArrowUpRight className="text-xs border rounded-full" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 items-center md:col-span-2 pb-4">
            <div className="col-span-2">
              <div className=" font-roboto  flex flex-col ml-20">
                <h1 className=" font-extrabold font-lusitana text-2xl md:text-4xl lg:text-6xl flex flex-col">
                  <span className="ml-4">The</span>
                  <span>News App</span>
                </h1>
                <small className="ml-10 md:ml-20 lg:ml-48 lg:text-base">
                  All About News
                </small>
              </div>
            </div>
            <div className=" col-start-3" ref={userMenuRef}>
              <div className="relative">
                <LogInfo
                  userMenu={userMenu}
                  setUserMenu={setUserMenu}
                  update={update}
                  forceUpdate={forceUpdate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
