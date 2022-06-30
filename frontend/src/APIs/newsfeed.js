import authHeader from "./authHeader";

const API_URL = "https://social-web-apii.herokuapp.com/api/newsfeed";

const NewsfeedApi = {
  getNewsfeed: async () => {
    const headers = authHeader();
    const res = await fetch(API_URL, {
      method: "GET",
      mode: "cors",
      headers,
    });
    const data = res.json();
    return data;
  },
};

export default NewsfeedApi;
