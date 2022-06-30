import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FollowApi from "../APIs/follow";
import PostApi from "../APIs/post";
import ProfileApi from "../APIs/profile";
import formatDate from "../helpers/formatDate";
import useLoggedInUser from "../hooks/useLoggedInUser";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [follow, setFollow] = useState(null);
  const [allPosts, setAllPosts] = useState(null);
  const [followedUser, setFollowedUser] = useState(null);

  const nav = useNavigate();

  const { userId } = useParams();
  const loggedInUser = useLoggedInUser();

  const fetchUserProfile = async () => {
    ProfileApi.getUserProfile(userId)
      .then((data) => {
        if (data.profile) {
          setProfile(data.profile);
          document.title = "Profile | " + data.profile.name;
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchUserFollow = async () => {
    FollowApi.getFollowOfUser(userId).then((data) => {
      if (data.follow) {
        setFollow(data.follow);
        if (
          data.follow.followers.includes(loggedInUser.loggedInUser.user._id)
        ) {
          setFollowedUser(true);
        }
      }
    });
  };

  const fetchPostOfUser = async () => {
    PostApi.getPostsOfUser(userId).then((data) => setAllPosts(data.posts));
  };

  const handleFollowUser = async () => {
    FollowApi.followUser(userId)
      .then(() => {
        setFollowedUser(true);
        setFollow((oldState) => {
          oldState.followers.push(loggedInUser.loggedInUser.user._id);
          return oldState;
        });
      })
      .catch((err) => console.log(err));
  };

  const handleUnfollowUser = async () => {
    FollowApi.unfollowUser(userId)
      .then(() => {
        setFollowedUser(false);
        setFollow((oldState) => {
          oldState.followers.splice(
            oldState.followers.indexOf(loggedInUser.loggedInUser.user._id),
            1
          );
          return oldState;
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loggedInUser.loggedInUser.user._id === userId) {
      nav("/profile/me");
    }

    fetchUserProfile();
    fetchUserFollow();
    fetchPostOfUser();
  }, []);

  if (profile && follow && allPosts) {
    const pathToUserMessage = "/message/" + userId;
    return (
      <>
        <div className="flex">
          <div className="flex items-center flex-col mb-3">
            <img
              style={{ width: "250px", height: "250px" }}
              src={profile.avatar}
              className="rounded-lg mt-2 object-contain"
            />
          </div>
          <div className="flex flex-col items-start mt-5 ml-5">
            <div>
              <p className="text-sm">
                #userID: <span className="text-cyan-800">{profile.userId}</span>{" "}
              </p>
              <p className="text-sm">
                #name: <span className="text-cyan-800">{profile.name}</span>
              </p>
              <p className="text-sm mb-1">
                #story: <span className="text-cyan-800">{profile.story}</span>
              </p>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm">#following: {follow.following.length}</p>
              <p className="text-sm">#followers: {follow.followers.length}</p>
              {follow.followers.includes(loggedInUser.loggedInUser.user._id) ? (
                <button
                  className="bg-red-300 p-2 rounded-full mt-1"
                  onClick={handleUnfollowUser}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="bg-red-300 p-2 rounded-full mt-1"
                  onClick={handleFollowUser}
                >
                  Follow
                </button>
              )}
              <button className="bg-red-300 p-2 rounded-full mt-1">
                <Link to={pathToUserMessage}>Message</Link>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-1">
          <hr className="my-2" />
          <div>
            <p className="text-center text-red-400 rounded-full py-2 bg-red-200 font-bold mb-2">
              USER'S POSTs
            </p>
          </div>
        </div>
        <div>
          {allPosts.length === 0 ? (
            <div className="italic text-gray-500">
              User does not have any post
            </div>
          ) : (
            <div>
              {allPosts.map((post, index) => {
                let pathToPostDetail = "/post/" + post._id;
                return (
                  <div className="mt-1" key={index}>
                    <p className="text-sm">
                      #postID: <span className="text-red-600">{post._id}</span>
                    </p>
                    <p className="text-sm">
                      #createdAt:{" "}
                      <span className="text-red-600">
                        {formatDate(post.createdAt)}
                      </span>
                    </p>
                    <p className="text-sm">
                      #updatedAt:{" "}
                      <span className="text-red-600">
                        {formatDate(post.updatedAt)}
                      </span>
                    </p>
                    <p className="text-base text-cyan-800">{post.caption}</p>
                    {post.image && (
                      <div className="flex justify-center my-1">
                        <img
                          className="w-full h-full rounded-xl"
                          src={post.image}
                        />
                      </div>
                    )}

                    <div className="flex justify-center">
                      <button className="p-2 bg-red-300 mt-2 mr-2 rounded-full">
                        <Link to={pathToPostDetail}>View</Link>
                      </button>
                    </div>

                    <hr className="my-2" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  }
};

export default Profile;
