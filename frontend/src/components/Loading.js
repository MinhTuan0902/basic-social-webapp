import React from "react";
import loadingGif from "../assets/loading.gif";

const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <p className="text-2xl mb-5">Please wait 😘</p>
      <img src={loadingGif} className="rounded-lg" />
      <p className="text-xl mt-2">Web is loading...</p>
    </div>
  );
};

export default Loading;
