import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiDotsHorizontal } from "react-icons/bi";
import { TbWorld } from "react-icons/tb";
import { AiFillGithub } from "react-icons/ai";
import { FiTwitter, FiFacebook } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import axios from "axios";
export default function UserDetails({ update, forceUpdate }) {
  const [profile, setProfile] = useState("");
  const token = localStorage.getItem("auth_token");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    user_name: "",
    mobile: "",
    address: {
      home: "",
      city: "",
      state: "",
      zip_code: "",
    },
    message: "",
  });
  useEffect(() => {
    if (token) {
      axios.get("/user/information").then((res) => {
        if (res.data.status === 200) {
          setUserDetails(res.data.userDetails);
        } else if (res.data.status === 404) {
          setUserDetails({ message: res.data.message });
        }
      });
    }
  }, [token, update]);
  useEffect(() => {
    if (token) {
      axios.get("/show/profile").then((res) => {
        if (res.data.status === 200) {
          setProfile(res.data.profile);
        }
      });
    }
  }, [token, update]);
  if (userDetails.message) {
    return (
      <>
        <div className="col-span-12 md:col-span-9 md:pt-2 grid justify-center items-center">
          <div className="flex flex-col text-center">
            <p>{userDetails.message}</p>
            <Link to="/settings" className="underline text-blue-700 font-bold">
              Update Info
            </Link>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="col-span-12 md:col-span-9 md:pt-2">
        <div className=" bg-white shadow-sm pb-12">
          <div className="border-b py-1 ">
            <div className="flex justify-between items-center mx-4">
              <span className="text-lg py-2">Your Data</span>
              <BiDotsHorizontal className=" cursor-pointer" />
            </div>
          </div>
          <div className="m-6">
            <div className="grid grid-cols-12 gap-4">
              <div className=" col-span-12 lg:col-span-4 ">
                <div className="flex flex-col gap-4">
                  <div className="shadow-lg border px-2 py-4 flex flex-col items-center gap-2 rounded ">
                    <img
                      src={`${profile}`}
                      alt="profile"
                      className="rounded-full w-40 h-40 shadow border-2 border-blue-600/50"
                    />
                    <span className="text-xl py-2">{userDetails.name}</span>
                    <div className="space-x-1 ">
                      <button className="bg-blue-600/80 hover:bg-blue-600 text-white py-1 px-2 rounded-md">
                        Follow
                      </button>
                      <button className="bg-white hover:bg-blue-600/80 hover:text-white border border-blue-600 py-1 px-2 rounded-md">
                        Message
                      </button>
                    </div>
                  </div>
                  <div className="shadow-lg border px-2 py-4 flex flex-col gap-2 rounded ">
                    <div className="border-b pb-2 px-2 cursor-pointer">
                      <div className="flex items-center gap-1 py-1">
                        <TbWorld className="text-2xl text-green-400" />
                        <span>Website</span>
                      </div>
                      <span>https://oriansoft.com</span>
                    </div>
                    <div className="border-b flex justify-between pb-2 px-2 pt-1 cursor-pointer">
                      <div className="flex items-center gap-1">
                        <AiFillGithub className="text-2xl " />
                        <span>Github</span>
                      </div>
                      <span>ComusBala96</span>
                    </div>
                    <div className="border-b flex justify-between pb-2 px-2 pt-1 cursor-pointer">
                      <div className="flex items-center gap-1">
                        <FiTwitter className="text-2xl text-cyan-400" />
                        <span>Twitter</span>
                      </div>
                      <span>@ComusBala96</span>
                    </div>
                    <div className="border-b flex justify-between pb-2 px-2 pt-1 cursor-pointer">
                      <div className="flex items-center gap-1">
                        <BsInstagram className="text-2xl text-red-400" />
                        <span>Instagram</span>
                      </div>
                      <span>ComusBala96</span>
                    </div>
                    <div className="flex justify-between pb-2 px-2 pt-1 cursor-pointer">
                      <div className="flex items-center gap-1">
                        <FiFacebook className="text-2xl text-blue-400" />
                        <span>Facebook</span>
                      </div>
                      <span>ComusBala96</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" col-span-12 lg:col-span-8  flex flex-col gap-4">
                <div className="shadow-lg border p-4 flex flex-col gap-3 rounded">
                  <div className=" grid xl:grid-flow-col xl:grid-cols-12 items-center border-b pb-3 xl:mt-6">
                    <label htmlFor="name" className="col-span-2">
                      Full Name:
                    </label>
                    <span className="bg-gray-100 border col-span-10  mr-6 pl-2 py-1 rounded w-full">
                      {userDetails.name}
                    </span>
                  </div>
                  <div className=" grid xl:grid-flow-col xl:grid-cols-12 items-center border-b pb-3 xl:mt-6">
                    <label htmlFor="name" className="col-span-2">
                      Email:
                    </label>
                    <span className="bg-gray-100 border col-span-10  mr-6 pl-2 py-1 rounded w-full">
                      {userDetails.email}
                    </span>
                  </div>
                  <div className=" grid xl:grid-flow-col xl:grid-cols-12 items-center border-b pb-3 xl:mt-6">
                    <label htmlFor="name" className="col-span-2">
                      User Name:
                    </label>
                    <span className="bg-gray-100 border col-span-10  mr-6 pl-2 py-1 rounded w-full">
                      {userDetails.user_name}
                    </span>
                  </div>
                  <div className=" grid xl:grid-flow-col xl:grid-cols-12 items-center border-b pb-3 xl:mt-6">
                    <label htmlFor="name" className="col-span-2">
                      Mobile:
                    </label>
                    <span className="bg-gray-100 border col-span-10  mr-6 pl-2 py-1 rounded w-full">
                      {userDetails.phone}
                    </span>
                  </div>
                  <div className=" grid xl:grid-flow-col xl:grid-cols-12 items-center border-b pb-3 xl:mt-6">
                    <label htmlFor="name" className="col-span-2">
                      Address:
                    </label>
                    <div className="bg-gray-100 border col-span-10 space-x-1 mr-6 pl-2 py-1 rounded w-full">
                      <span>{userDetails.address.home},</span>
                      <span>{userDetails.address.city},</span>
                      <span>{userDetails.address.state}-</span>
                      <span>{userDetails.address.zip_code}.</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 ">
                  <div className="shadow-lg border p-4 flex flex-col gap-1 rounded w-1/2">
                    <span className="pb-4">assignment Project Status</span>
                    <div className="flex flex-col gap-2">
                      <div className="py-1">
                        <small className="m-0 text-xs">Web Design</small>
                        <div className="h-[6px] bg-gray-100 m-0">
                          <div className="h-[6px] bg-blue-500 w-2/3 m-0"></div>
                        </div>
                      </div>
                      <div className="py-1">
                        <small className="m-0 text-xs">Website Markup</small>
                        <div className="h-[6px] bg-gray-100 m-0">
                          <div className="h-[6px] bg-blue-500 w-1/2 m-0"></div>
                        </div>
                      </div>
                      <div className="py-1">
                        <small className="m-0 text-xs">EveryThings Page</small>
                        <div className="h-[6px] bg-gray-100 m-0">
                          <div className="h-[6px] bg-blue-500 w-3/4 m-0"></div>
                        </div>
                      </div>
                      <div className="py-1">
                        <small className="m-0 text-xs">Mobile Template</small>
                        <div className="h-[6px] bg-gray-100 m-0">
                          <div className="h-[6px] bg-blue-500 w-1/3 m-0"></div>
                        </div>
                      </div>
                      <div className="py-1">
                        <small className="m-0 text-xs">Backend API</small>
                        <div className="h-[6px] bg-gray-100 m-0">
                          <div className="h-[6px] bg-blue-500 w-2/5 m-0"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="shadow-lg border p-4 flex flex-col gap-1 rounded w-1/2">
                    <span className="pb-4">assignment Project Status</span>
                    <div className="flex flex-col gap-2">
                      <div className="py-1">
                        <small className="m-0 text-xs">Web Design</small>
                        <div className="h-[6px] bg-gray-100 m-0">
                          <div className="h-[6px] bg-blue-500 w-2/3 m-0"></div>
                        </div>
                      </div>
                      <div className="py-1">
                        <small className="m-0 text-xs">Website Markup</small>
                        <div className="h-[6px] bg-gray-100 m-0">
                          <div className="h-[6px] bg-blue-500 w-1/2 m-0"></div>
                        </div>
                      </div>
                      <div className="py-1">
                        <small className="m-0 text-xs">EveryThings Page</small>
                        <div className="h-[6px] bg-gray-100 m-0">
                          <div className="h-[6px] bg-blue-500 w-3/4 m-0"></div>
                        </div>
                      </div>
                      <div className="py-1">
                        <small className="m-0 text-xs">Mobile Template</small>
                        <div className="h-[6px] bg-gray-100 m-0">
                          <div className="h-[6px] bg-blue-500 w-1/3 m-0"></div>
                        </div>
                      </div>
                      <div className="py-1">
                        <small className="m-0 text-xs">Backend API</small>
                        <div className="h-[6px] bg-gray-100 m-0">
                          <div className="h-[6px] bg-blue-500 w-2/5 m-0"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="float-right mr-4 mt-4 bg-cyan-600/70 hover:bg-cyan-600 px-3 py-2 rounded-md text-white">
              Download
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
