import React from "react";

export default function ResetPassword() {
  return (
    <>
      <div className="bg-gray-100 my-4  ">
        <div className="flex justify-center items-center h-[100vh]">
          <div className="ring-2 ring-gray-100 rounded-md bg-gray-50 pb-10 w-[700px] shadow">
            <div className="pt-3 mx-6 flex justify-between">
              <span className="text-lg">Recover Password</span>
            </div>
            <hr className="mb-5 mt-3" />
            <form>
              <div className="ml-2  grid grid-rows-6 gap-3">
                <div className="grid grid-cols-3 space-x-1">
                  <label htmlFor="password" className="col-span-1 md:ml-4">
                    New Password
                    <span className="text-red-700 font-bold">*</span>
                  </label>
                  <div className="flex flex-col">
                    <input
                      type="password"
                      className="col-span-2 ring-1 ring-gray-300 rounded-md outline-none py-1 pl-2 md:w-96"
                      name="password"
                      placeholder="Enter your new password?"
                    />
                    <div className="text-red-700"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 space-x-1">
                  <label
                    htmlFor="confirm_password"
                    className="col-span-1 md:ml-4"
                  >
                    Comfirm Password
                    <span className="text-red-700 font-bold">*</span>
                  </label>
                  <div className="flex flex-col">
                    <input
                      type="password"
                      className="col-span-2 ring-1 ring-gray-300 rounded-md outline-none py-1 pl-2 md:w-96"
                      name="confirm_password"
                      placeholder="Confirm your new password?"
                    />
                    <div className="text-red-700"></div>
                  </div>
                </div>
                <div className="flex justify-end items-center space-x-2 ">
                  <div className="text-blue-700 hover:text-blue-700/80"></div>
                  <div className="">
                    <div className="space-x-6 md:text-right md:mr-20">
                      <button
                        className="no-underline ring-1 ring-gray-300 rounded-md py-1 px-3 text-white bg-blue-600 hover:bg-blue-400"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
