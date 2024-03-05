import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
export default function NavbarNav({
  sidebarMenu,
  setSidebarMenu,
  sideMenuRef,
  otherMenuRef,
  othersLink,
  setOthersLink,
  search,
  handleSearch,
}) {
  return (
    <>
      <div className="sticky top-0 z-30  text-white ">
        <div className="border-y-2 lg:py-2 grid grid-cols-12 items-center relative bg-cyan-400">
          <div className="mx-2 md:mx-4 col-span-2 md:col-span-3 lg:col-span-2">
            <div
              className=" border-r-2 border-gray-600/50 flex items-center space-x-2"
              ref={sideMenuRef}
            >
              <AiOutlineMenu
                className="cursor-pointer text-black text-lg font-bold"
                title="Menu"
                onClick={() => setSidebarMenu(!sidebarMenu)}
              />
              <small className="hidden md:inline-block md:text-sm lg:text-base cursor-default">
                More sections
              </small>
              <Sidebar
                sidebarMenu={sidebarMenu}
                setSidebarMenu={setSidebarMenu}
                sidebarMenuRef={sideMenuRef}
              />
            </div>
          </div>
          <div className=" flex flex-col col-span-10 md:col-span-9">
            <div className=" text-xs md:text-sm lg:text-base grid grid-cols-6 md:grid-cols-10 lg:col-span-10 py-2 items-center">
              <NavLink to="/" className="hover:text-gray-500 col-start-1">
                News
              </NavLink>
              <NavLink to="/sports" className="hover:text-gray-500 col-start-2">
                Sports
              </NavLink>
              <NavLink
                to="/culture"
                className="hover:text-gray-500 col-start-3"
              >
                Culture
              </NavLink>
              <NavLink
                to="/lifestyle"
                className="hover:text-gray-500 col-start-4"
              >
                Lifestyle
              </NavLink>
              <div className="ml-2 col-start-5 relative" ref={otherMenuRef}>
                <button
                  className="hover:text-gray-500 "
                  onClick={() => setOthersLink(!othersLink)}
                >
                  Others
                </button>
                <div
                  className={`${othersLink ? "flex" : "hidden"}
                      absolute w-36 flex-col top-6 md:top-7 lg:top-10 right-1 lg:right-2 xl:right-10 p-4 border bg-white text-black shadow-md rounded-md space-y-2`}
                >
                  <NavLink
                    to="/others/jermany"
                    className=" hover:font-semibold"
                    onClick={() => setOthersLink(false)}
                  >
                    Jermany
                  </NavLink>
                  <NavLink
                    to="/others/business"
                    className="hover:font-semibold"
                    onClick={() => setOthersLink(false)}
                  >
                    Business
                  </NavLink>

                  <NavLink
                    to="/others/science"
                    className="hover:font-semibold"
                    onClick={() => setOthersLink(false)}
                  >
                    Science
                  </NavLink>
                  <NavLink
                    to="/others/tech"
                    className="hover:font-semibold"
                    onClick={() => setOthersLink(false)}
                  >
                    Tech
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 pb-1.5 pt-1 flex justify-center md:justify-end md:pr-16 xl:pr-48">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              autoComplete="off"
              placeholder="Search"
              className="pl-2 h-6 lg:h-7 w-72 lg:w-96 xl:w-[450px] outline-none rounded-md text-black "
            />
          </form>
        </div>
      </div>
    </>
  );
}
