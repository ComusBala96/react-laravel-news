import React from "react";

export default function ForgetPassword() {
  return (
    <>
      <div className="bg-gray-100 my-4 p-4 ">
        <div className="flex justify-center items-center h-[100vh]">
          <div className="ring-2 ring-gray-100 rounded-md bg-gray-50 pb-4 w-[700px] shadow ">
            <div className="pt-3 ml-6">
              <span className="text-lg">
                Reset Password |{" "}
                <span className="text-red-700 font-semibold">Not Working</span>
              </span>
            </div>
            <hr className="mb-5 mt-3" />
            <div className="ml-2 grid grid-rows-3 gap-3">
              <form>
                <div className="grid grid-cols-3 space-x-1">
                  <label htmlFor="email" className="col-span-1 md:ml-4">
                    Email Address
                  </label>
                  <div className="flex flex-col">
                    <input
                      type="email"
                      className="col-span-2 ring-1 pl-2 py-1 ring-gray-300 rounded-md outline-none   md:w-96"
                      name="email"
                      placeholder="Enter your registered email?"
                    />
                    <span className="text-red-700 font-bold"></span>
                  </div>
                </div>
                <div className="grid grid-cols-2 text-center gap-4 mt-3 mr-10">
                  <div className=""></div>
                  <div className=" space-x-2 mr-8">
                    <a
                      href="/login"
                      className="no-underline ring-1 ring-gray-300 rounded-md py-2 px-3 text-white bg-blue-600 hover:bg-blue-400"
                    >
                      Login
                    </a>
                    <button
                      className="no-underline ring-1 ring-gray-300 rounded-md py-2 px-3 text-white bg-blue-600 hover:bg-blue-400"
                      type="submit"
                    >
                      Send Password Reset Link
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
