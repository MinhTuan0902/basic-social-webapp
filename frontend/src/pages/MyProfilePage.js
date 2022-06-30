import React from "react";
import MyProfile from "../components/MyProfile";
import MainLayout from "../layouts/MainLayout";

const MyProfilePage = () => {
  return <MainLayout contentName="MY PROFILE" content={<MyProfile />} />;
};

export default MyProfilePage;
