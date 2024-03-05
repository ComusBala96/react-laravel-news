import React from "react";
import { Outlet } from "react-router-dom";
import SettingsSidebar from "../../../components/profile/personalize/settings/SettingsSidebar";
import Profilebar from "../../../components/profile/Profilebar";
import Error404 from "../../../../Error404";
export default function Settings() {
  const token = localStorage.getItem("auth_token");
  if (token) {
    return (
      <>
        <Profilebar />

        <div className="grid grid-cols-12 grid-flow-row md:grid-flow-col gap-4 md:mx-4">
          <SettingsSidebar className="sticky top-40" />
          <Outlet />
        </div>
      </>
    );
  }
  return (
    <>
      <Error404 />
    </>
  );
}
