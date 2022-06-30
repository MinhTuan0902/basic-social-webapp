import authHeader from "./authHeader";

const API_URL = "https://social-web-apii.herokuapp.com/api/profiles/";

const ProfileApi = {
  getUserProfile: async (userId) => {
    const headers = authHeader();
    const res = await fetch(API_URL + "?userId=" + userId, {
      method: "GET",
      headers,
      mode: "cors",
    });
    const data = res.json();
    return data;
  },

  updateProfile: async (name, story) => {
    const headers = authHeader();
    const res = await fetch(API_URL, {
      method: "PUT",
      mode: "cors",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, story: story }),
    });

    const data = res.json();
    return data;
  },

  updateAvatar: async (imageUrl) => {
    const headers = authHeader();
    const formData = new FormData();
    if (imageUrl) {
      formData.append("image", imageUrl);
    }
    const res = await fetch(API_URL + "update-avatar", {
      method: "PUT",
      mode: "cors",
      body: formData,
      headers,
    });
    const data = res.json();
    return data;
  },

  getAvatar: async (userId) => {
    const headers = authHeader();
    const res = await fetch(API_URL + "avatar", {
      method: "GET",
      mode: "cors",
      headers,
    });
    const data = res.json();
    return data;
  },

  getAllProfiles: async () => {
    const headers = authHeader();
    const res = await fetch(API_URL + "all-profiles", {
      method: "GET",
      mode: "cors",
      headers,
    });
    const data = res.json();
    return data;
  },
};

export default ProfileApi;
