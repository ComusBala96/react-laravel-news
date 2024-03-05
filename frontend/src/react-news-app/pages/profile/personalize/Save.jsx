import React from "react";
import Profilebar from "../../../components/profile/Profilebar";
import CurrentNewsPost from "../../../components/newsPosts/currentNews/CurrentNewsPost";
import Error404 from "../../../../Error404";
export default function Save() {
  const token = localStorage.getItem("auth_token");
  if (token) {
    return (
      <>
        <Profilebar />
        <CurrentNewsPost />
      </>
    );
  }
  return (
    <>
      <Error404 />
    </>
  );
}
