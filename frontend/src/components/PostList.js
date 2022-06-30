import React, { useEffect, useState } from "react";
import NewsfeedApi from "../APIs/newsfeed";
import Post from "./Post";

const PostList = () => {
  const [newsfeed, setNewsfeed] = useState(null);

  const fetchNewsfeed = async () => {
    try {
      NewsfeedApi.getNewsfeed().then((data) => {
        if (data.newsfeed) {
          setNewsfeed(data.newsfeed);
          document.title = "Newsfeed";
        }
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchNewsfeed();
  }, []);

  if (newsfeed) {
    return (
      <>
        {newsfeed.map((post, index) => (
          <Post post={post} key={index} />
        ))}
        <p className="italic">Please follow more users to see more posts</p>
      </>
    );
  }
};

export default PostList;
