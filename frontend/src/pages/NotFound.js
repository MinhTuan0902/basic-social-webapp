import React from "react";
import notfound from "../assets/404.gif";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <p className="text-2xl mb-5">404. Page not found</p>
      <img src={notfound} className="rounded-lg" />
      <p className="text-xl mt-2">This URL does not exist</p>
    </div>
  );
};

export default NotFound;
