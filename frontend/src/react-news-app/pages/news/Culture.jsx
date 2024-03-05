import React from "react";
import { Outlet } from "react-router-dom";
import CultureHeading from "../../components/news/CultureHeading";
export default function Culture() {
  return (
    <>
      <CultureHeading />
      <Outlet />
    </>
  );
}
