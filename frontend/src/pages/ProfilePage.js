import React from "react";
import Profile from "../components/Profile";
import MainLayout from "../layouts/MainLayout";

const ProfilePage = () => {
  return <MainLayout contentName="PROFILE" content={<Profile />} />;
};

export default ProfilePage;
