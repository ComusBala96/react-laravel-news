import React, { useState, useRef, useEffect } from "react";

import { GrUserSettings } from "react-icons/gr";
import { NavLink } from "react-router-dom";

export default function SettingsSidebar() {
  const [settingsMenu, setSettingsMenu] = useState(false);
  const settingsMenuRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", hideSetrtingsMenu, true);
  }, []);
  const hideSetrtingsMenu = (e) => {
    if (!settingsMenuRef?.current?.contains(e.target)) {
      setSettingsMenu(false);
    }
  };
  return (
    <>
      <div className="col-span-12 md:col-span-4 lg:col-span-3 sticky top-[162px] md:top-[180px] lg:top-[210px] md:h-[65vh] lg:h-[57vh] pt-2 overflow-y-auto">
        <div className=" bg-white shadow-sm" ref={settingsMenuRef}>
          <div className="border  cursor-pointer">
            <div
              className="flex justify-around items-center mx-4"
              onClick={() => setSettingsMenu(!settingsMenu)}
            >
              <span className="text-lg py-2">Profile Settings</span>
              <GrUserSettings className=" cursor-pointer" />
            </div>
          </div>
          <div
            className={`${
              settingsMenu ? "inline-block " : "hidden md:inline-block"
            } w-full `}
          >
            <NavLink
              to="/settings"
              className="no-underline"
              onClick={() => setSettingsMenu(false)}
            >
              <div className="border-b  hover:bg-blue-400">
                <div className="flex justify-between items-center mx-4">
                  <span className="text-base py-2 ">Account</span>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/settings/email"
              className="no-underline"
              onClick={() => setSettingsMenu(false)}
            >
              <div className="border-b  hover:bg-blue-400">
                <div className="flex justify-between items-center mx-4">
                  <span className="text-base py-2">Email</span>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/settings/password"
              className=" no-underline"
              onClick={() => setSettingsMenu(false)}
            >
              <div className="border-b  hover:bg-blue-400">
                <div className="flex justify-between items-center mx-4">
                  <span className="text-base py-2">Password</span>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/settings/privacy"
              className="no-underline"
              onClick={() => setSettingsMenu(false)}
            >
              <div className="border-b  hover:bg-blue-400">
                <div className="flex justify-between items-center mx-4">
                  <span className="text-base py-2">Privacy and safety</span>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/settings/email-notificaiton"
              className="no-underline"
              onClick={() => setSettingsMenu(false)}
            >
              <div className="border-b  hover:bg-blue-400">
                <div className="flex justify-between items-center mx-4 ">
                  <span className="text-base py-2">Email notifications</span>
                </div>
              </div>
            </NavLink>

            <NavLink
              to="/settings/user-information"
              className="no-underline"
              onClick={() => setSettingsMenu(false)}
            >
              <div className="border-b  hover:bg-blue-400">
                <div className="flex justify-between items-center mx-4 ">
                  <span className="text-base py-2">Your Data</span>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/settings/delete-account"
              className="no-underline"
              onClick={() => setSettingsMenu(false)}
            >
              <div className="border-b  hover:bg-blue-400">
                <div className="flex justify-between items-center mx-4 ">
                  <span className="text-base py-2">Delete Account</span>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
