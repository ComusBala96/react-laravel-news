import React, { useState } from "react";

import { BiDotsHorizontal } from "react-icons/bi";
import Loading from "../../../../../loading/Loading";
import axios from "axios";
import swal from "sweetalert";
export default function Password({ update, forceUpdate }) {
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [userPassword, setUserPassword] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const handlePasswordInput = (e) => {
    setUserPassword({ ...userPassword, [e.target.name]: e.target.value });
  };
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      current_password: userPassword.current_password,
      new_password: userPassword.new_password,
      confirm_password: userPassword.confirm_password,
    };
    try {
      const res = await axios.post("/user/password/update", data);
      if (res.data.status === 200) {
        setLoading(false);
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          timer: 1000,
        });
        setUserPassword("");
        setErrors("");
        forceUpdate();
      } else if (res.data.status === 422) {
        setLoading(false);
        setErrors(res.data.errors);
      } else {
        setLoading(false);
        setErrors(res.data.errors);
      }
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
      <div className="col-span-12 md:col-span-9 md:pt-2">
        <div className=" bg-white shadow-sm mb-4">
          <div className="border-b py-1 ">
            <div className="flex justify-between items-center mx-4">
              <span className="text-lg py-2">Password</span>
              <BiDotsHorizontal className=" cursor-pointer" />
            </div>
          </div>
          <form onSubmit={handlePasswordUpdate}>
            <div className="lg:mx-2 xl:mx-10 flex flex-col gap-2 px-2 py-6">
              <div className="lg:grid lg:grid-cols-12">
                <label htmlFor="name" className="col-span-4">
                  Current Password:
                  <span className="text-red-500 font-bold"> *</span>
                </label>
                <input
                  type="password"
                  name="current_password"
                  value={userPassword.current_password}
                  onChange={handlePasswordInput}
                  placeholder="Enter your current password?"
                  className="col-span-8 outline-none bg-gray-50 pl-2 border border-yellow-300 w-full h-9"
                />
              </div>
              <div className="lg:grid lg:grid-cols-12 ">
                <label htmlFor="" className="col-span-4"></label>
                <div className="text-red-700 w-full col-span-8">
                  {errors.current_password}
                </div>
              </div>
              <div className="lg:grid lg:grid-cols-12">
                <label htmlFor="name" className="col-span-4">
                  New Password:
                  <span className="text-red-500 font-bold"> *</span>
                </label>
                <input
                  type="password"
                  name="new_password"
                  value={userPassword.new_password}
                  onChange={handlePasswordInput}
                  placeholder="Enter your new password?"
                  className="col-span-8 outline-none bg-gray-50 pl-2 border border-yellow-300 w-full h-9"
                />
              </div>
              <div className="lg:grid lg:grid-cols-12 ">
                <label htmlFor="" className="col-span-4"></label>
                <div className="text-red-700 w-full col-span-8">
                  {errors.new_password}
                </div>
              </div>
              <div className="lg:grid lg:grid-cols-12">
                <label htmlFor="name" className="col-span-4">
                  Verify Password:
                  <span className="text-red-500 font-bold"> *</span>
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  value={userPassword.confirm_password}
                  onChange={handlePasswordInput}
                  placeholder="Re-Enter your new password?"
                  className="col-span-8 outline-none bg-gray-50 pl-2 border border-yellow-300 w-full h-9"
                />
              </div>
              <div className="lg:grid lg:grid-cols-12 ">
                <label htmlFor="" className="col-span-4"></label>
                <div className="text-red-700 w-full col-span-8">
                  {errors.confirm_password}
                </div>
              </div>
              <div className="col-span-12 text-end mb-4 mx-3">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-gray-50 rounded-full px-4 py-1.5 cursor-pointer text-md "
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
