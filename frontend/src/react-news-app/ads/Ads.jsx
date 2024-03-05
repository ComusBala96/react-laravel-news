import React from "react";
import coverPhoto from "../../images/default/cover.png";
import profilePhoto from "../../images/default/profile.png";
export default function Ads() {
  return (
    <>
      <div className="md:col-span-5 hidden md:inline-block ">
        <div className="sticky md:top-[220px] lg:top-[260px] md:h-[58vh] lg:h-[55vh] xl:h-[56vh] overflow-y-auto scrollbar-thin scroll-smooth bg-white m-1">
          <div className="mx-4 lg:mx-10 my-6 lg:my-4 relative">
            <div className="bg-gray-200 rounded-md p-1 animate-pulse">
              <img
                src={coverPhoto}
                alt=""
                className="rounded-md w-full cursor-pointer"
              />
            </div>
            <div className="absolute top-3 left-2 w-10">
              <span
                className=" bg-gray-200/60 py-1 px-3 rounded-full cursor-pointer hover:bg-gray-200 border"
                title="My Ad Center"
              >
                i
              </span>
            </div>
            <div className="absolute bottom-0 w-full cursor-pointer">
              <div className="bg-gray-200/60 flex items-center p-2 space-x-1 w-full">
                <img
                  src={profilePhoto}
                  alt="logo"
                  className="h-10 w-10 rounded-full border"
                />
                <div className="flex items-center space-x-1 w-full lg:justify-between">
                  <div className="">
                    <h1 className="font-semibold">New Web Series</h1>
                    <small className="space-x-1">
                      <span>Ad</span>
                      <span>.</span>
                      <span>www.amazon.de/minitv/</span>
                    </small>
                  </div>
                  <button className="text-[9px] lg:text-sm px-2 py-1 lg:px-3 bg-blue-700/60 hover:bg-blue-700 text-white rounded-full ">
                    Watch Free
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
