import React from "react";
import { NavLink } from "react-router-dom";
export default function CommonHeading() {
  return (
    <>
      <div className="sticky z-20 top-9 md:top-11 lg:top-16  bg-gray-100  pt-6 ">
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
      </div>
      <div className="border-y-2 border-black sticky z-20 top-[141px] md:top-[125px] lg:top-36 bg-gray-100">
        <div className="text-xs md:text-base flex justify-center py-2">
          <span  className="underline ">
            Current News
          </span>
        </div>
      </div>
    </>
  );
}
