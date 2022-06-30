import React from "react";
import Message from "../components/Message";
import MainLayout from "../layouts/MainLayout";

const MessagePage = () => {
  return <MainLayout contentName="MESSAGE" content={<Message />} />;
};

export default MessagePage;
