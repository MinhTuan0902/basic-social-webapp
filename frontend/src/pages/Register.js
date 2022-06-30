import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserApi from "../APIs/user";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const fetchRegisterUser = async () => {
    UserApi.register({ username, email, password, repeatPassword }).then(
      (data) => alert(data.message)
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    fetchRegisterUser();
  };

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
        <h1 className="mb-2 text-xl">Create a new account️ 🎈</h1>
        <input
          className="p-2 mb-3 rounded-lg"
          type="text"
          placeholder="-> username: 6-30 characters"
          value={username}
          name="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <input
          className="p-2 mb-3 rounded-lg"
          type="email"
          placeholder="-> email: demo@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-2 mb-3 rounded-lg"
          type="password"
          placeholder="-> password: 6-30 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="p-2 rounded-lg"
          type="password"
          placeholder="-> password again"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        {username && email && password && repeatPassword && (
          <input
            style={{ backgroundColor: "#F47C7C" }}
            className="cursor-pointer mt-4 rounded-lg py-2 text-xl"
            type="button"
            value="REGISTER"
            onClick={submitHandler}
          />
        )}

        <p className="pt-3">Already have an account?</p>
        <Link to="/" className="text-neutral-700">
          Login now!
        </Link>
      </form>
    </div>
  );
};

export default Register;
