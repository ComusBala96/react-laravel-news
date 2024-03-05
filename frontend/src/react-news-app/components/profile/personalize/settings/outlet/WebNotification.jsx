import React from "react";
import { BiDotsHorizontal } from "react-icons/bi";
export default function WebNotification() {
  return (
    <>
      <div className="col-span-9 ">
        <div className=" bg-white shadow-sm pb-10">
          <div className="border-b py-1 ">
            <div className="flex justify-between items-center mx-4">
              <span className="text-lg py-2">Web notifications</span>
              <BiDotsHorizontal className=" cursor-pointer" />
            </div>
          </div>
          <div className="mx-4 mt-4">
            <div className="flex flex-col gap-1 border-b pb-4">
              <span className="text-lg">Notifications Settings</span>
              <span>Select notification you want to receive</span>
            </div>
            <div className="flex flex-col gap-1 ml-3 py-2">
              <strong className="">Security</strong>
              <small>Control security alert you will be notified.</small>
            </div>
            <div className="shadow-lg mx-6 my-4 border">
              <div className="border-b p-2">
                <div className="float-right mr-12">
                  <input type="checkbox" className="" id="" />
                </div>
                <div className="flex flex-col">
                  <strong className="">Unusual activity notifications</strong>
                  <small className="text-gray-400/90">
                    Donec in quam sed urna bibendum tincidunt quis mollis
                    mauris.
                  </small>
                </div>
              </div>
              <div className=" p-2">
                <div className="float-right mr-12">
                  <input type="checkbox" className="" id="" />
                </div>
                <div className="flex flex-col">
                  <strong className="">Unauthorized financial activity</strong>
                  <small className="text-gray-400/90">
                    Fusce lacinia elementum eros, sed vulputate urna eleifend
                    nec.
                  </small>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 ml-3 py-2 border-t">
              <strong className="">System</strong>
              <small>Please enable system alert you will get.</small>
            </div>
            <div className="shadow-lg mx-6 mt-4 border">
              <div className="border-b p-2">
                <div className="float-right mr-12">
                  <input type="checkbox" className="" id="" />
                </div>
                <div className="flex flex-col">
                  <strong className="">
                    Notify me about new features and updates
                  </strong>
                  <small className="text-gray-400/90">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </small>
                </div>
              </div>
              <div className="border-b p-2">
                <div className="float-right mr-12">
                  <input type="checkbox" className="" id="" />
                </div>
                <div className="flex flex-col">
                  <strong className="">
                    Notify me by email for latest news
                  </strong>
                  <small className="text-gray-400/90">
                    Fusce lacinia elementum eros, sed vulputate urna eleifend
                    nec.
                  </small>
                </div>
              </div>
              <div className="p-2">
                <div className="float-right mr-12">
                  <input type="checkbox" className="" id="" />
                </div>
                <div className="flex flex-col">
                  <strong className="">
                    Notify me about tips on using account
                  </strong>
                  <small className="text-gray-400/90">
                    Nulla et tincidunt sapien. Sed eleifend volutpat elementum.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
