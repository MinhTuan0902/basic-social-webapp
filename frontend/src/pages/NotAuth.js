import React from "react";
import { Link } from "react-router-dom";
import notAuthImage from "../assets/notAuth.gif";

const NotAuth = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <p className="text-2xl mb-5">401. You are not authenticated ⛔</p>
      <img src={notAuthImage} className="rounded-lg mb-2" />
      <Link className="text-xl text-red-400" to="/">
        Go to Login page ➡️
      </Link>
    </div>
  );
};

export default NotAuth;
