import authHeader from "./authHeader";

const API_URL = "https://social-web-apii.herokuapp.com/api/users/";

const FollowApi = {
  getFollowOfUser: async (userId) => {
    const headers = authHeader();
    const res = await fetch(API_URL + "/" + userId + "/get-follow", {
      method: "GET",
      mode: "cors",
      headers,
    });
    const data = res.json();
    return data;
  },

  followUser: async (userId) => {
    const headers = authHeader();
    const res = await fetch(API_URL + "/" + userId + "/follow", {
      method: "POST",
      mode: "cors",
      headers,
    });
    const data = res.json();
    return data;
  },

  unfollowUser: async (userId) => {
    const headers = authHeader();
    const res = await fetch(API_URL + "/" + userId + "/unfollow", {
      method: "POST",
      mode: "cors",
      headers,
    });
    const data = res.json();
    return data;
  },
};

export default FollowApi;
