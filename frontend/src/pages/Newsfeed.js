import React from "react";
import PostList from "../components/PostList";
import MainLayout from "../layouts/MainLayout";

const Newsfeed = () => {
  return <MainLayout contentName="NEWSFEED" content={<PostList />} />;
};

export default Newsfeed;
