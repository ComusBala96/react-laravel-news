import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiDotsHorizontal } from "react-icons/bi";
import Loading from "../../../../../loading/Loading";
import axios from "axios";
import swal from "sweetalert";
export default function DeleteUser({ update, forceUpdate }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("auth_token");
  const [profile, setProfile] = useState("");
  const [user, setUser] = useState("");
  const [userPublicInfo, setUserPublicInfo] = useState({
    nick_name: "",
    occupation: "",
    biography: "",
    description: "",
    user_id: "",
  });
  const [userPrivateInfo, setUserPrivateInfo] = useState({
    date_of_birth: "",
    status: "",
    gender: "",
    phone_number: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    user_id: "",
  });
  useEffect(() => {
    if (token) {
      setLoading(true);
      axios.get("/show/profile").then((res) => {
        if (res.data.status === 200) {
          setProfile(res.data.profile);
          setLoading(false);
        }
      });
      axios.get("/show/user").then((res) => {
        if (res.data.status === 200) {
          setUser(res.data.user);
          setLoading(false);
        }
      });
      axios.get("/show/user/public/information").then((res) => {
        if (res.data.status === 200) {
          if (res.data.public_info === null) {
            setUserPublicInfo({
              nick_name: "",
              occupation: "",
              biography: "",
              description: "",
              user_id: "",
            });
            setLoading(false);
          } else {
            setUserPublicInfo(res.data.public_info);
            setLoading(false);
          }
        }
      });
      axios.get("/show/user/private/information").then((res) => {
        if (res.data.status === 200) {
          if (res.data.private_info === null) {
            setUserPrivateInfo({
              date_of_birth: "",
              status: "",
              gender: "",
              phone_number: "",
              address: "",
              city: "",
              state: "",
              zip_code: "",
              user_id: "",
            });
            setLoading(false);
          } else {
            setUserPrivateInfo(res.data.private_info);
            setLoading(false);
          }
        }
      });
    }
  }, [update, token]);
  const handleAccountDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      swal({
        title: "Are you sure?",
        text: "If Change in Mind? Please Click Cancel Button!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (wantToLogout) => {
        if (wantToLogout) {
          const res = await axios.post("/account/delete");
          if (res.data.status === 200) {
            setLoading(false);
            swal({
              title: "Success",
              text: res.data.message,
              icon: "success",
              timer: 2000,
            });
            localStorage.removeItem("auth_token");
            localStorage.removeItem("auth_name");
            navigate("/");
          }
        } else {
          setLoading(false);
          swal({
            title: "Success",
            text: "You are not Logged in Out!",
            icon: "success",
            timer: 2000,
          });
        }
      });
    } catch (error) {
      setLoading(false);
      swal({ title: "Warning", text: error.message, icon: "error" });
    }
  };
  if (loading) {
    return (
      <>
        <div className="col-span-12 md:col-span-9 md:pt-2">
          <Loading />;
        </div>
      </>
    );
  }
  return (
    <>
      <div className="col-span-12 md:col-span-9 md:pt-2">
        {loading && <Loading />}
        <div className=" bg-white shadow-sm">
          <div className="border-b py-1 ">
            <div className="flex justify-between items-center mx-4">
              <span className="text-lg py-2">Delete account</span>
              <BiDotsHorizontal className=" cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col items-center py-4">
            <img
              src={profile}
              alt="profile"
              className="rounded-full w-40 h-40 shadow border-2 border-blue-600/50"
            />
          </div>
          <div className="flex flex-col lg:grid lg:grid-cols-12 space-y-6 lg:space-y-0 gap-4 mx-2 py-6 border-y">
            <div className="col-span-6 flex flex-col gap-6">
              <div className="grid  items-center">
                <label htmlFor="" className="col-span-3">
                  Full Name:
                </label>
                <span className="bg-gray-100 border col-span-9  pl-2 py-1 rounded w-full">
                  {user.name}
                </span>
              </div>
              <div className="grid  items-center">
                <label htmlFor="" className="col-span-3">
                  Email:
                </label>
                <span className="bg-gray-100 border col-span-9  pl-2 py-1 rounded w-full">
                  {user.email}
                </span>
              </div>
              <div className="grid  items-center">
                <label htmlFor="" className="col-span-3">
                  Phone:
                </label>
                <span className="bg-gray-100 border col-span-9  pl-2 py-1 rounded w-full">
                  {userPrivateInfo.phone_number}
                </span>
              </div>
            </div>
            <div className="col-span-6 flex flex-col gap-6">
              <div className="grid  items-center">
                <label htmlFor="" className="col-span-3">
                  Username:
                </label>
                <span className="bg-gray-100 border col-span-9  pl-2 py-1 rounded w-full">
                  {user.user_name}
                </span>
              </div>
              <div className="grid  items-center">
                <label htmlFor="" className="col-span-3">
                  Nick Name:
                </label>
                <span className="bg-gray-100 border col-span-9  pl-2 py-1 rounded w-full">
                  {userPublicInfo.nick_name}
                </span>
              </div>
              <div className="grid  items-center">
                <label htmlFor="" className="col-span-3">
                  Address:
                </label>
                <div className="bg-gray-100 border col-span-9 space-x-1 pl-2 py-1 rounded w-full">
                  <span>{userPrivateInfo.address},</span>
                  <span>{userPrivateInfo.city},</span>
                  <span>{userPrivateInfo.state}-</span>
                  <span>{userPrivateInfo.zip_code}.</span>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col items-center">
            <button
              onClick={handleAccountDelete}
              className="my-4 bg-red-700/80 hover:bg-red-700 text-white px-3 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
