import React, { useState, useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { RxActivityLog } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { GrUserSettings } from "react-icons/gr";
import { NavLink, Link, useNavigate } from "react-router-dom";

import Loading from "../../../../../../loading/Loading";
import axios from "axios";
import swal from "sweetalert";
export default function LogInfo({
  userMenu,
  setUserMenu,
  update,
  forceUpdate,
}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");
  const userName = localStorage.getItem("auth_name");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState("");
  useEffect(() => {
    if (token) {
      setLoading(true);
      axios.get("/show/profile").then((res) => {
        if (res.data.status === 200) {
          setProfile(res.data.profile);
          setLoading(false);
        }
      });
    }
    setLoading(false);
  }, [update, token]);
  const handleLogout = (e) => {
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
          const res = await axios.post("/logout");
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
    return <Loading />;
  }
  if (!token) {
    return (
      <>
        <FaRegUser
          className="cursor-pointer ml-10"
          title="User"
          onClick={() => setUserMenu(!userMenu)}
        />
        <div
          className={`${
            userMenu ? "flex" : "hidden"
          } absolute space-y-2 flex-col text-sm md:text-base  md:w-52 lg:w-60 top-8 z-40 -left-24 md:-left-36 lg:-left-48 p-4 border bg-white shadow-md rounded-md`}
        >
          <NavLink
            to="/login"
            className="hover:font-semibold"
            onClick={() => setUserMenu(false)}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="hover:font-semibold"
            onClick={() => setUserMenu(false)}
          >
            Register
          </NavLink>
          <NavLink
            to="/forget"
            className="hover:font-semibold"
            onClick={() => setUserMenu(false)}
          >
            Recover Password
          </NavLink>
        </div>
      </>
    );
  }
  if (token) {
    return (
      <>
        <div
          className="cursor-pointer flex flex-col justify-center items-center"
          onClick={() => setUserMenu(!userMenu)}
        >
          <img
            src={`${profile}`}
            alt="profile"
            className="h-14 w-14 rounded-full shadow-md ring-2 ring-green-500"
          />
          <span className="">{userName}</span>
        </div>
        <div
          className={`${
            userMenu ? "flex" : "hidden"
          } absolute z-40 space-y-2 flex-col text-sm md:text-base  md:w-52 lg:w-60 top-20 -left-32 xl:-left-20 p-4 border bg-white shadow-md rounded-md`}
        >
          <Link
            to="/profile"
            className="no-underline hover:font-medium"
            onClick={() => setUserMenu(false)}
          >
            <div className="flex space-x-3 items-center">
              <BsFillPersonFill />
              <span>Profile</span>
            </div>
          </Link>
          <Link
            to="/settings"
            className="no-underline hover:font-medium"
            onClick={() => setUserMenu(false)}
          >
            <div className="flex space-x-3 items-center">
              <GrUserSettings />
              <span>Settings</span>
            </div>
          </Link>
          <Link
            to="/activity"
            className="no-underline hover:font-medium"
            onClick={() => setUserMenu(false)}
          >
            <div className="flex space-x-3 items-center">
              <RxActivityLog />
              <span>Activity Log</span>
            </div>
          </Link>
          <hr className="" />
          <Link
            onClick={handleLogout}
            className="no-underline hover:font-medium"
          >
            <div className="flex space-x-3 items-center">
              <FiLogOut />
              <span>Logout ( {userName} )</span>
            </div>
          </Link>
        </div>
      </>
    );
  }
}
