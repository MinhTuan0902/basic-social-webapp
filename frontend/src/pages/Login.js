import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAsyncAction } from "../features/userSlice";

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(loginAsyncAction({ username, password }));
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (user.loggedInUser !== null && user.accessToken !== null) {
      nav("/newsfeed");
    }
  }, [user]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        style={{
          backgroundColor: "#EF9F9F",
        }}
        className="rounded-2xl w-fit p-8 flex flex-col"
      >
        <h1 className="text-3xl mb-2">Hi!</h1>
        <h1>This is my basic Social Network project.</h1>
        <h1 className="mb-4"> Let's enjoy!</h1>
        <h1 className="mb-2 text-xl">Log in 🎈</h1>
        <input
          className="p-2 mb-3 rounded-lg"
          type="text"
          placeholder="-> username "
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-2 rounded-lg"
          type="password"
          placeholder="-> password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {username && password && (
          <button
            style={{ backgroundColor: "#F47C7C" }}
            className="cursor-pointer mt-4 rounded-lg py-2 text-xl"
            onClick={submitHandler}
          >
            LOGIN
          </button>
        )}

        <p className="pt-3">Do not have an account?</p>
        <Link to="/register" className="text-neutral-700">
          Register now!
        </Link>
        <span className="italic text-sm text-gray-500">
          #Note: use English for best display
        </span>
      </form>
    </div>
  );
};

export default Login;
