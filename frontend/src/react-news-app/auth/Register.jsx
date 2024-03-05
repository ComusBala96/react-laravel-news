import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import axios from "axios";
import swal from "sweetalert";
export default function Register({ forceUpdate }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    agree: null,
  });
  const [errors, setErrors] = useState("");

  const userInputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const registrationHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/register", user);
      if (res.data.status === 200) {
        setLoading(false);
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          timer: 1000,
        });
        setErrors("");
        setUser("");
        forceUpdate();
        localStorage.setItem("auth_token", res.data.token);
        localStorage.setItem("auth_name", res.data.name);
        navigate("/");
      } else if (res.data.status === 422) {
        setLoading(false);
        setErrors(res.data.errors);
      } else {
        setLoading(false);
        swal({
          title: "Failed",
          text: res.data.message,
          icon: "warning",
          timer: 1000,
        });
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
      <div className="bg-gray-50 p-4 h-[95vh] md:h-[90vh] lg:h-[85vh] xl:h-[80vh]">
        <div className=" w-full md:w-[75%] lg:w-[65%] xl:w-[50%] mx-auto rounded-md bg-gray-100 ring-2 ring-gray-100 shadow-md">
          <div className=" border-b">
            <div className="text-lg mx-4 py-2">Registration</div>
          </div>
          <form>
            <div className="md:grid md:grid-cols-12 space-y-1 justify-between mx-4 pt-2 pb-1">
              <label htmlFor="" className="md:col-span-4">
                Name <span className="text-red-700 font-bold">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={userInputHandler}
                className="ring-1 pl-2 md:py-1 w-full ring-gray-300 rounded-md outline-none md:col-span-8"
                placeholder="Enter your name?"
              />
            </div>
            <div className="md:grid md:grid-cols-12 space-y-1  mx-4">
              <label htmlFor="" className="md:col-span-4"></label>
              <div className="text-red-700 w-full md:col-span-8">
                {errors.name}
              </div>
            </div>
            <div className="md:grid md:grid-cols-12 space-y-1 justify-between mx-4 pt-2 pb-1">
              <label htmlFor="" className="md:col-span-4">
                Email <span className="text-red-700 font-bold">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={userInputHandler}
                className="ring-1 pl-2 md:py-1 w-full ring-gray-300 rounded-md outline-none md:col-span-8"
                placeholder="Enter your email?"
              />
            </div>
            <div className="md:grid md:grid-cols-12 space-y-1  mx-4">
              <label htmlFor="" className="md:col-span-4"></label>
              <div className="text-red-700 w-full md:col-span-8">
                {errors.email}
              </div>
            </div>
            <div className="md:grid md:grid-cols-12 space-y-1 justify-between mx-4 pt-2 pb-1">
              <label htmlFor="" className="md:col-span-4">
                Password <span className="text-red-700 font-bold">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={userInputHandler}
                className="ring-1 pl-2 md:py-1 w-full ring-gray-300 rounded-md outline-none md:col-span-8"
                placeholder="Enter your password?"
              />
            </div>
            <div className="md:grid md:grid-cols-12 space-y-1  mx-4">
              <label htmlFor="" className="md:col-span-4"></label>
              <div className="text-red-700 w-full md:col-span-8">
                {errors.password}
              </div>
            </div>
            <div className="md:grid md:grid-cols-12 space-y-1 justify-between mx-4 pt-2 pb-1">
              <label htmlFor="" className="md:col-span-4">
                Re-Password <span className="text-red-700 font-bold">*</span>
              </label>
              <input
                type="password"
                name="password_confirmation"
                value={user.password_confirmation}
                onChange={userInputHandler}
                className="ring-1 pl-2 md:py-1 w-full ring-gray-300 rounded-md outline-none md:col-span-8"
                placeholder="Confirm your password?"
              />
            </div>
            <div className="md:grid md:grid-cols-12 space-y-1  mx-4">
              <label htmlFor="" className="md:col-span-4"></label>
              <div className="text-red-700 w-full md:col-span-8">
                {errors.password_confirmation}
              </div>
            </div>
            <div className="grid grid-cols-3 space-x-1 mx-4">
              <div className="md:col-span-1"></div>
              <div className="col-span-3 md:col-span-2 py-1">
                <input
                  type="checkbox"
                  className="mr-2"
                  name="agree"
                  value={true}
                  onChange={userInputHandler}
                />
                <label className="space-x-2" htmlFor="remember">
                  <span>I agree to</span>
                  <Link
                    to="/terms"
                    className="space-x-1 text-blue-700 hover:text-blue-700/80"
                  >
                    <span>terms & conditions</span>
                    <span className="text-red-700 font-bold">*</span>
                  </Link>
                </label>
              </div>
            </div>
            <div className="md:grid md:grid-cols-12 space-y-1  mx-4">
              <label htmlFor="" className="md:col-span-4"></label>
              <div className="text-red-700 w-full md:col-span-8">
                {errors.agree}
              </div>
            </div>
            <div className="grid grid-cols-3 space-x-1">
              <div className="col-span-1"></div>
              <div className="col-span-2 py-1">
                <label
                  className=" text-blue-700 hover:text-blue-700/80"
                  htmlFor="forget"
                >
                  Forgot Your Password?
                </label>
              </div>
            </div>
            <div className="grid grid-cols-3 space-x-1">
              <div className="lg:col-span-1"></div>
              <div className="col-span-3 md:col-span-3 space-x-4 p-4 flex justify-end items-center">
                <div className="text-blue-700 hover:text-blue-700/80 hidden md:inline-block">
                  Already have an account? Please
                </div>
                <Link
                  to="/login"
                  className=" ring-1 ring-gray-300 rounded-md py-1 px-2 text-sm md:text-base text-white bg-blue-600 hover:bg-blue-400"
                >
                  Login
                </Link>
                <button
                  className=" ring-1 ring-gray-300 rounded-md py-1 px-2 text-sm md:text-base text-white bg-blue-600 hover:bg-blue-400"
                  onClick={(e) => registrationHandler(e)}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
