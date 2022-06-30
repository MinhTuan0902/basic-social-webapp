import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import homeIcon from "../assets/house.png";
import logoutIcon from "../assets/logout.png";
import createPostIcon from "../assets/heart (2).png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import useLoggedInUser from "../hooks/useLoggedInUser";
import ProfileApi from "../APIs/profile";

const Header = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loggedInUser = useLoggedInUser();

  const [avatar, setAvatar] = useState(null);
  const [nameToSearch, setNameToSearch] = useState("");

  const fetchAvatar = async () => {
    ProfileApi.getAvatar(loggedInUser.loggedInUser.user._id).then((data) => {
      if (data.avatar) {
        setAvatar(data.avatar);
      }
    });
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      dispatch(logout(user));
      nav("/");
    }
  };

  const queryString = nameToSearch.split(" ").join("-");
  const searchURL = "/search?name=" + queryString;

  const handleSearch = () => {
    window.location.pushState(searchURL);
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  if (avatar) {
    return (
      <div className="z-10 w-full flex justify-center sticky top-0">
        <header
          style={{ width: "1000px", height: "60px" }}
          className="flex items-center justify-center px-5 bg-red-300 rounded"
        >
          <div className="flex-1 flex justify-start">
            <input
              placeholder="> Search someone..."
              className="rounded-lg w-4/6 p-2"
              value={nameToSearch}
              onChange={(e) => setNameToSearch(e.target.value)}
              type="text"
            />
            {nameToSearch && (
              <Link
                to={searchURL}
                onClick={handleSearch}
                className="bg-red-200 rounded-lg ml-2 px-2 center pt-2"
              >
                Search
              </Link>
            )}
          </div>
          <div className="flex-1 flex justify-end">
            <Link
              className="flex items-center"
              to="/newsfeed"
              onClick={() => window.location.pushState("/newsfeed")}
            >
              <img
                src={homeIcon}
                style={{ width: "30px", height: "30px" }}
                className="hover:bg-red-400 rounded-full mx-3"
              />
            </Link>
            <Link className="flex items-center" to="/create-post">
              <img
                src={createPostIcon}
                style={{ width: "30px", height: "30px" }}
                className="mx-3"
              />
            </Link>
            <div className="flex items-center">
              <button onClick={handleLogout}>
                <img
                  src={logoutIcon}
                  style={{ width: "30px", height: "30px" }}
                  className="mx-3 cursor-pointer"
                />
              </button>
            </div>
            <Link to="/profile/me">
              <img
                src={avatar}
                style={{ width: "45px", height: "45px" }}
                className="rounded-full object-contain"
              />
            </Link>
          </div>
        </header>
      </div>
    );
  }
};

export default Header;
