import React from "react";
import { Outlet } from "react-router-dom";
import NewsHeading from "../../components/news/NewsHeading";
export default function News() {
  return (
    <>
      <NewsHeading />
      <Outlet />
    </>
  );
}
