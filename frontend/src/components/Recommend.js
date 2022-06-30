import React, { useEffect, useState } from "react";
import UserApi from "../APIs/user";
import { Link } from "react-router-dom";
import useLoggedInUser from "../hooks/useLoggedInUser";
import meditaionImage from "../assets/meditation.jpg";
import ProfileApi from "../APIs/profile";

const Recommend = () => {
  const [allProfiles, setAllProfiles] = useState(null);
  const loggedInUser = useLoggedInUser();

  const fetchAllProfiles = async () => {
    ProfileApi.getAllProfiles().then((data) => {
      if (data.profiles) {
        setAllProfiles(data.profiles);
      }
    });
  };

  useEffect(() => {
    fetchAllProfiles();
  }, []);

  if (allProfiles) {
    return (
      <div style={{ width: "300px" }} className="p-7">
        <p
          style={{ fontFamily: "Trispace" }}
          className="text-center text-xl text-red-400 mb-2"
        >
          {"_"} SOMEONE {"_"}
        </p>
        <p className="text-cyan-800 mb-2 text-sm">#Some profile here</p>

        <div className="flex flex-col text-sm">
          {allProfiles.map((profile, index) => {
            let pathToProfile = "/profile/" + profile.userId;
            if (profile.userId === loggedInUser.loggedInUser.user._id) {
              pathToProfile = "/profile/me";
            }

            if (index >= 5) {
              return;
            }
            return (
              <Link
                to={pathToProfile}
                key={index}
                className="mb-2 text-cyan-800 text-bold"
                onClick={() => {
                  window.history.pushState(pathToProfile);
                }}
              >
                <div className="flex items-center">
                  <img
                    style={{ width: "50px", height: "50px" }}
                    className="rounded-full"
                    src={profile.avatar}
                  />
                  <p className="ml-2">{profile.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <div>
          <p className="text-red-400 italic text-sm">
            #Hope you like my mini project
          </p>
          <img className="rounded-xl mt-2" src={meditaionImage} />
        </div>
      </div>
    );
  }
};

export default Recommend;
