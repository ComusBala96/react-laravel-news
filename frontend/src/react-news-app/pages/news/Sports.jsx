import React from "react";
import { Outlet } from "react-router-dom";

import SportsHeading from "../../components/news/SportsHeading";
export default function Sports() {
  return (
    <>
      <SportsHeading />
      <Outlet />
    </>
  );
}
