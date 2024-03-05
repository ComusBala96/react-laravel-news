import React from "react";
import { BiDotsHorizontal } from "react-icons/bi";
import { GrView } from "react-icons/gr";

export default function Privacy() {
  return (
    <>
      <div className="col-span-12 md:col-span-9 md:pt-2">
        <div className=" bg-white shadow-sm pb-10">
          <div className="border-b py-1 ">
            <div className="flex justify-between items-center mx-4">
              <span className="text-lg py-2">Privacy and safety</span>
              <BiDotsHorizontal className=" cursor-pointer" />
            </div>
          </div>
          <div className="mx-4 mt-4">
            <div className="flex flex-col gap-1">
              <span className="text-lg">Security Settings</span>
              <span>
                These settings are helps you keep your account secure.
              </span>
            </div>
            <div className="shadow-lg mx-6 mt-4 border">
              <div className="border-b p-2">
                <div className="float-right mr-12">
                  <input type="checkbox" className="" id="" />
                </div>
                <div className="flex flex-col">
                  <strong className="">Enable Activity Logs</strong>
                  <small className="text-gray-400/90">
                    Donec id elit non mi porta gravida at eget metus.
                  </small>
                </div>
              </div>
              <div className="border-b p-2">
                <div className="float-right mr-4">
                  <button className="bg-blue-500/90 text-white rounded-full px-3">
                    Disable
                  </button>
                </div>
                <div className="flex flex-col">
                  <div className="space-x-1">
                    <strong className="">2FA Authentication</strong>
                    <small className="bg-green-500/90 text-white rounded-full px-2 text-sm">
                      Enabled
                    </small>
                  </div>
                  <small className="text-gray-400/90">
                    Maecenas sed diam eget risus varius blandit.
                  </small>
                </div>
              </div>
              <div className="p-2">
                <div className="float-right mr-12">
                  <input type="checkbox" className="" id="pinCode" />
                </div>
                <div className="flex flex-col">
                  <strong className="">Activate Pin Code</strong>
                  <small className="text-gray-400/90">
                    Donec id elit non mi porta gravida at eget metus.
                  </small>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 my-6">
              <span className="text-lg">Recent Activity</span>
              <span>Last activities with your account.</span>
            </div>
            <div className="md:mx-2 ">
              <table className="mx-auto border text-[8.4px] md:text-sm lg:text-base w-full">
                <thead className="border-b ">
                  <tr className="">
                    <th className="border-r text-left tracking-wide p-3">
                      Device
                    </th>
                    <th className="border-r text-left tracking-wide p-3">
                      Location
                    </th>
                    <th className="border-r text-left tracking-wide p-3">IP</th>
                    <th className="border-r text-left tracking-wide p-3">
                      Time
                    </th>
                    <th className="text-left tracking-wide p-3">View</th>
                  </tr>
                </thead>
                <tbody className="">
                  <tr className="border-b ">
                    <th className="border-r text-left tracking-wide p-3">
                      Chrome - Windows 10
                    </th>
                    <td className="border-r text-left tracking-wide p-3">
                      Paris, France
                    </td>
                    <td className="border-r text-left tracking-wide p-3">
                      192.168.1.10
                    </td>
                    <td className="border-r text-left tracking-wide p-3">
                      Apr 24, 2019
                    </td>
                    <td>
                      <GrView className="cursor-pointer mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b ">
                    <th className="border-r text-left tracking-wide p-3">
                      App - Mac OS
                    </th>
                    <td className="border-r text-left tracking-wide p-3">
                      Newyork, USA
                    </td>
                    <td className="border-r text-left tracking-wide p-3">
                      10.0.0.10
                    </td>
                    <td className="border-r text-left tracking-wide p-3">
                      Apr 24, 2019
                    </td>
                    <td>
                      <GrView className="cursor-pointer mx-auto" />
                    </td>
                  </tr>
                  <tr className="">
                    <th className="border-r text-left tracking-wide p-3">
                      Chrome - iOS
                    </th>
                    <td className="border-r text-left tracking-wide p-3">
                      London, UK
                    </td>
                    <td className="border-r text-left tracking-wide p-3">
                      255.255.255.0
                    </td>
                    <td className="border-r text-left tracking-wide p-3">
                      Apr 24, 2019
                    </td>
                    <td>
                      <GrView className="cursor-pointer mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
