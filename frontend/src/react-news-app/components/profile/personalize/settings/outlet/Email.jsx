import React, { useEffect, useState } from "react";
import { BiDotsHorizontal } from "react-icons/bi";
import Loading from "../../../../../loading/Loading";
import axios from "axios";
import swal from "sweetalert";
export default function Email({ update, forceUpdate }) {
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const token = localStorage.getItem("auth_token");
  const [userEmail, setUserEmail] = useState({
    new_email: "",
    verify_email: "",
    user_id: "",
  });
  useEffect(() => {
    if (token) {
      setLoading(true);
      axios.get("/show/user").then((res) => {
        if (res.data.status === 200) {
          setUser(res.data.user);
          setLoading(false);
        }
      });
    }
  }, [token, update]);
  const handleEmailInput = (e) => {
    setUserEmail({ ...userEmail, [e.target.name]: e.target.value });
  };
  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      new_email: userEmail.new_email,
      verify_email: userEmail.verify_email,
      email: user.email,
    };
    try {
      const res = await axios.post("/user/email/update", data);
      if (res.data.status === 200) {
        setLoading(false);
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          timer: 1000,
        });
        setUserEmail("");
        setErrors("");
        forceUpdate();
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
          <div className="border py-1 ">
            <div className="flex justify-between items-center mx-4">
              <span className="text-lg py-2">Email</span>
              <BiDotsHorizontal className=" cursor-pointer" />
            </div>
          </div>
          <form onSubmit={handleEmailUpdate}>
            <div className="lg:mx-2 xl:mx-10 flex flex-col gap-2 px-2 py-6">
              <div className="flex flex-col lg:grid lg:grid-cols-12 ">
                <label htmlFor="name" className="col-span-2">
                  Current Email:
                </label>
                <span className="col-span-10 outline-none bg-gray-50 py-1 pl-2 border border-yellow-300 w-full h-9">
                  {user.email}
                </span>
              </div>
              <div className="lg:grid lg:grid-cols-12 ">
                <label htmlFor="" className="col-span-2"></label>
                <div className="text-red-700 w-full col-span-10"></div>
              </div>
              <div className="lg:grid lg:grid-cols-12">
                <label htmlFor="name" className="col-span-2">
                  New Email:
                  <span className="text-red-500 font-bold"> *</span>
                </label>
                <input
                  type="email"
                  name="new_email"
                  value={userEmail.new_email}
                  onChange={handleEmailInput}
                  placeholder="Enter your new email?"
                  className="col-span-10 outline-none bg-gray-50 pl-2 border border-yellow-300 w-full h-9"
                />
              </div>
              <div className="lg:grid lg:grid-cols-12 ">
                <label htmlFor="" className="col-span-2"></label>
                <div className="text-red-700 w-full col-span-10">
                  {errors.new_email}
                </div>
              </div>
              <div className="lg:grid lg:grid-cols-12">
                <label htmlFor="name" className="col-span-2">
                  Verify Email:
                  <span className="text-red-500 font-bold"> *</span>
                </label>
                <input
                  type="email"
                  name="verify_email"
                  value={userEmail.verify_email}
                  onChange={handleEmailInput}
                  placeholder="Re-Enter your new email?"
                  className="col-span-10 outline-none bg-gray-50 pl-2 border border-yellow-300 w-full h-9"
                />
              </div>
              <div className="md:grid md:grid-cols-12">
                <label htmlFor="" className="col-span-2"></label>
                <div className="text-red-700 w-full col-span-10">
                  {errors.verify_email}
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
