import React, { useEffect } from "react";
import Header from "../components/Header";
import Recommend from "../components/Recommend";

const MainLayout = ({ content, contentName }) => {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  });

  return (
    <div className="flex w-full min-h-screen flex flex-col items-center relative">
      <Header />
      <div className="flex justify-center mt-3 rounded divide-x">
        <div style={{ width: "700px" }} className="p-7">
          <p
            style={{ fontFamily: "Trispace" }}
            className="text-center text-xl text-red-400 mb-2"
          >
            {"_"} {contentName} {"_"}
          </p>
          <hr className="mb-2" />
          <div>{content}</div>
        </div>
        <Recommend />
      </div>
    </div>
  );
};

export default MainLayout;
