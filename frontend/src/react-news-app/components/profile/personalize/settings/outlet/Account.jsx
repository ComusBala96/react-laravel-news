import React, { useRef, useState, useEffect } from "react";
import Loading from "../../../../../loading/Loading";
import { BiDotsHorizontal } from "react-icons/bi";
import { BsCamera } from "react-icons/bs";
import swal from "sweetalert";
import axios from "axios";
export default function Account({ update, forceUpdate }) {
  const [errors, setErrors] = useState("");
  const profileRef = useRef(null);
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
    }
  }, [update, token]);
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
  }, [update, token]);
  useEffect(() => {
    if (token) {
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
    }
  }, [update, token]);
  useEffect(() => {
    if (token) {
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
  const handlePublicInput = (e) => {
    setUserPublicInfo({ ...userPublicInfo, [e.target.name]: e.target.value });
  };
  const handlePublicInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      nick_name: userPublicInfo.nick_name,
      occupation: userPublicInfo.occupation,
      biography: userPublicInfo.biography,
      description: userPublicInfo.description,
    };
    try {
      const res = await axios.post("/user/public/information", data);
      if (res.data.status === 200) {
        setLoading(false);
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          timer: 1000,
        });
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
  const handlePrivateInput = (e) => {
    setUserPrivateInfo({ ...userPrivateInfo, [e.target.name]: e.target.value });
  };
  const handlePrivateInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      date_of_birth: userPrivateInfo.date_of_birth,
      status: userPrivateInfo.status,
      gender: userPrivateInfo.gender,
      phone_number: userPrivateInfo.phone_number,
      address: userPrivateInfo.address,
      city: userPrivateInfo.city,
      state: userPrivateInfo.state,
      zip_code: userPrivateInfo.zip_code,
    };
    try {
      const res = await axios.post("/user/private/information", data);
      if (res.data.status === 200) {
        setLoading(false);
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          timer: 1000,
        });
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
  const handleProfileUpdateClick = () => {
    profileRef.current.click();
  };
  const handleProfilePhoto = async (e) => {
    e.preventDefault();
    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profile_photo", file);
    try {
      const res = await axios.post("/profile", formData);
      if (res.data.status === 200) {
        setLoading(false);
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          timer: 1000,
        });
        setErrors("");
        forceUpdate();
      } else {
        setLoading(false);
        setErrors(res.data.errors.profile_photo[0]);
      }
    } catch (error) {
      setLoading(false);
      swal({ title: "Warning", text: error.message, icon: "error" });
    }
  };

  if (loading) {
    return (
      <>
        <div className="col-span-12 md:col-span-9 md:pt-2 lg:mx-10">
          <Loading />;
        </div>
      </>
    );
  }
  return (
    <>
      <div className="col-span-12 md:col-span-9 md:pt-2 lg:mx-10">
        <div className=" bg-white shadow-sm mb-4">
          <div className="border py-1 ">
            <div className="flex justify-between items-center mx-4">
              <span className="text-lg py-2">Public Info</span>
              <BiDotsHorizontal className=" cursor-pointer" />
            </div>
          </div>
          <div className="lg:mx-2 xl:mx-10 py-2 lg:grid lg:grid-cols-12">
            <div className="col-span-12 md:col-span-8 gap-2 flex flex-col">
              <div className="p-2 flex flex-col lg:grid lg:grid-cols-12">
                <label htmlFor="name" className="col-span-3">
                  Full Name:
                </label>
                <span className="col-span-9 outline-none bg-gray-50 pl-2 py-1 border border-yellow-300 w-full h-9">
                  {user.name}
                </span>
              </div>
              <div className="p-2 flex flex-col lg:grid lg:grid-cols-12 ">
                <label htmlFor="email" className="col-span-3">
                  Email:
                </label>
                <span className="col-span-9 outline-none bg-gray-50 pl-2 py-1 border border-yellow-300 w-full h-9">
                  {user.email}
                </span>
              </div>
              <div className="p-2 flex flex-col lg:grid lg:grid-cols-12 ">
                <label htmlFor="email" className="col-span-3">
                  Username:
                </label>
                <span className="col-span-9 outline-none bg-gray-50 pl-2 py-1 border border-yellow-300 w-full h-9">
                  {user.user_name}
                </span>
              </div>
              <form onSubmit={handlePublicInfo}>
                <div className="p-2 flex flex-col lg:grid lg:grid-cols-12 ">
                  <label htmlFor="email" className="col-span-3">
                    Nick Name:
                    <span className="text-red-500 font-bold"> *</span>
                  </label>
                  <input
                    type="text"
                    name="nick_name"
                    value={userPublicInfo.nick_name}
                    onChange={handlePublicInput}
                    placeholder="Enter your nick name?"
                    className="col-span-9 outline-none  bg-gray-50 pl-2 border border-yellow-300 w-full h-9"
                  />
                </div>
                <div className="md:grid md:grid-cols-12 space-y-1  mx-4">
                  <label htmlFor="" className="md:col-span-3"></label>
                  <div className="text-red-700 w-full md:col-span-9">
                    {errors.nick_name}
                  </div>
                </div>
                <div className="p-2 flex flex-col lg:grid lg:grid-cols-12 ">
                  <label htmlFor="email" className="col-span-3">
                    Occupation:
                    <span className="text-red-500 font-bold"> *</span>
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={userPublicInfo.occupation}
                    onChange={handlePublicInput}
                    placeholder="Enter your occupation?"
                    className="col-span-9 outline-none  bg-gray-50 pl-2 border border-yellow-300 w-full h-9"
                  />
                </div>
                <div className="md:grid md:grid-cols-12 space-y-1  mx-4">
                  <label htmlFor="" className="md:col-span-3"></label>
                  <div className="text-red-700 w-full md:col-span-9">
                    {errors.occupation}
                  </div>
                </div>
                <div className="p-2 flex flex-col lg:grid lg:grid-cols-12 ">
                  <label htmlFor="email" className="col-span-3">
                    Biography:
                  </label>
                  <textarea
                    type="text"
                    name="biography"
                    value={
                      userPublicInfo.biography === null
                        ? ""
                        : userPublicInfo.biography
                    }
                    onChange={handlePublicInput}
                    rows="2"
                    placeholder="Tell something about yourself?"
                    className="col-span-9 outline-none  bg-gray-50 pl-2 border border-yellow-300 w-full"
                  ></textarea>
                </div>
                <div className="md:grid md:grid-cols-12   mx-4">
                  <label htmlFor="" className="md:col-span-3"></label>
                  <div className="text-red-700 w-full md:col-span-9">
                    {errors.biography}
                  </div>
                </div>
                <div className="p-2 flex flex-col lg:grid lg:grid-cols-12 ">
                  <label htmlFor="email" className="col-span-3">
                    Description:
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    value={
                      userPublicInfo.description === null
                        ? ""
                        : userPublicInfo.description
                    }
                    onChange={handlePublicInput}
                    rows="6"
                    placeholder="Write your description?"
                    className="col-span-9 outline-none  bg-gray-50 pl-2 border border-yellow-300 w-full"
                  ></textarea>
                </div>
                <div className="md:grid md:grid-cols-12   mx-4">
                  <label htmlFor="" className="md:col-span-3"></label>
                  <div className="text-red-700 w-full md:col-span-9">
                    {errors.description}
                  </div>
                </div>

                <div className="col-span-12 text-end mb-4 mx-3">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-gray-50 rounded-full px-4 py-1.5 cursor-pointer text-md "
                  >
                    {userPublicInfo.user_id === "" ? "Save Changes" : "Update"}
                  </button>
                </div>
              </form>
            </div>
            <div className="hidden lg:inline-block md:col-span-4 relative top-36">
              <div
                className="absolute border bg-white border-blue-400  rounded-full  overflow-hidden lg:ml-7 xl:ml-16 md:w-40 xl:w-48 md:h-40 xl:h-48 bg-no-repeat bg-cover items-center shadow-md"
                style={{
                  backgroundImage: `url(${profile})`,
                }}
              >
                <div
                  onClick={handleProfileUpdateClick}
                  className="absolute bottom-0 items-center h-16 w-full opacity-80 bg-gray-400 hover:bg-gray-400 hover:opacity-90 duration-300"
                >
                  <label className="cursor-pointer ">
                    <div className="flex flex-col items-center absolute bottom-4 w-full text-white">
                      <BsCamera />
                      <span className="text-sm">Update Profile</span>
                    </div>
                  </label>
                  <input
                    type="file"
                    name="profile"
                    className="hidden"
                    ref={profileRef}
                    onChange={handleProfilePhoto}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-sm mb-4">
          <div className="border py-1 ">
            <div className="flex justify-between items-center mx-4">
              <span className="text-lg py-2">Private Info</span>
              <BiDotsHorizontal className=" cursor-pointer" />
            </div>
          </div>
          <div className="lg:mx-2 xl:mx-10 py-2 lg:grid lg:grid-cols-12">
            <div className="col-span-9  flex flex-col">
              <form onSubmit={handlePrivateInfo}>
                <div className="p-2 lg:grid lg:grid-cols-12">
                  <label htmlFor="date" className="col-span-3">
                    Date of Birth:
                    <span className="text-red-500 font-bold"> *</span>
                  </label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={userPrivateInfo.date_of_birth}
                    onChange={handlePrivateInput}
                    className="col-span-9 outline-none bg-gray-50 pl-2 py-1 border border-yellow-300 w-full h-9"
                  />
                </div>
                <div className="md:grid md:grid-cols-12   mx-4">
                  <label htmlFor="" className="md:col-span-3"></label>
                  <div className="text-red-700 w-full md:col-span-9">
                    {errors.date_of_birth}
                  </div>
                </div>
                <div className="p-2 lg:grid lg:grid-cols-12 ">
                  <label htmlFor="email" className="col-span-3">
                    Gender:
                    <span className="text-red-500 font-bold"> *</span>
                  </label>
                  <select
                    name="gender"
                    value={userPrivateInfo.gender}
                    onChange={handlePrivateInput}
                    className="col-span-9 outline-none bg-gray-50 pl-2 border border-yellow-300 w-full h-9"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="femail">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="md:grid md:grid-cols-12   mx-4">
                  <label htmlFor="" className="md:col-span-3"></label>
                  <div className="text-red-700 w-full md:col-span-9">
                    {errors.gender}
                  </div>
                </div>
                <div className="p-2 lg:grid lg:grid-cols-12 ">
                  <label htmlFor="email" className="col-span-3">
                    Status:
                    <span className="text-red-500 font-bold"> *</span>
                  </label>
                  <select
                    name="status"
                    value={userPrivateInfo.status}
                    onChange={handlePrivateInput}
                    className="col-span-9 outline-none bg-gray-50 pl-2 border border-yellow-300 w-full h-9"
                  >
                    <option value="">Select Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="complicated">Complicated</option>
                  </select>
                </div>
                <div className="md:grid md:grid-cols-12   mx-4">
                  <label htmlFor="" className="md:col-span-3"></label>
                  <div className="text-red-700 w-full md:col-span-9">
                    {errors.status}
                  </div>
                </div>
                <div className="p-2 lg:grid lg:grid-cols-12 ">
                  <label htmlFor="email" className="col-span-3">
                    Phone:
                    <span className="text-red-500 font-bold"> *</span>
                  </label>
                  <input
                    type="number"
                    name="phone_number"
                    value={userPrivateInfo.phone_number}
                    onChange={handlePrivateInput}
                    placeholder="Enter Your Phone Number"
                    className="col-span-9 outline-none  bg-gray-50 pl-2 border border-yellow-300 w-full h-9"
                  />
                </div>
                <div className="md:grid md:grid-cols-12   mx-4">
                  <label htmlFor="" className="md:col-span-3"></label>
                  <div className="text-red-700 w-full md:col-span-9">
                    {errors.phone_number}
                  </div>
                </div>
                <div className="p-2 lg:grid lg:grid-cols-12 ">
                  <label htmlFor="email" className="col-span-3">
                    Address:
                    <span className="text-red-500 font-bold"> *</span>
                  </label>
                  <input
                    type="address"
                    name="address"
                    value={userPrivateInfo.address}
                    onChange={handlePrivateInput}
                    placeholder="Enter Your Address"
                    className="col-span-9 outline-none  bg-gray-50 pl-2 border border-yellow-300 w-full h-9"
                  />
                </div>
                <div className="md:grid md:grid-cols-12   mx-4">
                  <label htmlFor="" className="md:col-span-3"></label>
                  <div className="text-red-700 w-full md:col-span-9">
                    {errors.address}
                  </div>
                </div>
                <div className="p-2 lg:grid lg:grid-cols-12 ">
                  <label htmlFor="email" className="col-span-3">
                    City:
                    <span className="text-red-500 font-bold"> *</span>
                  </label>
                  <input
                    type="city"
                    name="city"
                    value={userPrivateInfo.city}
                    onChange={handlePrivateInput}
                    rows="2"
                    placeholder="Enter Your City"
                    className="col-span-9 outline-none  bg-gray-50 pl-2 border border-yellow-300 w-full h-9"
                  />
                </div>
                <div className="md:grid md:grid-cols-12   mx-4">
                  <label htmlFor="" className="md:col-span-3"></label>
                  <div className="text-red-700 w-full md:col-span-9">
                    {errors.city}
                  </div>
                </div>
                <div className="p-2 lg:grid lg:grid-cols-12 ">
                  <label htmlFor="email" className="col-span-3">
                    State:
                    <span className="text-red-500 font-bold"> *</span>
                  </label>
                  <input
                    type="state"
                    name="state"
                    value={userPrivateInfo.state}
                    onChange={handlePrivateInput}
                    rows="4"
                    placeholder="Enter Your State"
                    className="col-span-9 outline-none  bg-gray-50 pl-2 border border-yellow-300 w-full h-9"
                  />
                </div>
                <div className="md:grid md:grid-cols-12   mx-4">
                  <label htmlFor="" className="md:col-span-3"></label>
                  <div className="text-red-700 w-full md:col-span-9">
                    {errors.state}
                  </div>
                </div>
                <div className="p-2 lg:grid lg:grid-cols-12 ">
                  <label htmlFor="email" className="col-span-3">
                    Zip:
                    <span className="text-red-500 font-bold"> *</span>
                  </label>
                  <input
                    type="zip"
                    name="zip_code"
                    value={userPrivateInfo.zip_code}
                    onChange={handlePrivateInput}
                    rows="6"
                    placeholder="Enter Your Zip Code"
                    className="col-span-9 outline-none  bg-gray-50 pl-2 border border-yellow-300 w-full h-9"
                  />
                </div>
                <div className="md:grid md:grid-cols-12   mx-4">
                  <label htmlFor="" className="md:col-span-3"></label>
                  <div className="text-red-700 w-full md:col-span-9">
                    {errors.zip_code}
                  </div>
                </div>
                <div className="col-span-12 text-end mb-4 mx-3">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-gray-50 rounded-full px-4 py-1.5 cursor-pointer text-md "
                  >
                    {userPrivateInfo.user_id === "" ? "Save Changes" : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
