import React, { useState, useRef, useEffect } from "react";
import Loading from "../../loading/Loading";
import { BsCamera } from "react-icons/bs";
import axios from "axios";
import swal from "sweetalert";
export default function ProfileHeader({ update, forceUpdate }) {
  const [errors, setErrors] = useState("");
  const [cover, setCover] = useState("");
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("auth_token");
  const coverRef = useRef(null);
  const profileRef = useRef(null);
  useEffect(() => {
    setLoading(true);
    if (token) {
      axios.get("/show/cover").then((res) => {
        if (res.data.status === 200) {
          setCover(res.data.cover);
          setLoading(false);
        }
      });
    }
  }, [update, token]);
  useEffect(() => {
    setLoading(true);
    if (token) {
      axios.get("/show/profile").then((res) => {
        if (res.data.status === 200) {
          setProfile(res.data.profile);
          setLoading(false);
        }
      });
    }
  }, [update, token]);
  const handleCoverUpdateClick = () => {
    coverRef.current.click();
  };
  const handleCoverPhoto = async (e) => {
    e.preventDefault();
    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("cover_photo", file);
    try {
      const res = await axios.post("/cover", formData);
      if (res.data.status === 200) {
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          timer: 1000,
        });
        setLoading(false);
        forceUpdate();
        setErrors("");
      } else {
        setLoading(false);
        setErrors(res.data.errors.cover_photo[0]);
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
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          timer: 1000,
        });
        setLoading(false);
        forceUpdate();
        setErrors("");
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
    return <Loading />;
  }
  return (
    <>
      <div className="md:grid md:grid-cols-12 space-y-1  mx-4">
        <label htmlFor="" className="md:col-span-6"></label>
        <div className="text-red-700 w-full md:col-span-4">{errors}</div>
      </div>
      <div className="mx-2 mt-3 mb-36">
        <div className="flex justify-center">
          <div className="relative rounded border mx-auto w-full md:w-[80%]">
            <div
              className=" bg-no-repeat bg-cover justify-center items-center h-[40vh] md:h-[60vh] lg:h-[70vh] xl:h-[50vh]"
              style={{
                backgroundImage: `url(${cover})`,
              }}
            >
              <div
                onClick={handleCoverUpdateClick}
                className="absolute  top-0 right-0 md:pt-3  rounded-sm rounded-br-none w-28 h-10 md:h-14 opacity-80 bg-gray-300 hover:bg-gray-400 hover:opacity-90 duration-300"
              >
                <label className="cursor-pointer text-white">
                  <div className="flex flex-col items-center ">
                    <BsCamera />
                    <span className="text-sm">Update Cover</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <form>
            <input
              type="file"
              ref={coverRef}
              onChange={handleCoverPhoto}
              className="hidden"
            />
          </form>
        </div>

        <div className="flex justify-center ">
          <div className="relative w-full">
            <div className="absolute left-[50%] -translate-x-16 -top-20 md:-top-24 lg:-top-32">
              <div
                className="relative border bg-white border-blue-400 text-center rounded-full overflow-hidden w-36 md:w-40 lg:w-48 h-36 md:h-40 lg:h-48 bg-no-repeat bg-cover items-center shadow-md"
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
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="md:space-x-1 flex flex-col md:flex-row items-center">
                  <span className="xl:text-lg">Comus Bala</span>
                  <span className="text-xs md:text-sm xl:text-base">
                    ( Nick Name )
                  </span>
                </div>
                <small>Ocupation</small>
              </div>
            </div>
          </div>
          <input
            type="file"
            name="profile"
            ref={profileRef}
            onChange={handleProfilePhoto}
            className="hidden"
          />
        </div>
      </div>
    </>
  );
}
