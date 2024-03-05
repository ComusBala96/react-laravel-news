import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../../loading/Loading";
import axios from "axios";
import swal from "sweetalert";
export default function Profilebar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
  return (
    <>
      <div className=" sticky top-[70px] md:top-[74px] lg:top-[98px] z-20 bg-white ">
        <div className="grid grid-flow-col justify-around px-1 text-xs md:text-sm md:justify-center md:gap-6 lg:text-base lg:gap-10 items-center bg-profilebar py-3 text-white">
          <NavLink to="/profile">
            <span className="hover:text-white/80">Profile</span>
          </NavLink>

          <NavLink to="/favourite">
            <span className="hover:text-white/80">Favourite</span>
          </NavLink>
          <NavLink to="/history">
            <span className="hover:text-white/80">History</span>
          </NavLink>
          <NavLink to="/save">
            <span className="hover:text-white/80">Save</span>
          </NavLink>
          <NavLink to="/activity">
            <span className="hover:text-white/80">Activity</span>
          </NavLink>
          <NavLink to="/settings">
            <span className="hover:text-white/80">Settings</span>
          </NavLink>
          <button onClick={handleLogout}>
            <span className="hover:text-white/80">Logout</span>
          </button>
        </div>
        <div className="text-3xl p-3  bg-gray-100">Settings</div>
      </div>
    </>
  );
}
