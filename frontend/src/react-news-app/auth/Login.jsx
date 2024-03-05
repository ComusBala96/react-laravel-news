import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import axios from "axios";
import swal from "sweetalert";
export default function Login({ forceUpdate }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    remember: null,
  });
  const [errors, setErrors] = useState("");

  const userInputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/login", user);
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
          title: "Denied",
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
      <div className="bg-gray-50 p-4 h-[55.8vh] md:h-[49.8vh] lg:h-[49.8vh] xl:h-[51.5vh]">
        <div className=" w-full md:w-[75%] lg:w-[65%] xl:w-[50%] mx-auto rounded-md bg-gray-100 ring-2 ring-gray-100 shadow-md">
          <div className=" border-b">
            <div className="text-lg mx-4 py-2">Login</div>
          </div>
          <form onSubmit={handleLogin}>
            <div className="grid grid-cols-12 justify-between mx-4 pt-2 pb-1">
              <label htmlFor="" className="col-span-4">
                Email <span className="text-red-700 font-bold">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={userInputHandler}
                className="ring-1 pl-2 md:py-1 ring-gray-300 rounded-md outline-none col-span-8"
                placeholder="Enter your email?"
              />
            </div>
            <div className="md:grid md:grid-cols-12 space-y-1  mx-4">
              <label htmlFor="" className="md:col-span-4"></label>
              <div className="text-red-700 w-full md:col-span-8">
                {errors.email}
              </div>
            </div>
            <div className="grid grid-cols-12 justify-between mx-4 pt-2 pb-1">
              <label htmlFor="" className="col-span-4">
                Password <span className="text-red-700 font-bold">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={userInputHandler}
                className="ring-1 pl-2 md:py-1 ring-gray-300 rounded-md outline-none col-span-8"
                placeholder="Enter your password?"
              />
            </div>
            <div className="md:grid md:grid-cols-12 space-y-1  mx-4">
              <label htmlFor="" className="md:col-span-4"></label>
              <div className="text-red-700 w-full md:col-span-8">
                {errors.password}
              </div>
            </div>
            <div className="grid grid-cols-3 space-x-1">
              <div className="col-span-1"></div>
              <div className="col-span-2 py-1">
                <input
                  type="checkbox"
                  className="mr-2"
                  name="remember"
                  value={true}
                  onChange={userInputHandler}
                />
                <label className="" htmlFor="remember">
                  Remember Me
                </label>
              </div>
            </div>
            <div className="grid grid-cols-3 space-x-1">
              <div className="col-span-1"></div>
              <div className="col-span-2 py-1">
                <label
                  className=" text-blue-700 hover:text-blue-700/80 "
                  htmlFor="forget"
                >
                  Forgot Your Password?
                </label>
              </div>
            </div>
            <div className="grid grid-cols-3 space-x-1">
              <div className="col-span-1"></div>
              <div className="col-span-2 space-x-4 p-4 flex justify-end">
                <Link
                  className=" ring-1 ring-gray-300 rounded-md py-1 px-2 text-sm md:text-base text-white bg-blue-600 hover:bg-blue-400"
                  to="/register"
                >
                  Register
                </Link>
                <button
                  className=" ring-1 ring-gray-300 rounded-md py-1 px-2 text-sm md:text-base text-white bg-blue-600 hover:bg-blue-400"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
