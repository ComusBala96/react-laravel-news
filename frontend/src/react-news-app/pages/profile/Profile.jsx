import React from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import Profilebar from "../../components/profile/Profilebar";
import Error404 from "../../../Error404";
export default function Profile({ update, forceUpdate }) {
  const token = localStorage.getItem("auth_token");
  if (token) {
    return (
      <>
        <ProfileHeader update={update} forceUpdate={forceUpdate} />
        <Profilebar />
      </>
    );
  }
  return (
    <>
      <Error404 />
    </>
  );
}
