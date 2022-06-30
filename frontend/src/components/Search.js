import React, { useEffect, useState } from "react";
import * as queryString from "query-string";
import SearchApi from "../APIs/search";
import { Link } from "react-router-dom";
import useLoggedInUser from "../hooks/useLoggedInUser";

const Search = () => {
  const [profilesFound, setProfilesFound] = useState(null);
  const parsed = queryString.parse(window.location.search);
  const loggedInUser = useLoggedInUser();

  const fetchProfileFound = async () => {
    SearchApi.searchProfileByName(parsed.name).then((data) => {
      setProfilesFound(data.profilesFound);
    });
  };

  useEffect(() => {
    fetchProfileFound();
  }, []);

  if (profilesFound) {
    return (
      <div>
        <p className="mb-2">
          You searched:{" "}
          <span className="italic text-cyan-800">
            {parsed.name.split("-").join(" ")}
          </span>
        </p>
        {profilesFound.length === 0 && <p>No user found!</p>}
        {profilesFound.map((profile, index) => {
          let pathToProfile = "/profile/" + profile.userId;
          if (profile.userId === loggedInUser.loggedInUser.user._id) {
            pathToProfile = "/profile/me";
          }
          return (
            <div key={index} className="mb-4 flex items-center">
              <img
                style={{ width: "100px", height: "100px" }}
                className="rounded-full"
                src={profile.avatar}
              />
              <div className="ml-3">
                <p>{profile.name}</p>
                {profile.userId === loggedInUser.loggedInUser.user._id ? (
                  <Link
                    className="text-sm underline text-cyan-800 italic"
                    to={pathToProfile}
                  >
                    It's you!
                  </Link>
                ) : (
                  <Link
                    className="text-sm underline text-cyan-800 italic"
                    to={pathToProfile}
                  >
                    Navigate to profile
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Search;
