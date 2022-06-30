import React from "react";
import CreatePost from "../components/CreatePost";
import MainLayout from "../layouts/MainLayout";

const CreatePostPage = () => {
  return <MainLayout contentName="CREATE POST" content={<CreatePost />} />;
};

export default CreatePostPage;
