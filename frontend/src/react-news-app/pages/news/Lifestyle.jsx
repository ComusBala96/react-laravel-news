import React from "react";
import { Outlet } from "react-router-dom";
import LifestyleHeading from "../../components/news/LifestyleHeading";
export default function Lifestyle() {
  return (
    <>
      <LifestyleHeading />
      <Outlet />
    </>
  );
}
