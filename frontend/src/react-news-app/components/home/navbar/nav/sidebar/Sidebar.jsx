import React, { useState, useEffect } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { GiSelfLove } from "react-icons/gi";
import { VscHistory } from "react-icons/vsc";
import { CiSaveDown2 } from "react-icons/ci";
import { ImProfile } from "react-icons/im";
import { RxActivityLog } from "react-icons/rx";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa";
import { BsCircle } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Sidebar({ sidebarMenu, setSidebarMenu, sideMenuRef }) {
  const [subMenu1, setSubMenu1] = useState(true);
  const [subMenu2, setSubMenu2] = useState(true);
  const user_name = localStorage.getItem("auth_name");
  const [profile, setProfile] = useState("");
  useEffect(() => {
    if (user_name) {
      axios.get("/show/profile").then((res) => {
        if (res.data.status === 200) {
          setProfile(res.data.profile);
        }
      });
    }
  }, [user_name]);
  
  return (
    <>
      <div
        className={`${
          sidebarMenu ? "absolute" : "hidden"
        } shadow  bg-gray-100 h-[84.2vh] top-9 md:top-10 lg:top-[60px] -left-2 w-36 md:w-44 lg:w-[165px] xl:w-56 z-50`}
      >
        <hr className="border-gray-400 mt-2" />
        <hr className="border-gray-400 m-3" />

        <div
          className={`${
            user_name ? "" : "hidden"
          } bg-white  text-black p-1 rounded-md shadow-lg cursor-pointer hover:bg-blue-700/80 hover:text-white`}
        >
          <Link
            to="/profile"
            className="flex items-center justify-center md:space-x-2"
          >
            <img
              src={profile}
              alt="Logo"
              className="h-8 w-8 border rounded-full"
              title="Logo"
            />
            <span>{user_name}</span>
            <BsCircle className=" shadow-lg  pb-2 text-xs text-green-500 bg-green-500 rounded-full" />
          </Link>
        </div>
        <div className="h-[50vh] overflow-y-auto scrollbar-thumb-inherit scroll-smooth bg-white m-1">
          <div className="text-center p-2 text-black rounded-md space-y-2">
            <div className="bg-white p-1 rounded-md shadow-lg cursor-pointer hover:bg-blue-700/80 hover:text-white">
              <div
                className="flex items-center justify-center space-x-2"
                onClick={() => setSubMenu1(!subMenu1)}
              >
                <HiOutlineUserCircle className={` text-xl hover:text-white `} />
                <span>User</span>
                <FaAngleRight className={` ${subMenu1 ? "" : "rotate-90"} `} />
              </div>
            </div>
            <div
              className={`${subMenu1 ? "hidden" : "inline-block"} space-y-2 `}
            >
              <div className="mx-2 md:mx-4 px-2 bg-white p-1 rounded-md shadow-lg cursor-pointer hover:bg-blue-700/80 hover:text-white">
                <Link to="/favourite" onClick={() => setSidebarMenu(false)}>
                  <div className="flex items-center justify-center space-x-2">
                    <GiSelfLove className={` text-xl hover:text-white `} />
                    <h1 className={` `}>Favourite</h1>
                  </div>
                </Link>
              </div>
              <div className="mx-2 md:mx-4 px-2 bg-white p-1 rounded-md shadow-lg cursor-pointer hover:bg-blue-700/80 hover:text-white">
                <Link to="/history" onClick={() => setSidebarMenu(false)}>
                  <div className="flex items-center justify-center space-x-2">
                    <VscHistory className={` text-xl hover:text-white `} />
                    <h1 className={` `}>History</h1>
                  </div>
                </Link>
              </div>
              <div className="mx-2 md:mx-4 px-2 bg-white p-1 rounded-md shadow-lg cursor-pointer hover:bg-blue-700/80 hover:text-white">
                <Link to="/save" onClick={() => setSidebarMenu(false)}>
                  <div className="flex items-center justify-center space-x-2">
                    <CiSaveDown2 className={` text-xl hover:text-white `} />
                    <h1 className={` `}>Save</h1>
                  </div>
                </Link>
              </div>
            </div>
            <div className="bg-white p-1 rounded-md shadow-lg cursor-pointer hover:bg-blue-700/80 hover:text-white">
              <div
                className="flex items-center justify-center space-x-2"
                onClick={() => setSubMenu2(!subMenu2)}
              >
                <RiUserSettingsLine className={` text-xl hover:text-white `} />
                <span>Settings</span>
                <FaAngleRight className={` ${subMenu2 ? "" : "rotate-90"} `} />
              </div>
            </div>
            <div
              className={`${subMenu2 ? "hidden" : "inline-block"} space-y-2 `}
            >
              <div className="mx-2 md:mx-4 px-2 bg-white p-1 rounded-md shadow-lg cursor-pointer hover:bg-blue-700/80 hover:text-white">
                <Link to="/profile" onClick={() => setSidebarMenu(false)}>
                  <div className="flex items-center justify-center space-x-2">
                    <ImProfile className={` text-xl hover:text-white `} />
                    <h1 className={` `}>Profile</h1>
                  </div>
                </Link>
              </div>
              <div className="mx-2 md:mx-4 px-2 bg-white p-1 rounded-md shadow-lg cursor-pointer hover:bg-blue-700/80 hover:text-white">
                <Link to="/activity" onClick={() => setSidebarMenu(false)}>
                  <div className="flex items-center justify-center space-x-2">
                    <RxActivityLog className={` text-xl hover:text-white `} />
                    <h1 className={` `}>Activity</h1>
                  </div>
                </Link>
              </div>
              <div className="mx-2 md:mx-4 px-2 bg-white p-1 rounded-md shadow-lg cursor-pointer hover:bg-blue-700/80 hover:text-white">
                <Link to="/settings" onClick={() => setSidebarMenu(false)}>
                  <div className="flex items-center justify-center space-x-2">
                    <FiSettings className={` text-xl hover:text-white `} />
                    <h1 className={` `}>Setting</h1>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
