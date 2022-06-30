import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FollowApi from "../APIs/follow";
import PostApi from "../APIs/post";
import ProfileApi from "../APIs/profile";
import useLoggedInUser from "../hooks/useLoggedInUser";
import loadingGif from "../assets/loading.gif";
import formatDate from "../helpers/formatDate";

const MyProfile = () => {
  const loggedInUser = useLoggedInUser();

  const [myProfile, setMyProfile] = useState(null);
  const [myFollow, setMyFollow] = useState(null);
  const [myPosts, setMyPosts] = useState(null);

  const [onShowFollow, setOnShowFollow] = useState(false);

  const [onUpdateProfile, setOnUpdateProfile] = useState(false);
  const [onUpdateAvatar, setOnUpdateAvatar] = useState(false);

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [name, setName] = useState("");
  const [story, setStory] = useState("");

  const [postOnDelete, setPostOnDelete] = useState(null);
  const [postOnUpdate, setPostOnUpdate] = useState(null);
  const [captionToUpdate, setCaptionToUpdate] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);

  const fetchMyProfile = async () => {
    ProfileApi.getUserProfile(loggedInUser.loggedInUser.user._id)
      .then((data) => {
        if (data.profile) {
          setMyProfile(data.profile);
          setAvatar(data.profile.avatar);
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchMyFollow = async () => {
    FollowApi.getFollowOfUser(loggedInUser.loggedInUser.user._id)
      .then((data) => {
        if (data.follow) {
          setMyFollow(data.follow);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchMyPosts = async () => {
    PostApi.getMyPosts().then((data) => {
      if (data.myPosts) {
        setMyPosts(data.myPosts);
      }
    });
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    ProfileApi.updateProfile(name, story).then((data) => {
      if (data.updatedProfile) {
        setMyProfile(data.updatedProfile);
        setName("");
        setStory("");
      } else {
        alert(data.message);
      }
    });
  };

  const handleChangeImage = async (event) => {
    const image = event.target.files[0];
    setImage(image);
    setPreviewImage(URL.createObjectURL(image));
  };

  const fetchUpdateAvatar = async () => {
    setIsUpdatingAvatar(true);
    const newAvatar = await ProfileApi.updateAvatar(image);
    if (newAvatar.updatedProfile) {
      setAvatar(newAvatar.updatedProfile.avatar);
      setPreviewImage(null);
      setImage(null);
      setOnUpdateAvatar(false);
      setIsUpdatingAvatar(false);
      alert(newAvatar.message);
    } else {
      alert(newAvatar.message);
    }
  };

  const handleUpdateAvatar = (event) => {
    event.preventDefault();
    fetchUpdateAvatar();
  };

  useEffect(() => {
    fetchMyFollow();
    fetchMyPosts();
    fetchMyProfile();
    document.title = "My Profile";
  }, []);

  if (myProfile && myFollow && myPosts && avatar) {
    return (
      <>
        <div className="flex">
          <div className="flex items-center flex-col">
            <img
              style={{ width: "250px", height: "250px" }}
              src={avatar}
              className="rounded-lg mt-2 object-contain"
            />

            <span className="text-center mt-1 italic text-gray-400 text-sm">
              #Note: using square image
            </span>
            <span className="italic text-gray-400 text-sm">
              for best display
            </span>
            {!onUpdateAvatar && (
              <button
                onClick={() => setOnUpdateAvatar(true)}
                className="p-2 m-2 rounded-full bg-red-300"
              >
                <p>Update avatar 📷</p>
              </button>
            )}
          </div>
          <div className="mt-5 ml-5">
            <div className="flex flex-col items-start">
              <p className="text-sm">
                #userID:{" "}
                <span className="text-cyan-800">{myProfile.userId}</span>
              </p>
              <p className="text-sm">
                #name: <span className="text-cyan-800">{myProfile.name}</span>
              </p>
              <p className="text-sm mb-1">
                #story: <span className="text-cyan-800">{myProfile.story}</span>
              </p>

              {onUpdateProfile && (
                <div className="w-full text-sm">
                  <div className="flex flex-col">
                    <input
                      className="pl-1 py-1 border-2 border-gray-200 mb-1"
                      placeholder="> New name? 6-30 characters"
                      value={name}
                      type="text"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className="pl-1 py-1 border-2 border-gray-200"
                      placeholder="> New story?"
                      type="text"
                      value={story}
                      name="story"
                      onChange={(e) => setStory(e.target.value)}
                    />
                  </div>
                  <div className="my-1">
                    {name.length >= 6 && name.length <= 30 && (
                      <button
                        onClick={handleUpdateProfile}
                        className="py-1 bg-green-300 rounded-xl px-1 mr-1"
                      >
                        Submit
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setOnUpdateProfile(false);
                        setName("");
                        setStory("");
                      }}
                      className="py-1 bg-red-300 rounded-xl px-1"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
              {!onUpdateProfile && (
                <button
                  onClick={() => setOnUpdateProfile(true)}
                  className="bg-red-300 rounded-full p-2"
                >
                  Update profile
                </button>
              )}
            </div>
            <div className="mt-2 flex flex-col items-start">
              <p className="text-sm">#following: {myFollow.following.length}</p>
              <p className="text-sm">#followers: {myFollow.followers.length}</p>
              {!onShowFollow && (
                <button
                  onClick={() => setOnShowFollow(true)}
                  className="p-2 bg-red-300 rounded-full mt-1"
                >
                  View follow
                </button>
              )}

              {onShowFollow && (
                <div className="text-sm mt-1">
                  <div className="rounded border-2 border-gray-400 py-1 flex flex-col justify-center px-4">
                    <p className="underline italic">following</p>
                    {myFollow.following.length === 0 ? (
                      <p>No one here</p>
                    ) : (
                      <div className="flex flex-col">
                        {myFollow.following.map((userId, index) => {
                          const pathToProfile = "/profile/" + userId;
                          return (
                            <Link
                              className="text-cyan-800"
                              key={index}
                              to={pathToProfile}
                            >
                              {userId}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                    <hr className="my-1" />
                    <p className="underline italic">followers</p>
                    {myFollow.followers.length === 0 ? (
                      <p>No one here</p>
                    ) : (
                      <div className="flex flex-col">
                        {myFollow.followers.map((userId, index) => {
                          const pathToProfile = "/profile/" + userId;
                          return (
                            <Link
                              className="text-cyan-800"
                              key={index}
                              to={pathToProfile}
                            >
                              {userId}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <button
                    className="p-1 bg-red-300 rounded-xl mt-1"
                    onClick={() => setOnShowFollow(false)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {onUpdateAvatar && (
          <div className="mt-2">
            <input onChange={handleChangeImage} type="file" name="image" />
            <div className="text-sm mt-1">
              {previewImage && (
                <div className="flex flex-col items-center mt-2">
                  <img className="rounded-xl w-fit h-fit" src={previewImage} />
                  <button
                    onClick={() => {
                      setImage(null);
                      setPreviewImage(null);
                    }}
                    className="text-sm bg-red-500 rounded-full w-fit p-1 mt-2"
                  >
                    Remove
                  </button>
                </div>
              )}
              {isUpdatingAvatar && (
                <div className="flex flex-col items-center mt-2">
                  <img src={loadingGif} />
                  <p className="mt-1">Avatar is updating...Please wait</p>
                </div>
              )}

              <div className="mt-1">
                {previewImage && (
                  <button
                    onClick={handleUpdateAvatar}
                    className="py-1 bg-green-300 rounded-xl px-1 mr-1"
                  >
                    Submit
                  </button>
                )}
                <button
                  onClick={() => {
                    setOnUpdateAvatar(false);
                    setImage(null);
                    setPreviewImage(null);
                  }}
                  className="py-1 bg-red-300 rounded-xl px-1"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <hr className="my-2" />
        <div>
          <p className="text-center text-red-400 font-bold bg-red-200 rounded-full py-2 mb-2">
            MY POSTs
          </p>
          {myPosts.length === 0 && (
            <div className="italic text-gray-500">You do not have any post</div>
          )}
          {myPosts.map((post, index) => {
            const pathToPost = "/post/" + post._id;

            const fetchDeletePost = async () => {
              PostApi.deletePost(postOnDelete)
                .then((data) => {
                  if (data.deletedPost) {
                    setMyPosts((oldState) => {
                      for (let i = 0; i < oldState.length; i++) {
                        if (oldState[i]._id === postOnDelete) {
                          oldState.splice(i, 1);
                          break;
                        }
                      }
                      return oldState;
                    });
                    setPostOnDelete(null);
                  }
                })
                .catch((err) => console.log(err));
            };

            const handleDeletePost = () => {
              fetchDeletePost();
            };

            const fetchUpdatePost = async () => {
              PostApi.updatePost(postOnUpdate, captionToUpdate)
                .then((data) => {
                  if (data.updatedPost) {
                    setMyPosts((oldState) => {
                      for (let i = 0; i < oldState.length; i++) {
                        if (oldState[i]._id === postOnUpdate) {
                          oldState[i].caption = data.updatedPost.caption;
                          oldState[i].updatedAt = data.updatedPost.updatedAt;
                          break;
                        }
                      }
                      return oldState;
                    });
                    setPostOnUpdate(null);
                    setCaptionToUpdate("");
                  }
                })
                .catch((err) => console.log(err));
            };

            const handleUpdatePost = () => {
              fetchUpdatePost();
            };

            return (
              <div key={index}>
                <p className="text-sm">
                  #postID: <span className="text-red-500">{post._id}</span>
                </p>
                <p className="text-sm">
                  #createdAt:{" "}
                  <span className="text-red-500">
                    {formatDate(post.createdAt)}
                  </span>
                </p>
                <p className="text-sm">
                  #updatedAt:{" "}
                  <span className="text-red-500">
                    {formatDate(post.updatedAt)}
                  </span>
                </p>
                <p className="text-base text-cyan-800">{post.caption}</p>
                {post.image && (
                  <div className="flex justify-center my-2">
                    <img
                      className="w-fit h-fit rounded-xl object-contain"
                      src={post.image}
                    />
                  </div>
                )}

                <div className="flex justify-center">
                  <div>
                    {!(
                      postOnDelete === post._id || postOnUpdate === post._id
                    ) && (
                      <Link
                        to={pathToPost}
                        className="text-sm mr-2 p-2 bg-red-300 rounded-full"
                      >
                        View
                      </Link>
                    )}
                    {!(postOnDelete === post._id) && (
                      <button
                        onClick={() => {
                          setPostOnUpdate(post._id);
                          setPostOnDelete(null);
                        }}
                        className="text-sm mr-2 p-2 bg-red-400 rounded-full"
                      >
                        Update
                      </button>
                    )}
                    {!(postOnUpdate === post._id) && (
                      <button
                        onClick={() => {
                          setPostOnDelete(post._id);
                        }}
                        className="p-2 bg-red-500 rounded-full"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
                {postOnDelete === post._id && (
                  <div className="text-sm">
                    <p className="italic">Delete this post?</p>
                    <button
                      onClick={handleDeletePost}
                      className="p-1 bg-green-300 rounded-xl mr-1"
                    >
                      Yes, delete it!
                    </button>
                    <button
                      onClick={() => {
                        setPostOnDelete(null);
                      }}
                      className="p-1 bg-red-200 rounded-xl"
                    >
                      Close
                    </button>
                  </div>
                )}
                {postOnUpdate === post._id && (
                  <div className="text-sm">
                    <p className="italic">Update this post</p>
                    <input
                      className="p-1 pl-2 rounded-xl mb-1 border-2 border-gray-300 w-full"
                      placeholder="> New caption?"
                      name="caption"
                      value={captionToUpdate}
                      onChange={(e) => setCaptionToUpdate(e.target.value)}
                    />
                    <div>
                      {captionToUpdate && (
                        <button
                          onClick={handleUpdatePost}
                          className="p-1 bg-green-300 rounded-xl mr-1"
                        >
                          Update now!
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setPostOnUpdate(null);
                        }}
                        className="p-1 bg-red-200 rounded-xl"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
                <hr className="my-2" />
              </div>
            );
          })}
        </div>
      </>
    );
  }
};

export default MyProfile;
