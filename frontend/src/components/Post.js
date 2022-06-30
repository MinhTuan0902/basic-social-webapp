import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../helpers/formatDate";
import useLoggedInUser from "../hooks/useLoggedInUser";

const Post = ({ post }) => {
  const loggedInUser = useLoggedInUser();
  let pathToPostDetail = "/post/" + post._id;
  let pathToProfile = "/profile/" + post.userId;

  if (post.userId === loggedInUser.loggedInUser.user._id) {
    pathToProfile = "/profile/me";
  }

  if (post) {
    return (
      <div className="w-full mb-2 text-sm">
        <Link
          to={pathToProfile}
          className="w-fit py-1 px-2 bg-red-200 rounded-xl mb-1 flex items-center"
        >
          {post.userId === loggedInUser.loggedInUser.user._id ? (
            <span>It's your post!</span>
          ) : (
            <span>Navigate to author's profile</span>
          )}
        </Link>
        <p className="text-sm">
          #postID: <span className="text-red-500">{post._id}</span>
        </p>
        <p className="text-sm">
          #createdAt:{" "}
          <span className="text-red-500">{formatDate(post.createdAt)}</span>
        </p>
        <p className="text-sm">
          #updatedAt:{" "}
          <span className="text-red-500">{formatDate(post.updatedAt)}</span>
        </p>
        <p className="text-base text-cyan-800">{post.caption}</p>
        {post.image && (
          <img
            className="rounded-xl mt-3 w-full h-full object-contain"
            src={post.image}
          />
        )}

        <Link to={pathToPostDetail} className="flex justify-center">
          <button className="p-2 bg-red-300 my-3 rounded-full">
            View post
          </button>
        </Link>
        <hr />
      </div>
    );
  }
};

export default Post;
