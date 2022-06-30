import React from "react";
import PostDetail from "../components/PostDetail";
import MainLayout from "../layouts/MainLayout";

const PostDetailPage = () => {
  return <MainLayout contentName="POST DETAIL" content={<PostDetail />} />;
};

export default PostDetailPage;
