import React from "react";
import { NavLink } from "react-router-dom";
export default function CultureHeading() {
  return (
    <>
      <div className="sticky z-20 top-[70px] md:top-[74px] lg:top-[98px]  bg-gray-100  pt-6 ">
        <div className="mx-4 grid md:grid-cols-2 justify-center items-center">
          <div className="space-x-2">
            <NavLink to="/" className=" border-r-2 border-black pr-2 ">
              Trending
            </NavLink>
            <NavLink to="/latest" className="">
              Latest
            </NavLink>
          </div>
          <div className="">
            <h1 className="text-[38px] font-bangers">Headline News</h1>
          </div>
        </div>
        <div className="border-y-2 border-black ">
          <div className="text-xs md:text-base flex justify-around py-2">
            {/* <NavLink to="/sponsored" className="underline "> */}
            <span className="font-semibold">Sponsored</span>
            {/* </NavLink> */}
            <NavLink to="/culture" className="underline ">
              Current News
            </NavLink>
            <NavLink to="/culture/topnews" className="underline ">
              Top News
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
